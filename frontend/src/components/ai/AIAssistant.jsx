import { useState, useRef, useEffect } from 'react';
import { Mic, X, Volume2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';
import AIWaveform from './AIWaveform';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [sessionId] = useState(`session-${Date.now()}`);
  const [chatHistory, setChatHistory] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsListening(true);
      toast.success('Listening... Speak now');
    } catch (error) {
      console.error('Microphone error:', error);
      toast.error('Microphone access denied');
    }
  };

  const stopListening = () => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
      setIsProcessing(true);
    }
  };

  const transcribeAudio = async (audioBlob) => {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.webm');

      const response = await axios.post(`${API}/voice/transcribe`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const transcribedText = response.data.text;
      setTranscript(transcribedText);
      await sendMessageToAI(transcribedText);
    } catch (error) {
      console.error('Transcription error:', error);
      toast.error('Failed to transcribe audio');
      setIsProcessing(false);
    }
  };

  const sendMessageToAI = async (message) => {
    try {
      const response = await axios.post(`${API}/chat`, {
        message,
        session_id: sessionId,
        language: 'en'
      });

      const aiText = response.data.response;
      setAiResponse(aiText);
      setChatHistory(prev => [...prev, 
        { role: 'user', content: message },
        { role: 'assistant', content: aiText }
      ]);
      
      // Speak the response
      await speakText(aiText);
      setIsProcessing(false);
    } catch (error) {
      console.error('AI chat error:', error);
      toast.error('Failed to get AI response');
      setIsProcessing(false);
    }
  };

  const speakText = async (text) => {
    try {
      setIsSpeaking(true);
      const response = await axios.post(`${API}/voice/speak`, {
        text,
        voice: 'nova'
      });

      const audio = new Audio(`data:audio/mp3;base64,${response.data.audio_base64}`);
      audio.onended = () => setIsSpeaking(false);
      await audio.play();
    } catch (error) {
      console.error('TTS error:', error);
      setIsSpeaking(false);
    }
  };

  const handleMicClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else if (isListening) {
      stopListening();
    } else if (!isProcessing) {
      startListening();
    }
  };

  const handleClose = () => {
    if (isListening) {
      stopListening();
    }
    setIsOpen(false);
    setTranscript('');
    setAiResponse('');
  };

  return (
    <>
      {/* Floating Mic Button */}
      <motion.button
        data-testid="ai-mic-button"
        onClick={handleMicClick}
        className={`fixed bottom-6 right-6 h-16 w-16 rounded-full flex items-center justify-center shadow-2xl border-2 z-50 transition-all ${
          isListening
            ? 'bg-red-500 border-red-600 ai-glow'
            : 'bg-black border-gray-800 hover:scale-110'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          boxShadow: isListening
            ? '0 0 30px rgba(239, 68, 68, 0.6)'
            : '0 0 30px rgba(248, 203, 70, 0.4)'
        }}
      >
        {isProcessing ? (
          <Loader2 className="w-7 h-7 text-yellow-400 animate-spin" />
        ) : (
          <Mic className={isListening ? 'w-7 h-7 text-white' : 'w-7 h-7 text-yellow-400'} />
        )}
      </motion.button>

      {/* AI Assistant Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ background: 'rgba(0, 0, 0, 0.7)' }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="glass-effect rounded-3xl p-8 max-w-2xl w-full relative text-white shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                data-testid="ai-close-button"
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-yellow-400 mb-2">AAWAZ</h2>
                <p className="text-sm text-gray-300">
                  {isListening
                    ? 'Listening... Click mic to stop'
                    : isProcessing
                    ? 'Processing your request...'
                    : isSpeaking
                    ? 'Speaking...'
                    : 'Click the mic to speak'}
                </p>
              </div>

              {/* Waveform */}
              <div className="mb-8">
                <AIWaveform isActive={isListening || isSpeaking} />
              </div>

              {/* Chat Display */}
              <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
                {transcript && (
                  <div className="bg-white/10 rounded-2xl p-4">
                    <p className="text-xs text-yellow-400 font-semibold mb-1">You said:</p>
                    <p className="text-white">{transcript}</p>
                  </div>
                )}
                {aiResponse && (
                  <div className="bg-yellow-400/20 border-2 border-yellow-400/30 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Volume2 className="w-4 h-4 text-yellow-400" />
                      <p className="text-xs text-yellow-400 font-semibold">AAWAZ:</p>
                    </div>
                    <p className="text-white">{aiResponse}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-center">
                {!isListening && !isProcessing && (
                  <button
                    onClick={startListening}
                    data-testid="start-listening-button"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-all"
                  >
                    <Mic className="w-5 h-5" />
                    Start Speaking
                  </button>
                )}
                {isListening && (
                  <button
                    onClick={stopListening}
                    data-testid="stop-listening-button"
                    className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-all"
                  >
                    <Mic className="w-5 h-5" />
                    Stop
                  </button>
                )}
              </div>

              {/* Language Indicator */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-400">
                  Supported: English | हिंदी | ગુજરાતી | தமிழ்
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
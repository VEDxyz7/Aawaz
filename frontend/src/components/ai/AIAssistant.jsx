import { useState, useRef, useEffect } from 'react';
import { Mic, X, Sparkles, Loader2, Send, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';
import { useCartStore, useAIStore } from '@/store/cartStore';
import { parseIntent, QUICK_SUGGESTIONS } from '@/lib/aiEngine';
import AIWaveform from './AIWaveform';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function AIAssistant() {
  const navigate = useNavigate();
  const [textInput, setTextInput] = useState('');
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [sessionId] = useState(`session-${Date.now()}`);
  const [conversationLog, setConversationLog] = useState([]);

  // Stores
  const isOpen = useAIStore((s) => s.isOpen);
  const isListening = useAIStore((s) => s.isListening);
  const isProcessing = useAIStore((s) => s.isProcessing);
  const isSpeaking = useAIStore((s) => s.isSpeaking);
  const transcript = useAIStore((s) => s.transcript);
  const response = useAIStore((s) => s.response);
  const setOpen = useAIStore((s) => s.setOpen);
  const setListening = useAIStore((s) => s.setListening);
  const setProcessing = useAIStore((s) => s.setProcessing);
  const setSpeaking = useAIStore((s) => s.setSpeaking);
  const setTranscript = useAIStore((s) => s.setTranscript);
  const setResponse = useAIStore((s) => s.setResponse);
  const highlightProducts = useAIStore((s) => s.highlightProducts);
  const highlightCategory = useAIStore((s) => s.highlightCategory);

  const addMultipleItems = useCartStore((s) => s.addMultipleItems);
  const addItem = useCartStore((s) => s.addItem);
  const openCartDrawer = useCartStore((s) => s.openCart);

  // Execute AI action based on parsed intent
  const executeAction = (parsed) => {
    switch (parsed.action) {
      case 'add_multiple':
        if (parsed.products && parsed.products.length > 0) {
          addMultipleItems(parsed.products);
          highlightProducts(parsed.products.map((p) => p.id));
          toast.success(`Added ${parsed.products.length} items`, { duration: 2000 });
        }
        break;
      case 'add_single':
        if (parsed.products && parsed.products.length > 0) {
          addItem(parsed.products[0]);
          highlightProducts([parsed.products[0].id]);
          toast.success(`Added ${parsed.products[0].name}`);
        }
        break;
      case 'show_category':
        if (parsed.category) {
          highlightCategory(parsed.category);
          // Trigger global category selection via custom event
          window.dispatchEvent(new CustomEvent('ai-set-category', { detail: parsed.category }));
        }
        break;
      case 'highlight_products':
        if (parsed.products && parsed.products.length > 0) {
          highlightProducts(parsed.products.map((p) => p.id));
          // Filter the view
          window.dispatchEvent(new CustomEvent('ai-filter-products', { detail: parsed.products }));
        }
        break;
      case 'open_cart':
        openCartDrawer();
        break;
      case 'checkout':
        setOpen(false);
        navigate('/checkout');
        break;
      default:
        break;
    }
  };

  const processMessage = async (text) => {
    if (!text || !text.trim()) return;

    setTranscript(text);
    setProcessing(true);
    setConversationLog((log) => [...log, { role: 'user', content: text }]);

    // Local AI engine - parse intent and execute
    const parsed = parseIntent(text);

    setResponse(parsed.response);
    setConversationLog((log) => [...log, { role: 'assistant', content: parsed.response }]);

    // Execute action
    executeAction(parsed);

    // Speak response (use browser speech synthesis to save credits)
    if (parsed.response) {
      speakWithBrowserTTS(parsed.response);
    }

    setProcessing(false);
  };

  // Use browser's built-in speech synthesis - FREE
  const speakWithBrowserTTS = (text) => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.rate = 1.05;
      utterance.pitch = 1.05;
      utterance.volume = 0.9;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Browser TTS failed:', e);
    }
  };

  // Speech recognition using browser Web Speech API (FREE)
  const startBrowserSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      // Fallback to backend Whisper
      return startMediaRecording();
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setListening(true);
      toast.info('Listening...', { duration: 1500 });
    };

    recognition.onresult = (event) => {
      const text = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join('');
      setTranscript(text);
    };

    recognition.onend = () => {
      setListening(false);
      const finalText = useAIStore.getState().transcript;
      if (finalText && finalText.trim()) {
        processMessage(finalText);
      }
    };

    recognition.onerror = (event) => {
      setListening(false);
      if (event.error !== 'no-speech') {
        toast.error('Voice recognition failed. Try typing instead.');
      }
    };

    try {
      recognition.start();
    } catch (e) {
      console.error('Recognition error:', e);
      setListening(false);
      startMediaRecording();
    }
  };

  // Fallback: record audio and send to Whisper API
  const startMediaRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        stream.getTracks().forEach((track) => track.stop());
        await transcribeAndProcess(audioBlob);
      };

      mediaRecorderRef.current.start();
      setListening(true);
      toast.info('Listening...', { duration: 1500 });
    } catch (error) {
      console.error('Microphone error:', error);
      toast.error('Microphone access needed');
    }
  };

  const stopListening = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setListening(false);
  };

  const transcribeAndProcess = async (audioBlob) => {
    try {
      setProcessing(true);
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.webm');

      const res = await axios.post(`${API}/voice/transcribe`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const text = res.data.text;
      if (text && text.trim()) {
        await processMessage(text);
      } else {
        toast.error('Could not understand audio');
        setProcessing(false);
      }
    } catch (error) {
      console.error('Transcription error:', error);
      toast.error('Voice processing failed');
      setProcessing(false);
    }
  };

  const handleSendText = () => {
    if (textInput.trim()) {
      processMessage(textInput);
      setTextInput('');
    }
  };

  const handleQuickSuggestion = (suggestion) => {
    processMessage(suggestion);
  };

  const handleMicClick = () => {
    if (isListening) {
      // Stop browser recognition
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SR) {
        // Cancel via direct stop - handled in onend
        setListening(false);
      } else {
        stopListening();
      }
    } else {
      setOpen(true);
      startBrowserSpeechRecognition();
    }
  };

  return (
    <>
      {/* Floating AI Mic Button - positioned ABOVE Emergent badge */}
      <motion.button
        data-testid="ai-mic-button"
        onClick={handleMicClick}
        whileTap={{ scale: 0.92 }}
        className={`fixed bottom-24 right-4 md:bottom-20 md:right-6 h-14 w-14 md:h-16 md:w-16 rounded-full flex items-center justify-center shadow-2xl border-2 z-50 transition-all ${
          isListening
            ? 'bg-red-500 border-red-600'
            : 'bg-black border-yellow-400 ai-glow'
        }`}
      >
        {isProcessing ? (
          <Loader2 className="w-6 h-6 text-yellow-400 animate-spin" />
        ) : isListening ? (
          <Mic className="w-6 h-6 text-white" />
        ) : (
          <Sparkles className="w-6 h-6 text-yellow-400" />
        )}
        {!isListening && !isProcessing && (
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[8px] font-black px-1.5 py-0.5 rounded-full">
            AI
          </span>
        )}
      </motion.button>

      {/* AI Bottom Sheet (Non-blocking) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            data-testid="ai-assistant-overlay"
            className="fixed bottom-0 left-0 right-0 z-[55] glass-dark rounded-t-3xl shadow-2xl border-t border-yellow-400/30 max-h-[75vh] flex flex-col"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-12 h-1 bg-white/30 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">AAWAZ</h3>
                  <p className="text-[10px] text-yellow-400 font-medium">
                    {isListening ? 'Listening...' : isProcessing ? 'Thinking...' : isSpeaking ? 'Speaking...' : 'Ready to help'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                data-testid="ai-overlay-close"
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Waveform */}
            {(isListening || isSpeaking) && (
              <div className="px-5 py-2">
                <AIWaveform isActive={isListening || isSpeaking} />
              </div>
            )}

            {/* Conversation */}
            <div className="flex-1 overflow-y-auto px-5 py-3 space-y-2 min-h-[120px]">
              {conversationLog.length === 0 ? (
                <div className="space-y-3">
                  <p className="text-xs text-white/70 leading-relaxed">
                    Hi! I'm AAWAZ. Speak naturally - I can add products, find deals, and help you shop faster.
                  </p>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-yellow-400 font-bold mb-2">Try saying</p>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_SUGGESTIONS.slice(0, 4).map((s, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickSuggestion(s)}
                          data-testid={`quick-suggestion-${idx}`}
                          className="text-[11px] text-white bg-white/10 hover:bg-yellow-400 hover:text-black px-2.5 py-1.5 rounded-full transition-colors font-medium"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                conversationLog.slice(-4).map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs ${
                        msg.role === 'user'
                          ? 'bg-yellow-400 text-black font-medium rounded-br-sm'
                          : 'bg-white/10 text-white rounded-bl-sm'
                      }`}
                    >
                      {msg.role === 'assistant' && (
                        <Volume2 className="w-3 h-3 inline mr-1 text-yellow-400" />
                      )}
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input Bar - button on LEFT to avoid Emergent badge on right */}
            <div className="px-4 py-3 pb-6 border-t border-white/10 flex items-center gap-2 flex-shrink-0">
              {textInput.trim() ? (
                <button
                  onClick={handleSendText}
                  data-testid="ai-send-button"
                  className="w-10 h-10 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleMicClick}
                  data-testid="ai-mic-overlay"
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-yellow-400 hover:bg-yellow-500 text-black'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                </button>
              )}

              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
                placeholder="Type or speak..."
                data-testid="ai-text-input"
                className="flex-1 bg-white/10 text-white placeholder-white/40 px-4 py-2.5 rounded-full text-sm focus:bg-white/20 outline-none transition-colors"
                style={{ marginRight: '160px' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <audio ref={audioRef} hidden />
    </>
  );
}

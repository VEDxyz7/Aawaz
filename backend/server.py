from fastapi import FastAPI, APIRouter, UploadFile, File, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from emergentintegrations.llm.chat import LlmChat, UserMessage
from emergentintegrations.llm.openai import OpenAISpeechToText, OpenAITextToSpeech
import tempfile

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')
if not EMERGENT_LLM_KEY:
    raise ValueError("EMERGENT_LLM_KEY is required but not found in environment variables")

app = FastAPI()
api_router = APIRouter(prefix="/api")


class ChatRequest(BaseModel):
    message: str
    session_id: str
    context: Optional[str] = None
    language: Optional[str] = "en"


class ChatResponse(BaseModel):
    response: str
    session_id: str


class TranscribeResponse(BaseModel):
    text: str


class TTSRequest(BaseModel):
    text: str
    voice: Optional[str] = "nova"


class TTSResponse(BaseModel):
    audio_base64: str


class OrderRequest(BaseModel):
    items: List[dict]
    subtotal: float
    delivery_address: Optional[str] = "Default Address"


class OrderResponse(BaseModel):
    order_id: str
    status: str
    eta: str


@api_router.get("/")
async def root():
    return {"message": "AAWAZ API Running", "version": "2.0"}


@api_router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Optional smart-mode chat fallback using Claude. Most AI is now local."""
    try:
        system_msg = (
            "You are AAWAZ, a smart grocery shopping AI for an Indian grocery app. "
            "Be concise (1-2 sentences). Suggest specific products. "
            "Available categories: vegetables, fruits, dairy, bakery, snacks, beverages, essentials, frozen, household, personal care, baby care."
        )
        if request.context:
            system_msg += f"\n\nCurrent cart context: {request.context}"

        chat_client = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=request.session_id,
            system_message=system_msg,
        ).with_model("anthropic", "claude-sonnet-4-6")

        user_message = UserMessage(text=request.message)
        response = await chat_client.send_message(user_message)

        return ChatResponse(response=response, session_id=request.session_id)
    except Exception as e:
        logging.error(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.post("/voice/transcribe", response_model=TranscribeResponse)
async def transcribe_audio(file: UploadFile = File(...)):
    temp_file = None
    try:
        stt = OpenAISpeechToText(api_key=EMERGENT_LLM_KEY)
        audio_content = await file.read()

        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.webm')
        temp_file.write(audio_content)
        temp_file.close()

        with open(temp_file.name, "rb") as audio_file:
            response = await stt.transcribe(
                file=audio_file,
                model="whisper-1",
                response_format="json",
            )

        return TranscribeResponse(text=response.text)
    except Exception as e:
        logging.error(f"Transcription error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if temp_file and os.path.exists(temp_file.name):
            os.remove(temp_file.name)


@api_router.post("/voice/speak", response_model=TTSResponse)
async def text_to_speech(request: TTSRequest):
    try:
        tts = OpenAITextToSpeech(api_key=EMERGENT_LLM_KEY)
        audio_base64 = await tts.generate_speech_base64(
            text=request.text,
            model="tts-1",
            voice=request.voice,
        )
        return TTSResponse(audio_base64=audio_base64)
    except Exception as e:
        logging.error(f"TTS error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@api_router.post("/order", response_model=OrderResponse)
async def place_order(request: OrderRequest):
    order_id = f"ORD-{uuid.uuid4().hex[:8].upper()}"
    order_doc = {
        "order_id": order_id,
        "items": request.items,
        "subtotal": request.subtotal,
        "delivery_address": request.delivery_address,
        "status": "confirmed",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "eta": "10-15 mins",
    }
    await db.orders.insert_one(order_doc)
    return OrderResponse(order_id=order_id, status="confirmed", eta="10-15 mins")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

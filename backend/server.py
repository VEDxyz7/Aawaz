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
import base64

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Initialize AI services
EMERGENT_LLM_KEY = os.getenv('EMERGENT_LLM_KEY')

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Models
class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    price: float
    original_price: Optional[float] = None
    category: str
    image: str
    delivery_time: str
    unit: str
    in_stock: bool = True

class Category(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    icon: str

class CartItem(BaseModel):
    model_config = ConfigDict(extra="ignore")
    product_id: str
    quantity: int = 1

class ChatMessage(BaseModel):
    role: str
    content: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ChatRequest(BaseModel):
    message: str
    session_id: str
    language: Optional[str] = "en"

class ChatResponse(BaseModel):
    response: str
    session_id: str
    suggestions: Optional[List[str]] = None

class TranscribeResponse(BaseModel):
    text: str

class TTSRequest(BaseModel):
    text: str
    voice: Optional[str] = "nova"

class TTSResponse(BaseModel):
    audio_base64: str

# Seed products data
async def seed_products():
    count = await db.products.count_documents({})
    if count == 0:
        products = [
            {"id": str(uuid.uuid4()), "name": "Fresh Tomatoes", "price": 40, "original_price": 60, "category": "vegetables", "image": "https://images.pexels.com/photos/9705821/pexels-photo-9705821.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "delivery_time": "8 mins", "unit": "500g", "in_stock": True},
            {"id": str(uuid.uuid4()), "name": "Onions", "price": 35, "original_price": 50, "category": "vegetables", "image": "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwzfHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBncm9jZXJ5fGVufDB8fHx8MTc3OTk1NjQyN3ww&ixlib=rb-4.1.0&q=85", "delivery_time": "8 mins", "unit": "1kg", "in_stock": True},
            {"id": str(uuid.uuid4()), "name": "Lays Chips", "price": 20, "category": "snacks", "image": "https://images.unsplash.com/photo-1688217170693-e821c6e18d72?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwxfHxzbmFja3MlMjBjaGlwcyUyMGdyb2Nlcnl8ZW58MHx8fHwxNzc5OTU2NDI3fDA&ixlib=rb-4.1.0&q=85", "delivery_time": "10 mins", "unit": "52g", "in_stock": True},
            {"id": str(uuid.uuid4()), "name": "Kurkure", "price": 20, "category": "snacks", "image": "https://images.unsplash.com/photo-1549482218-02ef268be586?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHw0fHxzbmFja3MlMjBjaGlwcyUyMGdyb2Nlcnl8ZW58MHx8fHwxNzc5OTU2NDI3fDA&ixlib=rb-4.1.0&q=85", "delivery_time": "10 mins", "unit": "90g", "in_stock": True},
            {"id": str(uuid.uuid4()), "name": "Fresh Milk", "price": 56, "category": "dairy", "image": "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHw0fHxmcmVzaCUyMHZlZ2V0YWJsZXMlMjBncm9jZXJ5fGVufDB8fHx8MTc3OTk1NjQyN3ww&ixlib=rb-4.1.0&q=85", "delivery_time": "8 mins", "unit": "1L", "in_stock": True},
            {"id": str(uuid.uuid4()), "name": "Bread", "price": 35, "category": "dairy", "image": "https://images.pexels.com/photos/12765459/pexels-photo-12765459.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "delivery_time": "8 mins", "unit": "400g", "in_stock": True},
            {"id": str(uuid.uuid4()), "name": "Coca Cola", "price": 40, "category": "drinks", "image": "https://images.unsplash.com/photo-1641652682537-e1a9334f206d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwzfHxzbmFja3MlMjBjaGlwcyUyMGdyb2Nlcnl8ZW58MHx8fHwxNzc5OTU2NDI3fDA&ixlib=rb-4.1.0&q=85", "delivery_time": "10 mins", "unit": "750ml", "in_stock": True},
            {"id": str(uuid.uuid4()), "name": "Sprite", "price": 40, "category": "drinks", "image": "https://images.unsplash.com/photo-1614907634002-65ac4cb74acb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxOTB8MHwxfHNlYXJjaHwyfHxzbmFja3MlMjBjaGlwcyUyMGdyb2Nlcnl8ZW58MHx8fHwxNzc5OTU2NDI3fDA&ixlib=rb-4.1.0&q=85", "delivery_time": "10 mins", "unit": "750ml", "in_stock": True}
        ]
        await db.products.insert_many(products)

@api_router.get("/")
async def root():
    return {"message": "AAWAZ API Running"}

@api_router.get("/categories")
async def get_categories():
    categories = [
        {"id": "vegetables", "name": "Vegetables", "icon": "🥬"},
        {"id": "snacks", "name": "Snacks", "icon": "🍿"},
        {"id": "dairy", "name": "Dairy", "icon": "🥛"},
        {"id": "drinks", "name": "Drinks", "icon": "🥤"}
    ]
    return categories

@api_router.get("/products", response_model=List[Product])
async def get_products(category: Optional[str] = None):
    query = {} if not category else {"category": category}
    products = await db.products.find(query, {"_id": 0}).to_list(100)
    return products

@api_router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Initialize Claude chat
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=request.session_id,
            system_message="You are AAWAZ, a friendly AI shopping assistant for a grocery app. Help users find products, make recommendations, understand recipes, and guide them through shopping. Keep responses concise and helpful. You can suggest products from categories: vegetables, snacks, dairy, drinks. Be conversational and supportive."
        ).with_model("anthropic", "claude-sonnet-4-6")
        
        user_message = UserMessage(text=request.message)
        response = await chat.send_message(user_message)
        
        # Store chat history
        chat_doc = {
            "session_id": request.session_id,
            "user_message": request.message,
            "ai_response": response,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "language": request.language
        }
        await db.chat_history.insert_one(chat_doc)
        
        return ChatResponse(
            response=response,
            session_id=request.session_id,
            suggestions=["Show me healthy snacks", "I need ingredients for chai", "What's on discount?"]
        )
    except Exception as e:
        logging.error(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/voice/transcribe", response_model=TranscribeResponse)
async def transcribe_audio(file: UploadFile = File(...)):
    try:
        stt = OpenAISpeechToText(api_key=EMERGENT_LLM_KEY)
        audio_content = await file.read()
        
        # Save temporarily
        temp_path = f"/tmp/{file.filename}"
        with open(temp_path, "wb") as f:
            f.write(audio_content)
        
        with open(temp_path, "rb") as audio_file:
            response = await stt.transcribe(
                file=audio_file,
                model="whisper-1",
                response_format="json"
            )
        
        os.remove(temp_path)
        return TranscribeResponse(text=response.text)
    except Exception as e:
        logging.error(f"Transcription error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/voice/speak", response_model=TTSResponse)
async def text_to_speech(request: TTSRequest):
    try:
        tts = OpenAITextToSpeech(api_key=EMERGENT_LLM_KEY)
        audio_base64 = await tts.generate_speech_base64(
            text=request.text,
            model="tts-1",
            voice=request.voice
        )
        return TTSResponse(audio_base64=audio_base64)
    except Exception as e:
        logging.error(f"TTS error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

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
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup():
    await seed_products()

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
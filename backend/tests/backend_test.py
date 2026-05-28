"""AAWAZ Backend API tests (v2 - post upgrade).

The product catalog and categories are now client-side static data.
Backend exposes: /api/, /api/chat (Claude), /api/voice/transcribe (Whisper),
/api/voice/speak (OpenAI TTS), /api/order (create order in MongoDB).
"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    # Fallback - read frontend/.env
    try:
        with open("/app/frontend/.env") as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
                    break
    except Exception:
        pass

assert BASE_URL, "REACT_APP_BACKEND_URL must be set"


@pytest.fixture(scope="session")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- Health ----
def test_root(client):
    r = client.get(f"{BASE_URL}/api/")
    assert r.status_code == 200, r.text
    data = r.json()
    assert "AAWAZ" in data.get("message", "")
    assert data.get("version") == "2.0"


# ---- Chat with Claude via emergentintegrations ----
def test_chat_basic(client):
    session_id = f"test-{uuid.uuid4()}"
    payload = {
        "message": "Suggest a healthy snack under 50 rupees",
        "session_id": session_id,
        "language": "en",
    }
    r = client.post(f"{BASE_URL}/api/chat", json=payload, timeout=90)
    assert r.status_code == 200, f"Chat failed: {r.status_code} {r.text}"
    data = r.json()
    assert data["session_id"] == session_id
    assert isinstance(data["response"], str) and len(data["response"]) > 5


def test_chat_with_context(client):
    session_id = f"test-{uuid.uuid4()}"
    payload = {
        "message": "What's missing for chai?",
        "session_id": session_id,
        "language": "en",
        "context": "Cart has milk and sugar",
    }
    r = client.post(f"{BASE_URL}/api/chat", json=payload, timeout=90)
    assert r.status_code == 200, r.text
    data = r.json()
    assert isinstance(data["response"], str) and len(data["response"]) > 0


# ---- Voice TTS ----
def test_tts(client):
    payload = {"text": "Hello from AAWAZ", "voice": "nova"}
    r = client.post(f"{BASE_URL}/api/voice/speak", json=payload, timeout=60)
    assert r.status_code == 200, f"TTS failed: {r.status_code} {r.text}"
    data = r.json()
    assert "audio_base64" in data
    assert isinstance(data["audio_base64"], str) and len(data["audio_base64"]) > 100


# ---- Transcribe - error path (no file) ----
def test_transcribe_requires_file(client):
    r = client.post(f"{BASE_URL}/api/voice/transcribe")
    assert r.status_code in (400, 422)


# ---- Orders ----
def test_place_order_and_persist(client):
    items = [
        {"id": "d1", "name": "Amul Milk", "price": 28, "quantity": 2},
        {"id": "b1", "name": "Britannia Bread", "price": 45, "quantity": 1},
    ]
    payload = {
        "items": items,
        "subtotal": 101.0,
        "delivery_address": "TEST_addr - Mumbai 400001",
    }
    r = client.post(f"{BASE_URL}/api/order", json=payload, timeout=30)
    assert r.status_code == 200, f"Order failed: {r.status_code} {r.text}"
    data = r.json()
    assert data["status"] == "confirmed"
    assert data["order_id"].startswith("ORD-")
    assert isinstance(data["eta"], str) and len(data["eta"]) > 0
    # No mongo _id leakage
    assert "_id" not in data


def test_place_order_minimal(client):
    payload = {
        "items": [{"id": "v1", "name": "Tomato", "price": 30, "quantity": 1}],
        "subtotal": 30.0,
    }
    r = client.post(f"{BASE_URL}/api/order", json=payload, timeout=30)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["status"] == "confirmed"
    assert data["order_id"].startswith("ORD-")


def test_place_order_validation_missing_items(client):
    # Missing required fields should return 422
    r = client.post(f"{BASE_URL}/api/order", json={"subtotal": 0.0}, timeout=15)
    assert r.status_code == 422

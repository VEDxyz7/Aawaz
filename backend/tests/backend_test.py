"""AAWAZ Backend API tests"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://voice-grocery-3.preview.emergentagent.com").rstrip("/")
# Allow override from frontend env file
try:
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip().rstrip("/")
except Exception:
    pass


@pytest.fixture(scope="session")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Health
def test_root(client):
    r = client.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    assert "AAWAZ" in r.json().get("message", "")


# Categories
def test_categories(client):
    r = client.get(f"{BASE_URL}/api/categories")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    ids = {c["id"] for c in data}
    assert {"vegetables", "snacks", "dairy", "drinks"}.issubset(ids)
    for c in data:
        assert "name" in c and "icon" in c


# Products
def test_products_all(client):
    r = client.get(f"{BASE_URL}/api/products")
    assert r.status_code == 200
    products = r.json()
    assert isinstance(products, list)
    assert len(products) >= 8, f"Expected >=8 products, got {len(products)}"
    p = products[0]
    for key in ["id", "name", "price", "category", "image", "delivery_time", "unit", "in_stock"]:
        assert key in p, f"Missing key {key} in product"
    # No mongodb _id leakage
    assert "_id" not in p


def test_products_filter_by_category(client):
    for cat in ["vegetables", "snacks", "dairy", "drinks"]:
        r = client.get(f"{BASE_URL}/api/products", params={"category": cat})
        assert r.status_code == 200
        items = r.json()
        assert len(items) >= 1, f"No products in category {cat}"
        for p in items:
            assert p["category"] == cat


# Chat with Claude via emergentintegrations
def test_chat_basic(client):
    session_id = f"test-{uuid.uuid4()}"
    payload = {"message": "Suggest a healthy snack under 50 rupees", "session_id": session_id, "language": "en"}
    r = client.post(f"{BASE_URL}/api/chat", json=payload, timeout=60)
    assert r.status_code == 200, f"Chat failed: {r.status_code} {r.text}"
    data = r.json()
    assert data["session_id"] == session_id
    assert isinstance(data["response"], str) and len(data["response"]) > 5
    assert isinstance(data.get("suggestions"), list)


# TTS
def test_tts(client):
    payload = {"text": "Hello from AAWAZ", "voice": "nova"}
    r = client.post(f"{BASE_URL}/api/voice/speak", json=payload, timeout=60)
    assert r.status_code == 200, f"TTS failed: {r.status_code} {r.text}"
    data = r.json()
    assert "audio_base64" in data
    assert isinstance(data["audio_base64"], str) and len(data["audio_base64"]) > 100


# Transcribe - error path (no file)
def test_transcribe_requires_file(client):
    r = client.post(f"{BASE_URL}/api/voice/transcribe")
    # FastAPI 422 when required file param missing
    assert r.status_code in (400, 422)

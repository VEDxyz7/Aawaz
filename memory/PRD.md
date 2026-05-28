# AAWAZ - Product Requirements Document

## Original Problem Statement
Build AAWAZ - a Blinkit-inspired AI-native grocery commerce platform with a conversational AI layer (Claude Sonnet 4.5) for voice-first shopping. Multilingual support (Hindi, English, Hinglish, Gujarati, Tamil), AI navigation overlays, and a complete commerce flow.

## User Choices
- AI Model: Claude Sonnet 4.5 (via Emergent LLM key)
- Voice: OpenAI Whisper (STT) + browser Web Speech API (primary)
- Auth: None (open shopping)
- Multilingual: UI concept (Hindi/English transcription supported)

## Architecture
- **Frontend**: React 19 + Tailwind + Framer Motion + Zustand + Fuse.js
- **Backend**: FastAPI + MongoDB + emergentintegrations
- **AI**: Local intent engine (free) + Claude Sonnet 4.6 (smart-mode fallback)
- **State**: Zustand with localStorage persistence (cart-store)
- **Products**: 100+ static products with 12 categories and 6 curated collections

## What's Been Implemented (Feb 2026)
### Iteration 1: MVP Foundation
- Blinkit-inspired landing page with hero, features, CTA
- Basic grocery dashboard with categories and products
- AI assistant with Whisper STT + OpenAI TTS + Claude chat
- Basic cart functionality

### Iteration 2: Production Upgrade
- **Cart system**: Zustand store with persistence, sticky bottom cart, slide-in drawer
- **Product catalog**: Expanded to 100+ realistic products across 12 categories
- **Curated collections**: Bestsellers, Chai Essentials, Healthy Snacks, Quick Breakfast, Under ₹99, Protein Picks
- **Local AI engine**: Intent parser handles recipes (chai, paneer butter masala, dal, breakfast, sandwich, pasta), category navigation, budget filters, fuzzy search
- **Non-blocking AI UI**: Bottom sheet (not fullscreen overlay) that doesn't block shopping
- **Voice**: Browser Web Speech API primary (free), Whisper fallback, browser TTS for AI responses
- **Complete commerce flow**: Checkout page → place order → order success page
- **Premium UI polish**: Animations, ring-pulse highlights, AI Pick badges, premium cards
- **Mobile-first**: Proper safe areas, sticky cart at bottom, AI mic positioned away from Emergent badge

## Testing Status
- Backend: 100% (8/8 pytest passing)
- Frontend: 95% (all flows working - landing, dashboard, search, cart, checkout, order)

## Core Requirements (Static)
1. Speak naturally to shop
2. AI must visibly manipulate cart/UI (not just respond)
3. Blinkit-style compact dense grid
4. Yellow + black + white color palette
5. Mobile-first responsive
6. Fast 60fps interactions

## User Personas
1. **Bharat shopper**: Uses Hindi/Hinglish, wants quick essentials
2. **Recipe planner**: Says "Mujhe X banani hai", expects ingredients added
3. **Budget-conscious**: Says "healthy snacks under ₹300"
4. **Accessibility-first**: Voice-only navigation needed

## Prioritized Backlog
### P0 (Done)
- ✅ Complete commerce flow
- ✅ Cart with persistence
- ✅ AI text + voice input
- ✅ Recipe-to-products mapping
- ✅ Checkout & order placement

### P1 (Future enhancements)
- Order history page
- User profile/saved addresses
- Wishlist/favorites
- Multilingual TTS voices (Hindi/Tamil)
- Reorder previous orders via voice

### P2 (Nice to have)
- Live order tracking map
- Push notifications
- Referral system
- Analytics dashboard (concept page)
- Stripe payment integration

## Key Files
- `/app/backend/server.py` - 4 endpoints (chat, voice, order)
- `/app/frontend/src/data/products.js` - 100+ products + collections
- `/app/frontend/src/store/cartStore.js` - Zustand cart + AI state
- `/app/frontend/src/lib/aiEngine.js` - Local AI intent parser
- `/app/frontend/src/components/ai/AIAssistant.jsx` - AI mic + bottom sheet
- `/app/frontend/src/components/grocery/CartDrawer.jsx` - Slide-in cart
- `/app/frontend/src/pages/CheckoutPage.jsx` - Complete checkout

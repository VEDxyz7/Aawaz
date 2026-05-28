# Overview

AAWAZ is an AI-powered voice-first commerce platform designed to transform online shopping through natural conversational interactions.

Instead of navigating complex menus and search filters, users can interact naturally using voice to discover products, compare items, place orders, and receive personalized recommendations in real time.

AAWAZ combines:

- AI Voice Assistant
- Smart Commerce Experience
- Conversational Product Discovery
- Real-Time Shopping Workflow
- Modern Blinkit-inspired UI/UX
- Fast and Responsive Frontend

The platform aims to make digital shopping:

- More intuitive  
- More accessible  
- Faster  
- More human-like  

---

# Features

## Voice-First Shopping

- Natural language voice interaction
- Real-time speech recognition
- Conversational product search
- AI-powered shopping assistant

## AI-Powered Recommendations

- Personalized product suggestions
- Smart search understanding
- Context-aware recommendations
- Dynamic conversational flow

## Modern Commerce Experience

- Product browsing
- Product cards with images
- Shopping cart system
- Checkout flow
- Order management interface

## Premium UI/UX

- Blinkit-inspired clean interface
- Smooth animations
- Mobile responsive design
- Modern gradients and glassmorphism
- Fast-loading pages

## Smart Search

- Semantic product discovery
- Voice-based filtering
- AI-assisted recommendations
- Instant search results

## How the Voice AI Assistant Works

1. **Activation** — A floating mic button sits fixed at the bottom-right of every page. Tapping it opens a glassmorphic overlay and starts listening.
2. **Listening State** — Animated waveform bars pulse in real time to indicate the assistant is active.
3. **Intent Parsing** — Spoken input is processed to extract user intent (search, navigate, add to cart, remove item, etc.).
4. **UI Navigation** — The assistant auto-scrolls to the relevant product category or section without any manual input.
5. **Product Highlighting** — Target products receive an animated glowing yellow ring (`ring-2 ring-[#F8CB46] animate-pulse`), drawing the user's eye to exactly what was requested.
6. **Cart Actions** — Items are added or removed programmatically based on the voice command.
7. **Confirmation** — The assistant responds conversationally to confirm the action, then dismisses the overlay.

The AI layer is intentionally non-obstructive — it never permanently covers the grocery interface, appearing as a side-panel or floating overlay only while active.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Tailwind CSS, Framer Motion, Shadcn/ui, Lucide React |
| Backend | Node.js |
| Utilities | Python |
| Fonts | Outfit (headings), Figtree (body) |
| Package Manager | Yarn |

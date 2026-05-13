# 🌊 AquaNova | AI-Powered Luxury Voyage Planner

Architected by **Shounak Mandal**, AquaNova is a next-generation travel orchestration platform designed for high-end, sustainable maritime and land expeditions.

![AquaNova Hero](/catamaran.png)

## ✨ Features

- **AI Voyage Orchestration**: Tailored itineraries generated using advanced LLMs (OpenRouter/Gemini).
- **Premium Cinematic UI**: A high-end, dark-themed experience featuring scroll-driven animations and glassmorphism.
- **3D Interaction Deck**: Interactive expedition cards with real-time 3D tilt and "Grab to Scroll" mechanics.
- **Global Signal Hotkeys**: Instant navigation using `Shift + N` (New), `Shift + M` (Manifest), `Shift + H` (Home), and `Shift + S` (Support).
- **Real-time Manifest**: Persistent trip storage and synchronization powered by **Convex**.
- **Secure Authentication**: Mission-critical user security handled by **Clerk**.
- **Export to PDF**: Generate professional, high-contrast travel manifests for offline use.

## 🛠 Tech Stack

- **Frontend**: Next.js 15, Tailwind CSS, Framer Motion.
- **Backend**: Convex (Real-time Database & Mutations).
- **Auth**: Clerk.
- **AI**: OpenRouter (AI Model Orchestration).
- **UI Components**: custom-built shadcn/ui and Magic UI enhancements.

## 🚀 Getting Started

### Prerequisites

You will need the following environment variables in your `.env.local`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_CONVEX_URL=

OPENROUTER_API_KEY=
```

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. In a separate terminal, start the Convex dev server:
   ```bash
   npx convex dev
   ```

## 🚢 Deployment

### Vercel

1. Push your code to a GitHub repository.
2. Connect the repository to [Vercel](https://vercel.com).
3. Add your environment variables in the Vercel project settings.
4. For Convex, ensure you add the `CONVEX_DEPLOY_KEY` to Vercel (found in your Convex dashboard).

---

Architected with passion by **Shounak Mandal**.

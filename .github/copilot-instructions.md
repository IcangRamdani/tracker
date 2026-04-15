# Airdrop Tracker - Project Instructions

## Project Overview
Professional, full-featured Airdrop Tracker web application with AI integration, semi-automation, and advanced analytics. Designed for serious personal airdrop farming and multi-wallet management.

## Technology Stack
- **Frontend**: Next.js 14+ with App Router
- **UI**: Tailwind CSS + ShadCN UI Components
- **State Management**: Zustand
- **Backend**: Firebase (Auth, Firestore)
- **AI**: OpenRouter API (with fallback rule-based system)
- **Deployment**: Vercel

## Key Features Implemented
1. **Authentication** - Firebase Email/Google Auth with persistent sessions
2. **Dashboard** - Real-time summary with stats and activity logs
3. **Airdrop Management** - Complete CRUD with advanced filtering
4. **Task System** - Checklist management per airdrop
5. **Multi-Wallet Support** - Manage wallets across multiple chains
6. **Activity Logging** - Track user actions (swap, bridge, stake, mint, etc.)
7. **AI Panel** - Airdrop analysis, scoring, and recommendations
8. **Analytics** - Performance metrics, profit tracking, completion rates
9. **Settings** - Account management and preferences

## Development Setup

### Environment Variables (.env.local)
```bash
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# OpenRouter (optional, for AI features)
NEXT_PUBLIC_OPENROUTER_API_KEY=your_key
```

### Installation
```bash
npm install
```

### Running Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in browser.

## Project Structure
```
src/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout
│   ├── ClientLayout.tsx      # Client-side layout wrapper
│   ├── page.tsx             # Homepage
│   ├── auth/                # Auth pages (login, signup)
│   ├── dashboard/           # Dashboard page
│   ├── airdrops/            # Airdrop management
│   ├── wallets/             # Wallet management
│   ├── ai/                  # AI Panel
│   ├── analytics/           # Analytics page
│   ├── activity/            # Activity log
│   └── settings/            # Settings page
├── components/              # Reusable components
│   ├── ui/                 # ShadCN UI components
│   ├── Sidebar.tsx         # Navigation sidebar
│   └── AirdropModal.tsx    # Airdrop form modal
├── store/                   # Zustand stores
│   ├── authStore.ts        # Auth state
│   ├── airdropStore.ts     # Airdrop state
│   ├── taskStore.ts        # Task state
│   ├── walletStore.ts      # Wallet state
│   ├── claimStore.ts       # Claim state
│   ├── activityLogStore.ts # Activity logs state
│   └── aiStore.ts          # AI state
└── lib/
    ├── firebase.ts          # Firebase config
    └── utils.ts            # Utility functions
```

## Firestore Database Schema
```
users/
├── uid
├── email 
├── metadata

airdrops/
├── id
├── userId
├── name
├── category
├── status
├── priority
├── rewardEstimate
├── deadline
├── sourceLink
├── tags[]
├── notes
├── walletAddress
├── createdAt

tasks/
├── id
├── airdropId
├── title
├── link
├── completed
├── order

wallets/
├── id
├── userId
├── address
├── network
├── label
├── createdAt

claims/
├── id
├── airdropId
├── status
├── token
├── amount
├── valueUSD
├── claimDate

activity_logs/
├── id
├── userId
├── airdropId
├── action
├── description
├── createdAt
```

## UI/UX Guidelines
- **Dark Mode**: Always enabled (dark theme optimized)
- **Color Scheme**: Blue/Cyan accent with slate grayscale
- **Mobile**: Fully responsive (mobile-first design)
- **Performance**: Lazy-loaded components, debounced inputs

## Security Considerations
- Firebase Auth for backend authentication
- User data isolation via userId in all queries
- No private keys stored (wallet addresses only)
- Secure HTTPS deployment required

## Next Steps / Enhancement Ideas
1. **Blockchain Integration** - Read wallet balances, claim tokens
2. **API Integration** - Fetch airdrop data from Galxe, Zealy APIs
3. **Task Automation** - Auto-open links, browser automation (safe)
4. **Advanced AI** - Better NLP for description analysis
5. **Export/Import** - JSON backup and restore functionality
6. **Notifications** - Browser notifications for deadlines
7. **PWA** - Installable app, offline mode
8. **Database Migrations** - Firestore index optimization

## Deployment (Vercel)
1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

## Support & Documentation
For issues or questions, refer to:
- Next.js Docs: https://nextjs.org/docs
- Firebase Docs: https://firebase.google.com/docs
- Tailwind CSS: https://tailwindcss.com/docs

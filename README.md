# Airdrop Tracker - Professional Web3 Farming Tool

A modern, full-featured web application for managing cryptocurrency airdrops, tracking multi-wallet portfolios, and analyzing opportunities with AI-powered insights.

## 🚀 Features

### Core Features
- **Airdrop Management** - Complete CRUD with filtering by status, priority, category, and deadline
- **Multi-Wallet Support** - Organize wallets across Ethereum, Polygon, Arbitrum, Optimism, Solana, Base, and more
- **Task System** - Checklist per airdrop with drag-and-drop reordering
- **Claim Tracking** - Monitor claim status, tokens received, and USD values
- **Activity Logging** - Track actions (swap, bridge, stake, mint, quest, claim) with timestamps
- **AI Panel** - Analyze airdrops and get scoring with AI-powered insights
- **Advanced Analytics** - Profit tracking, completion rates, best categories, and wallet performance
- **Authentication** - Firebase Email/Google Auth with persistent sessions
- **Settings** - Profile management, password updates, preferences

### Additional Features
- Dark mode by default with professional SaaS design
- Responsive mobile-first design
- Real-time dashboard with key metrics
- Filter and search across all features
- Secure wallet address management (no private keys stored)

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **UI**: Tailwind CSS + ShadCN UI Components
- **State Management**: Zustand
- **Backend**: Firebase (Authentication, Firestore)
- **AI**: OpenRouter API (with fallback system)
- **Utilities**: Lucide Icons, UUID, DnD Kit
- **Deployment**: Vercel-ready

## 📦 Installation

### Prerequisites
- Node.js 16+ (tested on 18+)
- npm or yarn
- Firebase project

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Enable Email/Password and Google authentication
   - Create a Firestore database
   - Get your credentials from Project Settings

4. **Create `.env.local`**
   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_key  # Optional
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                          # Next.js pages
│   ├── auth/(login|signup)       # Authentication pages
│   ├── dashboard/                # Main dashboard
│   ├── airdrops/                 # Airdrop management CRUD
│   ├── wallets/                  # Multi-wallet management
│   ├── ai/                       # AI analysis panel
│   ├── analytics/                # Analytics & metrics
│   ├── activity/                 # Activity logging
│   ├── settings/                 # User settings
│   ├── layout.tsx               # Root layout
│   ├── ClientLayout.tsx         # Client wrapper
│   └── page.tsx                 # Homepage
├── components/
│   ├── ui/                       # Reusable UI components
│   ├── Sidebar.tsx              # Navigation sidebar
│   └── AirdropModal.tsx         # Airdrop form modal
├── store/                        # Zustand state management
│   ├── authStore.ts             # Auth state
│   ├── airdropStore.ts          # Airdrops state
│   ├── taskStore.ts             # Tasks state
│   ├── walletStore.ts           # Wallets state
│   ├── claimStore.ts            # Claims state
│   ├── activityLogStore.ts      # Activity logs state
│   └── aiStore.ts               # AI results state
└── lib/
    ├── firebase.ts              # Firebase configuration
    └── utils.ts                 # Utility functions
```

## 📊 Database Schema (Firestore)

### Collections

- **airdrops** - Airdrop opportunities
  - id, userId, name, category, status, priority, rewardEstimate, deadline, sourceLink, tags, notes, walletAddress, createdAt

- **tasks** - Checklists per airdrop
  - id, airdropId, title, completed, link, order

- **wallets** - Multi-chain wallet addresses
  - id, userId, address, network, label, createdAt

- **claims** - Claim information and tracking
  - id, airdropId, status, token, amount, valueUSD, claimDate, createdAt

- **activity_logs** - User actions
  - id, userId, airdropId, action, description, createdAt

## 🎨 UI/UX Guidelines

- **Theme**: Dark mode (slate-950, slate-900, slate-800 palette)
- **Accent Colors**: Blue (#3b82f6) and Cyan (#06b6d4)
- **Responsive**: Mobile-first design, works on all screen sizes
- **Components**: Reusable ShadCN UI components styled with Tailwind

## 🔐 Security

- ✅ Firebase Auth for secure authentication
- ✅ User data isolation via userId in all queries
- ✅ No private keys stored (addresses only)
- ✅ No sensitive data in environment variables
- ✅ HTTPS required for production

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Connect your GitHub repository
4. Add environment variables in Vercel settings
5. Deploy automatically on push

### Manual Deployment

```bash
# Build production version
npm run build

# Start production server
npm start
```

## 🤖 AI Integration

The AI panel currently uses mock AI responses. To enable real AI:

1. Get an OpenRouter API key from [openrouter.ai](https://openrouter.ai)
2. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_OPENROUTER_API_KEY=your_key
   ```
3. Implement actual API calls in `/src/app/ai/page.tsx`

Example AI models:
- `meta-llama/llama-2-70b-chat`
- `mistral/mistral-7b-instruct`
- `openai/gpt-3.5-turbo`

## 📈 Future Enhancements

- [ ] Blockchain integration (read wallet balances, auto-claim)
- [ ] Galxe/Zealy API integration for airdrop feeds
- [ ] Task automation with browser extensions
- [ ] Advanced NLP analysis
- [ ] JSON export/import functionality
- [ ] Browser notifications for deadlines
- [ ] PWA with offline mode
- [ ] Firestore index optimization

## 🐛 Troubleshooting

### Firebase Connection Issues
- Verify Firebase config in `.env.local`
- Check Firebase project is active and Firestore is enabled
- Ensure authentication methods are enabled

### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [ShadCN UI](https://ui.shadcn.com)

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ for serious crypto farmers**


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

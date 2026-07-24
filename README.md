# Funderly

Zero-fee, direct-support platform for creators, artists, developers, and makers to get funded directly by their communities — no platform cut, no sign-up for supporters, just a link and a payment.

## 🎬 Live Preview

🔗 **[Check it live](https://funderly.vercel.app/)** — running in Safepay sandbox mode, so payments won't be charged for real.

Use this dummy card to test the support flow end-to-end:

- **Card Number (16 digits):** 5200 0000 0000 1096
- **Expiry Date:** 03/28
- **CVC:** 111
- **First Name:** Ayan
- **Last Name:** Arbab
- **Country:** Pakistan
- **Street Address:** Building 3, Apartment 5, 10th Commercial Lane, Zamzama
- **City:** Karachi
- **Contact Number (12 characters):** +92300123456

## ✨ Features

- **0% platform fee** — creators keep everything, minus payment processor costs
- **No login for supporters** — send support in under 10 seconds
- **Vanity URLs** — `funderly.vercel.app/yourname`
- **Direct payouts** — funds go straight to the creator's own Safepay merchant account
- **Creator dashboard** — earnings, supporter activity, profile, payment & social settings
- **Public profile pages** — bio, socials, support panel, live supporter wall
- **Discovery page** — search and infinite scroll through creators

## 🛠️ Tech Stack

- **Framework** — [Next.js 16](https://nextjs.org/) (App Router)
- **UI** — [React 19](https://react.dev/)
- **Styling** — [Tailwind CSS v4](https://tailwindcss.com/)
- **Database** — [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Auth** — [Auth.js](https://authjs.dev/) v5 (GitHub, Google, Facebook)
- **Payments** — [Safepay](https://getsafepay.pk/) (`@sfpy/node-core`)
- **Media** — [Cloudinary](https://cloudinary.com/) (signed uploads)
- **Validation** — [Zod](https://zod.dev/)
- **HTTP client** — [Axios](https://axios-http.com/)

No icon library — all icons are inline SVGs to keep the bundle lean.

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- MongoDB instance ([Atlas](https://www.mongodb.com/atlas) or local)
- [Safepay](https://getsafepay.pk/) merchant account (sandbox keys for dev)
- [Cloudinary](https://cloudinary.com/) account
- OAuth apps: [GitHub](https://github.com/settings/developers), [Google](https://console.cloud.google.com/), [Facebook](https://developers.facebook.com/)

### Installation

**1. Clone the repo**

```bash
git clone https://github.com/ayanattaarbab/funderly.git
cd funderly
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

```bash
cp .env.example .env.local
```

Then open `.env.local` and fill in your database URI, NextAuth secrets, OAuth credentials, and Cloudinary config. (Safepay keys aren't set here — each creator adds their own through the dashboard.)

**4. Run the dev server**

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 📁 Project Structure

```
funderly/
├── app/                 # Routes, pages, and API handlers (App Router)
│   ├── [username]/      # Public creator profile
│   ├── create/          # Registration wizard
│   ├── dashboard/       # Creator dashboard
│   ├── explore/         # Creator discovery
│   └── api/             # REST endpoints (auth, creator, checkout, verify, webhook...)
├── components/          # Homepage, Create, Dashboard, Explore, Page
├── lib/                 # MongoDB connection, Safepay client
└── models/              # Creator, SupportOrder (Mongoose schemas)
```

## 🔌 API Overview

- `GET/POST/DELETE /api/creator` — manage the current user's creator profile
- `GET /api/creators` — list creators (paginated, searchable)
- `GET /api/check-username` — check username availability
- `POST /api/checkout` — create a Safepay checkout session
- `GET/POST /api/verify` — verify a Safepay payment callback
- `POST /api/payments/webhook` — Safepay webhook (signature-verified)
- `POST /api/upload/sign` — signed Cloudinary upload credentials

## 🤝 Contributing

Contributions are welcome, whether it's a bug fix, a new feature, or a docs improvement.

1. Fork the repo and create a branch: `git checkout -b feature/your-feature`
2. Make your changes, keeping to the existing code style
3. Test payment flows against Safepay's sandbox before submitting
4. Commit, push, and open a pull request with a clear description of what changed and why

🐛 **Found a bug?** Open an [issue](https://github.com/ayanattaarbab/funderly/issues) with steps to reproduce it — screenshots or a short clip help a lot.

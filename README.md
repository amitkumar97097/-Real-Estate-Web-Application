# Real Estate App (Full Stack)

Monorepo with **backend** (Node.js + Express + MongoDB + JWT) and **frontend** (Next.js + Tailwind). Cloudinary upload + Stripe placeholder included. Socket.io scaffold for chat.

## Structure
```
real-estate-app/
│── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
│── frontend/
│   ├── pages/
│   ├── components/
│   ├── utils/
│   ├── styles/
│   ├── public/
│   ├── package.json
│   ├── next.config.js
│   └── tailwind.config.js
└── README.md
```

## Quick Start
```bash
# 1) Backend
cd backend
cp .env.example .env # fill values
npm i
npm run dev

# 2) Frontend
cd ../frontend
npm i
npm run dev
```

---

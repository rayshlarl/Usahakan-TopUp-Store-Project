# Usahakan

Platform Manajemen Usaha

## Struktur Project

```
usahakan/
├── frontend/               # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── api/            # API client functions
│   │   │   └── sales.js
│   │   ├── components/     # Reusable components
│   │   │   └── Dashboard.jsx
│   │   ├── pages/          # Page components
│   │   │   └── Home.jsx
│   │   ├── styles/         # CSS files
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
├── backend/                # Express + Bun backend
│   ├── src/
│   │   ├── routes/
│   │   │   └── sales.js
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── bun.lockb
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ atau Bun
- npm atau bun

### Backend Setup

```bash
cd backend
bun install
bun run dev
```

Server akan berjalan di `http://localhost:3000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend akan berjalan di `http://localhost:5173`

## API Endpoints

### Sales

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/sales | Get all sales |
| GET | /api/sales/:id | Get sale by ID |
| POST | /api/sales | Create new sale |
| PUT | /api/sales/:id | Update sale |
| DELETE | /api/sales/:id | Delete sale |

## License

MIT

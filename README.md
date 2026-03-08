# FinTrack - Personal Finance Management System

A full-stack SaaS web application for personal finance management built with React, TypeScript, Node.js, and SQLite.

## Features

- **Authentication**: Secure JWT-based authentication with register/login/logout
- **Dashboard**: Financial overview with income/expense summaries and charts
- **Transaction Management**: Add, edit, delete transactions with categories
- **Data Visualization**: Pie chart for expense categories, bar chart for monthly comparison
- **Responsive Design**: Mobile-first design that works on all devices

## Tech Stack

### Frontend
- React 18 + TypeScript + Vite
- Tailwind CSS
- React Router v6
- Recharts (data visualization)

### Backend
- Node.js + Express.js
- SQLite (better-sqlite3)
- JWT Authentication
 bcryptjs (password hashing)

## Getting Started

### Prerequisites

Node.js 18+ installed on your machine.

### Installation

1. Clone the repository:
```bashcd FinTrack```

2. Install server dependencies:```bashcd servernpm install```

3. Install client dependencies:```bashcd ../clientnpm install```

4. Start the backend server:```bashcd servers npm start```
The server will run on http://localhost:5000 and automatically create the database.

5. In a new terminal, start the frontend development server:
```bashcd clientnpm run dev```
The app will open at http://localhost:5173


## Project Structure```
FinTrack/
├── client/                 # React frontend   ├── src/
   │   ├── components/      # UI components   │   ├── layout/       # Sidebar, Navbar│   │   ├── ui/          # Button, Card, Input,
Modal│   │   ├── charts/     # PieChart,
BarChart│   └── transactions/# TransactionList,
Form│   
pages/
        │                   # Login,
Register,Dashboard    │
context/
        AuthContext.tsx     #
Auth state    services/
        api.ts              #
API service    
types/index.ts             #
TypeScript types  
server/                    # Express backend  
controllers/
routes/middleware/models/utils/database setup└── SPEC.md                  #
Project specification```

## API Endpoints### Auth Routes| Method | Endpoint | Description ||--------|----------|-------------|
POST | /api/auth/register | Register new user |
POST | /api/auth/login | User login |
GET | /api/auth/me Get current user |

### Transaction Routes| Method Endpoint Description||-----|------|-----------|
GET /api/transactions Get all transactions POST/api/transactions Create transaction PUT/api/transactions/:id Update transaction DELETE/api/transactions/:id Delete transaction GET/api/transactions/summary Get financial summary GET/api/transactions/categories Get category breakdown GET/api/transactions/monthly Get monthly data |

## Environment VariablesServer (.env):```
PORT=5000JWT_SECRET=your-secret-keyDATABASE_URL=./fintrack.db```

Client uses Vite's proxy to forward API requests to the backend.

## LicenseMIT

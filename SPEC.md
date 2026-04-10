# FinTrack - Personal Finance Management System Specification

## 1. Project Overview

**Project Name:** FinTrack  
**Project Type:** Full-Stack SaaS Web Application  
**Core Functionality:** Personal finance management system with secure authentication, transaction tracking, financial summaries, and interactive charts  
**Target Users:** Individuals seeking to track personal income, expenses, and financial health

---

## 2. Tech Stack

### Frontend
- React 18 + TypeScript + Vite
- Tailwind CSS
- React Router v6
- Recharts (data visualization)
- React Hot Toast (notifications)

### Backend
- Node.js + Express
- REST API
- SQLite (better-sqlite3) for database
- JWT for authentication
- bcryptjs for password hashing

---

## 3. UI/UX Specification

### Color Palette
| Role | Color | Hex Code |
|------|-------|----------|
| Primary | Indigo | #4f46e5 |
| Primary Hover | Indigo Dark | #4338ca |
| Accent | Emerald | #10b981 |
| Danger | Red | #ef4444 |
| Background | Gray 50 | #f9fafb |
| Card Background | White | #ffffff |
| Text Primary | Gray 900 | #111827 |
| Text Secondary | Gray 500 | #6b7280 |
| Border | Gray 200 | #e5e7eb |
| Success | Green | #22c55e |

### Typography
- **Font Family:** Inter (Google Fonts), system-ui fallback
- **Headings:** 
  - H1: 32px, font-weight 700
  - H2: 24px, font-weight 600
  - H3: 18px, font-weight 600
- **Body:** 14px, font-weight 400
- **Small:** 12px, font-weight 400

### Spacing System
- Base unit: 4px
- Common spacings: 4, 8, 12, 16, 20, 24, 32, 48px

### Layout Structure
- **Sidebar:** 240px fixed width on desktop, collapsible on mobile
- **Main Content:** Fluid width with max-width 1400px
- **Cards:** Border radius 12px, shadow-sm
- **Responsive Breakpoints:**
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

### Visual Effects
- Card shadows: 0 1px 3px rgba(0,0,0,0.1)
- Hover transitions: 150ms ease-in-out
- Button hover: darken 10%
- Focus rings: 2px indigo offset

---

## 4. Page Specifications

### 4.1 Authentication Pages

#### Login Page
- Centered card layout (max-width 400px)
- Logo + tagline at top
- Email input field
- Password input field
- "Remember me" checkbox
- Login button (primary)
- Link to register page
- Form validation with error messages

#### Register Page
- Centered card layout (max-width 400px)
- Logo + tagline at top
- Name input field
- Email input field
- Password input field
- Confirm password input field
- Register button (primary)
- Link to login page
- Form validation

### 4.2 Dashboard Page

#### Summary Cards (Grid Layout - 4 columns on desktop, 2 on tablet, 1 on mobile)
1. **Total Income Card**
   - Green icon (arrow up)
   - Label: "Total Income"
   - Amount in currency format
   - Subtle green accent border

2. **Total Expenses Card**
   - Red icon (arrow down)
   - Label: "Total Expenses"
   - Amount in currency format
   - Subtle red accent border

3. **Current Balance Card**
   - Indigo icon (wallet)
   - Label: "Current Balance"
   - Amount in currency format
   - Subtle indigo accent border

4. **This Month Card**
   - Calendar icon
   - Label: "This Month"
   - Net amount (income - expenses)
   - Green if positive, red if negative

#### Charts Section
- **Pie Chart:** Expense categories distribution
  - Categories: Food, Transport, Bills, Shopping, Entertainment, Health, Other
  - Legend with category colors
  - Tooltip on hover
  
- **Bar Chart:** Monthly income vs expenses
  - Last 6 months
  - Grouped bars (income green, expense red)
  - X-axis: month names
  - Y-axis: amount

### 4.3 Transactions Page

#### Transaction List
- Table or card-based list view
- Columns: Date, Description, Category, Amount, Type, Actions
- Color-coded amounts (green income, red expense)
- Action buttons: Edit, Delete
- Pagination (10 items per page)

#### Add/Edit Transaction Modal
- Form fields:
  - Type: Radio buttons (Income/Expense)
  - Amount: Number input
  - Category: Select dropdown
  - Date: Date picker
  - Description: Text input (optional)
- Save and Cancel buttons

### 4.4 Layout Components

#### Sidebar Navigation
- Logo at top
- Navigation items:
  - Dashboard (home icon)
  - Transactions (list icon)
  - Settings (gear icon) - optional
- User profile section at bottom
- Logout button
- Active state highlight

#### Navbar (Mobile)
- Hamburger menu toggle
- App title
- User avatar dropdown

---

## 5. Functionality Specification

### 5.1 Authentication System

#### Registration
- Input: name, email, password, confirmPassword
- Validation:
  - Name: required, min 2 chars
  - Email: required, valid format, unique
  - Password: required, min 6 chars
  - ConfirmPassword: must match
- Hash password with bcrypt (10 rounds)
- Store user in database
- Return JWT token on success

#### Login
- Input: email, password
- Validate credentials
- Return JWT token (24h expiry)
- Store token in localStorage

#### Protected Routes
- Check JWT token validity
- Redirect to login if invalid
- Attach token to API requests

### 5.2 Transaction Management

#### Transaction Model
```
typescript
interface Transaction {
  id: string;
  userId: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string; // ISO date
  description?: string;
  createdAt: string;
  updatedAt: string;
}
```

#### Categories
- **Expense:** Food, Transport, Bills, Shopping, Entertainment, Health, Other
- **Income:** Salary, Freelance, Investment, Other

#### CRUD Operations
- Create: Add new transaction
- Read: List all user transactions (paginated)
- Update: Edit existing transaction
- Delete: Remove transaction (soft delete optional)

### 5.3 Financial Calculations

#### Dashboard Calculations
- Total Income: Sum of all income transactions
- Total Expenses: Sum of all expense transactions
- Current Balance: Total Income - Total Expenses
- Monthly Summary: Filter by current month

#### Chart Data
- Pie Chart: Group expenses by category
- Bar Chart: Group by month (last 6 months)

---

## 6. API Endpoints

### Auth Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | User login | No |
| GET | /api/auth/me | Get current user | Yes |

### Transaction Routes
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /api/transactions | Get all transactions | Yes |
| POST | /api/transactions | Create transaction | Yes |
| PUT | /api/transactions/:id | Update transaction | Yes |
| DELETE | /api/transactions/:id | Delete transaction | Yes |

---

## 7. Security Requirements

- JWT tokens with expiration
- Password hashing (bcrypt)
- Protected API routes (middleware)
- User data isolation (users see only their data)
- Input validation and sanitization
- CORS configuration

---

## 8. Project Structure

```
FinTrack/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Navbar.tsx
│   │   │   ├── ui/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── Select.tsx
│   │   │   ├── charts/
│   │   │   │   ├── ExpensePieChart.tsx
│   │   │   │   └── MonthlyBarChart.tsx
│   │   │   └── transactions/
│   │   │       ├── TransactionList.tsx
│   │   │       ├── TransactionForm.tsx
│   │   │       └── TransactionItem.tsx
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Register.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── Dashboard.tsx
│   │   │   └── transactions/
│   │   │       └── TransactionsPage.tsx
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/                    # Express backend
│   ├── controllers/
│   │   ├── authController.ts
│   │   └── transactionController.ts
│   ├── middleware/
│   │   └── authMiddleware.ts
│   ├── models/
│   │   ├── userModel.ts
│   │   └── transactionModel.ts
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   └── transactionRoutes.ts
│   ├── utils/
│   │   └── db.ts
│   ├── package.json
│   └── server.js
│
├── SPEC.md
└── README.md
```

---

## 9. Acceptance Criteria

### Authentication
- [ ] User can register with valid credentials
- [ ] User can login with correct email/password
- [ ] Invalid credentials show error message
- [ ] JWT token persists across page refreshes
- [ ] Logout clears token and redirects to login

### Dashboard
- [ ] Summary cards show correct totals
- [ ] Pie chart displays expense categories
- [ ] Bar chart shows monthly comparison
- [ ] Data updates after transaction changes

### Transactions
- [ ] User can add new transaction
- [ ] User can edit existing transaction
- [ ] User can delete transaction
- [ ] Transaction list shows all user transactions
- [ ] Amounts display with correct formatting

### UI/UX
- [ ] Responsive on mobile, tablet, desktop
- [ ] Smooth hover transitions
- [ ] Loading states displayed
- [ ] Error states handled gracefully
- [ ] Toast notifications for actions

### Performance
- [ ] No console errors
- [ ] Fast page loads
- [ ] Smooth chart animations

---

## 10. Database Schema

### Users Table
```
sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Transactions Table
```
sql
CREATE TABLE transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
  amount REAL NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

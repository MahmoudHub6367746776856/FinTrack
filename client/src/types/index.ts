export interface User {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
}

export interface Transaction {
  id: number;
  userId: number;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TransactionFormData {
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  description?: string;
}

export interface TransactionResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  totalPages: number;
}

export interface Summary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export interface MonthlyData {
  month: string;
  type: string;
  total: number;
}

export interface CategoryData {
  category: string;
  total: number;
}

export interface DashboardData {
  summary: Summary;
  monthlySummary: MonthlyData[];
  categoryBreakdown: CategoryData[];
  currentMonth: {
    income: number;
    expenses: number;
    balance: number;
  };
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'Bills',
  'Shopping',
  'Entertainment',
  'Health',
  'Other',
] as const;

export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment',
  'Other',
] as const;

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];
export type IncomeCategory = typeof INCOME_CATEGORIES[number];

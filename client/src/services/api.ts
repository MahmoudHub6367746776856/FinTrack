import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  Transaction,
  TransactionFormData,
  TransactionResponse,
  CategoryData,
  MonthlyData,
} from '../types';

const API_URL = '/api';

interface SummaryResponse {
  summary: {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
  };
  currentMonth: {
    income: number;
    expenses: number;
    balance: number;
  };
  categoryBreakdown: CategoryData[];
  monthlySummary: MonthlyData[];
}

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const data = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    this.setToken(data.token);
    return data;
  }

  async register(userData: RegisterData): Promise<AuthResponse> {
    const data = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    this.setToken(data.token);
    return data;
  }

  async getMe(): Promise<{ user: { id: number; name: string; email: string } }> {
    return this.request('/auth/me');
  }

  logout() {
    this.setToken(null);
  }

  async getTransactions(page = 1, limit = 10): Promise<TransactionResponse> {
    return this.request<TransactionResponse>(
      `/transactions?page=${page}&limit=${limit}`
    );
  }

  async createTransaction(
    transaction: TransactionFormData
  ): Promise<{ message: string; transaction: Transaction }> {
    return this.request('/transactions', {
      method: 'POST',
      body: JSON.stringify(transaction),
    });
  }

  async updateTransaction(
    id: number,
    transaction: TransactionFormData
  ): Promise<{ message: string; transaction: Transaction }> {
    return this.request(`/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(transaction),
    });
  }

  async deleteTransaction(id: number): Promise<{ message: string }> {
    return this.request(`/transactions/${id}`, {
      method: 'DELETE',
    });
  }

  async getSummary(): Promise<SummaryResponse> {
    return this.request<SummaryResponse>('/transactions/summary');
  }

  async getCategoryBreakdown(): Promise<CategoryData[]> {
    const res = await this.request<SummaryResponse>('/transactions/summary');
    return res.categoryBreakdown || [];
  }

  async getMonthlySummary(): Promise<MonthlyData[]> {
    const res = await this.request<SummaryResponse>('/transactions/summary');
    return res.monthlySummary || [];
  }
}

export const api = new ApiService();

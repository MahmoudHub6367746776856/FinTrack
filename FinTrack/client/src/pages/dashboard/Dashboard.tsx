import React, { useEffect, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { ExpensePieChart } from '../../components/charts/ExpensePieChart';
import { MonthlyBarChart } from '../../components/charts/MonthlyBarChart';
import { api } from '../../services/api';
import { CategoryData, MonthlyData, Transaction } from '../../types';

export function Dashboard() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    monthIncome: 0,
    monthExpenses: 0,
    monthBalance: 0,
  });
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [summaryData, transactionsRes] = await Promise.all([
        api.getSummary(),
        api.getTransactions(1, 5),
      ]);

      // Handle the summary response structure from backend
      const summaryRes = summaryData.summary || summaryData;
      const currentMonth = summaryData.currentMonth || { income: 0, expenses: 0, balance: 0 };

      setSummary({
        totalIncome: summaryRes.totalIncome || 0,
        totalExpenses: summaryRes.totalExpenses || 0,
        balance: summaryRes.balance || 0,
        monthIncome: currentMonth.income || 0,
        monthExpenses: currentMonth.expenses || 0,
        monthBalance: currentMonth.balance || 0,
      });
      
      // Get category breakdown and monthly summary
      const categoryRes = await api.getCategoryBreakdown();
      const monthlyRes = await api.getMonthlySummary();
      
      setCategoryData(Array.isArray(categoryRes) ? categoryRes : []);
      setMonthlyData(Array.isArray(monthlyRes) ? monthlyRes : []);
      setRecentTransactions(transactionsRes.transactions || []);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary">Welcome back! Here's your financial overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 border-l-4 border-l-accent">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Income</p>
              <p className="text-2xl font-bold text-accent mt-1">{formatCurrency(summary.totalIncome)}</p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-danger">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Total Expenses</p>
              <p className="text-2xl font-bold text-danger mt-1">{formatCurrency(summary.totalExpenses)}</p>
            </div>
            <div className="w-12 h-12 bg-danger/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Current Balance</p>
              <p className="text-2xl font-bold text-primary mt-1">{formatCurrency(summary.balance)}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-warning">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">This Month</p>
              <p className={`text-2xl font-bold mt-1 ${summary.monthBalance >= 0 ? 'text-accent' : 'text-danger'}`}>
                {formatCurrency(summary.monthBalance)}
              </p>
            </div>
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Expense Distribution</h2>
          <ExpensePieChart data={categoryData} />
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Monthly Overview</h2>
          <MonthlyBarChart data={monthlyData} />
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Transactions</h2>
        {recentTransactions.length === 0 ? (
          <p className="text-text-secondary text-center py-8">No transactions yet. Add your first transaction to get started!</p>
        ) : (
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'income' ? 'bg-accent/10' : 'bg-danger/10'
                  }`}>
                    <span className={`text-lg ${transaction.type === 'income' ? 'text-accent' : 'text-danger'}`}>
                      {transaction.type === 'income' ? '+' : '-'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{transaction.description || transaction.category}</p>
                    <p className="text-sm text-text-secondary">{new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`font-medium ${transaction.type === 'income' ? 'text-accent' : 'text-danger'}`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

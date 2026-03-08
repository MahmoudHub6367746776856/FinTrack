import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MonthlyData } from '../../types';

interface MonthlyBarChartProps {
  data: MonthlyData[];
}

export function MonthlyBarChart({ data }: MonthlyBarChartProps) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const monthMap = new Map<string, { month: string; income: number; expenses: number }>();
  
  data.forEach((item) => {
    const [year, month] = item.month.split('-');
    const monthIndex = parseInt(month, 10) - 1;
    const monthName = months[monthIndex];
    const key = `${year}-${month}`;
    
    if (!monthMap.has(key)) {
      monthMap.set(key, { month: monthName, income: 0, expenses: 0 });
    }
    
    const entry = monthMap.get(key)!;
    if (item.type === 'income') {
      entry.income = item.total;
    } else {
      entry.expenses = item.total;
    }
  });
  
  const chartData = Array.from(monthMap.values()).slice(-6);

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-text-secondary">
        No data to display
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
        <XAxis dataKey="month" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          formatter={(value: number) => `$${value.toFixed(2)}`}
          contentStyle={{
            backgroundColor: 'rgba(11, 15, 25, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            color: '#f3f4f6',
            backdropFilter: 'blur(12px)',
          }}
          itemStyle={{ color: '#f3f4f6' }}
        />
        <Legend />
        <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

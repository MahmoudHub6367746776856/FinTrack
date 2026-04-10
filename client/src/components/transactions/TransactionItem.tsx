import React from 'react';
import { Transaction } from '../../types';

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
}

export function TransactionItem({ transaction, onEdit, onDelete }: TransactionItemProps) {
  const isIncome = transaction.type === 'income';
  
  const categoryColors: Record<string, string> = {
    Food: 'bg-orange-100 text-orange-700',
    Transport: 'bg-blue-100 text-blue-700',
    Bills: 'bg-red-100 text-red-700',
    Shopping: 'bg-purple-100 text-purple-700',
    Entertainment: 'bg-pink-100 text-pink-700',
    Health: 'bg-green-100 text-green-700',
    Salary: 'bg-emerald-100 text-emerald-700',
    Freelance: 'bg-cyan-100 text-cyan-700',
    Other: 'bg-gray-100 text-gray-700',
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 text-text-secondary">
        {new Date(transaction.date).toLocaleDateString()}
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span className="font-medium text-text-primary">
            {transaction.description || transaction.category}
          </span>
          {transaction.description && (
            <span className="text-xs text-text-secondary">{transaction.category}</span>
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[transaction.category] || 'bg-gray-100 text-gray-700'}`}>
          {transaction.category}
        </span>
      </td>
      <td className={`px-4 py-3 font-medium ${isIncome ? 'text-accent' : 'text-danger'}`}>
        {isIncome ? '+' : '-'}${transaction.amount.toFixed(2)}
      </td>
      <td className="px-4 py-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          isIncome ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
        }`}>
          {isIncome ? 'Income' : 'Expense'}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(transaction)}
            className="p-1.5 text-text-secondary hover:text-primary hover:bg-primary/10 rounded transition-colors"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(transaction.id)}
            className="p-1.5 text-text-secondary hover:text-danger hover:bg-danger/10 rounded transition-colors"
            title="Delete"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

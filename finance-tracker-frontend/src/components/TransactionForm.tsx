import { useState } from 'react';
import type { FormEvent } from 'react';
import { TransactionType } from '../types/transaction';
import type { Transaction } from '../types/transaction';

interface TransactionFormProps {
  onTransactionAdded: (transaction: Transaction) => void;
}

function TransactionForm({ onTransactionAdded }: TransactionFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<number>(TransactionType.Expense);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newTransaction = {
      description,
      amount: parseFloat(amount),
      category,
      type,
      dateTime: new Date().toISOString(),
    };

    const response = await fetch('https://localhost:7055/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction),
    });

    if (response.ok) {
      const created: Transaction = await response.json();
      onTransactionAdded(created);
      setDescription('');
      setAmount('');
      setCategory('');
      setType(TransactionType.Expense);
    } else {
      console.error('Failed to create transaction');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow border mb-6 space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Amount</label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <select
          value={type}
          onChange={(e) => setType(Number(e.target.value))}
          className="w-full border rounded px-3 py-2"
        >
          <option value={TransactionType.Expense}>Expense</option>
          <option value={TransactionType.Income}>Income</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
      >
        Add Transaction
      </button>
    </form>
  );
}

export default TransactionForm;
import { useState, useEffect } from 'react';
import type { Transaction } from './types/transaction';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import Dashboard from './components/Dashboard';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://localhost:7055/api/transactions')
      .then((response) => response.json())
      .then((data: Transaction[]) => {
        setTransactions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
        setLoading(false);
      });
  }, []);

  const handleTransactionAdded = (newTransaction: Transaction) => {
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Finance Tracker</h1>
      <Dashboard transactions={transactions} />
      <TransactionForm onTransactionAdded={handleTransactionAdded} />
      <TransactionList transactions={transactions} />
    </div>
  );
}

export default App;
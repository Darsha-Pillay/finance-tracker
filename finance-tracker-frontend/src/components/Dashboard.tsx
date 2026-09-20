import { TransactionType } from '../types/transaction';
import type { Transaction } from '../types/transaction';

interface DashboardProps {
  transactions: Transaction[];
}

function Dashboard({ transactions }: DashboardProps) {
  const income = transactions
    .filter((t) => t.type === TransactionType.Income)
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === TransactionType.Expense)
    .reduce((sum, t) => sum + t.amount, 0);

  const remaining = income - expenses;

  return (
    <div className="bg-white p-6 rounded-lg shadow border mb-6">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500">Income</p>
          <p className="text-2xl font-bold text-green-600">R{income.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Expenses</p>
          <p className="text-2xl font-bold text-red-600">R{expenses.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Remaining</p>
          <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            R{remaining.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
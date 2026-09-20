import type {Transaction} from '../types/transaction';
import { TransactionType } from '../types/transaction';

interface TransactionCardProps {
    transaction: Transaction;
}

function TransactionCard({transaction}: TransactionCardProps) {
    const isIncome = transaction.type === TransactionType.Income;

   return (
    <li className="flex justify-between p-4 bg-white rounded-lg shadow border">
      <div>
        <p className="font-semibold">{transaction.description}</p>
        <p className="text-sm text-gray-500">{transaction.category}</p>
      </div>
      <p className={isIncome ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
        {isIncome ? '+' : '-'}R{transaction.amount}
      </p>
    </li>
  );
}

export default TransactionCard;



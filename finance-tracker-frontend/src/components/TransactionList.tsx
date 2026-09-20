import type {Transaction} from '../types/transaction';
import TransactionCard from './TransactionCard';

interface TransactionListProps {
    transactions: Transaction[];
}

function TransactionList({transactions}: TransactionListProps) {
    if (transactions.length === 0) {
        return <p className="text-gray-600">No transactions found.</p>;
    }

    return (
        <ul className="space-y-2">
            {transactions.map((t) => (
                <TransactionCard key={t.id} transaction={t} />
            ))}
        </ul>
    );
}

export default TransactionList;
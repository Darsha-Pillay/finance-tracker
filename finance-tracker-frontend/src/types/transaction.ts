export interface Transaction {
    id: number;
    description: string;
    amount: number;
    type: TransactionType;
    category: string;
    date: string;
}

export const TransactionType = {
    Income: 0,
    Expense: 1
} as const; 

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];
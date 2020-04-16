import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const sumIncome: number = this.transactions
      .filter(item => item.type === 'income')
      .reduce((acc, transaction) => {
        return acc + transaction.value;
      }, 0);

    const sumOutcome: number = this.transactions
      .filter(item => item.type === 'outcome')
      .reduce((acc, transaction) => {
        return acc + transaction.value;
      }, 0);

    const total: number = sumIncome - sumOutcome;

    const balance: Balance = {
      income: sumIncome,
      outcome: sumOutcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

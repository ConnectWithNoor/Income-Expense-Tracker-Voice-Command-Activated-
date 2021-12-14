import { useContext } from 'react';
import { ExpenseTrackerContext } from '../context/context';
import {
  expenseCategories,
  incomeCategories,
  resetCategories,
} from '../constant/categories';

const useTransactions = (title) => {
  resetCategories();

  const { transactions } = useContext(ExpenseTrackerContext);
  const trxPerType = transactions.filter((t) => t.type === title);
  const total = trxPerType.reduce((acc, curr) => (acc += curr.amount), 0);
  const categories = title === 'Income' ? incomeCategories : expenseCategories;

  trxPerType.forEach((t) => {
    const category = categories.find((c) => c.type === t.category);
    if (category) category.amount += t.amount;
  });

  const filteredCategories = categories.filter((c) => c.amount > 0);

  const chartData = {
    datasets: [
      {
        data: filteredCategories.map((c) => c.amount),
        backgroundColor: filteredCategories.map((c) => c.color),
      },
    ],
    labels: filteredCategories.map((c) => c.type),
  };

  return { total, chartData };
};
export default useTransactions;

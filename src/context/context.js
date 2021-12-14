import React, { useReducer, createContext } from 'react';

import contextReducer from './reducer';
import contextTypes from './types';

const initialState = JSON.parse(localStorage.getItem('transactions')) || [];

const ExpenseTrackerContext = createContext(initialState);

const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  //   Action Creators

  const deleteTransaction = (id) => {
    dispatch({
      type: contextTypes.delete,
      payload: id,
    });
  };

  const addTransaction = (transaction) => {
    dispatch({
      type: contextTypes.add,
      payload: transaction,
    });
  };

  const balance = transactions.reduce((acc, curr) => {
    return curr.type === 'Expense' ? acc - curr.amount : acc + curr.amount;
  }, 0);

  return (
    <ExpenseTrackerContext.Provider
      value={{ deleteTransaction, addTransaction, transactions, balance }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};

export { ExpenseTrackerContext, Provider };

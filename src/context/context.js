import React, { useReducer, createContext } from 'react';

import contextReducer from './reducer';
import contextTypes from './types';

const initialState = [];

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

  return (
    <ExpenseTrackerContext.Provider
      value={{ deleteTransaction, addTransaction, transactions }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};

export { ExpenseTrackerContext, Provider };

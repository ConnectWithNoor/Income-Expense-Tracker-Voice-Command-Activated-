import contextTypes from './types';

const ContextReducer = (state, action) => {
  let trxs;
  switch (action.type) {
    case contextTypes.delete:
      trxs = state.filter((t) => t.id !== action.payload);

      localStorage.setItem('transactions', JSON.stringify(trxs));

      return trxs;

    case contextTypes.add:
      trxs = [action.payload, ...state];

      localStorage.setItem('transactions', JSON.stringify(trxs));

      return trxs;

    default:
      return state;
  }
};

export default ContextReducer;

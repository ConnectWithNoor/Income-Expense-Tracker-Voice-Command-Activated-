import React, { useContext } from 'react';
import {
  List as MUIList,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Slide,
} from '@material-ui/core';
import { Delete, MoneyOff } from '@material-ui/icons';

import { ExpenseTrackerContext } from '../../../context/context';

import useStyles from './style';

function List() {
  const { deleteTransaction, transactions } = useContext(ExpenseTrackerContext);
  const classes = useStyles();

  const txs = [
    {
      id: 1,
      type: 'Income',
      category: 'Salary',
      amount: 50,
      date: 'Tue Dec 14',
    },
    {
      id: 2,
      type: 'Expense',
      category: 'Rent',
      amount: 150,
      date: 'Tue Dec 14',
    },
    {
      id: 3,
      type: 'Income',
      category: 'Pet',
      amount: 100,
      date: 'Tue Dec 14',
    },
  ];

  return (
    <MUIList dense={false} className={classes.list}>
      {transactions.map((tx) => (
        <Slide direction='down' in mountOnEnter unmountOnExit key={tx.id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                className={
                  tx.type === 'Income'
                    ? classes.avatarIncome
                    : classes.avatarExpense
                }
              >
                <MoneyOff />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={tx.category}
              secondary={`$${tx.amount} - ${tx.date}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge='end'
                aria-label='Delete'
                onClick={() => {
                  deleteTransaction(tx.id);
                }}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </Slide>
      ))}
    </MUIList>
  );
}

export default List;

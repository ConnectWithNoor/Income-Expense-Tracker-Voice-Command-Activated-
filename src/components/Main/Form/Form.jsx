import React, { useState, useContext, useEffect, useCallback } from 'react';
import {
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { useSpeechContext } from '@speechly/react-client';

import Snackbar from '../../Snackbar/Snackbar';

import {
  incomeCategories,
  expenseCategories,
} from '../../../constant/categories';

import { ExpenseTrackerContext } from '../../../context/context';
import formatDate from '../../../utils/formatDate';
import SpeechlyIntents from '../../../constant/speechlyIntents';

import useStyles from './styles';
import SpeechlyEntities from '../../../constant/speechlyEntities';

const initialState = {
  amount: '',
  category: '',
  type: 'Income',
  date: formatDate(new Date()),
};

function Form() {
  const { addTransaction } = useContext(ExpenseTrackerContext);
  const { segment } = useSpeechContext();
  const [formData, setFormData] = useState(initialState);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const createTransaction = useCallback(() => {
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-'))
      return;

    const transaction = {
      ...formData,
      amount: Number(formData.amount),
      id: uuidv4(),
    };

    addTransaction(transaction);
    setOpen(true);
    setFormData(initialState);
  }, [addTransaction, formData]);

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === SpeechlyIntents.ADD_EXPENSE) {
        setFormData({ ...formData, type: 'Expense' });
      } else if (segment.intent.intent === SpeechlyIntents.ADD_INCOME) {
        setFormData({ ...formData, type: 'Income' });
      } else if (
        segment.isFinal &&
        segment.intent.intent === SpeechlyIntents.CREATE_TRANSACTION
      ) {
        return createTransaction();
      } else if (
        segment.isFinal &&
        segment.intent.intent === SpeechlyIntents.CANCEL_TRANSACTION
      ) {
        return setFormData(initialState);
      }

      segment.entities.forEach((e) => {
        const category = `${e.value.charAt(0)}${e.value
          .slice(1)
          .toLowerCase()}`;
        switch (e.type) {
          case SpeechlyEntities.AMOUNT:
            setFormData({ ...formData, amount: e.value });
            break;

          case SpeechlyEntities.CATEGORY:
            if (incomeCategories.map((ic) => ic.type).includes(category)) {
              setFormData({ ...formData, type: 'Income', category });
            } else if (
              expenseCategories.map((ic) => ic.type).includes(category)
            ) {
              setFormData({ ...formData, type: 'Expense', category });
            }
            break;

          case SpeechlyEntities.DATE:
            setFormData({ ...formData, date: e.value });
            break;

          default:
            break;
        }
      });

      if (
        segment.isFinal &&
        formData.amount &&
        formData.category &&
        formData.type &&
        formData.date
      ) {
        createTransaction();
      }
    }
  }, [segment]);

  const selectedCategory =
    formData.type === 'Income' ? incomeCategories : expenseCategories;

  return (
    <Grid container spacing={2}>
      <Snackbar open={open} setOpen={setOpen} />
      <Grid item xs={12}>
        <Typography align='center' variant='subtitle2' gutterBottom>
          {segment && segment.words.map((w) => w.value).join(' ')}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) =>
              setFormData({
                ...formData,
                type: e.target.value,
              })
            }
          >
            <MenuItem value='Income'>Income</MenuItem>
            <MenuItem value='Expense'>Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
          >
            {selectedCategory.map((c) => (
              <MenuItem key={c.type} value={c.type}>
                {c.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          type='number'
          label='Amount'
          fullWidth
          value={formData.amount}
          onChange={(e) =>
            setFormData({
              ...formData,
              amount: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type='date'
          label='Date'
          fullWidth
          value={formData.date}
          onChange={(e) =>
            setFormData({
              ...formData,
              date: formatDate(e.target.value),
            })
          }
        />
      </Grid>
      <Button
        className={classes.button}
        variant='outlined'
        color='primary'
        fullWidth
        onClick={createTransaction}
      >
        {' '}
        Create
      </Button>
    </Grid>
  );
}

export default Form;

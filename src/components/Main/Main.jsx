import React, { useContext } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  Grid,
} from '@material-ui/core';
import { ExpenseTrackerContext } from '../../context/context';

import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';
import InfoCard from '../InfoCard/InfoCard';

function Main() {
  const { balance } = useContext(ExpenseTrackerContext);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title='Expense Tracker' subheader='Powered by speechly' />
      <CardContent>
        <Typography variant='h5' align='center'>
          Total Balance: ${balance}
        </Typography>
        <Typography
          variant='subtitle1'
          style={{ lineHeight: '1.5em', marginTop: '20px' }}
        >
          <InfoCard />
        </Typography>
        <Divider />
        <Form />
      </CardContent>
      <CardContent className={classes.CardContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Main;

import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  Grid,
} from '@material-ui/core';

import useStyles from './styles';
import Form from './Form/Form';
import List from './List/List';

function Main() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader title='Expense Tracker' subheader='Powered by speechly' />
      <CardContent>
        <Typography variant='h5' align='center'>
          Total Balance: $100
        </Typography>
        <Typography
          variant='subtitle1'
          style={{ lineHeight: '1.5em', marginTop: '20px' }}
        >
          {/* Info card */}
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

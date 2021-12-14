import React, { useLayoutEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';

import { Doughnut } from 'react-chartjs-2';

import useTransactions from '../../utils/useTransactions';

import useStyles from './styles';

function Details({ title }) {
  const { total, chartData } = useTransactions(title);
  const classes = useStyles();

  useLayoutEffect(() => {
    ChartJS.register(ArcElement, Tooltip, Legend);
  }, []);

  return (
    <Card className={title === 'Income' ? classes.income : classes.expense}>
      <CardHeader title={title} />
      <CardContent>
        <Typography variant='h5'>${total}</Typography>
        <Doughnut data={chartData} />
      </CardContent>
    </Card>
  );
}

export default Details;

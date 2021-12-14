import React from 'react';

const isIncome = Math.round(Math.random());

function InfoCard() {
  return (
    <div style={{ textAlign: 'center', padding: '0 10%' }}>
      Try Saying: <br />
      Add {isIncome ? 'income ' : 'expense '}
      for {isIncome ? '$100 ' : '$50 '} in Category{' '}
      {isIncome ? 'business ' : 'house '} for{' '}
      {isIncome ? 'monday ' : 'wednesday '}.
    </div>
  );
}

export default InfoCard;

import React from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    marginTop: 10,
    background: 'white',
  }
})


export default function Question({ question }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container>
          <Grid item sm={2}>
            <Typography variant="body2" component="p">
              {question.criterion}
            </Typography>
          </Grid>
          <Grid item sm={6} style={{ padding: 10 }}>
            <Typography variant="body1" component="p">
              {question.text}
            </Typography>
          </Grid>
          <Grid item sm={2}>
            <Typography variant="body2" component="p" align="center">
              {question.element_1}
            </Typography>
          </Grid>
          <Grid item sm={2}>
            <Typography variant="body2" component="p" align="center">
              {question.element_2}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

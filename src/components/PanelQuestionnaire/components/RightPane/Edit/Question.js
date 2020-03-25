import React from 'react';
import { Card, CardContent, CardActions, Grid, Typography, Button, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function Question({ question, remove, edit }) {
  const useStyles = makeStyles({
    card: {
      marginTop: 10,
      background: 'white',
    }
  })

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
      <Divider />
      <CardActions>
        <Button size="small" onClick={() => edit(question)} title="Edit this question for all questionnaires">Edit question</Button>
        <Button size="small" onClick={() => remove(question)} title="Remove question from this questionnaire">Remove question</Button>
      </CardActions>
    </Card>
  );
}

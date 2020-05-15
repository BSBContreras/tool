import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function EvaluatorModal({ evaluator }) {
  const useStyles = makeStyles(theme => ({
    modalPaper: {
      background: '#FFF',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: 650
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.modalPaper}>
      <Grid container>
        <Grid item sm={12}>
          <Typography variant="h4" component="h2">
            {evaluator.name}
          </Typography>
          <Typography variant="body1" component="p">
            {evaluator.email}
          </Typography>
        </Grid>
        <Grid item sm={6}>
          Assessments that participated
        </Grid>
        <Grid item sm={6}>
          Answers
        </Grid>
      </Grid>
    </div>
  );
}

import React from 'react';
import AssessmentProvider from './context/AssessmentContext';
import AssessmentsList from './components/AssessmentsList'
import RightPanel from './components/RightPanel';
import { Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function PanelAssessments() {
  const useStyles = makeStyles(theme => ({
    root: {
      height: 650,
      marginTop: 10,
      margin: theme.spacing(1)
    }
  }));

  const classes = useStyles();

  return (
    <AssessmentProvider>
      <Grid container>
        <Grid item sm={3}>
          <Paper className={classes.root}>
            <AssessmentsList />
          </Paper>
        </Grid>
        <Grid item sm={9}>
          <Paper className={classes.root}>
            <RightPanel />
          </Paper>
        </Grid>
      </Grid>
    </AssessmentProvider>
  );
}

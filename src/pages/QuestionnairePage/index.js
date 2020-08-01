import React from 'react';
import QuestionnaireProvider from './context/QuestionnaireContext';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import QuestionnaireList from './components/QuestionnaireList';
import RightPanel from './components/RightPanel';

export default function PanelTasks() {
  const useStyles = makeStyles(theme => ({
    leftPanel: {
      height: 650,
      margin: theme.spacing(1),
    },
    rightPanel: {
      height: 650,
      margin: theme.spacing(1),
    }
  }));

  const classes = useStyles();

  return (
    <QuestionnaireProvider>
      <Grid container>
        <Grid item sm={3}>
          <Paper className={classes.leftPanel}>
            <QuestionnaireList />
          </Paper>
        </Grid>
        <Grid item sm={9}>
          <Paper className={classes.rightPanel}>
            <RightPanel />
          </Paper>
        </Grid>
      </Grid>
    </QuestionnaireProvider>
  );
}

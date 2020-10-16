import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

import { makeStyles } from '@material-ui/core/styles';

import BoardRounded from './BoardRounded';
import EvaluationHistory from './EvaluationHistory';

const useStyles = makeStyles(theme => ({
  panel: {
    padding: theme.spacing(2)
  },
  pizza: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: theme.spacing(3),
    height: '315px'
  },
  pizzaTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
  },
  about: {
    padding: theme.spacing(3),
  }
}))

const CircularProgressWithLabel = (props) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress 
        size={100}
        color="secondary"
        variant="static" {...props} 
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography 
          variant="h5" 
          component="div" 
          color="secondary"
        >
          {`${Math.round(props.value,)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const CompletedTasks = () => {

  const classes = useStyles();

  return (
    <BoardRounded className={classes.pizza}>
      <Typography 
        variant="body1" 
        component="h4"
        color="secondary"
        className={classes.pizzaTitle}
      >
        Completed Tasks
      </Typography>
      <CircularProgressWithLabel value={95} />
      <Link
        className={classes.link}
        component="button"
        variant="body2"
        onClick={() => {
          alert('go to tasks');
        }}
      >
        View Tasks
        <ArrowRightAltIcon />
      </Link>
    </BoardRounded>
  );
}

const QuestionsAnswered = () => {

  const classes = useStyles();

  return (
    <BoardRounded className={classes.pizza}>
      <Typography 
        variant="body1" 
        component="h3"
        color="secondary"
        className={classes.pizzaTitle}
      >
        Questions Answered
      </Typography>
      <CircularProgressWithLabel value={35} />
      <Link
        className={classes.link}
        component="button"
        variant="body2"
        onClick={() => {
          alert('go to questions');
        }}
      >
        View Questions
        <ArrowRightAltIcon />
      </Link>
    </BoardRounded>
  );
}

export default function ShowGeneral() {

  const classes = useStyles();

  return (
    <>
      <Grid container>
        <Grid item sm={6}>
          <div className={classes.panel}>
            <EvaluationHistory />
          </div>
        </Grid>
        <Grid item sm={3}>
          <div className={classes.panel}>
            <CompletedTasks />
          </div>
        </Grid>
        <Grid item sm={3}>
          <div className={classes.panel}>
            <QuestionsAnswered />
          </div>
        </Grid>
      </Grid>
      <BoardRounded className={classes.about}>
        <Typography variant="h5" component="h5">
          About this evaluation
        </Typography>
        <Grid container>
          <Grid item sm={6}>
            Details
          </Grid>
          <Grid item sm={6}>
            
          </Grid>
        </Grid>
      </BoardRounded>
    </>
  );
}

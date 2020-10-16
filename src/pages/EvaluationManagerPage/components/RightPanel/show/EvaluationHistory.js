import React from 'react';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import RefreshIcon from '@material-ui/icons/Refresh';

import { makeStyles } from '@material-ui/core/styles';

import BoardRounded from './BoardRounded';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(0, 2),
    height: '315px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '75px',
    padding: theme.spacing(1)
  },
  title: {
    color: '#474747',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#1DB954',
    color: '#FFFFFF'
  },
  history: {
    height: '200px',
  },
  list: {
    overflowY: 'auto',
    height: '100%',
    width: '100%'
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    height: '40px',
  },
  footerContent: {
    marginLeft: theme.spacing(1),
    color: '#9F9F9F',
    fontSize: '12px'
  }
}))


const History = () => {

  const history = [
    { id: 1, data: 'Bruno Contreras answered a question about Readiness', date: '3:32 P.M, 17th September, 2020'},
    { id: 2, data: 'Bruno Contreras answered a question about Readiness', date: '3:32 P.M, 17th September, 2020'},
    { id: 3, data: 'Bruno Contreras answered a question about Readiness', date: '3:32 P.M, 17th September, 2020'},
    { id: 4, data: 'Bruno Contreras answered a question about Readiness', date: '3:32 P.M, 17th September, 2020'},
    { id: 5, data: 'Bruno Contreras answered a question about Readiness', date: '3:32 P.M, 17th September, 2020'}
  ]

  const classes = useStyles();

  return (
    <List className={classes.list}>
      {history.map((item) => (
        <React.Fragment key={item.id}>
          <ListItem onClick={() => {}}>
            <ListItemText primary={item.data} secondary={item.date} />
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
}

export default function EvaluationHistory() {

  const classes = useStyles();

  return (
    <BoardRounded className={classes.container}>
      <div className={classes.header}>
        <Typography className={classes.title} variant="body1" component="h3">
          Evaluation History
        </Typography>
        <Button
          variant="contained"
          className={classes.button}
          endIcon={<RefreshIcon />}
        >
          Refresh
        </Button>
      </div>
      <Divider />
      <div className={classes.history}>
        <History />
      </div>
      <Divider />
      <div className={classes.footer}>
        <Typography className={classes.footerContent} variant="subtitle2">
          Last refresh at 3:32 P.M, 17th September, 2020
        </Typography>
      </div>
    </BoardRounded>
  );
}

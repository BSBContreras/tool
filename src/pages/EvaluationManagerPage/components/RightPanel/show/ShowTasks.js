import React, { useState, useEffect, useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import PointIcon from '@material-ui/icons/FiberManualRecord';
import EndPointIcon from '@material-ui/icons/DonutLarge';

import BoardRounded from './BoardRounded';

import { AssessmentContext } from '../../../context/AssessmentContext';

import { loadTasksByEvaluation } from '../../../../../routes';
import { RUNTIME_ERROR } from '../../../../../constants';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%'
  },
  content: {
    height: '100%',
    margin: theme.spacing(0, 2),
    padding: theme.spacing(3)
  },
  header: {
    height: '75px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    width: '100%',
  }
}));

const SelectStyled = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    position: 'relative',
    padding: '10px 26px 10px 12px',
    backgroundColor: '#FAFAFA',
    fontSize: '24px',
  },
}))(InputBase);

export default function ShowTaks() {

  const { currentAssessmentController } = useContext(AssessmentContext);
  const [ currentAssessment ] = currentAssessmentController;

  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({});

  const handleSelectTask = (event) => {
    setTask(event.target.value);
  };

  useEffect(() => {
    if(currentAssessment.id) {
      loadTasksByEvaluation({
        id: Number(currentAssessment.id)
      }).then(data => {

        setTasks(data);
      }).catch(error => {

        if(Number(error.id) !== RUNTIME_ERROR) {
          alert(error.detail);
        } else {
          alert('Error on load Questions');
        }

      })
    }
  }, [currentAssessment]);

  useEffect(() => {
    setTask({});
  }, [currentAssessment]);

  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Grid item sm={6}>
        <BoardRounded className={classes.content}>
          <div className={classes.header}>
            <Select
              fullWidth
              id="select-task"
              value={task}
              defaultValue="Select some Task"
              onChange={handleSelectTask}
              input={<SelectStyled />}
              renderValue={(selected) => (selected.id ? selected.name : 'Select some task')}
            >
              <MenuItem disabled value={{}}>
                <em>Select some task</em>
              </MenuItem>
              {tasks.map(task => (
                <MenuItem key={task.id} value={task}>{task.name}</MenuItem>
              ))}
            </Select>
          </div>
          <Divider />
          <List className={classes.list}>
            <ListItem>
              <ListItemIcon>
                <PointIcon />
              </ListItemIcon>
              <ListItemText primary="Sent mail" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PointIcon />
              </ListItemIcon>
              <ListItemText primary="Sent mail" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EndPointIcon />
              </ListItemIcon>
              <ListItemText primary="Sent mail" />
            </ListItem>
          </List>
        </BoardRounded>
      </Grid>
      <Grid item sm={6}>
        <BoardRounded className={classes.content}>
          Tasks
        </BoardRounded>
      </Grid>
    </Grid>
  );
}

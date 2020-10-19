import React, { useState, useEffect, useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

import { makeStyles, withStyles } from '@material-ui/core/styles';

// Icons
import PointIcon from '@material-ui/icons/FiberManualRecord';
import EndPointIcon from '@material-ui/icons/DonutLarge';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

import BoardRounded from './BoardRounded';

import { AssessmentContext } from '../../../context/AssessmentContext';

import { 
  loadEvaluatorsByEvaluation,
  loadTasksByEvaluation, 
  loadPathTask 
} from '../../../../../routes';
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
    justifyContent: 'space-around'
  },
  list: {
    width: '100%',
  },
  arrowButton: { 
    fontSize: '24px', 
    cursor: 'pointer' 
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
  const [taskId, setTaskId] = useState('');
  const [taskPath, setTaskPath] = useState([]);
  const [evaluators, setEvaluators] = useState([]);
  const [evaluatorId, setEvaluatorId] = useState([]);

  const handleSelectTask = (event) => {
    const taskId = event.target.value;

    if(taskId.length > 0) {
      loadPathTask({ 
        task_id: taskId 
      }).then(data => {

        setTaskPath(data);
      }).catch(error => {

        if(Number(error.id) !== RUNTIME_ERROR) {
          alert(error.detail);
        } else {
          alert('Error on Task Path');
        }

      }).finally(() => {

        setTaskId(taskId);
      })
    }
  };

  const handleSelectEvaluator = (event) => {
    const evaluatorId = event.target.value;


    setEvaluatorId(evaluatorId);
  }

  useEffect(() => {
    if(currentAssessment.id) {
      loadEvaluatorsByEvaluation({
        id: Number(currentAssessment.id)
      }).then(data => {

        setEvaluators(data);
      }).catch(error => {

        if(Number(error.id) !== RUNTIME_ERROR) {
          alert(error.detail);
        } else {
          alert('Error on load Evaluators');
        }

      })
    }
  }, [currentAssessment]);

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
    setTaskId('');
  }, [currentAssessment]);

  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item sm={6}>
        <BoardRounded className={classes.content}>
          <div className={classes.header}>
            <Select
              id="select-task"
              fullWidth
              displayEmpty
              value={taskId}
              onChange={handleSelectTask}
              input={<SelectStyled />}
            >
              <MenuItem disabled value="">
                <em>Select some task</em>
              </MenuItem>
              {tasks.map(task => (
                <MenuItem key={task.id} value={task.id}>
                  {task.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <Divider />
          <List 
            className={classes.list}
            subheader={
              <ListSubheader component="div" id="list-subheader">
                Made by Bruno Contreras
              </ListSubheader>
            }
          >
            {taskPath.map((page, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  {index < taskPath.length - 1 ? <PointIcon /> : <EndPointIcon />}
                </ListItemIcon>
                <ListItemText 
                  primary={page.name} 
                  secondary={page.url}
                />
              </ListItem>
            ))}
          </List>
        </BoardRounded>
      </Grid>
      <Grid item sm={6}>
        <BoardRounded className={classes.content}>
          <div className={classes.header}>
            <Select
              id="select-evaluator"
              fullWidth
              displayEmpty
              value={evaluatorId}
              onChange={handleSelectEvaluator}
              input={<SelectStyled />}
              renderValue={(selected) => {
                const evaluator = evaluators.find(evaluator => evaluator.id === selected)

                if(evaluator) {
                  return evaluator.name;
                } else {
                  return <em>Select some evaluator</em>
                }
              }}
            >
              <MenuItem disabled value="">
                <em>Select some evaluator</em>
              </MenuItem>
              {evaluators.map(evaluator => (
                <MenuItem key={evaluator.id} value={evaluator.id}>
                  <ListItemText 
                    primary={evaluator.name} 
                    secondary={evaluator.email}
                  />
                  {Math.random() <= 0.5 ? (
                    <ListItemIcon>
                      <CheckCircleIcon style={{ color: '#7D7' }} />
                    </ListItemIcon>
                  ) : (
                    <ListItemIcon>
                      <HourglassEmptyIcon />
                    </ListItemIcon>
                  )}                  
                </MenuItem>
              ))}
            </Select>
          </div>
          <Divider />
        </BoardRounded>
      </Grid>
    </Grid>
  );
}

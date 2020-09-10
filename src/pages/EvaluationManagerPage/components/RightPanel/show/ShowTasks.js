import React, { useState, useEffect, useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { AssessmentContext } from '../../../context/AssessmentContext';

import { loadTasksByEvaluation } from '../../../../../routes';
import { RUNTIME_ERROR } from '../../../../../constants';

const answers = [
  {
    id: 1,
    evaluator_name: 'Bruno Contreras',
    text: 'yes'
  },
  {
    id: 2,
    evaluator_name: 'Marcelo Morandini',
    text: 'yes'
  },
  {
    id: 3,
    evaluator_name: 'Thiago',
    text: 'no'
  },
  {
    id: 4,
    evaluator_name: 'Jorge',
    text: 'yes'
  },
]

const useStyles = makeStyles(theme => ({
  listRoot: {
    width: '100%',
  },
  listContainer: {
    width: '100%',
    padding: theme.spacing(0, 3)
  },
  containerQuestion: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  contentQuestion: {
    padding: theme.spacing(0, 3),
    width: '100%'
  },
  questionIcon: {
    margin: theme.spacing(2, 0),
    fontSize: '128px'
  }
}));

const Question = ({ task }) => {

  const classes = useStyles();

  return (
    <div className={classes.containerQuestion}>
      {task.id ? (
        <>
          <QuestionAnswerOutlinedIcon className={classes.questionIcon} />
          <div className={classes.contentQuestion}>
            <Typography variant="h6">
              {task.name}
            </Typography>
            <Typography variant="subtitle1">
              {task.detail}
            </Typography>
          </div>
          {/* <div className={classes.listContainer}>
            <List 
              className={classes.listRoot}
              subheader={
                <ListSubheader component="div" id="list-subheader">
                  Answers
                </ListSubheader>
              }
            >
              {answers.map((answer, index) => (
                <React.Fragment key={answer.id}>
                  <ListItem button onClick={() => {}}>
                    <ListItemAvatar>
                      <Avatar>
                        <QuestionAnswerIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={answer.evaluator_name} secondary={answer.text} />
                  </ListItem>
                  {index < answers.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </div> */}
        </>
      ) : (
        <Typography variant="body1">
          Select some task to view details
        </Typography>
      )}
    </div>
  )
}

export default function ShowTaks() {

  const { currentAssessmentController } = useContext(AssessmentContext);
  const [ currentAssessment ] = currentAssessmentController;

  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({});

  const handleSelectQuestion = (task) => {
    setTask(task);
  }

  useEffect(() => {
    if(currentAssessment.id) {
      loadTasksByEvaluation({
        id: Number(currentAssessment.questionnaire_id)
      }).then(data => {
        console.log(data);

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
    <Grid container>
      <Grid item sm={5}>
        <List className={classes.listRoot}>
          {tasks.map((task, index) => (
            <React.Fragment key={task.id}>
              <ListItem button onClick={() => handleSelectQuestion(task)}>
                <ListItemAvatar>
                  <Avatar>
                    <QuestionAnswerIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={task.name} secondary={task.detail} />
              </ListItem>
              {index < tasks.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Grid>
      <Grid item sm={7}>
        <Question task={task} />
      </Grid>
    </Grid>
  );
}

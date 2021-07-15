import React, { useState, useEffect, useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

import Dialog from '../../../../../components/Dialog';

import { makeStyles, withStyles } from '@material-ui/core/styles';

// Icons
import PointIcon from '@material-ui/icons/FiberManualRecord';
import EndPointIcon from '@material-ui/icons/DonutLarge';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import BoardRounded from './BoardRounded';

import { AssessmentContext } from '../../../context/AssessmentContext';

import { 
  loadEvaluatorsByEvaluation,
  loadTasksByEvaluation, 
  loadPathTask,
  showWebsiteByEvaluation,
  loadQuestionsByQuestionnaire,
  loadPagesByWebsite,
  loadTaskPathByUserAndTask,
  storeEvaluatorPathTask
} from '../../../../../routes';
import { RUNTIME_ERROR } from '../../../../../constants';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%'
  },
  content: {
    height: '100%',
    margin: theme.spacing(0, 2),
    padding: theme.spacing(3),
  },
  header: {
    height: '75px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  designerListContainer: {
    position: 'relative',
    height: 'calc(100% - 75px)',
  },
  evaluatorListContainer: {
    position: 'relative',
    height: 'calc(100% - 75px - 50px)',
  },
  list: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '50px'
  },
  matchesButton: {
    backgroundColor: '#5D5',
    color: '#FFF'
  },
  doesnotMatchesButton: {
    backgroundColor: '#D55',
    color: '#FFF'
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


// EM CONSTRUÇÃO

const getQuestionsToSend = async (path, evaluation) => {

  let questions = [];

  await loadQuestionsByQuestionnaire({
    id: Number(evaluation.questionnaire_id)
  }).then(data => {

    questions = data;
  }).catch(error => {

    if(Number(error.id) !== RUNTIME_ERROR) {
      alert(error.detail);
    } else {
      alert('Error on load questions');
    }
  })

  let questions_to_send = {}

  questions.forEach(question => {
    path.forEach(page => {
      if(page.element_1_id == question.element_1_id
        || page.element_2_id == question.element_1_id
        || page.element_3_id == question.element_1_id
        || page.element_4_id == question.element_1_id
        || page.element_5_id == question.element_1_id
        || page.element_1_id == question.element_2_id
        || page.element_2_id == question.element_2_id
        || page.element_3_id == question.element_2_id
        || page.element_4_id == question.element_2_id
        || page.element_5_id == question.element_2_id
        ) {
          questions_to_send[question.id] = question;
        }
    })
  })

  return Object.values(questions_to_send);

}

// EM CONSTRUÇÃO

const DialogQuestionsToSend = ({ handleCloseDialog, path }) => {

  const { currentAssessmentController } = useContext(AssessmentContext);
  const [ currentAssessment ] = currentAssessmentController;

  const [questions, setQuestions] = useState([]);

  const getQuestions = async () => {
    const questionsToSend = await getQuestionsToSend(path, currentAssessment);
    setQuestions(questionsToSend);
  }
  
  useEffect(() => {
    getQuestions();
  }, [])

  return (
    <Dialog
      title="Questions"
      submitText="Questions genereted"
      handleClose={handleCloseDialog}
      submit={handleCloseDialog}
      maxWidth="md"
    >
      <List >
        {questions.map((question, index) => (
          <ListItem key={index}>
            <ListItemIcon>
                <PointIcon />
            </ListItemIcon>
            <ListItemText 
              primary={question.criterion} 
              secondary={question.text}
            />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

const DialogAddRoute = ({ task_id, evaluator_id, handleCloseDialog }) => {

  const { currentAssessmentController } = useContext(AssessmentContext);
  const [ currentAssessment ] = currentAssessmentController;

  const [pages, setPages] = useState([])
  const [selectedPages, setSelectedPages] = useState([])

  const loadPages = () => {
    showWebsiteByEvaluation({
      id: Number(currentAssessment.id)
    }).then(website => {

      loadPagesByWebsite({
        id: Number(website.id)
      }).then(data => {

        setPages(data);
      }).catch(error => {

        if(Number(error.id) !== RUNTIME_ERROR) {
          alert(error.detail);
        } else {
          alert('Error on load pages');
        }
      })
    
    }).catch(error => {
  
      if(Number(error.id) !== RUNTIME_ERROR) {
        alert(error.detail);
      } else {
        alert('Error on load website');
      }
    })
  }

  const handleAddPage = newPage => {
    setSelectedPages(prevPages => [...prevPages, newPage]);
  }

  const handleRemovePage = oldPage => {
    setSelectedPages(prevPages => prevPages.filter(page => page.id != oldPage.id))
  }

  const handleSubmitPages = () => {
    storeEvaluatorPathTask({
      task_id: Number(task_id), 
      evaluator_id: Number(evaluator_id),
      pages: selectedPages.map(page => Number(page.id))
    }).then(data => {

      alert('Ok!')    
    }).catch(error => {
  
      if(Number(error.id) !== RUNTIME_ERROR) {
        alert(error.detail);
      } else {
        alert('Error on load website');
      }
    }).finally(() => {
      handleCloseDialog()
    })
  }

  useEffect(() => {
    loadPages()
  }, []);

  return (
    <Dialog
      title="User Route"
      submitText="Define Route"
      handleClose={handleCloseDialog}
      submit={handleSubmitPages}
      maxWidth="md"
    >
      <Grid container>
        <Grid item sm={6}>
          <List >
            {pages.map((page, index) => (
              <ListItem onClick={() => handleAddPage(page)} button key={index}>
                <ListItemIcon>
                  <PointIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={page.name} 
                  secondary={page.url}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item sm={6}>
          {selectedPages.map((page, index) => (
            <ListItem onClick={() => handleRemovePage(page)} button key={index}>
              <ListItemText 
                primary={page.name} 
                secondary={page.url}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleRemovePage(page)}>
                  <DeleteForeverIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </Grid>
      </Grid>
    </Dialog>
  )
}

export default function ShowTaks() {

  const { currentAssessmentController } = useContext(AssessmentContext);
  const [ currentAssessment ] = currentAssessmentController;

  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState('');
  const [taskPath, setTaskPath] = useState([]);
  const [evaluators, setEvaluators] = useState([]);
  const [evaluatorId, setEvaluatorId] = useState('');

  const [taskPathUser, setTaskPathUser] = useState([])

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogUser, setOpenDialogUser] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const handleChangeOpenAddRouteUser = () => {
    setOpenDialogUser(true)
  }

  const handleChangeCloseAddRouteUser = () => {
    loadUserPath()
    setOpenDialogUser(false)
  }

  const handleSelectTask = (event) => {
    const taskId = event.target.value;

    if(taskId.length > 0) {
      loadPathTask({ 
        task_id: taskId 
      }).then(data => {

        setTaskPath(data.map(page => ({...page, id: page.page_id})));
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
    setEvaluators([])
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

  const loadUserPath = () => {
    if(taskId && evaluatorId) {
      loadTaskPathByUserAndTask({
        task_id: Number(taskId),
        evaluator_id: evaluatorId
      }).then(data => {

        setTaskPathUser(data.map(page => ({...page, id: page.page_id})));
      }).catch(error => {

        if(Number(error.id) !== RUNTIME_ERROR) {
          alert(error.detail);
        } else {
          alert('Error on load Evaluators');
        }

      })
    }
  }

  useEffect(() => {
    loadUserPath();
  }, [taskId, evaluatorId]);

  useEffect(() => {
    setTasks([])
    setTaskPath([])
    setTaskPathUser([])
    setTaskId('');
    setEvaluatorId('')
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

  const getEvaluatorTaskPath = () => taskPathUser

  const classes = useStyles();

  return (
    <>
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
          <div className={classes.designerListContainer}>
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
          </div>
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
                      <ScheduleIcon />
                    </ListItemIcon>
                  )}                  
                </MenuItem>
              ))}
            </Select>
          </div>
          <Divider />
          <div className={classes.evaluatorListContainer}>

            {/* EXAMPLE */}
            <List className={classes.list}>
              {getEvaluatorTaskPath().length > 0 ? (
                getEvaluatorTaskPath().map((page, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      {index < getEvaluatorTaskPath().length - 1 ? <PointIcon /> : <EndPointIcon />}
                    </ListItemIcon>
                    <ListItemText 
                      primary={page.name} 
                      secondary={page.url}
                    />
                  </ListItem>
                ))
              ) : (
                <Button 
                  size="large"
                  fullWidth
                  onClick={() => handleChangeOpenAddRouteUser()}
                >
                  Add Route
                </Button>
              )}
            </List>
            {/* EXAMPLE */}

          </div>
          <Divider />
          <div className={classes.footer}>
            <Button
              variant="contained"
              className={classes.matchesButton}
              startIcon={<CheckCircleIcon />}
              onClick={() => alert('This Path Match!')}
            >
              Matches
            </Button>
            <Button
              variant="contained"
              className={classes.doesnotMatchesButton}
              startIcon={<CancelIcon />}
              onClick={() => { 
                if(getEvaluatorTaskPath().length > 0) {
                  handleOpenDialog()
                } else {
                  handleOpenDialog()
                }
              }}
            >
              Does Not Match
            </Button>
          </div>
        </BoardRounded>
      </Grid>
    </Grid>
    {
      openDialog && 
      <DialogQuestionsToSend 
        handleCloseDialog={handleCloseDialog}
        path={taskPath} 
      />
    }
    {
      openDialogUser &&
      <DialogAddRoute
        handleCloseDialog={handleChangeCloseAddRouteUser}
        task_id={taskId} 
        evaluator_id={evaluatorId}
      />
    }
    </>
  );
}

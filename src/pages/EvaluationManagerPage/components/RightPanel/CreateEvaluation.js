import React, { useState, useEffect, useContext } from 'react';
import { CreateAssessmentContext } from '../../context/CreateAssessmentContext';
import { AssessmentContext } from '../../context/AssessmentContext';
import CompletedStepsSvg from '../../../../assets/completed_steps.svg';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MuiAlert from '@material-ui/lab/Alert';
import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from '@material-ui/icons/AddCircle';
import Snackbar from '@material-ui/core/Snackbar';

import AddEvaluator from './AddEvaluator';

import ListItemDefault from '../../../../components/ListItemDefault';
import { GlobalContext } from '../../../../context/GlobalContext';
import { RUNTIME_ERROR } from '../../../../constants';
import { 
  loadQuestionnairesByManager, 
  loadQuestionsByQuestionnaire, 
  loadWebsitesByManager,
  loadTasksByWebsite,
  loadEvaluatorsByProfile,
  loadProfiles,
  storeEvaluation
} from '../../../../routes';

const Divider = ({...props}) => <hr {...props}></hr>

const AssessmentDetails = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(2),
      width: '80%'
    },
    item: {
      marginTop: theme.spacing(1)
    }
  }));

  const { detailsController } = useContext(CreateAssessmentContext);
  const [ details, setDetails ] = detailsController;
  const { name, detail } = details;

  const handleName = e => {
    const { value } = e.target;
    if(value.length <= 100) {
      setDetails({...details, name: value});
    }
  }

  const handleDetails = e => {
    const { value } = e.target;
    if(value.length <= 300) {
      setDetails({...details, detail: value});
    }
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField 
        className={classes.item}
        id="Name" 
        label="Name" 
        value={name}
        required
        fullWidth
        onChange={handleName}
      />
      <TextField 
        className={classes.item}
        id="Detail"
        label="Details"
        value={detail}
        multiline
        rows="6"
        fullWidth
        onChange={handleDetails}
      />
    </div>
  )
}

const ChooseQuestionnaire = () => {

  return (
    <Grid container >
      <Grid item sm={4}>
        <ListQuestionnaires />
      </Grid>
      <Grid item sm={8}>
        <ListQuestions />
      </Grid>
    </Grid>
  )
}

const ListQuestionnaires = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      height: 350,
      overflowY: 'auto',
      padding: 10, 
    },
    header: {
      color: '#777'
    },
  }))

  const { questionnaireController } = useContext(CreateAssessmentContext);
  const [ selectedQuestionnaire, setSelectedQuestionnaire ] = questionnaireController;

  const { managerController } = useContext(GlobalContext);
  const [ manager ] = managerController;

  const [questionnaires, setQuestionnaires] = useState([]);

  const handleSelectQuestionnaire = (questionnaire) => {
    if(selectedQuestionnaire !== questionnaire) {
      setSelectedQuestionnaire(questionnaire)
    }
  }
  
  useEffect(() => {
    loadQuestionnairesByManager({
      manager_id: Number(manager.id)
    }).then(data => {

      setQuestionnaires([...data.available, ...data.unavailable]);
    }).catch(error => {

      if(Number(error.id) !== RUNTIME_ERROR) {
        alert(error.detail);
      } else {
        alert('Error on load Questionnaires');
      }

    })
  }, [manager]);

  const classes = useStyles();

  return (
    <List className={classes.root} component="nav">
      <Typography variant="body1" align="center" className={classes.header}>
        QUESTIONNAIRE LIST
      </Typography>
      <Divider />
      {questionnaires.map(questionnaire => (
        <ListItemDefault
          key={questionnaire.id}
          primaryText={questionnaire.name}
          secondaryText={questionnaire.detail}
          tooltipText={questionnaire.detail}
          onClick={() => handleSelectQuestionnaire(questionnaire)}
          active={questionnaire === selectedQuestionnaire}
        />
      ))}
    </List>
  )
}

const ListQuestions = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      height: 350,
      overflowY: 'auto',
      padding: 10, 
    },
    header: {
      color: '#777'
    }
  }));

  const { questionnaireController } = useContext(CreateAssessmentContext);
  const [ questionnaire ] = questionnaireController;

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if(questionnaire.id) {
      loadQuestionsByQuestionnaire({
        id: Number(questionnaire.id)
      }).then(data => {
  
        setQuestions(data);
      }).catch(error => {
  
        if(Number(error.id) !== RUNTIME_ERROR) {
          alert(error.detail);
        } else {
          alert('Error on load Questions');
        }
  
      })
    }
  }, [questionnaire]);

  const classes = useStyles();

  return (
    <List className={classes.root} component="nav">
      <Typography variant="body1" align="center" className={classes.header}>
        QUESTION LIST
      </Typography>
      <Divider />
      <Grid container>
        {questions.map(question => (
          <Grid key={question.id} item sm={6}>
            <ListItemDefault
              key={question.id}
              primaryText={question.criterion}
              secondaryText={question.text}
              tooltipText={question.text}
              onClick={() => {}}
            />
          </Grid>
        ))}
      </Grid>
    </List>
  )
}

const ChooseTasks = () => {

  const [website, setWebsite] = useState({});

  return (
    <Grid container>
      <Grid item sm={4}>
        <WebsiteList currentWebsite={website} setWebsite={setWebsite} />
      </Grid>
      <Grid item sm={8}>
        <TaskList website={website} />
      </Grid>
    </Grid>
  )
}

const WebsiteList = ({ currentWebsite, setWebsite }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      height: 350,
      overflowY: 'auto',
      padding: 10, 
    },
    header: {
      color: '#777'
    },
  }))

  const { managerController } = useContext(GlobalContext);
  const [ manager ] = managerController;

  const [websites, setWebsites] = useState([]);

  const handleSelectWebsite = website => {
    setWebsite(website);
  }

  useEffect(() => {
    loadWebsitesByManager({
      manager_id: Number(manager.id)
    }).then(data => {

      setWebsites(data);
    }).catch(error => {

      if(Number(error.id) !== RUNTIME_ERROR) {
        alert(error.detail);
      } else {
        alert('Error on load Questions');
      }

    })
  }, [manager]);

  const classes = useStyles();

  return (
    <List className={classes.root} component="nav">
      <Typography variant="body1" align="center" className={classes.header}>
        WEBSITE LIST
      </Typography>
      <Divider />
      {websites.map(website => (
        <ListItemDefault
          key={website.id}
          primaryText={website.name}
          secondaryText={website.url}
          tooltipText={website.url}
          active={currentWebsite === website}
          onClick={() => handleSelectWebsite(website)}
        />
      ))}
    </List>
  )
}

const TaskItem = ({ task }) => {
  const { tasksController } = useContext(CreateAssessmentContext);
  const [ tasks, setTasks ] = tasksController;

  const [selected, setSelected] = useState(false);

  const handleClickTask = () => {
    if(selected) {
      setTasks(tasks.filter(selectedTask => selectedTask.id !== task.id ))
      setSelected(false);
    } else {
      setTasks([...tasks, task])
      setSelected(true);
    }
  }

  return (
    <Grid item sm={6}>
      <ListItemDefault
        primaryText={task.name}
        secondaryText={task.detail}
        tooltipText={task.detail}
        onClick={handleClickTask}
        active={selected}
      />
    </Grid>
  )
}

const TaskList = ({ website }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      height: 350,
      overflowY: 'auto',
      padding: 10, 
    },
    header: {
      color: '#777'
    }
  }))

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if(website.id) {
      loadTasksByWebsite({
        website_id: Number(website.id)
      }).then(data => {
        
        setTasks([...data.available, ...data.unavailable]);
      }).catch(error => {
  
        if(Number(error.id) !== RUNTIME_ERROR) {
          alert(error.detail);
        } else {
          alert('Error on load Tasks');
        }
  
      })
    }
  }, [website])

  const classes = useStyles();
    
  return (
    <List className={classes.root} component="nav">
      <Typography variant="body1" align="center" className={classes.header}>
        TASK LIST
      </Typography>
      <Divider />
      <Grid container>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </Grid>
    </List>
    )
}

const ChooseGroups = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '80%',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      height: 350,
      overflowY: 'auto',
      padding: 10, 
    },
    chip: {
      marginTop: theme.spacing(1), 
      marginRight: theme.spacing(1) 
    },
    chipAdd: {
      marginTop: theme.spacing(1), 
      marginRight: theme.spacing(1) ,
      background: '#99FF99'
    },
    header: {
      color: '#777'
    },
  }));

  const { userListController } = useContext(CreateAssessmentContext);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [userList, setUserList] = userListController;
  const [openAddEvaluator, setOpenAddEvaluator] = useState(false);

  const union = (oldUsers, newUsers, newProfile_id) => {
    if(!newProfile_id) {
      return [...oldUsers, {...newUsers, profile_ids: [0], count: Infinity }];
    }

    if(oldUsers.length === 0) {
      return newUsers.map(user => ({...user, profile_ids: [newProfile_id], count: 1}))
    }

    if(newUsers.length === 0) {
      return oldUsers;
    }

    const oldUsersIds = oldUsers.map(user => user.id);
    const newUsersIds = newUsers.map(user => user.id);

    const A = oldUsers.filter(user => !newUsersIds.includes(user.id));
    const B = newUsers.filter(user => !oldUsersIds.includes(user.id));
    const AB = oldUsers.filter(user => newUsersIds.includes(user.id));

    return [
      ...A, 
      ...B.map(user => ({...user, profile_ids: [newProfile_id], count: 1})),
      ...AB.map(user => ({...user, profile_ids: [...user.profile_ids, newProfile_id], count: user.count + 1}))
    ]
  }

  const loadEvaluators = async (id) => {
    loadEvaluatorsByProfile({
      id: Number(id)
    }).then(data => {

      setUserList(union(userList, data, id));
    }).catch(error => {

      if(Number(error.id) !== RUNTIME_ERROR) {
        alert(error.detail);
      } else {
        alert('Error on load Evaluators');
      }

    })
  }

  const updateUsers = (id) => {
    setUserList(userList.map(user => {
      if(!user.profile_ids.includes(id)) {
        return user;
      } else {
        return {...user, count: user.count - 1};
      }
    }).filter(user => user.count > 0));
  }

  useEffect(() => {
    loadProfiles().then(data => {

      setProfiles(data);
    }).catch(error => {

      if(Number(error.id) !== RUNTIME_ERROR) {
        alert(error.detail);
      } else {
        alert('Error on load Profiles');
      }

    });
  }, []);

  const handleSelectetProfile = (newProfile) => {
    if(!newProfile) return;
    loadEvaluators(newProfile.id);
    setSelectedProfiles([...selectedProfiles, newProfile]);
    setProfiles(profiles.filter(profile => profile.id !== newProfile.id));
  }

  const handleRemoveProfile = (oldProfile) => {
    updateUsers(oldProfile.id);
    setSelectedProfiles(selectedProfiles.filter(profile => profile.id !== oldProfile.id));
    setProfiles([...profiles, oldProfile]);
  } 

  const handleRemoveUser = (oldUser) => {
    setUserList(userList.filter(user => user.id !== oldUser.id));
  }

  const handleAddUser = (newUser) => {
    if(!userList.some(user => user.id === newUser.id)) {
      setUserList(union(userList, newUser));
    }
  }

  const handleOpenAddEvaluator = () => {
    setOpenAddEvaluator(true);
  }

  const handleCloseAddEvaluator = () => {
    setOpenAddEvaluator(false);
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        autoHighlight
        clearOnEscape
        options={profiles}
        getOptionLabel={profile => profile.name}
        onChange={(event, newValue) => handleSelectetProfile(newValue)}
        renderInput={(params) => <TextField {...params} label="profile name" variant="outlined" />}
      />
      {selectedProfiles.length > 0 && (
        <List component="nav">
          <Typography variant="body1" align="center" className={classes.header}>
            SELECTED PROFILES
          </Typography>
          <Divider />
          <Grid container>
            {selectedProfiles.map(profile => (
              <Grid key={profile.id} item sm={4}>
                <ListItemDefault
                  primaryText={profile.name}
                  secondaryText={profile.detail}
                  tooltipText={profile.detail}
                  onClick={() => handleRemoveProfile(profile)}
                  onClicksecondaryAction={() => handleRemoveProfile(profile)}
                  iconSecondaryAction={<CancelIcon />}
                  active
                />
              </Grid>
            ))}
          </Grid>
        </List>
      )}
      <List component="nav">
        <Typography variant="body1" align="center" className={classes.header}>
          EVALUATORS LIST
        </Typography>
        <Divider />
        <Chip
          className={classes.chipAdd}
          onClick={handleOpenAddEvaluator}
          label="Add Evaluator"
          icon={<AddIcon />}
        />
        {userList.map(user => (
          <Chip
            key={user.id}
            color="primary"
            className={classes.chip}
            label={user.email}
            onDelete={() => handleRemoveUser(user)}
          />
        ))}
      </List>
      {openAddEvaluator && <AddEvaluator handleClose={handleCloseAddEvaluator} handleAdd={handleAddUser} />}
    </div>
  );
}

const Confimation = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      width: '100%',
      height: 350,
      overflowY: 'auto',
      padding: 10,
    },
    header: {
      color: '#777'
    },
    value: {
      color: '#333'
    },
  }))

  const controller = useContext(CreateAssessmentContext);
  const [ details ] = controller.detailsController;
  const [ tasks ] = controller.tasksController;
  const [ questionnaire ] = controller.questionnaireController
  const [ evaluators ] = controller.userListController;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="body1" align="center" className={classes.header}>
          INFORMATIONS
        </Typography>
      <Typography className={classes.value} variant="body1" component="p">
        Name: {details.name}
      </Typography>
      <Typography className={classes.value} variant="subtitle1" component="p">
        Details: {details.detail}
      </Typography>
      <Divider />
      <Typography variant="body1" align="center" className={classes.header}>
        QUESTIONNAIRE
      </Typography>
      <Typography className={classes.value} variant="body1" component="p">
        Name: {questionnaire.name}
      </Typography>
      <Typography className={classes.value} variant="subtitle1" component="p">
        Details: {questionnaire.detail}
      </Typography>
      <Divider />
      <List component="nav">
        <Typography variant="body1" align="center" className={classes.header}>
          TASKS
        </Typography>
        <Grid container>
          {tasks.map(task => (
            <Grid key={task.id} item sm={4}>
              <ListItemDefault
                primaryText={task.name}
                secondaryText={task.detail}
                tooltipText={task.detail}
                onClick={() => {}}
              />
            </Grid>
          ))}
        </Grid>
      </List>
      <Divider />
      <List component="nav">
        <Typography variant="body1" align="center" className={classes.header}>
          EVALUATORS
        </Typography>
        <Grid container>
          {evaluators.map(evaluator => (
            <Grid key={evaluator.id} item sm={4}>
              <ListItemDefault
                primaryText={evaluator.name}
                secondaryText={evaluator.email}
                tooltipText={evaluator.email}
                onClick={() => {}}
              />
            </Grid>
          ))}
        </Grid>
      </List>
    </div>
  )
}

export default function CreateEvaluation() {
  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(4),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      height: 350,
      display: 'flex',
      justifyContent: 'center'
    },
    finalText: {
      display: 'flex',
      justifyContent: 'center'
    },
    finalContainer: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      height: 350,
    },
    image: {
      display: 'block', 
      marginLeft: 'auto', 
      marginRight: 'auto', 
      width: '50%'
    },
    buttons: {
      display: 'flex',
      alignItems: 'space-between',
      justifyContent: 'center',
    }
  }));
  
  const getSteps = () => {
    return [
      'Enter name and details about your evaluation', 
      'Choose the tasks to be evaluated',
      'Choose a questionnaire', 
      'Choose evaluators',
      'Confimation'
    ];
  }

  const { viewController, currentAssessmentController } = useContext(AssessmentContext);
  const [ currentEvaluation, setCurrentEvaluation ] = currentAssessmentController;
  const [ view, setView ] = viewController;

  const controller = useContext(CreateAssessmentContext);
  const [ details ] = controller.detailsController;
  const [ tasks ] = controller.tasksController;
  const [ questionnaire ] = controller.questionnaireController
  const [ evaluators ] = controller.userListController;

  const conditions = [
    details.name.length > 5,
    tasks.length > 0,
    questionnaire.id !== undefined,
    evaluators.length > 0
  ]

  const completeStep = step => conditions[step];

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <AssessmentDetails />;
      case 1:
        return <ChooseTasks />;
      case 2:
        return <ChooseQuestionnaire />;
      case 3:
        return <ChooseGroups />;
      case 4:
        return <Confimation />
      default:
        return 'Unknown stepIndex';
    }
  }

  const [activeStep, setActiveStep] = useState(3);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

  const [dataSnackbar, setDataSnackbar] = useState({
    open: Boolean(currentEvaluation.id),
    severity: 'warning',
    message: `Make sure the changes to the evaluation "${currentEvaluation.name}" have been saved`
  });

  const handleOpenSnackbar = (severity, message) => {
    setDataSnackbar({
      open: true,
      severity,
      message
    });
  }

  const handleCloseSnackbar = () => {
    setDataSnackbar({
      ...dataSnackbar,
      open: false,
    });
  }

  const backToShow = () => {
    if(view === 'create') {
      setView('show');
    }
  };

  const handleConfirm = () => {
    storeEvaluation({
      name: details.name,
      detail: details.detail,
      questionnaire_id: Number(questionnaire.id),
      tasks_id: tasks.map(task => Number(task.id)),
      evaluators_id: evaluators.map(evaluator => Number(evaluator.id))
    }).then(data => {

      setCurrentEvaluation(data);

      handleOpenSnackbar('success', 'You have successfully created the Evaluation!');
    }).catch(error => {

      if(Number(error.id) !== RUNTIME_ERROR) {
        handleOpenSnackbar('error', error.detail);
      } else {
        handleOpenSnackbar('error', 'The Evaluation was not created');
      }

    }).finally(() => {

      handleNext();
    })
  }

  const classes = useStyles();

  return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={6000}
          open={dataSnackbar.open}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={dataSnackbar.severity}>
            {dataSnackbar.message}
          </Alert>
        </Snackbar>
        <div>
          {activeStep === steps.length ? (
            <div>
              <div className={classes.finalContainer}>
                <img 
                  className={classes.image}
                  src={CompletedStepsSvg} 
                  alt="All steps have been completed!" 
                />
                <Typography 
                  className={classes.finalText} 
                  variant="h5"
                >
                  All steps have been completed!
                </Typography>
              </div>
              <div className={classes.buttons}>
                <Button onClick={backToShow}>View Assessments</Button>
              </div>
            </div>
          ) : (
            <div>
              <div className={classes.instructions}>
                {getStepContent(activeStep)}
              </div>
              <div className={classes.buttons}>
                <Button
                  disabled={activeStep === 0}
                  color="primary"
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                {activeStep < steps.length - 1 ? (
                  <Button
                    disabled={!completeStep(activeStep)}
                    variant="contained" 
                    color="secondary"
                    onClick={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button variant="contained" color="secondary" onClick={handleConfirm}>
                    Confirm
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
  );
}

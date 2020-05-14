import React, { useState, useEffect, useContext } from 'react';
import api from '../../../../services/api';
import { CreateAssessmentContext } from '../../context/CreateAssessmentContext';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CancelIcon from '@material-ui/icons/Cancel';
import AddIcon from '@material-ui/icons/AddCircle';
import CompletedStepsImage from '../../../../assets/completed_steps.png';

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
  const [ get, set ] = detailsController;
  const { name, detail } = get;

  const handleName = e => {
    const { value } = e.target;
    if(value.length <= 100) {
      set({...get, name: value});
    }
  }

  const handleDetails = e => {
    const { value } = e.target;
    if(value.length <= 300) {
      set({...get, detail: value});
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
  const Divider = () => <hr></hr>

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
    paper: {
      background: 'linear-gradient(45deg, #21CBF3 90%, #2196F3 30%)',
      marginTop: 10
    },
    name: {
      color: '#FFF' 
    },
    url: {
      color: '#FFF' 
    }
  }))

  const { questionnaireController } = useContext(CreateAssessmentContext);
  const [ selectedQuestionnaire, setSelectedQuestionnaire ] = questionnaireController;

  const [questionnaires, setQuestionnaires] = useState([]);

  const loadQuestionnaires = async () => {
		const response = await api.post('questionnaires/index.php');
		response.data.status === 'success'
			?	setQuestionnaires(response.data.docs)
      :	alert('Error loading questionnaires')
  }

  const handleSelectQuestionnaire = (questionnaire) => {
    if(selectedQuestionnaire !== questionnaire) {
      setSelectedQuestionnaire(questionnaire)
    }
  }
  
  useEffect(() => {
    loadQuestionnaires();
  }, []);

  const classes = useStyles();

  return (
    <List className={classes.root} component="nav">
      <Typography variant="body1" align="center" className={classes.header}>
        QUESTIONNAIRE LIST
      </Typography>
      <Divider />
      {questionnaires.map(questionnaire => (
        <Paper key={questionnaire.id} className={classes.paper}>
          <Tooltip title={questionnaire.detail || 'No details'} arrow placement="top">
            <ListItem button onClick={() => handleSelectQuestionnaire(questionnaire)}>
              <ListItemText 
                primary={<Typography className={classes.name}>{questionnaire.name}</Typography>}
                secondary={<Typography className={classes.detail} noWrap>{questionnaire.detail}</Typography>}
              />
            </ListItem>
          </Tooltip>
        </Paper>
      ))}
    </List>
  )
}

const ListQuestions = () => {
  const Divider = () => <hr></hr>

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
    },
    paper: {
      background: 'linear-gradient(45deg, #2196F3 90%, #21CBF3 30%)',
      margin: theme.spacing(1)
    },
    criterion: {
      color: '#FFF' 
    },
    text: {
      color: '#DDD' 
    }
  }));

  const { questionnaireController } = useContext(CreateAssessmentContext);
  const [ questionnaire ] = questionnaireController;

  const [questions, setQuestions] = useState([]);

  const loadQuestions = async (id) => {
		const response = await api.post('questionnaires/questions.php', { id: Number(id) });
		response.data.status === 'success'
			?	setQuestions(response.data.docs)
      :	alert('Error loading questions')
	}

  useEffect(() => {
    if(questionnaire.id) {
      loadQuestions(questionnaire.id);
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
            <Paper className={classes.paper}>
              <Tooltip title={question.text || 'No details'} arrow placement="top">
                <ListItem>
                  <ListItemText 
                    primary={<Typography className={classes.criterion}>{question.criterion}</Typography>}
                    secondary={<Typography className={classes.text} variant="subtitle2" noWrap>{question.text}</Typography>}
                  />
                </ListItem>
              </Tooltip>
            </Paper>
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
        <WebsiteList setWebsite={setWebsite} />
      </Grid>
      <Grid item sm={8}>
        <TaskList website={website} />
      </Grid>
    </Grid>
  )
}

const WebsiteList = ({ setWebsite }) => {
  const Divider = () => <hr></hr>

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
    paper: {
      background: 'linear-gradient(45deg, #21CBF3 90%, #2196F3 30%)',
      marginTop: 10
    },
    name: {
      color: '#FFF' 
    },
    url: {
      color: '#FFF' 
    }
  }))

  const [websites, setWebsites] = useState([]);

  const loadWebsites = async () => {
    const response = await api.post('/websites/index.php');
    const { data } = response;
    if(data.status === 'success') {
      setWebsites(data.docs);
    } else {
      alert('Error on load websites');
    }
  }

  const handleSelectWebsite = website => setWebsite(website)

  useEffect(() => {
    loadWebsites();
  }, []);

  const classes = useStyles();

  return (
    <List className={classes.root} component="nav">
      <Typography variant="body1" align="center" className={classes.header}>
        WEBSITE LIST
      </Typography>
      <Divider />
      {websites.map(website => (
        <Paper key={website.id} className={classes.paper}>
          <Tooltip title={website.url} arrow placement="top">
            <ListItem button onClick={() => handleSelectWebsite(website)}>
              <ListItemText 
                primary={<Typography className={classes.name}>{website.name}</Typography>}
                secondary={<Typography className={classes.url} noWrap>{website.url}</Typography>}
              />
            </ListItem>
          </Tooltip>
        </Paper>
      ))}
    </List>
  )
}

const TaskItem = ({ task }) => {
  const { tasksController } = useContext(CreateAssessmentContext);
  const [ tasks, setTasks ] = tasksController;

  const [selected, setSelected] = useState(false);

  const useStyles = makeStyles(theme => ({
    paper: {
      background: 
        selected 
          ? 'linear-gradient(45deg, #2196F3 90%, #99FF99 30%)'
          : 'linear-gradient(45deg, #2196F3 90%, #21CBF3 30%)',
      margin: theme.spacing(1)
    },
    name: {
      color: '#FFF' 
    },
    detail: {
      color: '#FFF' 
    }
  }))

  const handleClickTask = () => {
    if(selected) {
      setTasks(tasks.filter(selectedTask => selectedTask.id !== task.id ))
      setSelected(false);
    } else {
      setTasks([...tasks, task])
      setSelected(true);
    }
  }

  const classes = useStyles();

  return (
    <Grid item sm={6}>
      <Paper className={classes.paper}>
        <Tooltip title={task.detail || 'No details'} arrow placement="top">
          <ListItem button onClick={handleClickTask}>
            <ListItemText 
              primary={<Typography className={classes.name}>{task.name}</Typography>}
              secondary={<Typography className={classes.detail} noWrap>{task.detail}</Typography>}
            />
          </ListItem>
        </Tooltip>
      </Paper>
    </Grid>
  )
}

const TaskList = ({ website }) => {
  const Divider = () => <hr></hr>

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

  const loadTasks = async (id) => {
    const response = await api.post('/websites/tasks.php', { id: Number(id) });
    const { data } = response;
    if(data.status === 'success') {
      setTasks(data.docs);
    } else {
      alert('Error on load tasks');
    }
  }

  useEffect(() => {
    if(website.id) {
      loadTasks(website.id)
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
  const Divider = () => <hr></hr>

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '80%',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      height: 350,
      overflowY: 'auto',
      padding: 10, 
    },
    paper: {
      background: 'linear-gradient(45deg, #2196F3 90%, #99FF99 30%)',
      margin: theme.spacing(1)
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
    icon: {
      color: '#FFF'
    },
    name: {
      color: '#FFF' 
    },
    detail: {
      color: '#FFF' 
    }
  }));

  const { userListController } = useContext(CreateAssessmentContext);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [userList, setUserList] = userListController;

  const loadProfiles = async () => {
    const response = await api.post('/profiles/index.php');
    const { data } = response;
    if(data.status === 'success') {
      setProfiles(data.docs);
    } else {
      alert('Error on load profiles');
    }
  }

  const union = (oldUsers, newUsers, newProfile_id) => {
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

  const loadUsers = async (id) => {
    const response = await api.post('/profiles/evaluators.php', { id: Number(id) });
    const { data } = response;
    if(data.status === 'success') {
      const newUsers = data.docs;
      setUserList(union(userList, newUsers, id));
    } else {
      alert('Error on load evaluators');
    }
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
    loadProfiles();
  }, []);

  const handleSelectetProfile = (newProfile) => {
    if(!newProfile) return;
    loadUsers(newProfile.id);
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

  console.log(userList);

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
                <Paper className={classes.paper}>
                  <Tooltip title={profile.detail || 'No details'} arrow placement="top">
                    <ListItem>
                      <ListItemText 
                        primary={<Typography className={classes.name}>{profile.name}</Typography>}
                        secondary={<Typography className={classes.detail} noWrap>{profile.detail}</Typography>}
                      />
                      <ListItemSecondaryAction onClick={() => handleRemoveProfile(profile)}>
                        <IconButton edge="end">
                          <CancelIcon className={classes.icon} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Tooltip>
                </Paper>
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
          onClick={() => alert('Add')}
          label="Add user"
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
    </div>
  );
}

const Confimation = () => {
  return (
    <div>Confimation</div>
  )
}

export default function StepperView() {
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
      marginRight: 'auto'
    },
    buttons: {
      display: 'flex',
      alignItems: 'space-between',
      justifyContent: 'center',
    }
  }));
  
  const getSteps = () => {
    return [
      'Enter name and details about your assessment', 
      'Choose the tasks to be evaluated',
      'Choose a questionnaire', 
      'Choose evaluators',
      'Confimation'
    ];
  }

  const controller = useContext(CreateAssessmentContext);
  const [ details ] = controller.detailsController;
  const [ tasks ] = controller.tasksController;
  const [ questionnaire ] = controller.questionnaireController
  const [ evaluators ] = controller.userListController;

  // const conditions = [
  //   details.name.length > 5,
  //   tasks.length > 0,
  //   questionnaire.id !== undefined,
  //   evaluators.length > 0
  // ]

  const conditions = [ true, true, true, true ];

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

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleFinish = () => {
    console.log({questionnaire, details, tasks});
    handleNext();
    alert('finish');
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
        <div>
          {activeStep === steps.length ? (
            <div>
              <div className={classes.finalContainer}>
                <img 
                  className={classes.image}
                  src={CompletedStepsImage} 
                  width="500" 
                  heigth="300" 
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
                <Button onClick={handleReset}>Create another Assessment</Button>
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
                  <Button variant="contained" color="secondary" onClick={handleFinish}>
                    Finish
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
  );
}

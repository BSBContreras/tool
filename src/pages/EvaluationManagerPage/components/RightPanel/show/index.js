import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../../../../services/api';
import { AssessmentContext } from '../../../context/AssessmentContext';
import SelectAssessmentSvg from '../../../../../assets/instant_information.svg'
import TaskModal from './TaskModal';
import QuestionModal from './QuestionModal';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Modal from '@material-ui/core/Modal';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ShowEvaluators from './ShowEvaluators';
import ShowQuestionnaire from './ShowQuestionnaire';
import ShowTasks from './ShowTasks';
import ShowGeneral from './ShowGeneral';

import Tabs from '../../../../../components/Tabs'; 

const lorens = [
  'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam efficitur pharetra felis, in rutrum massa porta vitae. Ut tristique consectetur ipsum quis placerat. Fusce finibus.',
  'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras hendrerit scelerisque est a ornare. Suspendisse imperdiet odio tellus, et porta turpis consequat eu. Fusce in posuere.',
  'Proin vel nibh eget dui ornare placerat. Duis nibh felis, varius vitae magna sed, pretium placerat sem. Sed nibh mi, malesuada vitae est ac, porta mattis ipsum. Fusce ut interdum.',
  'In hac habitasse platea dictumst. Vestibulum semper augue non convallis laoreet. Morbi sagittis, libero id sodales eleifend, justo nibh volutpat lectus, quis venenatis ex sem in augue. In in lectus.',
  'Donec egestas enim urna. Maecenas tempus velit quis magna blandit iaculis. Morbi condimentum congue sapien in ultrices. Praesent nec odio quis turpis sagittis convallis. Nam interdum facilisis tortor, ac mollis.'
];

const loren = () => (lorens[Math.floor(Math.random() * lorens.length)]);

const Divider = () => <hr></hr>;

const TaskList = ({ classes }) => {

  const controller = useContext(AssessmentContext);
  const [currentAssessment] = controller.currentAssessmentController;

  const [tasks, setTasks] = useState([])

  const loadTasks = async (id) => {
    const response = await api.post('/assessments/tasks.php', { id: Number(id) });
    const { data } = response;
    if(data.status === 'success') {
      setTasks(data.docs);
    } else {
     alert('error to load tasks');
    }
  }

  useEffect(() => {
    if(currentAssessment.id) {
      loadTasks(currentAssessment.id);
    }
  }, [currentAssessment])

  return (
    <div className={classes.list}>
      <Typography className={classes.header} variant="body1" align="center">
        TASK LIST
      </Typography>
      <Divider />
      <List component="div">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </List>
    </div>
  );
}

const TaskItem = ({ task }) => {
  const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      marginTop: theme.spacing(1),
      background: 'linear-gradient(45deg, #2196F3 90%, #21CBF3 30%)'
    },
    primary: {
      color: '#FFF'
    },
    secondary: {
      color: '#EEE'
    },
  }));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => { 
    setOpen(true) 
  };

  const handleClose = () => { 
    setOpen(false) 
  };

  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper}>
        <ListItem button onClick={handleClickOpen}>
          <Tooltip title="Click to view more information" arrow placement="top">
            <ListItemText 
              primary={<Typography className={classes.primary}>{task.name}</Typography>}
              secondary={<Typography className={classes.secondary} variant="subtitle2">{task.detail}</Typography>}
            />
          </Tooltip>
        </ListItem>
      </Paper>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
      >
        <TaskModal task={task} />
      </Modal>
    </>
  );
}

const QuestionsList = ({ classes }) => {

  const questions = [
    {
      id: 1,
      text: loren(),
    },
    {
      id: 2,
      text: loren(),
    },
    {
      id: 3,
      text: loren(),
    }
  ];

  return (
    <div className={classes.list}>
      <Typography className={classes.header} variant="body1" align="center">
        QUESTIONNAIRE
      </Typography>
      <Divider />
      <List>
        {questions.map(question => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </List>
    </div>
  );
}

const QuestionItem = ({ question }) => {

  const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: 750,
      height: window.screen.height * 0.8,
      overflowY: 'auto'
    },
    header: {
      margin: theme.spacing(2)
    },
    from: {
      fontSize: 14,
    },
    card: {
      marginTop: 10,
      background: '#EEE'
    }
  }));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => { setOpen(true) };

  const handleClose = () => { setOpen(false) };

  const classes = useStyles();

  return (
    <>
      <ListItem button onClick={handleClickOpen}>
        <ListItemText primary={
          <Typography noWrap>
            {question.text}
          </Typography>}
        />
      </ListItem>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
      >
        <QuestionModal question={question} />
      </Modal>
    </>
  );
}

export default function ShowEvaluationPanel() {
  
  const controller = useContext(AssessmentContext);
  const [currentAssessment] = controller.currentAssessmentController;
  const [view, setView] = controller.viewController;

  const useStyles = makeStyles(theme => ({
    container: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    title: {
      color: '#444'
    },
    svg: {
      maxHeight: '350px'
    },
    link: {
      color: theme.palette.primary.main,
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    containerRoot: {
      height: '100%', 
      padding: theme.spacing(1)
    },
    content: {
      padding: theme.spacing(1),
      height: 'calc(100% - 45px)'
    }
  }));

  const handleCreateAssessment = () => {
    if(view !== 'create') {
      setView('create');
    }
  }

  useEffect(() => {
    if(currentAssessment.id){
      loadAssessment(currentAssessment.id);
    }
  }, [currentAssessment]);

  const [assessment, setAssessment] = useState({});

  const loadAssessment = async (id) => {
    const response = await api.post('/assessments/show.php', { id: Number(id) });
    const { data } = response;
    if(data.status === 'success') {
      setAssessment(data.docs);
    } else {
     alert('error to load Evaluation');
    }
  }

  const { manager, questionnaire } = assessment;

  const getTab = () => {
    return [
      'General', 
      'Tasks',
      'Questionnaire',
      'Evaluators'
    ]
  }

  const getPanel = (index) => {
    switch(index) {
      case 0: return <ShowGeneral />; 
      case 1: return <ShowTasks />;
      case 2: return <ShowQuestionnaire />;
      case 3: return <ShowEvaluators />;
      default: return <>Not Found</>;
    }
  }

  const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  return assessment.id ? 
    (
      <div className={classes.containerRoot}>
        <div className={classes.tabs}>
          <Tabs
            value={value}
            handleChange={handleChange}
            tabs={getTab()}
          />
        </div>
        <div className={classes.content}> 
          {getPanel(value)} 
        </div>
      </div>
  ) : (
    <div className={classes.container}>
      <Typography 
        className={classes.title}
        variant="h4"
      >
        Select a Evaluation on the Left
      </Typography>
      <img 
        className={classes.svg}
        src={SelectAssessmentSvg} 
        alt="Select some evaluation" 
      /> 
      <Typography 
        className={classes.link}
        variant="subtitle1"
        onClick={handleCreateAssessment}
      >
        Or Click here to add a New Evaluation
      </Typography>
    </div>
  )
}

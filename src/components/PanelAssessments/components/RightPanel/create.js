import React, { useState, useEffect } from 'react';
import api from '../../../../services/api';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Autocomplete from '@material-ui/lab/Autocomplete';

const AssessmentDetails = ({ set, get }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(2),
      width: '80%'
    },
    item: {
      marginTop: theme.spacing(1)
    }
  }));

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

const ChooseGroups = () => {
  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     width: '100%',
  //     '& > * + *': {
  //       marginTop: theme.spacing(3),
  //     },
  //   },
  // }));

  // const top100Films = [
  //   { title: 'The Shawshank Redemption', year: 1994 },
  //   { title: 'The Godfather', year: 1972 },
  //   { title: 'The Godfather: Part II', year: 1974 },
  //   { title: 'The Dark Knight', year: 2008 },
  //   { title: '12 Angry Men', year: 1957 },
  //   { title: "Schindler's List", year: 1993 },
  //   { title: 'Pulp Fiction', year: 1994 },
  //   { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  //   { title: 'The Good, the Bad and the Ugly', year: 1966 },
  //   { title: 'Fight Club', year: 1999 },
  //   { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  //   { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  //   { title: 'Forrest Gump', year: 1994 },
  //   { title: 'Inception', year: 2010 },
  //   { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  //   { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  //   { title: 'Goodfellas', year: 1990 },
  //   { title: 'The Matrix', year: 1999 },
  //   { title: 'Seven Samurai', year: 1954 },
  //   { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  //   { title: 'City of God', year: 2002 },
  //   { title: 'Se7en', year: 1995 },
  //   { title: 'The Silence of the Lambs', year: 1991 },
  //   { title: "It's a Wonderful Life", year: 1946 },
  //   { title: 'Life Is Beautiful', year: 1997 },
  //   { title: 'The Usual Suspects', year: 1995 },
  //   { title: 'Léon: The Professional', year: 1994 },
  //   { title: 'Spirited Away', year: 2001 },
  //   { title: 'Saving Private Ryan', year: 1998 },
  //   { title: 'Once Upon a Time in the West', year: 1968 },
  //   { title: 'American History X', year: 1998 },
  //   { title: 'Interstellar', year: 2014 },
  //   { title: 'Casablanca', year: 1942 },
  //   { title: 'City Lights', year: 1931 },
  //   { title: 'Psycho', year: 1960 },
  //   { title: 'The Green Mile', year: 1999 },
  //   { title: 'The Intouchables', year: 2011 },
  //   { title: 'Modern Times', year: 1936 },
  //   { title: 'Raiders of the Lost Ark', year: 1981 },
  //   { title: 'Rear Window', year: 1954 },
  //   { title: 'The Pianist', year: 2002 },
  //   { title: 'The Departed', year: 2006 },
  //   { title: 'Terminator 2: Judgment Day', year: 1991 },
  //   { title: 'Back to the Future', year: 1985 },
  //   { title: 'Whiplash', year: 2014 },
  //   { title: 'Gladiator', year: 2000 },
  //   { title: 'Memento', year: 2000 },
  //   { title: 'The Prestige', year: 2006 },
  //   { title: 'The Lion King', year: 1994 },
  //   { title: 'Apocalypse Now', year: 1979 },
  //   { title: 'Alien', year: 1979 },
  //   { title: 'Sunset Boulevard', year: 1950 },
  //   { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
  //   { title: 'The Great Dictator', year: 1940 },
  //   { title: 'Cinema Paradiso', year: 1988 },
  //   { title: 'The Lives of Others', year: 2006 },
  //   { title: 'Grave of the Fireflies', year: 1988 },
  //   { title: 'Paths of Glory', year: 1957 },
  //   { title: 'Django Unchained', year: 2012 },
  // ];

  // const classes = useStyles();

  return <h1></h1>;

  // return (
  //   <div className={classes.root}>
  //     <Autocomplete
  //       multiple
  //       id="tags-standard"
  //       options={top100Films}
  //       getOptionLabel={(option) => option.title}
  //       defaultValue={[top100Films[13]]}
  //       renderInput={(params) => (
  //         <TextField
  //           {...params}
  //           variant="standard"
  //           label="Multiple values"
  //           placeholder="Favorites"
  //         />
  //       )}
  //     />
  //     <Autocomplete
  //       multiple
  //       id="tags-outlined"
  //       options={top100Films}
  //       getOptionLabel={(option) => option.title}
  //       defaultValue={[top100Films[13]]}
  //       filterSelectedOptions
  //       renderInput={(params) => (
  //         <TextField
  //           {...params}
  //           variant="outlined"
  //           label="filterSelectedOptions"
  //           placeholder="Favorites"
  //         />
  //       )}
  //     />
  //     <Autocomplete
  //       multiple
  //       id="tags-filled"
  //       options={top100Films.map((option) => option.title)}
  //       defaultValue={[top100Films[13].title]}
  //       freeSolo
  //       renderTags={(value, getTagProps) =>
  //         value.map((option, index) => (
  //           <Chip variant="outlined" label={option} {...getTagProps({ index })} />
  //         ))
  //       }
  //       renderInput={(params) => (
  //         <TextField {...params} variant="filled" label="freeSolo" placeholder="Favorites" />
  //       )}
  //     />
  //   </div>
  // );
}

const ChooseQuestionnaire = ({ get, set }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      alignItems: 'space-between',
      justifyContent: 'center',
    },
    item: {
      margin: theme.spacing(2),
      width: '100%'
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.item}>
        <ListQuestionnaires set={set} />
      </div>
      <div className={classes.item}>
        <ListQuestions questionnaire={get} />
      </div>
    </div>
  )
}

const ListQuestionnaires = ({ set }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 500,
      height: 350,
      overflowY: 'auto'
    }
  }));

  useEffect(() => {
    loadQuestionnaires();
  }, []);

  const [questionnaires, setQuestionnaires] = useState([]);

  const loadQuestionnaires = async () => {
		const response = await api.post('questionnaires/index.php');
		response.data.status === 'success'
			?	setQuestionnaires(response.data.docs)
      :	alert('Error loading questionnaires')
	}

  const classes = useStyles();

  return (
  <List
    component="nav"
    subheader={
      <ListSubheader component="div">
        Questionnaires
      </ListSubheader>
    }
    className={classes.root}
  >
    {questionnaires.map(questionnaire => (
      <ListItem key={questionnaire.id} button onClick={() => set(questionnaire)}>
        <ListItemText 
          primary={questionnaire.name}
          secondary={questionnaire.detail}
        />
      </ListItem>
    ))}
  </List>
  )
}

const ListQuestions = ({ questionnaire }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 500,
      height: 350,
      overflowY: 'auto'
    }
  }));

  useEffect(() => {
    if(questionnaire.id) {
      loadQuestions(questionnaire.id);
    }
  }, [questionnaire]);

  const [questions, setQuestions] = useState([]);

  const loadQuestions = async (id) => {
		const response = await api.post('questionnaires/questions.php', { id: Number(id) });
		response.data.status === 'success'
			?	setQuestions(response.data.docs)
      :	alert('Error loading questions')
	}

  const classes = useStyles();

  return (
  <List
    component="nav"
    subheader={
      <ListSubheader component="div">
        {questionnaire.name || 'Questions'}
      </ListSubheader>
    }
    className={classes.root}
  >
    {questions.map(question => (
      <ListItem key={question.id} button>
        <ListItemText 
          primary={question.text}
          secondary={question.criterion}
        />
      </ListItem>
    ))}
  </List>
  )
}

const ChooseTasks = ({ get, set }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      alignItems: 'space-between',
      justifyContent: 'center',
    },
    item: {
      margin: theme.spacing(2),
      width: '100%'
    }
  }));

  const [website, setWebSite] = useState({});

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.item}>
        <ListWebSites set={setWebSite} />
      </div>
      <div className={classes.item}>
        <ListTasks website={website} set={set} get={get} />
      </div>
    </div>
  )
}

const ListWebSites = ({ set }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 500,
      height: 350,
      overflowY: 'auto'
    }
  }));

  useEffect(() => {
    loadWebsites();
  }, []);

  const [websites, setWebsites] = useState([]);

  // const loadWebsites = async () => {
	// 	const response = await api.post('websites/index.php');
	// 	response.data.status === 'success'
	// 		?	setWebsites(response.data.docs)
  //     :	alert('Error loading websites')
  // }
  
  const loadWebsites = async () => {
    setWebsites([
      {
        id: 1,
        name: 'website 1',
        url: 'http://www.websitedefault.com'
      },
      {
        id: 2,
        name: 'website 2',
        url: 'http://www.websitedefault.com'
      },
      {
        id: 3,
        name: 'website 3',
        url: 'http://www.websitedefault.com'
      },
    ])
  }

  const classes = useStyles();

  return (
  <List
    component="nav"
    subheader={
      <ListSubheader component="div">
        WebSites
      </ListSubheader>
    }
    className={classes.root}
  >
    {websites.map(website => (
      <ListItem key={website.id} button onClick={() => set(website)}>
        <ListItemText 
          primary={website.name}
          secondary={website.url}
        />
      </ListItem>
    ))}
  </List>
  )
}

const ListTasks = ({ website, set, get }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 500,
      height: 350,
      overflowY: 'auto'
    }
  }));

  useEffect(() => {
    if(website.id) {
      loadTasks(website.id);
    }
  }, [website]);

  const [tasks, setTasks] = useState([]);

  // const loadTasks = async (id) => {
	// 	const response = await api.post('websites/tasks.php', { id: Number(id) });
	// 	response.data.status === 'success'
	// 		?	setTasks(response.data.docs)
  //     :	alert('Error loading tasks')
  // }
  
  const loadTasks = async (id) => {
    setTasks([
      {
        id: 1,
        name: 'task 1',
        detail: 'task 1 details'
      },
      {
        id: 2,
        name: 'task 2',
        detail: 'task 2 details'
      },
      {
        id: 3,
        name: 'task 3',
        detail: 'task 3 details'
      },
    ])
  }
  
  const handleTask = task => {
    const index = get.indexOf(task)
    if(index === -1) {
      set([...get, task]);
    } else {
      get.splice(index, 1);
      set([...get]);
    }
  }

  const classes = useStyles();

  return (
  <List
    component="nav"
    subheader={
      <ListSubheader component="div">
        {website.name || 'Tasks'}
      </ListSubheader>
    }
    className={classes.root}
  >
    {tasks.map(task => (
      <ListItem 
        button
        key={task.id}
        selected={get.map(task => task.id).includes(task.id)}
        onClick={() => handleTask(task)}
      >
        <ListItemText 
          primary={task.name}
          secondary={task.detail}
        />
      </ListItem>
    ))}
  </List>
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
    buttons: {
      display: 'flex',
      alignItems: 'space-between',
      justifyContent: 'center',
    }
  }));

  const getSteps = () => {
    return [
      'Enter name and details about your assessment', 
      'Choose a questionnaire', 
      'Choose the tasks to be evaluated',
      'Select groups'
    ];
  }

  const [questionnaire, setQuestionnaire] = useState({});
  const [details, setDetails] = useState({ name: '', detail: '' });
  const [tasks, setTasks] = useState([]);

  const conditions = [
    details.name.length > 5,
    questionnaire.id !== undefined,
    tasks.length !== 0,
    true,
  ]

  const completeStep = step => conditions[step];

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <AssessmentDetails set={setDetails} get={details} />;
      case 1:
        return <ChooseQuestionnaire set={setQuestionnaire} get={questionnaire} />;
      case 2:
        return <ChooseTasks set={setTasks} get={tasks} />;
      case 3:
        return <ChooseGroups />;
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
            <Typography className={classes.instructions}>All steps completed</Typography>
            <div className={classes.buttons}>
              <Button onClick={handleReset}>Reset</Button>
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

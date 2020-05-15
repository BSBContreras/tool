import React, { useState, useEffect, useContext } from 'react';
import api from '../../../../services/api';
import { AssessmentContext } from '../../context/AssessmentContext';
import SelectAssessmentSvg from '../../../../assets/instant_information.svg'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

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
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: window.screen.width * 0.7,
      height: window.screen.height * 0.8,
      overflowY: 'auto'
    },
    card: {
      margin: theme.spacing(2),
      background: '#EEE'
    },
    header: {
      marginBottom: 15
    },
    actions: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }));

  const routeByDesigner = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
    {
      id: item,
      name: `page ${item + 1}`,
      url: `/url ${item + 1}`,
      element_1: `element 1`,
      element_2: `element 2`,
      element_3: `element 3`,
      element_4: `element 4`,
      element_5: `element 5`
    }
  ));

  const routeByEvaluator = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
    {
      id: item,
      name: `page ${item + 1}`,
      url: `/url ${item + 1}`,
      element_1: `element 1`,
      element_2: `element 2`,
      element_3: `element 3`,
      element_4: `element 4`,
      element_5: `element 5`
    }
  ));

  const designer = {
    id: 1,
    name: 'designer name 1',
    email: `designer_1@email.com`,
    route: routeByDesigner
  }

  const evaluators = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
    {
      id: item,
      name: `evaluator ${item + 1}`,
      email: `evaluator_${item + 1}@email.com`,
      route: routeByEvaluator
    }
  ));

  const [open, setOpen] = useState(false);

  const [currentEvaluator, setCurrentEvaluator] = useState(0);

  const handleClickPrev = () => {
    if(currentEvaluator <= 0) return;
    setCurrentEvaluator(currentEvaluator - 1);
  }

  const handleClickNext = () => {
    if(currentEvaluator >= evaluators.length - 1) return;
    setCurrentEvaluator(currentEvaluator + 1);
  }

  const handleClickOpen = () => { setOpen(true) };

  const handleClose = () => { setOpen(false) };

  const classes = useStyles();

  return (
    <>
      <ListItem button onClick={handleClickOpen}>
        <ListItemText 
          primary={task.name}
          secondary={
            <Typography noWrap>
              {task.detail}
            </Typography>
          }
        />
      </ListItem>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
          <div className={classes.header}>
            <Typography variant="body1" component="h3">
              {task.name}
            </Typography>
            <Typography variant="body2" component="span">
              {task.detail}
            </Typography>
            <Divider />
          </div>
          <Grid container>
            <Grid item sm={6}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="body1">
                    Route by Designer "{designer.name}"
                  </Typography>
                  <div className="content">
                    {routeByDesigner.map(page => (
                      <ExpansionPanel key={page.id}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                          <Typography title={page.url} noWrap>
                            {page.name} ({page.url})
                          </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <ul>
                            <li>{page.element_1}</li>
                            <li>{page.element_2}</li>
                            <li>{page.element_3}</li>
                            <li>{page.element_4}</li>
                            <li>{page.element_5}</li>
                          </ul>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={6}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="body1">
                    Route by evaluator "{evaluators[currentEvaluator].name}"
                  </Typography>
                  <div className={classes.actions}>
                    <Button onClick={handleClickPrev}>prev</Button>
                    <Button onClick={handleClickNext}>next</Button>
                  </div>
                  <div className="content">
                    {evaluators[currentEvaluator].route.map(page => (
                      <ExpansionPanel key={page.id}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                          <Typography title={page.url} noWrap>
                            {page.name} ({page.url})
                          </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                          <ul>
                            <li>{page.element_1}</li>
                            <li>{page.element_2}</li>
                            <li>{page.element_3}</li>
                            <li>{page.element_4}</li>
                            <li>{page.element_5}</li>
                          </ul>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </>
  );
}

const EvaluatorsList = ({ classes }) => {

  const controller = useContext(AssessmentContext);
  const [currentAssessment] = controller.currentAssessmentController;

  const [evaluators, setEvaluators] = useState([])

  const loadEvaluators = async (id) => {
    const response = await api.post('/assessments/evaluators.php', { id: Number(id) });
    const { data } = response;
    if(data.status === 'success') {
      setEvaluators(data.docs);
    } else {
     alert('error to load evaluators');
    }
  }

  useEffect(() => {
    if(currentAssessment.id) {
      loadEvaluators(currentAssessment.id);
    }
  }, [currentAssessment])

  return (
    <div className={classes.list}>
      <Typography className={classes.header} variant="body1" align="center">
        EVALUATOR LIST
      </Typography>
      <Divider />
      <List component="div">
        {evaluators.map(evaluator => (
          <EvaluatorItem key={evaluator.id} evaluator={evaluator} />
        ))}
      </List>
    </div>
  );
}

const EvaluatorItem = ({ evaluator }) => {
  const useStyles = makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalPaper: {
      background: '#FFF',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: 650
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
    }
  }));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => { setOpen(true) };

  const handleClose = () => { setOpen(false) };

  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper}>
        <ListItem button onClick={handleClickOpen}>
          <Tooltip title="Click to view more information" arrow placement="top">
            <ListItemText 
              primary={<Typography className={classes.primary}>{evaluator.name}</Typography>}
              secondary={<Typography className={classes.secondary} variant="subtitle2">{evaluator.email}</Typography>}
            />
          </Tooltip>
        </ListItem>
      </Paper>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
      >
        <div className={classes.modalPaper}>
          <Grid container>
            <Grid item sm={12}>
              <Typography variant="h4" component="h2">
                {evaluator.name}
              </Typography>
              <Typography variant="body1" component="p">
                {evaluator.email}
              </Typography>
            </Grid>
            <Grid item sm={6}>
              Assessments that participated
            </Grid>
            <Grid item sm={6}>
              Answers
            </Grid>
          </Grid>
        </div>
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

  const answers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
    {
      id: item,
      text: loren(),
      evaluator: `evaluator ${item +1}`
    }
  ))

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
        <div className={classes.paper}>
          <Typography className={classes.header} variant="body1" component="h2">
            {question.text}
          </Typography>
          <Divider />
          {answers.map(answer => (
            <Card key={answer.id} className={classes.card}>
              <CardContent>
                <Typography className={classes.from} color="textSecondary" gutterBottom>
                  {answer.evaluator}
                </Typography>
                <Typography variant="body2" component="p">
                  {answer.text}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </Modal>
    </>
  );
}

export default function ShowAssessmentPanel() {
  
  const controller = useContext(AssessmentContext);
  const [currentAssessment] = controller.currentAssessmentController;
  const [view, setView] = controller.viewController

  const useStyles = makeStyles(theme => ({
    info: {
      height: 200
    },
    header: {
      color: '#777',
      margin: theme.spacing(1, 1, 0, 1)
    },
    list: {
      height: 450,
      padding: theme.spacing(1),
      overflowY: 'auto'
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
     alert('error to load Assessment');
    }
  }

  console.log(assessment);

  const classes = useStyles();

  const { manager, questionnaire } = assessment;

  return (
    <Grid container>
      {assessment.id ? (
        <>
          <Grid item sm={6}>
            <Card className={classes.info}>
              <CardContent>
                <Typography variant="h4" component="h2">
                  {assessment.name}
                </Typography>
                <Typography variant="body1" component="p">
                  {assessment.detail}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={6}>
            <Card className={classes.info}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Informations
                </Typography>
                <Typography variant="body2" component="p">
                  Manager: {manager.name}
                </Typography>
                <Typography variant="body2" component="p">
                  Questionnaire: {questionnaire.name}
                </Typography>
                {assessment.completed_at ? (
                  <div>This assessment was completed at {assessment.completed_at}</div>
                ) : (
                  <Typography variant="body2" component="p">
                    This assessment is not complete yet
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={4}>
            <TaskList classes={classes} />
          </Grid>
          <Grid item sm={4}>
            <EvaluatorsList classes={classes} />
          </Grid>
          <Grid item sm={4}>
            <QuestionsList classes={classes} />
          </Grid>
        </>
      ) : (
        <div>
          <Typography 
            style={{ color: '#444', margin: 30 }} 
            align="center" 
            variant="h4"
          >
            Select a assessment on the Left
          </Typography>
          <img 
            style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '50%' }} 
            src={SelectAssessmentSvg} 
            alt="Select some assessment" 
          /> 
          <Typography 
            style={{ color: '#88f', margin: 30, cursor: 'pointer' }} 
            align="center" 
            variant="subtitle1"
            onClick={handleCreateAssessment}
          >
            Or Click here to add a New Assessment
          </Typography>
        </div>
      )}
    </Grid>
  );
}
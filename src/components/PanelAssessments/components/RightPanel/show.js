import React, { useState, useContext } from 'react';
import { AssessmentContext } from '../../context/AssessmentContext';
import { Grid, Typography, Divider, Modal, Button } from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Card, CardContent } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const lorens = [
  'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam efficitur pharetra felis, in rutrum massa porta vitae. Ut tristique consectetur ipsum quis placerat. Fusce finibus.',
  'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras hendrerit scelerisque est a ornare. Suspendisse imperdiet odio tellus, et porta turpis consequat eu. Fusce in posuere.',
  'Proin vel nibh eget dui ornare placerat. Duis nibh felis, varius vitae magna sed, pretium placerat sem. Sed nibh mi, malesuada vitae est ac, porta mattis ipsum. Fusce ut interdum.',
  'In hac habitasse platea dictumst. Vestibulum semper augue non convallis laoreet. Morbi sagittis, libero id sodales eleifend, justo nibh volutpat lectus, quis venenatis ex sem in augue. In in lectus.',
  'Donec egestas enim urna. Maecenas tempus velit quis magna blandit iaculis. Morbi condimentum congue sapien in ultrices. Praesent nec odio quis turpis sagittis convallis. Nam interdum facilisis tortor, ac mollis.'
];

const loren = () => (lorens[Math.floor(Math.random() * lorens.length)]);

const TaskList = ({ classes }) => {

  const tasks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
    {
      id: item,
      name: `task ${item + 1}`,
      detail: loren()
    }
  ))

  return (
    <div className={classes.list}>
      <Typography className={classes.header} variant="body1" component="h6">
        Tasks
      </Typography>
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
  const evaluators = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
    {
      id: item,
      name: `evaluator ${item + 1}`,
      email: `evaluator.number${item + 1}@email.com`
    }
  ))

  return (
    <div className={classes.list}>
      <Typography className={classes.header} variant="body1" component="h6">
        Evaluators
      </Typography>
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
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: 650
    }
  }));

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => { setOpen(true) };

  const handleClose = () => { setOpen(false) };

  const classes = useStyles();

  return (
    <>
      <ListItem button onClick={handleClickOpen}>
        <ListItemText 
          primary={evaluator.name}
          secondary={evaluator.email}
        />
      </ListItem>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>
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
      <Typography className={classes.header} variant="body1" component="h6">
        Questionnaire
      </Typography>
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
  
  const { currentAssessmentController } = useContext(AssessmentContext);
  const [currentAssessment] = currentAssessmentController;

  // const [assessment, setAssessment] = useState({});

  const useStyles = makeStyles(theme => ({
    root: {
      height: 200
    },
    header: {
      margin: theme.spacing(2)
    },
    list: {
      height: 450,
      overflowY: 'auto'
    }
  }));

  /*

  useEffect(() => {
    loadAssessment();
  }, [currentAssessment]);

  const loadAssessment = () => {
    const response = api.post('/assessments/show.php', { id: Number(currentAssessment.id) });
    if(response.data.status === 'success') {
      setAssessment(response.data.docs);
    } else {
     alert('error to load Assessment');
    }
  }

  */

  const classes = useStyles();

  return (
    <Grid container>
      {currentAssessment ? (
        <>
          <Grid item sm={8}>
            <Card className={classes.root}>
              <CardContent>
                <Typography variant="h4" component="h2">
                  {currentAssessment.name}
                </Typography>
                <Typography variant="body1" component="p">
                  {currentAssessment.detail}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item sm={4}>
            <Card className={classes.root}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Informations
                </Typography>
                <Typography variant="body2" component="p">
                  Manager: Bruno
                </Typography>
                <Typography variant="body2" component="p">
                  Questionnaire: Questionnaire 1
                </Typography>
                <Typography variant="body2" component="p">
                  This assessment is not complete yet
                </Typography>
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
        'Select some assessment please'
      )}
    </Grid>
  );
}
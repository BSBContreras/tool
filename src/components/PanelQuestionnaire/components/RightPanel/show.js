import React, { useState, useContext, useEffect } from 'react';
import api from '../../../../services/api';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { QuestionnaireContext } from '../../context/QuestionnaireContext';
import { Add as AddIcon} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles';

const QuestionHeader = () => {
  const useStyles = makeStyles(theme => ({
    card: {
      margin: theme.spacing(1, 1, 0, 1),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText
    },
    criterion: {
      backgroundColor: theme.palette.primary.main,
      height: '100%',
    },
    question: {
      backgroundColor: theme.palette.primary.light,
      height: '100%',
    },
    element: {
      backgroundColor: theme.palette.primary.main,
      height: '100%',
    }
  }));

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item sm={2} >
          <CardContent className={classes.criterion}>
            <Typography variant="body2" component="p" align="center">
              CRITERION
            </Typography>
          </CardContent>
        </Grid>
        <Grid item sm={6}>
          <CardContent className={classes.question}>
            <Typography variant="body1" component="p" align="center">
              QUESTION
            </Typography>
          </CardContent>
        </Grid>
        <Grid item sm={2}>
          <CardContent className={classes.element}>
            <Typography variant="body2" component="p" align="center">
              INTERACTION ELEMENTS
            </Typography>
          </CardContent>
        </Grid>
        <Grid item sm={2}>
          <CardContent className={classes.element}>
            <Typography variant="body2" component="p" align="center">
              ANSWER TYPE
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

const QuestionItem = ({ question }) => {
  const useStyles = makeStyles(theme => ({
    card: {
      margin: theme.spacing(1, 1, 0, 1),
      color: theme.palette.primary.contrastText
    },
    criterion: {
      backgroundColor: theme.palette.primary.main,
      height: '100%',
    },
    question: {
      backgroundColor: theme.palette.primary.light,
      height: '100%',
    },
    element: {
      backgroundColor: theme.palette.primary.main,
      height: '100%',
    },
    actions: {
      backgroundColor: theme.palette.primary.dark,
    },
    remove: {
      backgroundColor: theme.palette.remove.main,
      color: theme.palette.remove.contrastText
    },
    change: {
      backgroundColor: theme.palette.duplicate.main,
      color: theme.palette.duplicate.contrastText
    }
  }));

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item sm={2} >
          <CardContent className={classes.criterion}>
            <Typography variant="body2" component="p">
              {question.criterion}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item sm={6}>
          <CardContent className={classes.question}>
            <Typography variant="body1" component="p">
              {question.text}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item sm={2}>
          <CardContent className={classes.element}>
            <Typography variant="body2" component="p" align="center">
              {question.element_1}
            </Typography>
            <Typography variant="body2" component="p" align="center">
              {question.element_2}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item sm={2}>
          <CardContent className={classes.element}>
            <Typography variant="body2" component="p" align="center">
              Text
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
      <CardActions className={classes.actions}>
        <Button className={classes.remove}>
          Remove question
        </Button>
        <Button className={classes.change}>
          Change Answer Type
        </Button>
      </CardActions>
    </Card>
  );
}

const AddQuestion = () => {
  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.save.contrastText,
      backgroundColor: theme.palette.save.main,
      padding: theme.spacing(3),
      margin: theme.spacing(1, 0),
      cursor: 'pointer'
    },
    icon: {
      width: '32px',
      height: '32px',
      marginRight: '8px'
    }
  }));

  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <AddIcon className={classes.icon} />
      <Typography variant="body1" component="p" align="center">
        Add questions to this questionnaire
      </Typography>
    </Paper>
  );
}

const Actions = () => {
  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      alignItems: 'center',
      margin: theme.spacing(1, 2)
    },
    save: {
      marginLeft: theme.spacing(1),
      backgroundColor: theme.palette.save.main,
      color: theme.palette.save.contrastText
    },
    duplicate: {
      marginLeft: theme.spacing(1),
      backgroundColor: theme.palette.duplicate.main,
      color: theme.palette.duplicate.contrastText
    },
    remove: {
      marginLeft: theme.spacing(1),
      backgroundColor: theme.palette.remove.main,
      color: theme.palette.remove.contrastText
    }
  }))

  const classes = useStyles();

  return (
    <div classNam={classes.container}>
      <Button className={classes.save} size="large">
        Save Changes
      </Button>
      <Button className={classes.duplicate} size="large">
        Duplicate Questionnaire
      </Button>
      <Button className={classes.remove} size="large">
        Delete Questionnaire
      </Button>
    </div>
  )
}

export default function ShowQuestions() {
  const useStyles = makeStyles(theme => ({
    container: {
      height: 650,
      overflowY: 'auto'
    },
    title: {
      padding: theme.spacing(2),
      fontSize: '28px'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }))

  const { questionnaireController } = useContext(QuestionnaireContext);
  const [ currentQuestionnaire ] = questionnaireController;

  const [questions, setQuestions] = useState([]);

  const loadQuestions = async id => {
    const response = await api.post('/questionnaires/questions.php', { id: Number(id) });
    const { data } = response;
    if(data.status === 'success') {
      setQuestions(data.docs);
    } else {
      alert('Error on load questions');
    }
  }

  useEffect(() => {
    if(currentQuestionnaire.id) {
      loadQuestions(currentQuestionnaire.id);
    }
  }, [currentQuestionnaire])

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography className={classes.title} variant="h5" noWrap>
          {currentQuestionnaire.name}
        </Typography>
        <Actions />
      </div>
      <QuestionHeader />
      {questions.map((question, index) => (
        <QuestionItem key={index} question={question} />
      ))}
      <AddQuestion />
    </div>
  )
}


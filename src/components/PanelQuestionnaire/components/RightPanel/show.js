import React, { useState, useContext, useEffect } from 'react';
import api from '../../../../services/api';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { QuestionnaireContext } from '../../context/QuestionnaireContext';
import { makeStyles } from '@material-ui/core/styles';

const QuestionHeader = () => {
  const useStyles = makeStyles(theme => ({
    card: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(1),
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
              ELEMENT 1
            </Typography>
          </CardContent>
        </Grid>
        <Grid item sm={2}>
          <CardContent className={classes.element}>
            <Typography variant="body2" component="p" align="center">
              ELEMENT 2
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
          </CardContent>
        </Grid>
        <Grid item sm={2}>
          <CardContent className={classes.element}>
            <Typography variant="body2" component="p" align="center">
              {question.element_2}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

export default function ShowQuestions() {
  const useStyles = makeStyles(theme => ({
    title: {
      padding: theme.spacing(2),
      fontSize: '28px'
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
    <div>
      <Typography className={classes.title} variant="h5">{currentQuestionnaire.name}</Typography>
      <QuestionHeader />
      {questions.map((question, index) => (
        <QuestionItem key={index} question={question} />
      ))}
    </div>
  )
}
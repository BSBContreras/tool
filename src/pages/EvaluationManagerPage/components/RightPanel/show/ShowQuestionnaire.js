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

import { AssessmentContext } from '../../../context/AssessmentContext';

import { showQuestionnaire, loadQuestionsByQuestionnaire } from '../../../../../routes';
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
    height: '100%'
  },
  listContainer: {
    width: '100%',
    height: '100%',
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

const Question = ({ question }) => {

  const classes = useStyles();

  return (
    <div className={classes.containerQuestion}>
      {question.id ? (
        <>
          <QuestionAnswerOutlinedIcon className={classes.questionIcon} />
          <div className={classes.contentQuestion}>
            <Typography variant="h6">
              {question.criterion}
            </Typography>
            <Typography variant="subtitle1">
              {question.text}
            </Typography>
          </div>
          <div className={classes.listContainer}>
            <List 
              className={classes.listRoot}
              subheader={
                <ListSubheader component="div">
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
          </div>
        </>
      ) : (
        <Typography variant="body1">
          Select some question to view details
        </Typography>
      )}
    </div>
  )
}

export default function ShowQuestionnaire() {

  const { currentAssessmentController } = useContext(AssessmentContext);
  const [ currentAssessment ] = currentAssessmentController;

  const [questionnaire, setQuestionnaire] = useState({});
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({});

  const handleSelectQuestion = (question) => {
    setQuestion(question);
  }

  useEffect(() => {
    if(currentAssessment.questionnaire_id) {
      showQuestionnaire({
        id: Number(currentAssessment.questionnaire_id)
      }).then(data => {

        setQuestionnaire(data);
      }).catch(error => {

        if(Number(error.id) !== RUNTIME_ERROR) {
          alert(error.detail);
        } else {
          alert('Error on load Questionnaire');
        }

      })
    }
  }, [currentAssessment]);

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

  useEffect(() => {
    setQuestion({});
  }, [currentAssessment]);

  const classes = useStyles()

  return (
    <Grid container>
      <Grid item sm={5}>
        <List 
          className={classes.listRoot}
          subheader={
            <ListSubheader component="div">
              Answers
            </ListSubheader>
          }
        >
          {questions.map((question, index) => (
            <React.Fragment key={question.id}>
              <ListItem button onClick={() => handleSelectQuestion(question)}>
                <ListItemAvatar>
                  <Avatar>
                    <QuestionAnswerIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={question.criterion} secondary={question.text} />
              </ListItem>
              {index < questions.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Grid>
      <Grid item sm={7}>
        <Question question={question} />
      </Grid>
    </Grid>
  );
}

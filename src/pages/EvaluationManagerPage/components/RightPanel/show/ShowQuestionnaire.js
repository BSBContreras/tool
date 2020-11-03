import React, { useState, useEffect, useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import BoardRounded from './BoardRounded';

import { AssessmentContext } from '../../../context/AssessmentContext';

import { 
  showQuestionnaire, 
  loadQuestionsByQuestionnaire 
} from '../../../../../routes';

import { RUNTIME_ERROR } from '../../../../../constants';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%'
  },
  content: {
    height: '100%',
    margin: theme.spacing(0, 2),
    padding: theme.spacing(3)
  },
  header: {
    height: '75px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  title: {
    fontSize: '24px'
  },
  listContainer: {
    position: 'relative',
    height: 'calc(100% - 75px)',
  },
  list: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    position: 'absolute',
    left: 0,
    top: 0,
  }
}));

export default function ShowQuestionnaire() {

  const { currentAssessmentController } = useContext(AssessmentContext);
  const [ currentAssessment ] = currentAssessmentController;

  const [questionnaire, setQuestionnaire] = useState({});
  const [questions, setQuestions] = useState([]);
  const [selected, setSelected] = useState({});

  const handleSelectQuestion = (selected) => {
    setSelected(selected);
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
    setSelected({});
  }, [currentAssessment]);

  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Grid item sm={6}>
        <BoardRounded className={classes.content}>
          <div className={classes.header}>
            <Typography className={classes.title}>
              {questionnaire.name}
            </Typography>
          </div>
          <Divider />
          <div className={classes.listContainer}>
            <List className={classes.list}>
              {questions.map(question => (
                <ListItem 
                  button 
                  key={question.id} 
                  selected={question.id === selected.id}
                  onClick={() => handleSelectQuestion(question)}
                >
                  <ListItemText 
                    primary={question.criterion} 
                    secondary={question.text}
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
            <Typography className={classes.title}>
              Answers
            </Typography>
          </div>
          <Divider />
        </BoardRounded>
      </Grid>
    </Grid>
  );
}

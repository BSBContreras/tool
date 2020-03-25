import React, { useState } from 'react';
import {
  Typography, 
  FormControl, 
  Input, 
  InputLabel, 
  InputAdornment, 
  Card, 
  CardContent,
  Modal,
  Grid,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { Edit as EditIcon, Check as CheckIcon } from '@material-ui/icons';
import { green } from '@material-ui/core/colors'
import Question from './Question';
import QuestionsHeader from '../components/QuestionsHeader';
import AddQuestion from './AddQuestion';
import api from '../../../../../services/api';

export default function Edit({ questions, questionnaire, loadQuestions, editQuestion, loadQuestionnaires, setCurrentQuestionnaire }) {
  const useStyles = makeStyles(theme => ({
    editButton: {
      marginLeft: theme.spacing(1),
      cursor: 'pointer'
    },
    card: {
      marginTop: 10,
      background: `linear-gradient(45deg, ${green[500]} 30%, ${green[400]} 90%)`,
      padding: '0 30px',
      color: 'white',
      cursor: 'pointer'
    },
  }));

  const classes = useStyles();
  const [editing, setEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const submitNewName = () => {
    setEditing(false)
  }

  const addQuestions = async (questions) => {
    if(window.confirm(`Add ${questions.length} questions to "${questionnaire.name}" ?`)) {
      const response = await api.post('questionnaires/sync.php',
        {
          id: Number(questionnaire.id),
          attach: questions.map(question => question.id),
          detach: []
        }
      );
      if(response.data.status === 'success'){
        loadQuestions(questionnaire);
        setModalOpen(false);
      } else {
        alert('Error question add');
      }
    }
  }

  const removeQuestion = async (question) => {
    if(window.confirm(`Remove question:"${question.text}" from "${questionnaire.name}" ?`)) {
      const response = await api.post('questionnaires/sync.php',
        {
          id: Number(questionnaire.id),
          attach: [],
          detach: [
            Number(question.id)
          ]
        }
      );
      response.data.status === 'success'
        ? loadQuestions(questionnaire)
        : alert('Error question delete')
    }
  }

  const handleDeleteQuestionnaire = async () => {
    if(window.confirm(`Delete "${questionnaire.name}" ?`)) {
      const response = await api.post('questionnaires/delete.php', { id: Number(questionnaire.id) });
      if(response.data.status === 'success'){
        loadQuestionnaires();
        setCurrentQuestionnaire({id: null});
      } else {
        alert('Error questionnaire delete');
      }
    }
  }

  const ShowName = () => (
    <Typography variant="h5">
      {questionnaire.name}
      <EditIcon
        className={classes.editButton}
        fontSize="small"
        onClick={() => setEditing(true)}
      />
    </Typography>
  )

  const EditName = () => (
    <FormControl>
      <InputLabel htmlFor="name-input">Name</InputLabel>
      <Input 
        autoFocus
        id="name-input" 
        defaultValue={questionnaire.name}
        onChange={console.log}
        endAdornment={
          <InputAdornment>
            <CheckIcon
              className={classes.editButton}
              onClick={submitNewName}
            />
          </InputAdornment>
        }
      />
    </FormControl>
  )
    
  return (
    <>
      {questionnaire.id
        ? <>
            <Grid container>
              <Grid item sm={6}>
                {editing
                  ? <EditName />
                  : <ShowName />
                }
              </Grid>
              <Grid item alignItems="flex-end" sm={6}>
                <Button onClick={handleDeleteQuestionnaire}>
                  Delete questionnaire
                </Button>
              </Grid>
            </Grid>
            <QuestionsHeader />
            <Card className={classes.card} onClick={() => setModalOpen(true)}>
              <CardContent>
                <Typography variant="body1" component="span">
                  Click here to add a new question to this queistionnaire
                </Typography>
              </CardContent>
            </Card>
            {questions.length !== 0
              ? <>
                  {questions.map(question => (
                    <Question key={question.id} question={question} remove={removeQuestion} edit={editQuestion} />
                  ))}
                </>
              : "This questionnaire have no questions yet"}
          </>
        : 'Please select a questionnaire on left side'
      }
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <AddQuestion currentQuestions={questions} addQuestions={addQuestions} />
      </Modal>
    </>
  )
}
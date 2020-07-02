import React, { useState, useEffect } from 'react';
import { Paper, List, ListItem, ListItemText, ListItemIcon, Checkbox, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../../../../services/api';

export default function Add({ currentQuestions, addQuestions }) {

  const modalStyle = {
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -30%)'
  };
  
  const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 700,
      overflowY: 'auto',
      padding: theme.spacing(2, 4, 3),
    },
    list: {
      width: '100%',
      maxHeight: 700,
      overflowY: 'auto'
    },
  }));

  const [availableQuestions, setAvailableQuestions] = useState([]);

  useEffect(() => {
    loadQuestions(); 
  }, []) 

  const loadQuestions = async () => {
    const response = await api.post('/questions/index.php');
    response.data.status === 'success'
      ? setAvailableQuestions(response.data.docs.filter(question => {
          for(let i = 0; i < currentQuestions.length; i++) {
            if(currentQuestions[i].id === question.id) {
              return false
            }
          }
          return true
      }).map(question => ({...question, selected: false})))
      : alert('error to load questions')
  }

  const selectQuesiton = (index) => {
    const newData = [...availableQuestions];
    newData[index].selected = !availableQuestions[index].selected
    setAvailableQuestions(newData);
  }
  
  const submit = () => {
    const questionSelected = availableQuestions.filter(question => question.selected);
    addQuestions(questionSelected);
  }

  const classes = useStyles();

  return (
    <Paper style={modalStyle} className={classes.paper}>
      <Typography variant="h5">
        Add Questions
      </Typography>
      <Typography variant="body1" component="p">
        Select the questions that will be part of your questionnaire
      </Typography>
      <List className={classes.list}>
        {availableQuestions.map((question, index) => (
          <ListItem key={question.id} button onClick={() => selectQuesiton(index)}>
            <ListItemIcon>
              <Checkbox
                checked={question.selected}
              />
            </ListItemIcon>
            <ListItemText primary={question.text} />
          </ListItem>
        ))}
      </List>
      <Button
        fullWidth
        variant="contained" 
        color="secondary"
        style={{
          marginTop: 20
        }}
        onClick={() => submit()}
      >
        Add selected questions to the questionnaire
      </Button>
    </Paper>
  );
}

import React, { useState, useEffect } from 'react';
import {
  Grid,
  FormControl, 
  Select, 
  MenuItem, 
  InputLabel, 
  Typography, 
  TextField, 
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../../../../services/api';

export default ({ editQuestion }) => {
  const useStyles = makeStyles({
    select: {
      margin: 10
    },
    text: {
      marginBottom: 10
    },
    submitButton: {
      marginTop: 10
    }
  });

  const [criteria, setCriteria] = useState([]);
  const [elements, setElements] = useState([]);
  const [question, setQuestion] = useState({
    text: editQuestion ? editQuestion.text : '',
    criterion_id: editQuestion ? editQuestion.criterion_id : 0,
    element_1_id: editQuestion ? editQuestion.element_1_id : 0,
    element_2_id: editQuestion ? editQuestion.element_2_id : 0
  })

  useEffect(() => {
    console.log(question);
    loadCriteria();
    loadElements();
  }, []);

  const loadCriteria = async () => {
    const response = await api.post('/criteria/index.php');
    if(response.data.status === 'success') {
      setCriteria(response.data.docs);
    } else {
      alert('erro load criteria');
    }
  }

  const loadElements = async () => {
    const response = await api.post('/elements/index.php');
    if(response.data.status === 'success') {
      setElements(response.data.docs);
    } else {
      alert('erro load elements');
    }
  }

  const handleText = e => {
    if(e.target.value.length > 300) return

    setQuestion({
      ...question,
      text: e.target.value
    })
  }

  const handleSubmit = async e => {
    e.preventDefault();

    if(question.text.length === 0) {
      alert('Please type a text of your question, before submit');
      return;
    }

    if(question.criterion_id === 0) {
      alert('Please select a criterion for your question');
      return;
    }

    const response = await api.post('/questions/store.php', {
      ...question,
      element_1_id: question.element_1_id === 0 ? null : question.element_1_id,
      element_2_id: question.element_2_id === 0 ? null : question.element_2_id,
    })

    if(response.data.status === 'success') {
      setQuestion({
        text: '',
        criterion_id: 0,
        element_1_id: 0,
        element_2_id: 0
      })

      alert('question successfully created');
    } else {
      alert('erro create question');
    }

  }

  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h5">
        Create a new question
      </Typography>
      <TextField 
        id="Text"
        label="Text"
        variant="outlined"
        rows="6"
        onChange={handleText}
        value={question.text}
        className={classes.text}
        fullWidth
        multiline
        style={{
          marginTop: 20
        }}
      />
      <Grid container>
        <Grid item sm={12}>
          <FormControl fullWidth>
            <InputLabel id="Criterion">Criterion</InputLabel>
            <Select
              className={classes.select}
              labelId="Criterion"
              id="Criterion"
              value={question.criterion_id}
              onChange={e => setQuestion({...question, criterion_id: e.target.value})}
            >
              <MenuItem value={0} disabled>Select a Criterion</MenuItem>
              {criteria.map(criterion => (
                <MenuItem key={criterion.id} value={criterion.id}>{criterion.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={6}>
          <FormControl fullWidth>
            <InputLabel id="element_1">Element 1</InputLabel>
            <Select
              className={classes.select}
              labelId="element_1"
              id="element_1"
              value={question.element_1_id}
              onChange={e => setQuestion({...question, element_1_id: e.target.value})}
            >
              <MenuItem value={0}>none</MenuItem>
              {elements.map(element => (
                <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={6}>
          <FormControl fullWidth>
            <InputLabel id="element_2">Element 2</InputLabel>
            <Select
              className={classes.select}
              labelId="element_2"
              id="element_2"
              value={question.element_2_id}
              onChange={e => setQuestion({...question, element_2_id: e.target.value})}
            >
              <MenuItem value={0}>none</MenuItem>
              {elements.map(element => (
                <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button
        className={classes.submitButton}
        variant="contained" 
        color="secondary"
        fullWidth
        type="submit"
      >
          Create new question
      </Button>
    </form> 
  )
}
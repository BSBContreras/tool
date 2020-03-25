import React, { useState } from 'react';
import { Typography, TextField, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function Create({ submit }) {

  const modalStyle = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  };
  
  const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 500,
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const [questionnaire, setQuestionnaire] = useState({
    name: '',
    detail: ''
  });

  const classes = useStyles();

  return (
    <Paper style={modalStyle} className={classes.paper}>
      <form onSubmit={
        (e) => {
          e.preventDefault();
          submit(questionnaire);
        }
      }>
        <Typography variant="h5">
          Create a new questionnaire
        </Typography>
        <TextField 
          id="Name" 
          label="Name" 
          variant="outlined"
          error={questionnaire.name.length === 0}
          required
          fullWidth
          onChange={
            event => 
              event.target.value.length <= 100 &&
              setQuestionnaire({
              ...questionnaire, 
              name: event.target.value
            })
          }
          style={{
            marginTop: 20
          }}
        />
        <TextField 
          id="Detail"
          label="Details"
          variant="outlined"
          rows="6"
          fullWidth
          multiline
          value={questionnaire.detail}
          onChange={
            event => 
              event.target.value.length <= 300 &&
              setQuestionnaire({
              ...questionnaire, 
              detail: event.target.value
            })
          }
          style={{
            marginTop: 20
          }}
        />
        <Button 
          variant="contained" 
          color="secondary"
          fullWidth
          type="submit"
          style={{
            marginTop: 20
          }}>
            Create new questionnaire
        </Button>
      </form> 
    </Paper>
  );
}

import React from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Form = ({ onSubmit, className, children }) => {
  return (
    <form className={className} onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}>
      {children}
    </form>
  )
}

export default function CreateAssessmentPanel() {
  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(2),
    },
    item: {
      marginTop: theme.spacing(1)
    }
  }));

  const classes = useStyles();

  return (
    <Grid container>
      <Grid item sm={8}>
        <Form onSubmit={() => console.log('submit')} className={classes.root}>
          <Typography variant="h5">
            Add a new Assessment
          </Typography>
          <TextField 
            className={classes.item}
            id="Name" 
            label="Name" 
            required
            fullWidth
            onChange={() => {}}
          />
          <TextField 
            className={classes.item}
            id="Detail"
            label="Details"
            multiline
            rows="6"
            fullWidth
            onChange={() => {}}
          />
          <Button 
            className={classes.item}
            variant="contained" 
            color="secondary"
            fullWidth
            type="submit"
          >
            Add new Assessment
          </Button>
        </Form>
      </Grid>
      <Grid item sm={4}>

      </Grid>
    </Grid>
  );
}

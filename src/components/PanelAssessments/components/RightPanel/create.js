import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

const AssessmentDetails = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(2),
      width: '80%'
    },
    item: {
      marginTop: theme.spacing(1)
    }
  }));

  const classes = useStyles();

  return (
    <Form onSubmit={() => console.log('submit')} className={classes.root}>
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
    </Form>
  );
}

function getSteps() {
  return [
    'Enter name and details about your assessment', 
    'Choose a questionnaire', 
    'Choose the tasks to be evaluated',
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <AssessmentDetails />;
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown stepIndex';
  }
}

export default function StepperView() {
  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(4),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    buttons: {
      display: 'flex',
      alignItems: 'space-between',
      justifyContent: 'center',
    }
  }));

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleFinish = () => {
    handleNext();
    alert('finish');
  }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div className={classes.content}>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Typography className={classes.instructions}>Click below to create another assessment</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>
              {getStepContent(activeStep)}
            </div>
            <div className={classes.buttons}>
              <Button
                disabled={activeStep === 0}
                color="primary"
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              {activeStep < steps.length - 1 ? (
                <Button variant="contained" color="secondary" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button variant="contained" color="secondary" onClick={handleFinish}>
                  Finish
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect, useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import PersonIcon from '@material-ui/icons/Person';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { AssessmentContext } from '../../../context/AssessmentContext';

import { loadEvaluatorsByEvaluation } from '../../../../../routes';
import { RUNTIME_ERROR } from '../../../../../constants';

const useStyles = makeStyles(theme => ({
  listRoot: {
    width: '100%',
  },
  containerProfile: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  personIcon: {
    margin: theme.spacing(2, 0),
    fontSize: '128px'
  }
}));

const Profile = ({ evaluator }) => {

  const classes = useStyles();

  return (
    <div className={classes.containerProfile}>
      {evaluator.id ? (
        <>
          <AccountCircleIcon className={classes.personIcon} />
          <div>
            <Typography variant="h6">
              {evaluator.name}
            </Typography>
            <Typography variant="subtitle1">
              {evaluator.email}
            </Typography>
          </div>
          <hr />
        </>
      ) : (
        <Typography>
          Select some evaluator to view details
        </Typography>
      )}
    </div>
  )
}

export default function ShowEvaluators() {

  const { currentAssessmentController } = useContext(AssessmentContext);
  const [ currentAssessment ] = currentAssessmentController;

  const [evaluators, setEvaluators] = useState([]);
  const [evaluator, setEvaluator] = useState({});

  const handleSelectEvaluator = (evaluator) => {
    setEvaluator(evaluator);
  }

  useEffect(() => {
    if(currentAssessment.id) {
      loadEvaluatorsByEvaluation({
        id: Number(currentAssessment.id)
      }).then(data => {

        setEvaluators(data);
      }).catch(error => {

        if(Number(error.id) !== RUNTIME_ERROR) {
          alert(error.detail);
        } else {
          alert('Error on load Evaluators');
        }

      })
    }
  }, [currentAssessment])

  useEffect(() => {
    setEvaluator({});
  }, [currentAssessment]);

  const classes = useStyles()

  return (
    <Grid container>
      <Grid item sm={5}>
        <List className={classes.root}>
          {evaluators.map((evaluator, index) => (
            <React.Fragment key={evaluator.id}>
              <ListItem button onClick={() => handleSelectEvaluator(evaluator)}>
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={evaluator.name} secondary={evaluator.email} />
              </ListItem>
              {index < evaluators.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Grid>
      <Grid item sm={7}>
        <Profile evaluator={evaluator} />
      </Grid>
    </Grid>
  );
}

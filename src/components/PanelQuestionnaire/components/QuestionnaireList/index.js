import React, { useState, useEffect, useContext } from 'react';
import api from '../../../../services/api';
import { QuestionnaireContext } from '../../context/QuestionnaireContext';
import CreateQuestionnaireDialog from './create';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { Add as AddIcon } from '@material-ui/icons';

const QuestionnaireItem = ({ questionnaire }) => {
  const { questionnaireController } = useContext(QuestionnaireContext);
  const [currentQuestionnaire, setCurrentQuestionnaire] = questionnaireController;

  const handleCurrentQuestionnaire = () => {
    setCurrentQuestionnaire(questionnaire);
  }

  return (
    <ListItem 
      button 
      onClick={handleCurrentQuestionnaire}
      selected={questionnaire === currentQuestionnaire}
    >
      <ListItemText 
        primary={questionnaire.name}
        secondary={questionnaire.detail}
      />
    </ListItem>
  );
}

const CreateQuestionnaire = () => {
  const useStyles = makeStyles(theme => ({
    add: {
      backgroundColor: theme.palette.save.main
    }
  }))

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <div>
      <ListItem className={classes.add} button onClick={handleClickOpen}>
        <ListItemText 
          primary="Add new questionnaire"
          secondary="Click here to add a new questionnaire"
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <CreateQuestionnaireDialog open={open} handleClose={handleClose} />
    </div>
  );
}

export default function QuestionnaireList() {
  const [questionnaires, setQuestionnaires] = useState([]);
  const { questionnaireController } = useContext(QuestionnaireContext);
  const [ currentQuestionnaire ] = questionnaireController;

  const loadQuestionnaires = async () => {
    const response = await api.post('/questionnaires/index.php');
    const { data } = response;
    if(data.status === 'success') {
      setQuestionnaires(data.docs);
    } else {
      alert('Error on load questionnaires');
    }
  }

  useEffect(() => {
    loadQuestionnaires();
  }, []);

  useEffect(() => {
    loadQuestionnaires();
  }, [currentQuestionnaire])

  return (
    <List component="nav" style={{ height: 635, overflowY: 'auto' }}>
      <CreateQuestionnaire />
      {questionnaires.map(questionnaire => (
        <QuestionnaireItem key={questionnaire.id} questionnaire={questionnaire} button />
      ))}
    </List>
  );
}
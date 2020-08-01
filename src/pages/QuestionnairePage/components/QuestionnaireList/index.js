import React, { useState, useEffect, useContext } from 'react';
import CreateQuestionnaireDialog from './CreateQuestionnaire';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { Add as AddIcon } from '@material-ui/icons';

import ShowUnavailableQuestionnaire from './ShowUnavailableQuestionnaire';
import { QuestionnaireContext } from '../../context/QuestionnaireContext';
import { loadQuestionnairesByManager } from '../../../../routes';
import { GlobalContext } from '../../../../context/GlobalContext';
import { RUNTIME_ERROR } from '../../../../constants';

const AvailableQuestionnaireItem = ({ questionnaire }) => {
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

const UnavailableQuestionnaireItem = ({ questionnaire }) => {

  const { questionnaireController } = useContext(QuestionnaireContext);
  const [ currentQuestionnaire ] = questionnaireController;

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  return (
    <>
      <ListItem 
        button 
        onClick={handleOpenDialog}
        selected={questionnaire === currentQuestionnaire}
      >
        <ListItemText 
          primary={questionnaire.name}
          secondary={questionnaire.detail}
        />
      </ListItem>
      {openDialog && <ShowUnavailableQuestionnaire questionnaire={questionnaire} handleClose={handleCloseDialog} />}
    </>
  );
}

const CreateQuestionnaire = () => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ListItem button onClick={handleClickOpen}>
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
      {open && <CreateQuestionnaireDialog open handleClose={handleClose} />}
    </div>
  );
}

export default function QuestionnaireList() {
  const [availableQuestionnaires, setAvailableQuestionnaires] = useState([]);
  const [unavailableQuestionnaires, setUnavailableQuestionnaires] = useState([]);

  const { questionnaireController } = useContext(QuestionnaireContext);
  const [ currentQuestionnaire ] = questionnaireController;

  const { managerController } = useContext(GlobalContext);
  const [ manager ] = managerController;

  useEffect(() => {
    loadQuestionnairesByManager({
      manager_id: Number(manager.id)
    }).then(data => {

      setAvailableQuestionnaires(data.available);
      setUnavailableQuestionnaires(data.unavailable);

    }).catch(error => {

      if(Number(error.id) !== RUNTIME_ERROR) {
        alert(error.detail);
      } else {
        alert('Error on load Questionnaires');
      }

    })
  }, [currentQuestionnaire, manager]);

  return (
    <List component="nav" style={{ height: 635, overflowY: 'auto' }}>
      <CreateQuestionnaire />
      {availableQuestionnaires.map(questionnaire => (
        <AvailableQuestionnaireItem key={questionnaire.id} questionnaire={questionnaire} />
      ))}
      {availableQuestionnaires.length > 0 && unavailableQuestionnaires.length > 0 && <Divider component="li" />}
      {unavailableQuestionnaires.map(questionnaire => (
        <UnavailableQuestionnaireItem key={questionnaire.id} questionnaire={questionnaire} />
      ))}
    </List>
  );
}
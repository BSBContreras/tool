import React, { useState } from 'react';
import CreateQuestionnaire from './CreateQuestionnaire';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { Modal } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons'

export default ({ questionnaires, createQuestionnaire, loadQuestions }) => {

  const [modalOpen, setModalOpen] = useState(false);

  const submitQuestionnaire = (questionnaire) => {
    setModalOpen(false);
    createQuestionnaire(questionnaire);
  }

  return (
    <>
      <List>
        <ListItem style={{ cursor: 'pointer'}} onClick={() => setModalOpen(true)}>
          <ListItemIcon >
            <AddIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Create new questionnaire"
            secondary="Click here to create a new questionnaire"
          />
        </ListItem>
        {questionnaires.map(questionnaire => (
          <ListItem key={questionnaire.id} button onClick={() => loadQuestions(questionnaire)}>
            <ListItemText 
              primary={questionnaire.name}
              secondary={questionnaire.detail}
            />
          </ListItem>
        ))}
      </List>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} >
        <CreateQuestionnaire submit={submitQuestionnaire} />
      </Modal>
    </>
  )
  
}
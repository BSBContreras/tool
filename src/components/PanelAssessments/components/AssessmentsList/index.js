import React, { useState, useEffect, useContext } from 'react';
import api from '../../../../services/api'
import { AssessmentContext } from '../../context/AssessmentContext';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

const AssessmentItem = ({ assessment }) => {

  const { currentAssessmentController, viewController } = useContext(AssessmentContext);
  const [currentAssessment, setCurrentAssessment] = currentAssessmentController;
  const [view, setView] = viewController;

  const handleCurrentAssessment = () => {
    if (currentAssessment !== assessment) {
      setCurrentAssessment(assessment);
      if(view !== 'show') {
        setView('show');
      }
    }
  }

  return (
    <ListItem 
      button 
      onClick={handleCurrentAssessment}
      selected={assessment === currentAssessment}
    >
      <ListItemText 
        primary={assessment.name}
        secondary={assessment.detail}
      />
    </ListItem>
  );
}

const CreateAssessment = () => {

  const { currentAssessmentController, viewController } = useContext(AssessmentContext);
  const [currentAssessment, setCurrentAssessment] = currentAssessmentController;
  const [view, setView] = viewController;

  const handleAddAssessment = () => {
    if(view !== 'create') {
      setView('create');
      if(currentAssessment !== null) {
        setCurrentAssessment(null);
      }
    }
  };

  return (
    <ListItem button onClick={handleAddAssessment}>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText 
        primary="Add new Assessment"
        secondary="Click here to add a new assessment"
      />
    </ListItem>
  );
}

export default function AssessmentList() {

  const [assessments, setAssessments] = useState([]);

  const loadAssessments = async () => {
    const response = await api.post('/assessments/index.php');
      const { data } = response;
      if(data.status === 'success') {
        setAssessments(data.docs);
      } else {
        alert('Error on load assessments');
      }
  }

  useEffect(() => {
    loadAssessments();
  }, []);

  return (
    <List component="nav">
      <CreateAssessment />
      {assessments.map(assessment => (
        <AssessmentItem key={assessment.id} assessment={assessment} button />
      ))}
    </List>
  );
}
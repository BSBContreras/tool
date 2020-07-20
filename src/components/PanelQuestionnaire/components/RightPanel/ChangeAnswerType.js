import React, { useContext } from 'react';
import api from '../../../../services/api';
import { QuestionContext } from '../../context/QuestionContext';
import { QuestionnaireContext } from '../../context/QuestionnaireContext';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import Dialog from '../../../Dialog';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { makeStyles } from '@material-ui/core/styles';

export default function ChangeAnswerType({ question, handleClose }) {
  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    secondaryAction: {
      padding: theme.spacing(2),
      color: theme.palette.success.dark,
      cursor: 'pointer'
    }
  }));

  const { answerTypes } = useContext(QuestionContext);
  const { questionnaireController } = useContext(QuestionnaireContext)
  const [ questionnaire ] = questionnaireController;

  const changeAnswerType = (store) => {
    return new Promise(async (res, rej) => {
      const response = await api.post('/answer_types/update.php', store);

      const { data } = response;
      if(data.status === 'success') {
        res(data.docs);
      } else {
        rej('Error on change answer type');
      }
    });
  }

  const handleClick = answerType => {
    if(question.answer_type_id === answerType.id) {
      handleClose();
      return;
    }

    changeAnswerType({
      question_id: Number(question.id),
      questionnaire_id: Number(questionnaire.id),
      answer_type_id: Number(answerType.id)
    }).then(json => {

      // feedback user
    }).catch(error => {

      alert(error);
    }).finally(() => {

      handleClose();
    });
  }

  const classes = useStyles();

  return (
    <Dialog
      title="Change Answer Type"
      submitText="Change Answer Type"
      handleClose={handleClose}
      submit={handleClose}
    >
      <List className={classes.root}>
        {answerTypes.map((answerType, index) => (
          <div key={index}>
            <ListItem button onClick={() => handleClick(answerType)} alignItems="flex-start">
              <ListItemText
                primary={answerType.name}
                secondary={' — ' + answerType.detail}
              />
              {question.answer_type_id === answerType.id && (
                <ListItemSecondaryAction className={classes.secondaryAction}>
                  <CheckCircleIcon />
                </ListItemSecondaryAction>
              )}
            </ListItem>
            {index < answerTypes.length - 1 && <Divider component="li" />}
          </div>
        ))}
      </List>
    </Dialog>
  )
}
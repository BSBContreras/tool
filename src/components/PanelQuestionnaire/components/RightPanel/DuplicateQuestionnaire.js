import React, { useState, useContext } from 'react';
import api from '../../../../services/api';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';
import { QuestionnaireContext } from '../../context/QuestionnaireContext';
import Dialog from '../../../Dialog';

export default function DuplicateQuestionnaire({ handleClose }) {

  const { questionnaireController } = useContext(QuestionnaireContext);
  const [questionnaire, setQuestionnaire] = questionnaireController;

  const [name, setName] = useState(questionnaire.name + ' - copy');
  const [detail, setDetail] = useState(questionnaire.detail);
  const [errors, setErrors] = useState([]);

  const validName = name => name.length >= 3 ? true : false;

  const duplicateQuestionnaire = (store) => {
    return new Promise(async (res, rej) => {
      const response = await api.post('/questionnaires/duplicate.php', store);

      const { data } = response;
      if(data.status === 'success') {
        res(data.docs);
      } else {
        rej('Error on duplicate questionnaire');
      }
    });
  }

  const handleChageName = event => {
    const { value } = event.target;
    value.length <= 100 && setName(value);
  }

  const handleDetail = event => {
    const { value } = event.target;
    value.length <= 300 && setDetail(value);
  }

  const withoutErrors = () => {
    const errors = [];
    if(!validName(name)) {
      errors.push('Please enter a name with at least 3 characters')
    }
    setErrors(errors);
    return errors.length === 0;
  }

  const submit = () => {
    if(withoutErrors()) {
      duplicateQuestionnaire({
        id: Number(questionnaire.id),
        name, 
        detail
      }).then(json => {

        setQuestionnaire(json);
      }).catch(error => {

        alert(error);
      }).finally(() => {

        handleClose();
      });
    }
  }

  return (
    <Dialog
      title={`Duplicate Questionnaire "${questionnaire.name}"`}
      submitText="Duplicate Questionnaire"
      handleClose={handleClose}
      submit={submit}
    >
      <Collapse in={errors.length > 0}>
        <Alert 
          variant="filled"
          severity="error"
        >
          {errors.join(', ')}
        </Alert>
      </Collapse>
      <Typography style={{ marginTop: 10 }} gutterBottom> Questionnaire Name </Typography>
      <TextField 
        id="name" 
        label="ex: USP Questionnaire" 
        variant="outlined"
        value={name}
        fullWidth
        onChange={handleChageName}
      />
      <Typography style={{ marginTop: 10 }} gutterBottom> Questionnaire Detail </Typography>
      <TextField 
        id="detail" 
        label="ex: Questionnaire Detail" 
        variant="outlined"
        type="detail"
        value={detail}
        fullWidth
        onChange={handleDetail}
      />
    </Dialog>
  )
}
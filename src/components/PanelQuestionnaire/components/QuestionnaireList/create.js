import React, { useState, useContext } from 'react';
import { QuestionnaireContext } from '../../context/QuestionnaireContext';
import api from '../../../../services/api';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CreateQuestionnaire({ open, handleClose }) {
  const { questionnaireController } = useContext(QuestionnaireContext);
  const [currentQuestionnaire, setCurrentQuestionnaire] = questionnaireController;

  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [errors, setErrors] = useState([]);

  const validName = name => name.length >= 3 ? true : false;

  const storeQuestionnaire = async (store) => {
    const response = await api.post('/questionnaires/store.php', store);

    const { data } = response;
    if(data.status === 'success') {
      setCurrentQuestionnaire(data.docs);
    } else {
      alert('Error on store questionnaire');
    }
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
      storeQuestionnaire({
        name, detail, manager_id: 2
      });
      handleClose();
      setName('');
      setDetail('');
    }
  }

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle onClose={handleClose}>
        Add Questionnaire
      </DialogTitle>
      <DialogContent dividers>
        {currentQuestionnaire.id && (
          <Alert
            variant="filled"
            severity="warning"
            style={{ marginBottom: 10 }}
          >
            Make sure the changes to the website "{currentQuestionnaire.name}" have been saved
          </Alert>
        )}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button 
          autoFocus 
          color="primary"
          onClick={submit}
        >
          Add Questionnaire
        </Button>
      </DialogActions>
    </Dialog>
  );
}

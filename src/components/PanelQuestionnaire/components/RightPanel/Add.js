import React, { useState, useEffect, useContext } from 'react';
import api from '../../../../services/api';
import { QuestionnaireContext } from '../../context/QuestionnaireContext';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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

const QuestionItem = ({ question, addQuestion, removeQuestion }) => {
  const useStyles = makeStyles(theme => ({
    container: {
      backgroundColor: theme.palette.primary.light,
      padding: theme.spacing(1, 2),
      marginBottom: theme.spacing(1),
      borderRadius: '4px',
      width: '100%',
    },
    formControl: {
      width: '100%'
    },
    elements: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    element: {
      width: '100%',
      cursor: 'pointer',
      marginTop: theme.spacing(1),
      padding: theme.spacing(1.5),
      backgroundColor: theme.palette.primary.light,
      borderRadius: '8px',
      transition: 'background-color .2s',
      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
      }
    }
  }));

  const [checked, setChecked] = useState(false);
  const [answerType, setAnserType] = useState('Text');

  const handleChange = event => {
    const { checked } = event.target;

    if(checked) {
      addQuestion({...question, answerType});
    } else {
      removeQuestion(question);
    }

    setChecked(checked)
  }

  const handleChangeAnswerType = event => {
    setAnserType(event.target.value);
  };

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={handleChange}
            color="secondary"
          />
        }
        label={question.criterion}
      />
      <Grid container >
        <Grid item sm={8}>
          <Typography variant="subtitle1" component="p">
            {question.text}
          </Typography>
        </Grid>
        <Grid item sm={4}>
          <FormControl className={classes.formControl}>
            <InputLabel id="Answer-Type">Answer Type</InputLabel>
            <Select
              labelId="Answer-Type"
              color="secondary"
              value={answerType}
              onChange={handleChangeAnswerType}
              >
              <MenuItem value={'Text'}>Text</MenuItem>
              <MenuItem value={'Ratio'}>Ratio</MenuItem>
              <MenuItem value={'Yes/No'}>Yes/No</MenuItem>
            </Select>
          </FormControl>
          <div className={classes.elements}>
            {question.element_1_id && (
              <Typography className={classes.element}>
                {question.element_1}
              </Typography>
            )}
            {question.element_2_id && (
              <Typography className={classes.element}>
                {question.element_2}
              </Typography>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default function CreateQuestionnaire({ open, handleClose }) {
  const useStyles = makeStyles(theme => ({
    content: {
      maxHeight: 600,
      overFlowY: 'auto'
    }
  }))

  const { questionnaireController } = useContext(QuestionnaireContext);
  const [ questionnaire ] = questionnaireController;

  const [criteria, setCriteria] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selecteds, setSelecteds] = useState([]);

  const loadCriteria = async () => {
    const response = await api.post('/criteria/index.php');

    const { data } = response;
    if(data.status === 'success') {
      setCriteria(data.docs);
    } else {
      alert('Error on load criteria');
    }
  }

  const loadQuestions = async id => {
    const response = await api.post('/criteria/questions.php', { id: Number(id) });

    const { data } = response;
    if(data.status === 'success') {
      setQuestions(data.docs);
    } else {
      alert('Error on load questions');
    }
  }
  
  const handleStoreQuestions = async () => {
    const response = await api.post('questionnaires/sync.php',
      {
        id: Number(questionnaire.id),
        attach: selecteds.map(question => question.id),
        detach: []
      }
    );

    const { data } = response;
    if(data.status === 'success'){
      handleClose();
    } else {
      alert('Error question add');
    }
  }

  const handleChangeCriterion = criterion => {
    if(criterion) {
      loadQuestions(criterion.id);
    }
  }

  const addQuestion = question => {
    setSelecteds([...selecteds, question]);
  }

  const removeQuestion = question => {
    setSelecteds([...selecteds.filter(({ id }) => question.id !== id)]);
  }

  useEffect(() => {
    loadCriteria();
  }, []);

  const classes = useStyles();

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle onClose={handleClose}>
        Add Question
      </DialogTitle>
      <DialogContent className={classes.content} dividers>
        <Typography gutterBottom> Criterion Name </Typography>
        <Autocomplete
          autoHighlight
          options={criteria}
          getOptionLabel={criterion => criterion.name}
          onChange={(event, newValue) => handleChangeCriterion(newValue)}
          style={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label="Criterion Name" variant="outlined" />}
        />
        <FormGroup style={{ marginTop: 8 }}>
          {questions.map((question, index) => (
            <QuestionItem 
              key={index} 
              question={question} 
              addQuestion={addQuestion}
              removeQuestion={removeQuestion}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button 
          autoFocus 
          color="primary"
          onClick={handleStoreQuestions}
        >
          Add Questions
        </Button>
      </DialogActions>
    </Dialog>
  );
}

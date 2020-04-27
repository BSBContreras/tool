import React, { useState, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
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

export default function CreateTask({ open, handleClose }) {
  const { taskController } = useContext(TaskContext);
  const [ currentTask, setCurrentTask ] = taskController;

  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [errors, setErrors] = useState([]);

  const preCreateTask = () => {
    setCurrentTask({
      name, detail
    })
  }

  const handleChageName = event => {
    const { value } = event.target;
    value.length <= 100 && setName(value);
  }

  const handleChangeDetail = event => {
    const { value } = event.target;
    value.length <= 300 && setDetail(value);
  }

  const validName = name => name.length >= 3 ? true : false;

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
      preCreateTask();
      handleClose();
      setName('');
      setDetail('');
    }
  }

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle onClose={handleClose}>
        Create Task
      </DialogTitle>
      <DialogContent dividers>
        <Alert
          variant="filled"
          severity="info"
          style={{ marginBottom: 10 }}
        >
          This task will only be saved when at least one page is added, and clicking the "Save Task" button
        </Alert>
        {(!currentTask.id && currentTask.name) && (
          <Alert
            variant="filled"
            severity="warning"
            style={{ marginBottom: 10 }}
          >
            The task "{currentTask.name}" has not yet been saved
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
        <Typography style={{ marginTop: 10 }} gutterBottom> Task Name </Typography>
        <TextField 
          id="name" 
          label="ex: Buy bread" 
          variant="outlined"
          value={name}
          fullWidth
          onChange={handleChageName}
        />
        <Typography style={{ marginTop: 10 }} gutterBottom> Task Detail </Typography>
        <TextField 
          id="detail" 
          label="Details" 
          variant="outlined"
          multiline
          value={detail}
          fullWidth
          onChange={handleChangeDetail}
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
          Create Task
        </Button>
      </DialogActions>
    </Dialog>
  );
}

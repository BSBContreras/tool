import React, { useState, useContext, useEffect } from 'react';
import { WebsiteContext } from '../../context/WebsiteContext';
import { TaskContext } from '../../context/TaskContext';
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
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
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

export default function CreatePage({ open, handleClose }) {
  const { websiteController } = useContext(WebsiteContext);
  const [ currentWebsite ] = websiteController;

  const { newPageAddController } = useContext(TaskContext);
  const [ newPageAdd, setNewPageAdd ] = newPageAddController;

  const [name, setName] = useState('');
  const [url, setUrl] = useState('/');
  const [selectedElements, setSelectedElements] = useState([]);
  const [elements, setElements] = useState([]);
  const [errors, setErrors] = useState([]);

  const loadElements = async () => {
    const response = await api.post('/elements/index.php');
    const { data } = response;
    if(data.status === 'success') {
      setElements(data.docs);
    } else {
      alert('Error on load elements');
    }
  }

  const storePage = async () => {
    const response = await api.post('/pages/store.php', {
      name, url,
      website_id: Number(currentWebsite.id),
      elements_id: selectedElements.map(element => Number(element.id))
    });
    const { data } = response;
    if(data.status === 'success') {
      if(!newPageAdd) {
        setNewPageAdd(true);
      }
    } else {
      alert('Error on create page');
    }
  }

  useEffect(() => {
    loadElements();
  }, [])

  const handleChageName = event => {
    const { value } = event.target;
    value.length <= 100 && setName(value);
  }

  const handleChageUrl = event => {
    const { value } = event.target;
    value.length <= 150 && setUrl(value);
  }

  const handleSelectetElement = element => {
    if(!element) return;
    setSelectedElements([...selectedElements, element]);
  }

  const handleRemoveElement = index => {
    setSelectedElements(selectedElements.filter((element, i) => index !== i ));
  }

  const validName = name => name.length >= 3 ? true : false;
  const validUrl = url => url[0] === '/' ? true : false;
  const validEments = elements => elements.length < 5 ? true : false;

  const withoutErrors = () => {
    const errors = [];
    if(!validName(name)) {
      errors.push('Please enter a name with at least 3 characters')
    }
    if(!validUrl(url)) {
      errors.push('Please enter a valid address, starts with "/"');
    }
    if(!validEments(selectedElements)) {
      errors.push('Select up to 5 elements');
    }
    setErrors(errors);
    return errors.length === 0;
  }

  const submit = () => {
    if(withoutErrors()) {
      storePage();
      handleClose();
      setName('');
      setUrl('');
      setSelectedElements([]);
    }
  }

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle onClose={handleClose}>
        Add Page
      </DialogTitle>
      <DialogContent dividers>
        <Collapse in={errors.length > 0}>
          <Alert 
            variant="filled"
            severity="error"
          >
            {errors.join(', ')}
          </Alert>
        </Collapse>
        <Typography style={{ marginTop: 10 }} gutterBottom> Page Name </Typography>
        <TextField 
          id="name" 
          label="ex: home page" 
          variant="outlined"
          value={name}
          fullWidth
          onChange={handleChageName}
        />
        <Typography style={{ marginTop: 10 }} gutterBottom> Page address </Typography>
        <TextField 
          id="url" 
          label="ex: /home" 
          variant="outlined"
          type="url"
          value={url}
          fullWidth
          onChange={handleChageUrl}
        />
        <Typography style={{ marginTop: 10 }} gutterBottom> 
          Interaction Elements
        </Typography>
        <Autocomplete
          autoHighlight
          clearOnEscape
          options={elements}
          getOptionLabel={element => element.name}
          onChange={(event, newValue) => handleSelectetElement(newValue)}
          style={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label="Element name" variant="outlined" />}
        />
        {selectedElements.map((element, index) => (
          <Chip
            key={index}
            color="primary"
            style={{ marginTop: 10, marginRight: 5 }}
            label={element.name}
            onDelete={() => handleRemoveElement(index)}
          />
        ))}
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
          Add Page
        </Button>
      </DialogActions>
    </Dialog>
  );
}

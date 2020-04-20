import React, { useState, useContext, useEffect } from 'react';
import { WebsiteContext } from '../../context/WebsiteContext';
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

export default function CreateWebsite({ open, handleClose }) {
  const regexUrl = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/g;
  const { websiteController } = useContext(WebsiteContext);
  const [currentWebsite, setCurrentWebsite] = websiteController;

  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [designers, setDesigners] = useState([]);
  const [designer, setDesigner] = useState({});
  const [errors, setErrors] = useState([]);

  const validName = name => name.length >= 3 ? true : false;
  const validUrl = url => regexUrl.exec(url) ? true : false;
  const validDesigner = designer => designer.id ? true : false;

  const loadDesigners = async () => {
    const response = await api.post('/designers/index.php');
    const { data } = response;
    if(data.status === 'success') {
      setDesigners(data.docs);
    } else {
      alert('Error on load designers');
    }
  }

  const storeWebsite = async () => {
    const response = await api.post('/websites/store.php', {
      designer_id: Number(designer.id),
      name, url
    });
    const { data } = response;
    if(data.status === 'success') {
      setCurrentWebsite(data.docs);
    } else {
      alert('Error on load designers');
    }
  }

  useEffect(() => {
    loadDesigners();
  }, [])

  const handleChageName = event => {
    const { value } = event.target;
    value.length <= 100 && setName(value);
  }

  const handleChageUrl = event => {
    const { value } = event.target;
    value.length <= 150 && setUrl(value);
  }

  const handleChangeDesigner = designer => {
    designer ? setDesigner(designer) : setDesigner({})
  }

  const withoutErrors = () => {
    const errors = [];
    if(!validName(name)) {
      errors.push('Please enter a name with at least 3 characters')
    }
    if(!validUrl(url)) {
      errors.push('Please enter a valid address');
    }
    if(!validDesigner(designer)) {
      errors.push('Please select a designer ')
    }
    setErrors(errors);
    return errors.length === 0;
  }

  const submit = () => {
    if(withoutErrors()) {
      storeWebsite();
      handleClose();
      setName('');
      setUrl('');
      setDesigner({});
    }
  }

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle onClose={handleClose}>
        Add Website
      </DialogTitle>
      <DialogContent dividers>
        {currentWebsite.id && (
          <Alert
            variant="filled"
            severity="warning"
            style={{ marginBottom: 10 }}
          >
            Make sure the changes to the website "{currentWebsite.name}" have been saved
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
        <Typography style={{ marginTop: 10 }} gutterBottom> Website Name </Typography>
        <TextField 
          id="name" 
          label="ex: USP website" 
          variant="outlined"
          value={name}
          fullWidth
          onChange={handleChageName}
        />
        <Typography style={{ marginTop: 10 }} gutterBottom> Website address </Typography>
        <TextField 
          id="url" 
          label="ex: https://www5.usp.br" 
          variant="outlined"
          type="url"
          value={url}
          fullWidth
          onChange={handleChageUrl}
        />
        <Typography style={{ marginTop: 10 }} gutterBottom> 
          Designer{designer.name && `: "${designer.name}"`}
        </Typography>
        <Autocomplete
          autoHighlight
          options={designers}
          getOptionLabel={designer => designer.email}
          onChange={(event, newValue) => handleChangeDesigner(newValue)}
          style={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label="Designer email" variant="outlined" />}
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
          Add Website
        </Button>
      </DialogActions>
    </Dialog>
  );
}
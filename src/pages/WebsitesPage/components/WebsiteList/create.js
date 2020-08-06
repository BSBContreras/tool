import React, { useState, useContext, useEffect } from 'react';
import { WebsiteContext } from '../../context/WebsiteContext';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { makeStyles } from '@material-ui/core/styles';

import { storeWebsite, storeDesigner, loadDesignersByEmail } from '../../../../routes';

import AlertMessage from '../../../../components/AlertMessage';
import Dialog from '../../../../components/Dialog';
import ListItemDefault from '../../../../components/ListItemDefault';

import { RUNTIME_ERROR, CANCEL } from '../../../../constants';
import { validateUrl, validateEmail, validateName } from '../../../../utils';

const useStyles = makeStyles(theme => ({
  textfield: {
    marginTop: theme.spacing(1.5)
  },
  header: {
    margin: 0,
    padding: theme.spacing(1, 0),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  loading: {
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: theme.spacing(1.5)
  },
  button: {
    border: 'none',
    outline: 'none',

    width: '100%',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,

    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(1),
    
    cursor: 'pointer',
    fontSize: 14,

    transition: 'all .3s',

    '&:hover': {
      backgroundColor: theme.palette.primary.contrastText,
      border: '1px solid ' + theme.palette.primary.main,
      color: theme.palette.primary.main,
    },
  }
}));

const CreateDesigner = ({ handleClose, createDesigner }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);

  const handleChageName = event => {
    const { value } = event.target;
    value.length <= 100 && setName(value);
  }

  const handleChageEmail = event => {
    const { value } = event.target;
    value.length <= 150 && setEmail(value);
  }

  const withoutErrors = () => {
    const errors = [];
    if(!validateName(name)) {
      errors.push('Please enter first and last name')
    }
    if(!validateEmail(email)) {
      errors.push('Please enter a valid address');
    }
    setErrors(errors);
    return errors.length === 0;
  }

  const submit = () => {
    if(withoutErrors()) {
      storeDesigner({
        name, email
      }).then(data => {

        createDesigner(data);
      }).catch(error => {

        if(Number(error.id) !== RUNTIME_ERROR) {
          setErrors([error.detail]);
        } else {
          alert('Error on load Profiles');
        }

      })
    }
  }

  const classes = useStyles();

  return(
    <form onSubmit={e => { e.preventDefault(); submit(); }}>
      <div className={classes.header}>
        <Typography variant="body1" noWrap>Create Designer</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <AlertMessage open={errors.length > 0} type="error">
        {errors.join(', ')}
      </AlertMessage>
      <Typography className={classes.textfield} gutterBottom> Designer Name </Typography>
      <TextField 
        id="name_designer" 
        label="Designer Name" 
        variant="outlined"
        value={name}
        fullWidth
        onChange={handleChageName}
      />
      <Typography className={classes.textfield} gutterBottom> Designer Email </Typography>
      <TextField 
        id="email_designer" 
        label="Designer Email" 
        variant="outlined"
        type="email"
        value={email}
        fullWidth
        onChange={handleChageEmail}
      />
      <button
        className={classes.button}
        type="submit"
      >
        Create Designer
      </button>
    </form>
  );
}

export default function CreateWebsite({ handleClose }) {
  const { websiteController } = useContext(WebsiteContext);
  const [currentWebsite, setCurrentWebsite] = websiteController;

  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [designers, setDesigners] = useState([]);
  const [designer, setDesigner] = useState({});
  const [errors, setErrors] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [openCreateDesigner, setOpenCreateDesigner] = useState(false);
 
  const validName = name => name.length >= 3 ? true : false;
  const validDesigner = designer => designer.id ? true : false;

  const handleChageName = event => {
    const { value } = event.target;
    value.length <= 100 && setName(value);
  }

  const handleChageUrl = event => {
    const { value } = event.target;
    value.length <= 150 && setUrl(value);
  }

  const handleChangeDesigner = designer => {
    setDesigner(designer);
  }

  const handleOpenCreateDesigner = () => {
    setOpenCreateDesigner(true);
  }

  const handleCloseCreateDesigner = () => {
    setOpenCreateDesigner(false);
  }

  const handleChangeSearch = event => {

    const query = event.target.value;
    setLoading(true);
    setQuery(query);
  }

  useEffect(() => {

    if(query.length < 5) {
      return;
    }

    loadDesignersByEmail({
      query
    }).then(data => {

      setDesigners(data);
    }).catch(error => {

      if(Number(error.id) === CANCEL) {
        return;
      }

      if(Number(error.id) !== RUNTIME_ERROR) {
        alert(error.detail);
      } else {
        alert('Error on load Designers');
      }

    }).finally(() => {

      setLoading(false);
    })
  }, [query])

  const createDesigner = designer => {
    setLoading(true);
    setQuery(designer.email);
    setDesigner(designer);
    handleCloseCreateDesigner();
  }

  const withoutErrors = () => {
    const errors = [];
    if(!validName(name)) {
      errors.push('Please enter a name with at least 3 characters')
    }
    if(!validateUrl(url)) {
      errors.push('Please enter a valid address');
    }
    if(!validDesigner(designer)) {
      errors.push('Please select a designer')
    }
    setErrors(errors);
    return errors.length === 0;
  }

  const submit = () => {
    if(withoutErrors()) {
      storeWebsite({
        name, url,
        designer_id: Number(designer.id),
        manger_id: 5
      }).then(data => {

        setCurrentWebsite(data);
      }).catch(error => {

        if(Number(error.id) !== RUNTIME_ERROR) {
          alert(error.detail);
        } else {
          alert('Error on load Profiles');
        }

      }).finally(() => {

        handleClose();
      });
    }
  }

  const classes = useStyles();

  return (
    <Dialog
      title="Add Website"
      submitText="Add Website"
      handleClose={handleClose}
      submit={submit}
      maxWidth="sm"
    >
      <AlertMessage open={currentWebsite.id} type="warning">
        Make sure the changes to the website "{currentWebsite.name}" have been saved
      </AlertMessage>
      <AlertMessage open={errors.length > 0} type="error">
        {errors.join(', ')}
      </AlertMessage>
      <Typography className={classes.textfield} gutterBottom> Website Name </Typography>
      <TextField 
        id="name_website" 
        label="ex: USP website" 
        variant="outlined"
        value={name}
        fullWidth
        onChange={handleChageName}
      />
      <Typography className={classes.textfield} gutterBottom> Website address </Typography>
      <TextField 
        id="url_website" 
        label="ex: https://www5.usp.br" 
        variant="outlined"
        type="url"
        value={url}
        fullWidth
        onChange={handleChageUrl}
      />
      <Typography className={classes.textfield} gutterBottom> 
        Designer{designer.name && `: "${designer.name}"`}
      </Typography>
      <TextField 
        id="designer" 
        label="Designer Email / Name" 
        variant="outlined"
        value={query}
        InputProps={{ endAdornment: 
          <InputAdornment position="end">
            <IconButton onClick={handleOpenCreateDesigner}>
              <AddIcon />
            </IconButton>
          </InputAdornment>,
        }}
        fullWidth
        onChange={handleChangeSearch}
      />
      {loading ? (
        <div className={classes.loading} style={{ 
          
        }}>
          <CircularProgress />
          <span className={classes.textfield}> 
            Please enter the first 5 characters of the email or name
          </span>
        </div>
      ) : (
        designers.length > 0 ? (
          <List className={classes.textfield}>
            <Grid container>
              {designers.map(item => (
                <Grid key={item.id} item sm={6}>
                  <ListItemDefault
                    primaryText={item.name}
                    secondaryText={item.email}
                    tooltipText={item.email}
                    onClick={() => handleChangeDesigner(item)}
                    active={item.id === designer.id}
                  />
                </Grid>
              ))}
            </Grid>
          </List>
        ) : (
          <Typography className={classes.textfield}> 
            No designers found, type a valid email above or 
            <span onClick={handleOpenCreateDesigner} className={classes.link}> click here </span> 
            to add a new designer
          </Typography>
        )
      )}
      {openCreateDesigner && <Divider />}
      <Collapse in={openCreateDesigner}>
        <CreateDesigner handleClose={handleCloseCreateDesigner} createDesigner={createDesigner} />
      </Collapse>
    </Dialog>
  );
}

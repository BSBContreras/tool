import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import Dialog from '../../../../components/Dialog';
import AlertMessage from '../../../../components/AlertMessage';
import ListItemDefault from '../../../../components/ListItemDefault';
import BlueCheckbox from '../../../../components/BlueCheckbox';
import Button from '../../../../components/Button';

import { loadEvaluatorsByEmail, loadProfiles, storeEvaluator } from '../../../../routes';

import { RUNTIME_ERROR, CANCEL } from '../../../../constants';
import { validateEmail, validateName } from '../../../../utils';

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
  }
}))

const CreateEvaluator = ({ handleClose, createEvaluator }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [selecteds, setSelecteds] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleChageName = event => {
    const { value } = event.target;
    value.length <= 100 && setName(value);
  }

  const handleChageEmail = event => {
    const { value } = event.target;
    value.length <= 150 && setEmail(value);
  }

  const handleClickProfile = (event, newProfile) => {
    const { checked } = event.target;
    if(checked) {
      setSelecteds(prev => [...prev, newProfile]);
    } else {
      setSelecteds(prev => prev.filter(profile => profile.id !== newProfile.id));
    }
  }

  useEffect(() => {
    loadProfiles().then(data => {

      setProfiles(prev => [...prev, ...data]);
    }).catch(error => {

      if(Number(error.id) !== RUNTIME_ERROR) {
        alert(error.detail);
      } else {
        alert('Error on load Profiles');
      }

    })
  }, [])

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
      storeEvaluator({
        name, email,
        profiles_ids: selecteds.map(profile => Number(profile.id))
      }).then(data => {

        createEvaluator(data);
        handleClose();
      }).catch(error => {

        if(Number(error.id) !== RUNTIME_ERROR) {
          setErrors([error.detail]);
        } else {
          alert('Error on create evaluator');
        }

      })
    }
  }

  const classes = useStyles();

  return (
    <form onSubmit={e => { e.preventDefault(); submit(); }}>
      <div className={classes.header}>
        <Typography variant="body1" noWrap>Create Evaluator</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <AlertMessage open={errors.length > 0} type="error">
        {errors.join(', ')}
      </AlertMessage>
      <Typography className={classes.textfield} gutterBottom> Evaluator Name </Typography>
      <TextField 
        id="name_evaluator" 
        label="Evaluator Name" 
        variant="outlined"
        value={name}
        fullWidth
        onChange={handleChageName}
      />
      <Typography className={classes.textfield} gutterBottom> Evaluator Email </Typography>
      <TextField 
        id="email_evaluator" 
        label="Evaluator Email" 
        variant="outlined"
        type="email"
        value={email}
        fullWidth
        onChange={handleChageEmail}
      />
      <Typography className={classes.textfield} gutterBottom> Profiles </Typography>
      <Grid container>
        {profiles.map(profile => (
          <Grid key={profile.id} item sm={4}>
            <BlueCheckbox onClick={e => handleClickProfile(e, profile)}>
              {profile.name}
            </BlueCheckbox>
          </Grid>
        ))}
      </Grid>
      <Button
        className={classes.textfield}
        type="submit"
      >
        Create evaluator
      </Button>
    </form>
  )
}

export default function AddEvaluation({ handleClose, handleAdd }) {

  const [evaluators, setEvaluators] = useState([]);
  const [evaluator, setEvaluator] = useState({});
  const [errors, setErrors] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [openCreateEvaluator, setOpenCreateEvaluator] = useState(false);

  const handleChangeSearch = (event) => {
    const { value } = event.target;
    setLoading(true);
    setQuery(value);
  }

  useEffect(() => {

    if(query.length < 5) {
      return;
    }
    
    loadEvaluatorsByEmail({
      query
    }).then(data => {

      setEvaluators(data);
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

  const handleOpenCreateEvaluator = () => {
    setOpenCreateEvaluator(true);
  }

  const handleCloseCreateEvaluator = () => {
    setOpenCreateEvaluator(false);
  }

  const handleChangeEvaluator = evaluator => {
    setEvaluator(evaluator);
  }

  const createEvaluator = (evaluator) => {
    setLoading(true);
    setQuery(evaluator.email);
    setEvaluator(evaluator);
  }

  const validateEvaluator = evaluator => evaluator.id ? true : false;

  const withoutErrors = () => {
    const errors = [];
    if(!validateEvaluator(evaluator)) {
      errors.push('Please select some evaluator')
    }
    setErrors(errors);
    return errors.length === 0;
  }
  
  const submit = () => {
    if(withoutErrors()) {
      handleAdd(evaluator);
      handleClose();
    }
  }

  const classes = useStyles();

  return (
    <Dialog
      handleClose={handleClose}
      title="Add Evaluator"
      submitText="Add Evaluator"
      submit={submit}
      maxWidth="sm"
    >
      <AlertMessage open={errors.length > 0} type="error">
        {errors.join(', ')}
      </AlertMessage>
      <Typography gutterBottom> 
        Evaluator {evaluator.name && `: "${evaluator.name}"`}
      </Typography>
      <TextField 
        id="Evaluator" 
        label="Evaluator Email / Name" 
        variant="outlined"
        value={query}
        InputProps={{ endAdornment: 
          <InputAdornment position="end">
            <IconButton onClick={handleOpenCreateEvaluator}>
              <AddIcon />
            </IconButton>
          </InputAdornment>,
        }}
        fullWidth
        onChange={handleChangeSearch}
      />
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress />
          <span className={classes.textfield}> 
            Please enter the first 5 characters of the email or name
          </span>
        </div>
      ) : (
        evaluators.length > 0 ? (
          <List className={classes.textfield}>
            <Grid container>
              {evaluators.map(item => (
                <Grid key={item.id} item sm={6}>
                  <ListItemDefault
                    primaryText={item.name}
                    secondaryText={item.email}
                    tooltipText={item.email}
                    onClick={() => handleChangeEvaluator(item)}
                    active={item.id === evaluator.id}
                  />
                </Grid>
              ))}
            </Grid>
          </List>
        ) : (
          <Typography className={classes.textfield}> 
            No evaluators found, type a valid email above or 
            <span onClick={handleOpenCreateEvaluator} className={classes.link}> click here </span> 
            to add a new designer
          </Typography>
        )
      )}
      <Collapse in={openCreateEvaluator}>
        <CreateEvaluator handleClose={handleCloseCreateEvaluator} createEvaluator={createEvaluator} />
      </Collapse>
    </Dialog>
  );
}
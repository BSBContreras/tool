import React, { useState, useEffect, useContext } from 'react';

// Material-ui imports
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';

// Context Imports
import { GlobalContext } from '../../context/GlobalContext';

// Components Imports
import BlueCheckbox from '../../components/BlueCheckbox';
import AlertMessage from '../../components/AlertMessage';

// Utils Imports
import { strBetween, validateEmail, validateName } from '../../utils';
import { storeManager, loginManager } from '../../routes';
import { RUNTIME_ERROR } from '../../constants';

const validatePassword = (password) => strBetween(password, 8, 32);

const Tab = ({ selected, children, ...other }) => {
  const useStyles = makeStyles(theme => ({
    tab: {
      fontSize: 16,
      backgroundColor: selected ? '#FFFFFF' : 'transparent',
      cursor: 'pointer',
      padding: theme.spacing(2, 4, 2, 2),
      color: theme.palette.grey[700],
      marginTop: theme.spacing(2),
      borderRadius: theme.spacing(2, 0, 0, 2),
      transition: 'background-color .3s',
      '&:hover': {
        backgroundColor: 'white'
      }
    }
  }));

  const classes = useStyles();

  return (
    <span className={classes.tab} {...other}>{children}</span>
  );
}

const useStyles = makeStyles(theme => ({
  title: {
    color: '#22ACF0',
    fontSize: 36
  },
  form: {
    width: '80%'
  },
  textfield: {
    margin: theme.spacing(2, 0)
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1)
  },
  action: {
    color: '#22ACF0',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  button: {
    backgroundColor: '#22ACF0',
    border: 'none',
    borderRadius: 32,
    color: 'white',
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
    width: '100%',
    cursor: 'pointer',
    fontSize: 18,
    transition: 'all .3s ease-in-out',
    outline: 'none',
    '&:hover': {
      transform: 'scale(1.05)',
    }
  }
}));

const LoginForm = ({ handleRegisterDisplay }) => {

  const [showPassword, setShowPassword]  = useState(false);
  const [remember, setRemember] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const { managerController } = useContext(GlobalContext);
  const [ manager, setManager ] = managerController;

  const handleChangeRemember = (event) => {
    const { checked } = event.target;
    setRemember(checked);
  }

  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev);
  }

  const handleChangeEmail = event => {
    const { value: email } = event.target;
    email.length <= 150 && setEmail(email);
  }

  const handleChangePassword = event => {
    const { value: password } = event.target;
    password.length <= 32 && setPassword(password);
  }

  const withoutErrors = () => {
    const errors = [];
    if(!validateEmail(email)) {
      errors.push('Please enter a valid email');
    }
    if(!validatePassword(password)) {
      errors.push('Please enter a password between 8 to 32 characters')
    }
    setErrors(errors);
    return errors.length === 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(withoutErrors()) {
      loginManager({
        email, password
      }).then(json => {

        if(remember) {
          localStorage.setItem('manager_data', JSON.stringify({
            email: json.email,
            password: json.password
          }))
        }

        if(manager.id !== json.id) {
          setManager(json);
        }

      }).catch(error => {

        if(Number(error.id) !== RUNTIME_ERROR) {
          setErrors([error.detail]);
          return;
        }

        alert('error');
      }).finally(() => {

        // Finnaly
      });
    }
  }

  const classes = useStyles();

  return (
    <form className={classes.form}>
      <span className={classes.title}>Co-Inspect Tool</span>
      <TextField 
        id="email" 
        required
        className={classes.textfield}
        label="Email" 
        value={email}
        fullWidth
        onChange={handleChangeEmail}
      />
      <TextField 
        id="password" 
        required
        className={classes.textfield}
        label="Password" 
        type={showPassword ? 'text' : 'password'}
        InputProps={{ endAdornment: 
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>,
        }}
        value={password}
        fullWidth
        onChange={handleChangePassword}
      />
      <span onClick={() => alert('WIP')} className={classes.action}>
        Forgot password?
      </span>
      <AlertMessage type="error" open={errors.length > 0} style={{ marginTop: 8 }}>
        {errors.join('.\n')}
      </AlertMessage>
      <button onClick={handleSubmit} className={classes.button}>
        Login
      </button>
      <div className={classes.actions}>
        <BlueCheckbox onChange={handleChangeRemember} checked={remember}>
          Remember me
        </BlueCheckbox>
        <span onClick={handleRegisterDisplay} className={classes.action}>
          Not registered yet?
        </span>
      </div>
    </form>
  );
}

const RegisterForm = ({ handleLoginDisplay }) => {

  const [showPassword, setShowPassword]  = useState(false);
  const [remember, setRemember] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const { managerController } = useContext(GlobalContext);
  const [ manager, setManager ] = managerController;

  const handleChangeRemember = (event) => {
    const { checked } = event.target;
    setRemember(checked);
  }

  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev);
  }

  const handleChangeName = event => {
    const { value: name } = event.target;
    name.length <= 100 && setName(name);
  }

  const handleChangeEmail = event => {
    const { value: email } = event.target;
    email.length <= 150 && setEmail(email);
  }

  const handleChangePassword = event => {
    const { value: password } = event.target;
    password.length <= 32 && setPassword(password);
  }

  const withoutErrors = () => {
    const errors = [];
    if(!validateName(name)) {
      errors.push('Please enter first and last name');
    }
    if(!validateEmail(email)) {
      errors.push('Please enter a valid email')
    }
    if(!validatePassword(password)) {
      errors.push('Please enter a password between 8 to 32 characters')
    }
    setErrors(errors);
    return errors.length === 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if(withoutErrors()) {
      storeManager({
        name, email, password
      }).then(json => {

        if(remember) {
          localStorage.setItem('manager_data', JSON.stringify({
            email: json.email,
            password: json.password
          }))
        }

        if(manager.id !== json.id) {
          setManager(json);
        }

      }).catch(error => {

        if(Number(error.id) !== RUNTIME_ERROR) {
          setErrors([error.detail]);
          return;
        }

        alert('error');
      }).finally(() => {

        // Finnaly
      });
    }
  }

  const classes = useStyles();

  return (
    <form className={classes.form}>
      <span className={classes.title}>Co-Inspect Tool</span>
      <TextField 
        id="name" 
        required
        className={classes.textfield}
        label="Name" 
        value={name}
        fullWidth
        onChange={handleChangeName}
      />
      <TextField 
        id="email" 
        required
        className={classes.textfield}
        label="Email" 
        value={email}
        fullWidth
        onChange={handleChangeEmail}
      />
      <TextField 
        id="password" 
        required
        className={classes.textfield}
        label="Password" 
        type={showPassword ? 'text' : 'password'}
        InputProps={{ endAdornment: 
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>,
        }}
        value={password}
        fullWidth
        onChange={handleChangePassword}
      />
      <AlertMessage type="error" open={errors.length > 0} style={{ marginTop: 8 }}>
        {errors.join('.\n')}
      </AlertMessage>
      <button onClick={handleSubmit} className={classes.button}>
        Register
      </button>
      <div className={classes.actions}>
        <BlueCheckbox onChange={handleChangeRemember} checked={remember}>
          Remember me
        </BlueCheckbox>
        <span onClick={handleLoginDisplay} className={classes.action}>
          Already registered?
        </span>
      </div>
    </form>
  );
}

export default function LoginPage() {
  const useStyles = makeStyles(theme => ({
    container: {
      maxHeight: '100vh'
    },
    blue: {
      justifyContent: 'space-between',
      backgroundColor: '#22ACF0',
      color: '#FFFFFF',
      display: 'flex',
      height: '100vh',
    },
    white: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
    },
    welcome: {
      marginLeft: theme.spacing(8),
      fontWeight: 'lighter',
      alignSelf: 'center',
      fontSize: 24,
    },
    tabs: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(4),
    }
  }));

  const [display, setDisplay] = useState('login');

  const { managerController } = useContext(GlobalContext);
  const [ manager, setManager ] = managerController;

  const handleLoginDisplay = () => {
    if(display !== 'login') {
      setDisplay('login');
    }
  }

  const handleRegisterDisplay = () => {
    if(display !== 'register') {
      setDisplay('register');
    }
  }


  // try auto login
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('manager_data'));
    
    if(!data) {
      return;
    }

    if(!data.email || !data.password) {
      return;
    }

    loginManager(data).then(json => {

      setManager(json);

    }).catch(error => {

      if(Number(error.id) !== RUNTIME_ERROR) {
        alert(error.detail);
        return;
      }

      alert('error');
    }).finally(() => {

      // Finnaly
    });
  }, [manager, setManager]);


  const classes = useStyles();

  return (
    <Grid className={classes.container} container>
      <Grid className={classes.blue} item sm={12} md={8}>
        <div className={classes.welcome}>
          <span style={{ fontSize: 22 }}>Welcome to</span>
          <h1>Co-Inspect Tool</h1>
          <p style={{ fontSize: 18 }}>A computerized tool designed to support usability assessments of web sites using checklists and which aims to present quantitative results about the usability characteristics of the web site with a focus on monitoring environments for biodiversity, climate change and seasonal diseases.</p>
        </div>
        <div className={classes.tabs}>
          <Tab onClick={handleLoginDisplay} selected={display === 'login'}>
            Login
          </Tab>
          <Tab onClick={handleRegisterDisplay} selected={display === 'register'}>
            Register
          </Tab>
        </div>
      </Grid>
      <Grid className={classes.white} item sm={12} md={4}>
        {display === 'login' ? (
          <LoginForm handleRegisterDisplay={handleRegisterDisplay}  />
        ) : (
          <RegisterForm handleLoginDisplay={handleLoginDisplay} />
        )}
      </Grid>
    </Grid>
  );
}

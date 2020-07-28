import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse'
import Alert from '@material-ui/lab/Alert';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const validateEmail = (email) => {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(String(email).toLowerCase());
}

const validatePassword = (password) => {
  return password.length >= 8;
}

const validateName = (name) => {
  if(name.length < 3) {
    return false;
  }

  const names = name.split(' ');

  if(names.length < 2) {
    return false;
  }

  return true;
}

const BlueCheckbox = withStyles({
  root: {
    color: '#22ACF0',
    '&$checked': {
      color: 'white',
    }
  }
})(({children, className, ...props}) => 
  <FormControlLabel 
    className={className}
    control={<Checkbox color="default" {...props} />} 
    label={children} 
  />
);

const AlertPopup = ({ open, type, children, ...other }) => {
  return (
    <Collapse in={open} {...other}>
      <Alert variant="filled" severity={type}>
        {children}
      </Alert>
    </Collapse>
  )
}

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
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

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
    setErrors(errors);
    return errors.length === 0;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(withoutErrors()) {
      alert('login');
    }
  }

  const classes = useStyles();

  return (
    <form className={classes.form}>
      <span className={classes.title}>Co-Inspect Tool</span>
      <TextField 
        id="email" 
        className={classes.textfield}
        label="Email" 
        value={email}
        fullWidth
        onChange={handleChangeEmail}
      />
      <TextField 
        id="password" 
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
      <span className={classes.action}>
        Forgot password?
      </span>
      <AlertPopup type="error" open={errors.length > 0} style={{ marginTop: 8 }}>
        {errors.join('.\n')}
      </AlertPopup>
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
  const [remember, setRemember] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

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
      alert('register');
    }
  }

  const classes = useStyles();

  return (
    <form className={classes.form}>
      <span className={classes.title}>Co-Inspect Tool</span>
      <TextField 
        id="name" 
        className={classes.textfield}
        label="Name" 
        value={name}
        fullWidth
        onChange={handleChangeName}
      />
      <TextField 
        id="email" 
        className={classes.textfield}
        label="Email" 
        value={email}
        fullWidth
        onChange={handleChangeEmail}
      />
      <TextField 
        id="password" 
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
      <AlertPopup type="error" open={errors.length > 0} style={{ marginTop: 8 }}>
        {errors.join('.\n')}
      </AlertPopup>
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

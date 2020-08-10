import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    outline: 'none',
    
    width: '100%',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    border: '1px solid ' + theme.palette.primary.main,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,

    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),

    cursor: 'pointer',
    fontSize: 14,

    transition: 'all .3s',

    '&:hover': {
      backgroundColor: theme.palette.primary.contrastText,
      color: theme.palette.primary.main,
    },
  }
}))

export default function Button({ children, className, ...rest }) {

  const classes = useStyles();

  return (
    <button className={clsx(classes.button, className)} {...rest}>
      {children}
    </button>
  )
}
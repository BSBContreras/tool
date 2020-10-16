import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    background: '#FAFAFA',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '40px'
  }
}))

export default function BoardRounded({ children, className, ...others }) {

  const classes = useStyles();

  return (
    <div className={clsx(classes.container, className)} {...others} >{children}</div>
  );
}

import React from 'react';

import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';

const AlertPopup = ({ open, type, children, ...other }) => {
  return (
    <Collapse in={open} {...other}>
      <Alert variant="filled" severity={type}>
        {children}
      </Alert>
    </Collapse>
  )
}

export default AlertPopup;

import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

const BlueCheckbox = withStyles({
  root: {
    color: '#22ACF0',
  }
})(({children, className, ...props}) => 
  <FormControlLabel 
    className={className}
    control={<Checkbox color="default" {...props} />} 
    label={children} 
  />
);

export default BlueCheckbox;

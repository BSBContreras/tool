import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab'

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '45px',
    fontSize: '18px',
  },
}));

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export default function TabsComponent({ tabs, value, handleChange }) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs 
          centered
          value={value} 
          variant="fullWidth"
          onChange={(event, index) => handleChange(index)} 
          aria-label="tabs"
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab} {...a11yProps(index)} />
          ))}
        </Tabs>
      </AppBar>
    </div>
  );
};
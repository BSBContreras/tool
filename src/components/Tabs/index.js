import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab'

import { makeStyles, withStyles } from '@material-ui/core/styles';

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

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

export default function TabsComponent({ tabs, value, handleChange }) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StyledTabs
        centered
        value={value} 
        variant="fullWidth"
        indicatorColor="secondary"
        onChange={(event, index) => handleChange(index)} 
        aria-label="tabs"
      >
        {tabs.map((tab, index) => (
          <StyledTab key={index} label={tab} {...a11yProps(index)} />
        ))}
      </StyledTabs>
    </div>
  );
};
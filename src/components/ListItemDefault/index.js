import React from 'react';

import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

export default function ListItemDefault({
  onClick,
  tooltipText,
  primaryText,
  secondaryText,
  active
}) {
  const useStyles = makeStyles(theme => ({
    paper: {
      border: '2px solid' + theme.palette.primary.main,
      borderRadius: theme.spacing(1),
      background: active ? theme.palette.primary.main : '#FFFFFF',
      margin: theme.spacing(1)
    },
    name: {
      fontSize: 16,
      color: active ? '#FFFFFF' : theme.palette.primary.main
    },
    detail: {
      fontSize: 12,
      color: active ? '#FFFFFF' : theme.palette.primary.main
    }
  }));

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Tooltip title={tooltipText || 'No details'} arrow placement="top">
        <ListItem button onClick={onClick}>
          <ListItemText 
            primary={<Typography className={classes.name}>{primaryText}</Typography>}
            secondary={<Typography className={classes.detail} noWrap>{secondaryText}</Typography>}
          />
        </ListItem>
      </Tooltip>
    </Paper>
  )
}
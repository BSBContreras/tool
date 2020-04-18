import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { WebsiteContext } from '../../context/WebsiteContext';
import { TaskContext } from '../../context/TaskContext';
import TaskProvider from '../../context/TaskContext';


const TaskAdd = () => {
  return (
    <Paper style={{ background: '#9f9' }}>
      <ListItem button onClick={() => {}}>
        <ListItemText 
          primary="Add new task"
          secondary="Click here to add a new task"
        />
        <ListItemIcon>
          <AddIcon fontSize="large" style={{ color: 'green' }} />
        </ListItemIcon>
      </ListItem>
    </Paper>
  );
}

const TaskItemAvailble = ({ task }) => {
  const { taskController } = useContext(TaskContext);
  const [currentTask, setCurrentTask] = taskController;

  return (
    <Paper style={{ marginTop: 10, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
      <ListItem button selected={currentTask === task} onClick={() => setCurrentTask(task)}>
        <Tooltip title="Add task in the constructor" arrow placement="top">
          <ListItemText 
            primary={<Typography style={{ color: '#fff' }}>{task.name}</Typography>}
            secondary={<Typography style={{ color: '#fff' }}>{task.details}</Typography>}
          />
        </Tooltip>
      </ListItem>
    </Paper>
  );
}

const TaskItemUnavailable = ({ task }) => {
  return (
    <Paper style={{ marginTop: 10, background: '#ddd' }}>
      <ListItem disabled onClick={() => alert(task.id)}>
        <Tooltip title="This task is used by some assessment" arrow placement="top">
          <ListItemText 
            primary={task.name}
            secondary={task.details}
          />
        </Tooltip>
      </ListItem>
    </Paper>
  );
}

const TaskList = ({ website }) => {
  const Divider = () => <hr></hr>;

  const availableTasks = [
    {
      id: 1,
      name: 'Buy Bread',
      details: 'When the morning come, i will open my eyes and buy a beatiful peace of bread'
    },
    {
      id: 2,
      name: 'View clothes',
      details: 'View all the stuff of the store, and check the price.'
    },
  ]

  const unavailableTasks = [
    {
      id: 3,
      name: 'task 3',
      details: 'task details 3'
    },
    {
      id: 4,
      name: 'task 4',
      details: 'task details 4'
    },
  ]

  return (
    <List component="nav" style={{ padding: 10, height: 635, overflowY: 'auto'}}>
      <TaskAdd />
      {availableTasks.map(task => (
        <TaskItemAvailble key={task.id} task={task} />
      ))}
      <Divider />
      <Typography>Read-Only Region</Typography>
      {unavailableTasks.map(task => (
        <TaskItemUnavailable key={task.id} task={task} />
      ))}
    </List>
  )
}

const PageAdd = () => {
  return (
    <Paper style={{ background: '#9f9' }}>
      <ListItem button onClick={() => {}}>
        <ListItemText 
          primary="Add new page"
          secondary="Click here to add a new page"
        />
        <ListItemIcon>
          <AddIcon fontSize="large" style={{ color: 'green' }} />
        </ListItemIcon>
      </ListItem>
    </Paper>
  );
}

const PageItem = ({ page }) => {
  const { pagesController } = useContext(TaskContext);
  const [selectedsPages, setSelectedsPages] = pagesController;

  return (
    <Paper style={{ marginTop: 10, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
      <ListItem button onClick={() => setSelectedsPages([...selectedsPages, page])}>
        <Tooltip title="Add page in the constructor" arrow placement="top">
          <ListItemText 
            primary={<Typography style={{ color: '#fff' }}>{page.name}</Typography>}
            secondary={<Typography style={{ color: '#fff' }}>{page.url}</Typography>}
          />
        </Tooltip>
      </ListItem>
    </Paper>
  );
}

const PageList = ({ website }) => {
  const pages = [
    {
      id: 1,
      name: 'page 1',
      url: '/page1'
    },
    {
      id: 2,
      name: 'page 2',
      url: '/page1'
    },
    {
      id: 3,
      name: 'page 3',
      url: '/page1'
    },
    {
      id: 4,
      name: 'page 4',
      url: '/page1'
    },
  ]

  return (
    <List component="nav" style={{ padding: 10, height: 635, overflowY: 'auto'}}>
      <PageAdd />
      {pages.map(page => (
        <PageItem key={page.id} page={page} />
      ))}
    </List>
  );
}

const RouteItem = ({ page }) => {
  return (
    <Paper style={{ marginTop: 10, background: 'white' }}>
      <ListItem button onClick={() => alert(page.id)}>
        <Tooltip title="Click to remove this page from task" arrow placement="top">
          <ListItemText 
            primary={<Typography>{page.name}</Typography>}
            secondary={<Typography>{page.url}</Typography>}
          />
        </Tooltip>
      </ListItem>
    </Paper>
  );
}

const Constructor = () => {
  const Divider = () => <hr></hr>;

  const { pagesController, taskController } = useContext(TaskContext);
  const [ selectedsPages, setSelectedsPages ] = pagesController;
  const [ task ] = taskController;

  useEffect(() => {
    setSelectedsPages([]);
  }, [task, setSelectedsPages]);

  return (
    <List component="nav" style={{ padding: 10, height: 635, overflowY: 'auto'}}>
      {task.id ? (
        selectedsPages.map(page => (
          <RouteItem key={page.id} page={page} />
        ))
      ) : (
        <div>
          <Typography variant="body1" align="center" style={{ color: '#777' }}>
            CONSTRUCTOR
          </Typography>
          <Divider />
          <Typography align="center" style={{ color: '#999' }}>
            Please select any Task to edit our route on left side
          </Typography>
          <Typography 
            variant="subtitle2" 
            align="center" 
            onClick={() => alert('create')} 
            style={{ color: '#88f', cursor: 'pointer' }}
          >
            Click here to create a new task
          </Typography>
        </div>
      )}
    </List>
  );
}

export default function ShowAssessmentPanel() {
  const useStyles = makeStyles(theme => ({
    column: {
      margin: theme.spacing(1)
    }
  }));

  const { websiteController } = useContext(WebsiteContext);
  const [ website ] = websiteController;

  const classes = useStyles();

  return (
    <TaskProvider>
      <Grid container>
        <Grid sm item className={classes.column}>
          <Paper>
            <TaskList website={website} />
          </Paper>
        </Grid>
        <Grid sm item className={classes.column}>
          <Paper>
            <Constructor />
          </Paper>
        </Grid>
        <Grid sm item className={classes.column}>
          <Paper>
            <PageList website={website} />
          </Paper>
        </Grid>
      </Grid>
    </TaskProvider>
  );
}
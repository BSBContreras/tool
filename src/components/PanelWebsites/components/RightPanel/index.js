import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SelectWebsiteSvg from '../../../../assets/select_website.svg';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AddIcon from '@material-ui/icons/Add';
import MoreVert from '@material-ui/icons/MoreVert'
import Delete from '@material-ui/icons/Delete'
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
        <ListItemSecondaryAction>
          <IconButton edge="end">
            <AddIcon fontSize="large" style={{ color: 'green' }} />
          </IconButton>
        </ListItemSecondaryAction>
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
            primary={<Typography style={{ color: '#FFF' }}>{task.name}</Typography>}
            secondary={<Typography variant="subtitle2" style={{ color: '#EEE' }}>{task.details}</Typography>}
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
        <ListItemSecondaryAction>
          <IconButton edge="end">
            <AddIcon fontSize="large" style={{ color: 'green' }} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Paper>
  );
}

const PageItem = ({ page }) => {
  const { pagesController } = useContext(TaskContext);
  const [selectedsPages, setSelectedsPages] = pagesController;

  const rand = () => Math.floor(Math.random() * 100000);

  const handleAddPage = () => {
    setSelectedsPages([...selectedsPages, {...page, key: rand() }])
  }

  return (
    <Paper style={{ marginTop: 10, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
      <ListItem button onClick={handleAddPage}>
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

const TaskHeader = ({ task }) => {
  return (
    <Paper style={{ background: '#9f9' }}>
      <ListItem button onClick={() => {}}>
        <ListItemText 
          primary={task.name}
          secondary="The sequence of pages below represents the route of this task"
        />
        <ListItemSecondaryAction onClick={() => alert('edit task')}>
          <IconButton edge="end">
            <MoreVert style={{ color: 'grey' }} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </Paper>
  );
}

const RouteItem = ({ page }) => {
  const { pagesController } = useContext(TaskContext);
  const [ selectedsPages, setSelectedsPages ] = pagesController;

  const handleRemove = () => {
    const filteredPages = selectedsPages.filter(selectedPage => selectedPage.key !== page.key);
    setSelectedsPages(filteredPages);
  }

  return (
    <Paper style={{ marginTop: 10, background: 'linear-gradient(45deg, #FE6B8B 10%, #FF8E53 100%)' }}>
      <ListItem button>
        <ListItemText 
          primary={<Typography style={{ color: 'white' }}>{page.name}</Typography>}
          secondary={<Typography style={{ color: 'white' }}>{page.url}</Typography>}
        />
        <Tooltip title="Click to remove this page from task" arrow placement="top">
          <ListItemSecondaryAction onClick={handleRemove}>
            <IconButton edge="end">
              <Delete style={{ color: '#933' }} />
            </IconButton>
          </ListItemSecondaryAction>
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
    <List component="nav" style={{ padding: 10, height: 635, overflowY: 'auto' }}>
      {task.id ? (
        <div>
          <TaskHeader task={task} />
          {selectedsPages.map(page => (
            <RouteItem key={page.key} page={page} />
          ))}
          <Button 
            fullWidth
            onClick={() => alert('save task')}
            disabled={selectedsPages.length === 0}
            style={{ 
              marginTop: 10, 
              background: selectedsPages.length === 0 ? '#DDD' :'linear-gradient(45deg, #77EE77 30%, #99EE99 90%)', 
              color: selectedsPages.length === 0 ? '#000' : '#333' 
            }}>
              Save Task
            </Button>
            {selectedsPages.length === 0 && (
              <div>
                <Divider />
                <Typography align="center" style={{ color: '#999' }}>
                  Select any page on the right to save this task
                </Typography>
              </div>
            )}
        </div>
      ) : (
        <div>
          <Typography variant="body1" align="center" style={{ color: '#777' }}>
            CONSTRUCTOR
          </Typography>
          <Divider />
          <Typography align="center" style={{ color: '#999' }}>
            Select any task on the left to edit your route
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
      margin: theme.spacing(1),
    }
  }));

  const { websiteController } = useContext(WebsiteContext);
  const [ website ] = websiteController;

  const classes = useStyles();

  return (
    <Grid container>
      {website.id ? (
        <TaskProvider>
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
        </TaskProvider>
      ) : (
        <div>
          <Typography 
            style={{ color: '#444', margin: 30 }} 
            align="center" 
            variant="h4"
          >
            Select a website on the Left
          </Typography>
          <img 
            style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '50%' }} 
            src={SelectWebsiteSvg} 
            alt="Select some website" 
          /> 
          <Typography 
            style={{ color: '#88f', margin: 30, cursor: 'pointer' }} 
            align="center" 
            variant="subtitle1"
            onClick={() => alert('create website')}
          >
            Or Click here to add a New Website
          </Typography> 
        </div>
      )}
    </Grid>
  );
}
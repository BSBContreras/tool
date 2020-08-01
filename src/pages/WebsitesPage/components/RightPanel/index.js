import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../../../services/api';
import SelectWebsiteSvg from '../../../../assets/select_website.svg';
import CreateWebsiteDialog from '../WebsiteList/create';
import CreatePageDialog from './createPage';
import CreateTaskDialog from './createTask';
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
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper style={{ background: '#9f9' }}>
      <ListItem button onClick={handleClickOpen}>
        <ListItemText 
          primary="Add new task"
          secondary="Click here to add a new task"
        />
        <ListItemSecondaryAction onClick={handleClickOpen}>
          <IconButton edge="end">
            <AddIcon fontSize="large" style={{ color: 'green' }} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <CreateTaskDialog open={open} handleClose={handleClose} />
    </Paper>
  );
}

const TaskItemAvailble = ({ task }) => {
  const { taskController } = useContext(TaskContext);
  const [currentTask, setCurrentTask] = taskController;

  return (
    <Paper style={{ marginTop: 10, background: 'linear-gradient(45deg, #2196F3 90%, #21CBF3 30%)' }}>
      <ListItem button selected={currentTask === task} onClick={() => setCurrentTask(task)}>
        <Tooltip title="Add task in the constructor" arrow placement="top">
          <ListItemText 
            primary={<Typography style={{ color: '#FFF' }}>{task.name}</Typography>}
            secondary={<Typography variant="subtitle2" style={{ color: '#EEE' }}>{task.detail}</Typography>}
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
            secondary={task.detail}
          />
        </Tooltip>
      </ListItem>
    </Paper>
  );
}

const TaskList = ({ website }) => {
  const Divider = () => <hr></hr>;

  const { newTaskAddController } = useContext(TaskContext);
  const [ newTaskAdd, setNewTaskAdd ] = newTaskAddController;

  const [availableTasks, setAvailableTasks] = useState([]);

  const loadTasks = async (id) => {
    const response = await api.post('/websites/tasks.php', { id: Number(id) });
    const { data } = response;
    if(data.status === 'success') {
      setAvailableTasks(data.docs);
    } else {
      alert('Error on load tasks');
    }
  }

  useEffect(() => {
    if(website.id) {
      loadTasks(website.id);
    }
  }, [website])

  useEffect(() => {
    if(newTaskAdd && website.id) {
      loadTasks(website.id);
      setNewTaskAdd(false);
    }
  }, [newTaskAdd, website, setNewTaskAdd])

  const unavailableTasks = [
    {
      id: 50,
      name: 'Task static 1',
      detail: 'Static read-only task example 1'
    },
    {
      id: 51,
      name: 'Task static 2',
      detail: 'Static read-only task example 2'
    },
    {
      id: 52,
      name: 'Task static 3',
      detail: 'Static read-only task example 3'
    },
    {
      id: 53,
      name: 'Task static 4',
      detail: 'Static read-only task example 4'
    },
  ]

  return (
    <List 
      component="nav" 
      style={{ padding: 10, height: 635, overflowY: 'auto'}}
    >
      <Typography variant="body1" align="center" style={{ color: '#777' }}>
        TASK LIST
      </Typography>
      <Divider />
      <TaskAdd />
      {availableTasks.map(task => (
        <TaskItemAvailble key={task.id} task={task} />
      ))}
      {unavailableTasks.length > 0 && (
        <div>
          <Divider />
          <Typography>Read-Only Region</Typography>
          {unavailableTasks.map(task => (
            <TaskItemUnavailable key={task.id} task={task} />
          ))}
        </div>
      )}
    </List>
  )
}

const PageAdd = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper style={{ background: '#9f9' }}>
      <ListItem button onClick={handleClickOpen}>
        <ListItemText 
          primary="Add new page"
          secondary="Click here to add a new page"
        />
        <ListItemSecondaryAction onClick={handleClickOpen}>
          <IconButton edge="end">
            <AddIcon fontSize="large" style={{ color: 'green' }} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <CreatePageDialog open={open} handleClose={handleClose} />
    </Paper>
  );
}

const PageItem = ({ page }) => {
  const { pagesController } = useContext(TaskContext);
  const [selectedsPages, setSelectedsPages] = pagesController;

  const handleAddPage = () => {
    setSelectedsPages([...selectedsPages, page])
  }

  return (
    <Paper style={{ marginTop: 10, background: 'linear-gradient(45deg, #21CBF3 90%, #2196F3 30%)' }}>
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
  const Divider = () => <hr></hr>;

  const { newPageAddController } = useContext(TaskContext);
  const [ newPageAdd, setNewPageAdd ] = newPageAddController;

  const [pages, setPages] = useState([]);

  const loadPages = async (id) => {
    const response = await api.post('/websites/pages.php', { id: Number(id) });
    const { data } = response;
    if(data.status === 'success') {
      setPages(data.docs);
    } else {
      alert('Error on load pages');
    }
  }

  useEffect(() => {
    if(website.id) {
      loadPages(website.id);
    }
  }, [website])

  useEffect(() => {
    if(newPageAdd && website.id) {
      loadPages(website.id);
      setNewPageAdd(false);
    }
  }, [newPageAdd, website, setNewPageAdd])

  return (
    <List component="nav" style={{ padding: 10, height: 635, overflowY: 'auto'}}>
      <Typography variant="body1" align="center" style={{ color: '#777' }}>
        PAGE LIST
      </Typography>
      <Divider />
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

const RouteItem = ({ page, index }) => {
  const { pagesController } = useContext(TaskContext);
  const [ selectedsPages, setSelectedsPages ] = pagesController;

  const handleRemove = () => {
    const filteredPages = selectedsPages.filter((selectedPage, i) => index !== i);
    setSelectedsPages(filteredPages);
  }

  return (
    <Paper style={{ marginTop: 10, background: 'linear-gradient(45deg, #21CBF3 90%, #99FF99 30%)' }}>
      <ListItem button>
        <ListItemText 
          primary={<Typography style={{ color: 'white' }}>{page.name}</Typography>}
          secondary={<Typography style={{ color: 'white' }}>{page.url}</Typography>}
        />
        <Tooltip title="Click to remove this page from task" arrow placement="top">
          <ListItemSecondaryAction onClick={handleRemove}>
            <IconButton edge="end">
              <Delete style={{ color: '#FFF' }} />
            </IconButton>
          </ListItemSecondaryAction>
        </Tooltip>
      </ListItem>
    </Paper>
  );
}

const Constructor = () => {
  const Divider = () => <hr></hr>;

  const { websiteController } = useContext(WebsiteContext);
  const [ currentWebsite ] = websiteController;

  const { pagesController, taskController, newTaskAddController } = useContext(TaskContext);
  const [ selectedsPages, setSelectedsPages ] = pagesController;
  const [ newTaskAdd, setNewTaskAdd ] = newTaskAddController;
  const [ currentTask, setCurrentTask ] = taskController;

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const storeTask = async (task) => {
    const response = await api.post('/tasks/store.php', task);
    const { data } = response;
    if(data.status === 'success') {
      if(!newTaskAdd) {
        setNewTaskAdd(true);
        setCurrentTask({...currentTask, id: Number(data.docs.id) })
      }
    } else {
      alert('Error on create task');
    }
  }

  const syncNewPages = async (pages) => {
    const response = await api.post('/tasks/sync.php', { id: Number(currentTask.id), pages });
    const { data } = response;
    if(data.status === 'success') {
      alert('Successfully saved!');
    } else {
      alert('Error on save task');
    }
  }

  const handleSaveTask = () => {
    syncNewPages(selectedsPages.map(page => Number(page.id)));
  }

  const handleCreateTask = () => {
    if(selectedsPages.length > 0) {
      storeTask({
        name: currentTask.name,
        detail: currentTask.detail,
        pages: selectedsPages.map(page => Number(page.id))
      });
    }
  }

  useEffect(() => {
    if(selectedsPages.length > 0) {
      setSelectedsPages([]);
    }
    if(currentTask.name) {
      setCurrentTask({});
    }
    // eslint-disable-next-line
  }, [currentWebsite]);

  useEffect(() => {
    if(currentTask.id) {
      const loadPagesRoute = async (id) => {
        const response = await api.post('/tasks/pages.php', { id: Number(id) });
        const { data } = response;
        if(data.status === 'success') {
          setSelectedsPages(data.docs)
        } else {
          alert('Error on load pages task');
        }
      }
      loadPagesRoute(currentTask.id);
    } else {
      setSelectedsPages([])
    }
  }, [setSelectedsPages, currentTask]);

  return (
    <List component="nav" style={{ padding: 10, height: 635, overflowY: 'auto' }}>
      <Typography variant="body1" align="center" style={{ color: '#777' }}>
        CONSTRUCTOR
      </Typography>
      <Divider />
      {currentTask.name ? (
        <div>
          <TaskHeader task={currentTask} />
          {selectedsPages.map((page, index) => (
            <RouteItem key={index} page={page} index={index} />
          ))}
          {currentTask.id ? (
            <Button 
              fullWidth
              onClick={handleSaveTask}
              disabled={selectedsPages.length === 0}
              style={{ 
                marginTop: 10, 
                background: selectedsPages.length === 0 ? '#DDD' :'linear-gradient(45deg, #77EE77 30%, #99EE99 90%)', 
                color: selectedsPages.length === 0 ? '#000' : '#333' 
              }}
            >
              Save Task
            </Button>
          ) : (
            <Button 
              fullWidth
              onClick={handleCreateTask}
              disabled={selectedsPages.length === 0}
              style={{ 
                marginTop: 10, 
                background: selectedsPages.length === 0 ? '#DDD' :'linear-gradient(45deg, #77EE77 30%, #99EE99 90%)', 
                color: selectedsPages.length === 0 ? '#000' : '#333'
              }}
            >
              Create Task
            </Button>
          )}
          {selectedsPages.length === 0 && (
            <div>
              <Divider />
              <Typography align="center" style={{ color: '#999' }}>
                Select any page on the middle to save this task
              </Typography>
            </div>
          )}
        </div>
      ) : (
        <div>
          <Typography align="center" style={{ color: '#999' }}>
            Select any task on the left to edit your route
          </Typography>
          <Typography 
            variant="subtitle2" 
            align="center" 
            onClick={handleOpenDialog} 
            style={{ color: '#88f', cursor: 'pointer' }}
          >
            Click here to create a new task
          </Typography>
          <CreateWebsiteDialog open={openDialog} handleClose={handleCloseDialog} />
        </div>
      )}
    </List>
  );
}

export default function RightPanel() {
  const useStyles = makeStyles(theme => ({
    column: {
      margin: theme.spacing(1),
    }
  }));

  const { websiteController } = useContext(WebsiteContext);
  const [ website ] = websiteController;

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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
                <PageList website={website} />
              </Paper>
            </Grid>
            <Grid sm item className={classes.column}>
              <Paper>
                <Constructor />
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
            onClick={handleClickOpenDialog}
          >
            Or Click here to add a New Website
          </Typography>
          <CreateWebsiteDialog open={openDialog} handleClose={handleCloseDialog} />
        </div>
      )}
    </Grid>
  );
}

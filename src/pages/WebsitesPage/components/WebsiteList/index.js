import React, { useState, useEffect, useContext } from 'react';
import api from '../../../../services/api';
import { WebsiteContext } from '../../context/WebsiteContext';
import CreateWebsiteDialog from './create';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { Add as AddIcon } from '@material-ui/icons';

const WebsiteItem = ({ website }) => {

  const { websiteController } = useContext(WebsiteContext);
  const [currentWebsite, setCurrentWebsite] = websiteController;

  const handleCurrentWebsite = () => {
    setCurrentWebsite(website);
  }

  return (
    <ListItem 
      button 
      onClick={handleCurrentWebsite}
      selected={website === currentWebsite}
    >
      <ListItemText 
        primary={website.name}
        secondary={website.url}
      />
    </ListItem>
  );
}

const CreateWebsite = () => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ListItem button onClick={handleClickOpen}>
        <ListItemText 
          primary="Add new website"
          secondary="Click here to add a new website"
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      {open && <CreateWebsiteDialog handleClose={handleClose} />}
    </div>
  );
}

export default function WebsiteList() {

  const [websites, setWebsites] = useState([]);
  const { websiteController } = useContext(WebsiteContext);
  const [ currentWebsite ] = websiteController;

  const loadWebsites = async () => {
    const response = await api.post('/websites/index.php');
    const { data } = response;
    if(data.status === 'success') {
      setWebsites(data.docs);
    } else {
      alert('Error on load websites');
    }
  }

  useEffect(() => {
    loadWebsites();
  }, []);

  useEffect(() => {
    loadWebsites();
  }, [currentWebsite])

  return (
    <List component="nav" style={{ height: 635, overflowY: 'auto' }}>
      <CreateWebsite />
      {websites.map(website => (
        <WebsiteItem key={website.id} website={website} button />
      ))}
    </List>
  );
}
import React, { useState, useEffect, useContext } from 'react';
import { loadWebsitesByManager } from '../../../../routes';
import { GlobalContext } from '../../../../context/GlobalContext';
import { RUNTIME_ERROR } from '../../../../constants';
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

  const { managerController } = useContext(GlobalContext);
  const [ manager ] = managerController;

  useEffect(() => {
    loadWebsitesByManager({
      manager_id: Number(manager.id)
    }).then(data => {

      setWebsites(data);
    }).catch(error => {

      if(Number(error.id) !== RUNTIME_ERROR) {
        alert(error.detail);
      } else {
        alert('Error on load Websites');
      }

    })
  }, [currentWebsite, manager])

  return (
    <List component="div" style={{ height: '100%', overflowY: 'auto' }}>
      <CreateWebsite />
      {[...websites, ...websites, ...websites, ...websites, ...websites, ...websites, ...websites, ...websites, ...websites, ...websites, ...websites, ...websites, ...websites, ...websites].map((website,i) => (
        <WebsiteItem key={i} website={website} button />
      ))}
    </List>
  );
}
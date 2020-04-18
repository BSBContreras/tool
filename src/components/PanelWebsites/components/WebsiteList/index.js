import React, { useState, useEffect, useContext } from 'react';
import { WebsiteContext } from '../../context/WebsiteContext';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

const WebsiteItem = ({ website }) => {

  const { websiteController, viewController } = useContext(WebsiteContext);
  const [currentWebsite, setCurrentWebsite] = websiteController;
  const [view, setView] = viewController;

  const handleCurrentWebsite = () => {
    if (currentWebsite !== website) {
      setCurrentWebsite(website);
      if(view !== 'show') {
        setView('show');
      }
    }
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

  const { websiteController, viewController } = useContext(WebsiteContext);
  const [currentWebsite, setCurrentWebsite] = websiteController;
  const [view, setView] = viewController;

  const handleAddWebsite = () => {
    if(view !== 'create') {
      setView('create');
      if(currentWebsite !== null) {
        setCurrentWebsite(null);
      }
    }
  };

  return (
    <ListItem button onClick={handleAddWebsite}>
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText 
        primary="Add new website"
        secondary="Click here to add a new website"
      />
    </ListItem>
  );
}

export default function WebsiteList() {

  const [websites, setWebsite] = useState([]);

  const loadWebsites = () => {
    setWebsite(
      [
        {
          id: 1,
          name: 'website 1',
          url: 'http://www.website1.com'
        },
        {
          id: 2,
          name: 'website 2',
          url: 'http://www.website2.com'
        },
        {
          id: 3,
          name: 'website 3',
          url: 'http://www.website3.com'
        },
        {
          id: 4,
          name: 'website 4',
          url: 'http://www.website4.com'
        }
      ]
    );
  }

  useEffect(() => {
    loadWebsites();
  }, []);

  return (
    <List component="nav">
      <CreateWebsite />
      {websites.map(website => (
        <WebsiteItem key={website.id} website={website} button />
      ))}
    </List>
  );
}
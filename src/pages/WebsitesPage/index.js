import React from 'react';
import WebsiteProvider from './context/WebsiteContext';
import WebsiteList from './components/WebsiteList';
import RightPanel from './components/RightPanel';

export default function PanelWebsites({ classes }) {
  return (
    <WebsiteProvider>
      <div className={classes.list}>
        <WebsiteList />
      </div>
      <div className={classes.content}>
        <RightPanel />
      </div>
    </WebsiteProvider>
  );
}

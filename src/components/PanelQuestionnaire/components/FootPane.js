import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';

export default function Footer({ changeView, view }) {
	return (
		<Paper>
      <Tabs
				value={view}
        indicatorColor="secondary"
        textColor="secondary"
        variant="fullWidth"
        onChange={(event, newView) => changeView(newView)}
        centered
      >
        <Tab label="visualization" />
        <Tab label="edit" />
        <Tab label="create" />
      </Tabs>
    </Paper>
	)
}
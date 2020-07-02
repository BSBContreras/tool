import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

export default function Header({ setPage }) {
	const useStyles = makeStyles(theme => ({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
		AppBar: {
			background: theme.palette.primary
		}
	}));

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.AppBar}>
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Co-Inspect Tool
					</Typography>
					<Button color="inherit" onClick={() => setPage('assessments')}>Evaluations</Button>
					<Button color="inherit" onClick={() => setPage('questionnaires')}>Questionnaires</Button>
					<Button color="inherit" onClick={() => setPage('websites')}>Websites</Button>
				</Toolbar>
			</AppBar>
		</div>
	)
}

		

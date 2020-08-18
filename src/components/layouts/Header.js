import React, { useState, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { GlobalContext } from '../../context/GlobalContext';
import { makeStyles } from '@material-ui/core/styles';

export default function Header({ setPage }) {
	const useStyles = makeStyles(theme => ({
		root: {
			gridArea: 'HE',
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
		AppBar: {
			background: theme.palette.primary,
			height: '100%',
			display:'flex',
			justifyContent: 'center',
		}
	}));

	const { managerController } = useContext(GlobalContext);
	const [ manager, setManager ] = managerController;

	const [anchorEl, setAnchorEl] = useState(null);

	const handleClickOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
	};
	
	const handleClickLogout = () => {

		localStorage.removeItem('manager_data');

		setManager({});

		handleCloseMenu();
	}

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.AppBar}>
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Co-Inspect Tool
					</Typography>
					<Button color="inherit" onClick={() => setPage('EvaluationManagerPage')}>Evaluations</Button>
					<Button color="inherit" onClick={() => setPage('QuestionnairePage')}>Questionnaires</Button>
					<Button color="inherit" onClick={() => setPage('WebsitesPage')}>Websites</Button>
					<Button color="inherit" onClick={handleClickOpenMenu}>
						<Typography noWrap style={{ maxWidth: '24ch' }}>
							{manager.name}
						</Typography>
					</Button>
					<Menu
						keepMounted
						anchorEl={anchorEl}
						open={Boolean(anchorEl)}
						onClose={handleCloseMenu}
					>
						<MenuItem onClick={() => { alert('WIP'); handleCloseMenu(); }}>Profile</MenuItem>
						<MenuItem onClick={() => { alert('WIP'); handleCloseMenu(); }}>My account</MenuItem>
						<MenuItem onClick={handleClickLogout}>Logout</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
		</div>
	)
}

		

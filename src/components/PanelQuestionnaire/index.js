import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import RightPane from './components/RightPane';
import LeftPane from './components/LeftPane';
import FootPane from './components/FootPane';

const useStyles = makeStyles({
	paper: {
		padding: 20,
		height: 500,
		overflowY: 'auto',
		backgroundColor: grey[100]
	},
	header: {
		padding: 20
	}
});

export default function PanelQuestionnaire() {
	const classes = useStyles();
	const [currentQuestionnaire, setCurrentQuestionnaire] = useState({});
	const [questionnaires, setQuestionnaires] = useState([]);
	const	[questions, setQuestions] = useState([]);
	const [view, setView] = useState(0);
	const title = ['Questions', 'Edit Questionnaire', 'Create Questionnaire'];

	useEffect(() => {
		loadQuestionnaires();
	}, [])

	const loadQuestionnaires = async () => {
		const response = await api.post('questionnaires/index.php');
		response.data.status === 'success'
			?	setQuestionnaires(response.data.docs)
			:	alert('Error loading questionnaires')
	}

	const createQuestionnaire = async (questionnaire) =>{
		if(questionnaire.name.length !== 0) {
      const response = await api.post('/questionnaires/store.php', questionnaire);
      if(response.data.status === 'success') {
				loadQuestions({ id: Number(response.data.docs), ...questionnaire });
				loadQuestionnaires();
				setView(1);
			} else {
				alert('Error creating questionnaire')
			}
    } else {
			alert('Please enter a name for your questionnaire');
		} 
	}

	const loadQuestions = async (questionnaire) => {
		const response = await api.post('/questionnaires/questions.php', { id: Number(questionnaire.id) });
		response.data.status === 'success'
			?	setQuestions(response.data.docs)
			:	alert('Error loading questions')

		setCurrentQuestionnaire(questionnaire);
	}

	const changeView = (newView) => {
    setView(newView);
  };

  return (
		<>
			<Grid container>
				<Grid item sm={4}>
					<Typography className={classes.header} variant="h5">
						Questionnaires
					</Typography>
					<Paper className={classes.paper}>
						<LeftPane
							questionnaires={questionnaires} 
							createQuestionnaire={createQuestionnaire}
							loadQuestions={loadQuestions}
						/>
					</Paper>
				</Grid>
				<Grid item sm={8}>
					<Typography className={classes.header} variant="h5">
						{title[view]}
					</Typography>
					<Paper className={classes.paper}>	
						<RightPane
							view={view}
							loadQuestionnaires={loadQuestionnaires}
							setCurrentQuestionnaire={setCurrentQuestionnaire}
							changeView={changeView}
							questions={questions}
							questionnaire={currentQuestionnaire}
							loadQuestions={loadQuestions}
						/>
					</Paper>
				</Grid>
			</Grid>
			<FootPane 
				changeView={changeView}
				view={view} 
			/>
		</>
  );
}

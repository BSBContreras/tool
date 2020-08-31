import React, { useState, useContext } from 'react';
import SelectWebsiteSvg from '../../../../assets/select_website.svg';
import { QuestionnaireContext } from '../../context/QuestionnaireContext';
import Typography from '@material-ui/core/Typography';
import CreateQuestionnaireDialog from '../QuestionnaireList/CreateQuestionnaire';
import Show from './show';
import { makeStyles } from '@material-ui/core/styles';

export default function RightPane() {
  const useStyles = makeStyles(theme => ({
    container: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    title: {
      color: '#444'
    },
    svg: {
      maxHeight: '350px'
    },
    link: {
      color: theme.palette.primary.main,
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
  }));

  const { questionnaireController } = useContext(QuestionnaireContext);
  const [ questionnaire ] = questionnaireController;

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const classes = useStyles();

  return (
    questionnaire.id ? (
      <Show />
    ) : (
      <div className={classes.container}>
        <Typography 
          className={classes.title}
          variant="h4"
        >
          Select a questionnaire on the Left
        </Typography>
        <img 
          className={classes.svg}
          src={SelectWebsiteSvg} 
          alt="Select some questionnaire" 
        /> 
        <Typography 
          className={classes.link}
          variant="subtitle1"
          onClick={handleClickOpenDialog}
        >
          Or Click here to add a New Questionnaire
        </Typography>
        <CreateQuestionnaireDialog open={openDialog} handleClose={handleCloseDialog} />
      </div>
    )
  );
}
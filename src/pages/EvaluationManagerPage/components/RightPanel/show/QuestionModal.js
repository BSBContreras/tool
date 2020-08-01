import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const Divider = () => <hr></hr>

export default function QuestionModal({ question }) {
  const useStyles = makeStyles(theme => ({
    modalPaper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: 750,
      height: window.screen.height * 0.8,
      overflowY: 'auto'
    },
    header: {
      margin: theme.spacing(2)
    },
    from: {
      fontSize: 14,
    },
    card: {
      marginTop: 10,
      background: '#EEE'
    }
  }));

  const answers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
    {
      id: item,
      text: `text ${item + 1}`,
      evaluator: `evaluator ${item +1}`
    }
  ))

  const classes = useStyles();

  return (
    <div className={classes.modalPaper}>
      <Typography className={classes.header} variant="body1" component="h2">
        {question.text}
      </Typography>
      <Divider />
      {answers.map(answer => (
        <Card key={answer.id} className={classes.card}>
          <CardContent>
            <Typography className={classes.from} color="textSecondary" gutterBottom>
              {answer.evaluator}
            </Typography>
            <Typography variant="body2" component="p">
              {answer.text}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';


const Divider = () => <hr></hr>;

export default function TaskModal({ task }) {
  const useStyles = makeStyles(theme => ({
    modalPaper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width: window.screen.width * 0.7,
      height: window.screen.height * 0.8,
      overflowY: 'auto'
    },
    card: {
      margin: theme.spacing(2),
      background: '#EEE'
    },
    header: {
      marginBottom: 15
    },
    actions: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }));

  const routeByDesigner = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
    {
      id: item,
      name: `page ${item + 1}`,
      url: `/url ${item + 1}`,
      element_1: `element 1`,
      element_2: `element 2`,
      element_3: `element 3`,
      element_4: `element 4`,
      element_5: `element 5`
    }
  ));

  const routeByEvaluator = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
    {
      id: item,
      name: `page ${item + 1}`,
      url: `/url ${item + 1}`,
      element_1: `element 1`,
      element_2: `element 2`,
      element_3: `element 3`,
      element_4: `element 4`,
      element_5: `element 5`
    }
  ));

  const designer = {
    id: 1,
    name: 'designer name 1',
    email: `designer_1@email.com`,
    route: routeByDesigner
  }

  const evaluators = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
    {
      id: item,
      name: `evaluator ${item + 1}`,
      email: `evaluator_${item + 1}@email.com`,
      route: routeByEvaluator
    }
  ));

  const [currentEvaluator, setCurrentEvaluator] = useState(0);

  const handleClickPrev = () => {
    if(currentEvaluator <= 0) return;
    setCurrentEvaluator(currentEvaluator - 1);
  }

  const handleClickNext = () => {
    if(currentEvaluator >= evaluators.length - 1) return;
    setCurrentEvaluator(currentEvaluator + 1);
  }

  const classes = useStyles();

  return (
    <div className={classes.modalPaper}>
      <div className={classes.header}>
        <Typography variant="body1" component="h3">
          {task.name}
        </Typography>
        <Typography variant="body2" component="span">
          {task.detail}
        </Typography>
        <Divider />
      </div>
      <Grid container>
        <Grid item sm={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="body1">
                Route by Designer "{designer.name}"
              </Typography>
              <div className="content">
                {routeByDesigner.map(page => (
                  <ExpansionPanel key={page.id}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                      <Typography title={page.url} noWrap>
                        {page.name} ({page.url})
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <ul>
                        <li>{page.element_1}</li>
                        <li>{page.element_2}</li>
                        <li>{page.element_3}</li>
                        <li>{page.element_4}</li>
                        <li>{page.element_5}</li>
                      </ul>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="body1">
                Route by evaluator "{evaluators[currentEvaluator].name}"
              </Typography>
              <div className={classes.actions}>
                <Button onClick={handleClickPrev}>prev</Button>
                <Button onClick={handleClickNext}>next</Button>
              </div>
              <div className="content">
                {evaluators[currentEvaluator].route.map(page => (
                  <ExpansionPanel key={page.id}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                      <Typography title={page.url} noWrap>
                        {page.name} ({page.url})
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <ul>
                        <li>{page.element_1}</li>
                        <li>{page.element_2}</li>
                        <li>{page.element_3}</li>
                        <li>{page.element_4}</li>
                        <li>{page.element_5}</li>
                      </ul>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

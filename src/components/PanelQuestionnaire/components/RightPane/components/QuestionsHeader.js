import React from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  card: {
    marginTop: 10,
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    padding: '0 30px',
    color: 'white'
  },
})

export default () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item sm={2}>
          <CardContent >
            <Typography variant="body2" component="p" align="center">
              Criterion
            </Typography>
          </CardContent>
        </Grid>
        <Grid item sm={6}>
          <CardContent >
            <Typography variant="body1" component="p" align="center">
              Question
            </Typography>
          </CardContent>
        </Grid>
        <Grid item sm={4}>
          <CardContent>
            <Typography variant="body2" component="p" align="center">
              Elements
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}
  

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <header>
        <img style={{width: '100%', height: '100vh'}} src={"https://king.host/blog/wp-content/uploads/2018/06/2018-06-18-img-blog-docker-cryptojacking.png"} className="App-logo" alt="logo" />
        
      </header>
    </div>
  );
}

export default App;

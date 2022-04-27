
import React, { useState } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import Home from './components/Home.js';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';



function App() {

  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#e90c54", color: "#ffffff"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Open Loop
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <Router>
      <Switch>
        <Route exact path="/" component={()=> <Home />}></Route>
      </Switch>
    </Router>
  </div>

  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from "./components/Home"
import TaskUpdate from "./components/TaskUpdate"
import TaskCreate from "./components/TaskCreate"
import TaskDetail from "./components/TaskDetail"
import TaskSearch from "./components/TaskSearch"
import TaskList from "./components/TaskList"
import StUpdate from "./components/StUpdate"
import Test from "./components/Test"
import Login from './components/Login'
import Protected from './components/Protected'
import Logout from './components/Logout'
function App() {
  return (
    <div className="App">
      <Router>
        
        
        <Route path="/logout">
          <Logout />
        </Route> 
        
       
        <Route path="/login"
        render={props=>(
      <Login {...props} />
        )}
        >
        </Route>
     
        <Protected exact path="/details" component={TaskDetail} />
        <Protected exact path="/update/:id" component={TaskUpdate} />
        <Protected exact path="/search" component={TaskSearch} />
        <Protected exact path="/create" component={TaskCreate} />
        <Protected exact path="/list" component={TaskList} />
        <Protected exact path="/StUpdate/:id" component={StUpdate} />
        <Protected exact path="/Test" component={Test} />
    
        <Protected exact path="/" component={Home} />
      </Router>
    </div>
  );
}

export default App; 

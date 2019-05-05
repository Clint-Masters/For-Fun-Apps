import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Components/Home';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-139556221-2');
ReactGA.pageview('/Home');

class App extends Component {
  render() {
    return (
      <Router>
      <div className="container">
         <Route exact path="/" component={Home} />
      </div>
      </Router>
    );
  }
}
export default App;
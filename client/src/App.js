import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FoodList from './Components/List';
import RandomFood from './Components/RandomFood';
import ReactGA from 'react-ga';
ReactGA.initialize(process.env.GOOGLE_KEY);
ReactGA.pageview('/Home');

class App extends Component {
  render() {
    return (
      <Router>
      <div className="container">
         <Route exact path="/" component={RandomFood} />
         <Route exact path="/List" component={FoodList} />
      </div>
      </Router>
    );
  }
}
export default App;
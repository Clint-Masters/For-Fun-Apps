import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Components/Home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.connecToServer = this.connecToServer.bind(this);
  }
  connecToServer() {
    fetch('/');
  }

  componentDidMount() {
    this.connecToServer();
  }
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
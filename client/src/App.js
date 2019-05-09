import React, { Component } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import FoodList from "./Components/List";
import RandomFood from "./Components/RandomFood";
import ReactGA from "react-ga";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactGA.initialize(process.env.GOOGLE_KEY);
ReactGA.pageview("/Home");

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <ToastContainer />
          <Route exact path="/" render={(props) => <RandomFood {...props} random={true}/>} />
          <Route exact path="/List" render={(props) => <RandomFood {...props} random={false}/>} />
        </div>
      </Router>
    );
  }
}
export default App;

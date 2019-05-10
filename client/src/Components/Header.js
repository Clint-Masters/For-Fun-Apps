import React, { Component } from "react";
import { Link } from "react-router-dom";
class Header extends Component {
  render() {
    return (<div className="App">
    <Link to="/"><h2>RANDOM GAME</h2></Link> &nbsp; <h2>|</h2> &nbsp;
    <Link to="/List"><h2>FOOD LIST</h2></Link>
    
    </div>);
  }
}
export default Header;

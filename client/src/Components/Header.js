import React, { Component } from "react";
import { Link } from "react-router-dom";
class Header extends Component {
  render() {
    return (<div className="App">
    <Link to="/">RANDOM GAME</Link> &nbsp;
    <Link to="/List">FOOD LIST</Link>
    
    </div>);
  }
}
export default Header;

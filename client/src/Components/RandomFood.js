import React, { Component } from "react";
import Header from "./Header";

import {
  getLocation,
  getPrice,
  getDistance,
  getTerm,
  getOpenNow,
  getNumberPossible,
  getCurrentLocation,
  handleChangeCurrentLocation,
  handleChangeDistance,
  handleChangeLocation,
  handleChangeNumPossible,
  handleChangeOpenNow,
  handleChangePrice,
  handleChangeRandom,
  handleChangeTerm,
  tryAgain,
  getFood,
  handleSuccessPosition,
  handleErrorPosition,
  getResults
} from "./functions";

class RandomFood extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      term: "",
      location: "",
      price: "",
      distance: "",
      openNow: false,
      numPossible: "",
      currentLocation: false,
      latitude: "",
      longitude: "",
      food: "",
      foodUrl: ""
    };
    this.handleChangeTerm = handleChangeTerm.bind(this);
    this.handleChangeLocation = handleChangeLocation.bind(this);
    this.handleChangePrice = handleChangePrice.bind(this);
    this.handleChangeDistance = handleChangeDistance.bind(this);
    this.handleChangeOpenNow = handleChangeOpenNow.bind(this);
    this.handleChangeNumPossible = handleChangeNumPossible.bind(this);
    this.handleChangeRandom = handleChangeRandom.bind(this);
    this.handleChangeCurrentLocation = handleChangeCurrentLocation.bind(this);
    this.handleSuccessPosition = handleSuccessPosition.bind(this);
    this.handleErrorPosition = handleErrorPosition.bind(this);
    this.tryAgain = tryAgain.bind(this);
    this.getFood = getFood.bind(this);
    this.getResults=getResults.bind(this);
  }

  render() {
    const { businesses } = this.state;

    return (
      <div className="App">
        <Header />
        {this.props.random ? (
          <h3>Enter Search Criteria And Find Out Where You Are Eating</h3>
        ) : (
          <h3>Enter Criteria And Find Places Near You</h3>
        )}
        <div className="rightCol">
          <div className="searchBox">
            <h1>Search</h1>
            {getLocation(this.state, this.handleChangeLocation)}
            {getCurrentLocation(this.state, this.handleChangeCurrentLocation)}
            {getTerm(this.state, this.handleChangeTerm)}
            {getPrice(this.state, this.handleChangePrice)}
            {getDistance(this.state, this.handleChangeDistance)}
            {getOpenNow(this.state, this.handleChangeOpenNow)}
            {getNumberPossible(this.state, this.handleChangeNumPossible)}

            <button className="more" onClick={this.getFood}>
              Get Food
            </button>
          </div>
        </div>
        {this.getResults(businesses, this.props)}
      </div>
    );
  }
}
export default RandomFood;

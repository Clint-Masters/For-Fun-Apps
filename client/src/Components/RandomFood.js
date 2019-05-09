import React, { Component } from "react";
import Header from "./Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

import {
  getLocation,
  getPrice,
  getDistance,
  getTerm,
  getOpenNow,
  getRandomPlace,
  getNumberPossible,
  getCurrentLocation
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
    this.handleChangeTerm = this.handleChangeTerm.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeDistance = this.handleChangeDistance.bind(this);
    this.handleChangeOpenNow = this.handleChangeOpenNow.bind(this);
    this.handleChangeNumPossible = this.handleChangeNumPossible.bind(this);
    this.handleChangeRandom = this.handleChangeRandom.bind(this);
    this.handleChangeCurrentLocation = this.handleChangeCurrentLocation.bind(
      this
    );
    this.handleSuccessPosition = this.handleSuccessPosition.bind(this);
  }

  handleChangeTerm(event) {
    this.setState({ term: event.target.value });
  }

  handleChangeLocation(event) {
    this.setState({ location: event.target.value });
  }

  handleChangeDistance(event) {
    this.setState({ distance: event.target.value });
  }

  handleChangePrice(event) {
    this.setState({ price: event.target.value });
  }

  handleChangeOpenNow(event) {
    this.setState({ openNow: event.target.checked });
  }

  handleChangeNumPossible(event) {
    this.setState({ numPossible: event.target.value });
  }

  handleChangeCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.handleSuccessPosition,
        this.handleErrorPosition
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  handleSuccessPosition(position) {
    if (this.state.currentLocation) {
      this.setState({
        currentLocation: !this.state.currentLocation,
        latitude: "",
        longitude: ""
      });
    } else {
      this.setState({
        currentLocation: !this.state.currentLocation,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }
  }

  handleErrorPosition(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("Unknown error occurred.");
    }
  }

  handleChangeRandom(place) {
    this.setState({ food: place });
  }

  tryAgain = () => {
    this.setState({ food: "" });
  };

  getFood = () => {
    if (this.state.location === "" && this.state.latitude === "") {
      toast.error("Location is required if not using current location");
    } else {
      var params = {
        price: this.state.price,
        distance: this.state.distance,
        term: this.state.term,
        openNow: this.state.openNow,
        numPossible: this.state.numPossible,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        location: this.state.location
      };
      if (params.price === "") {
        params.price = "Inconceivable";
      }
      if (params.distance === "") {
        params.distance = "Inconceivable";
      }
      if (params.term === "") {
        params.term = "Inconceivable";
      }
      if (params.numPossible === "") {
        params.numPossible = "Inconceivable";
      }
      if (params.latitude === "") {
        params.latitude = "Inconceivable";
      }
      if (params.longitude === "") {
        params.longitude = "Inconceivable";
      }
      if (params.openNow === false) {
        params.openNow = "Inconceivable";
      }
      if (params.location === "") {
        params.location = "Inconceivable";
      }

      fetch(
        "/api/findFood/" +
          params.location +
          "/" +
          params.term +
          "/" +
          params.distance +
          "/" +
          params.price +
          "/" +
          params.numPossible +
          "/" +
          params.openNow +
          "/" +
          params.latitude +
          "/" +
          params.longitude
      )
        .then(res => res.json())
        .then(body => {
          toast.success("Success");
          body.businesses
            ? this.setState({ businesses: body.businesses, food: "" })
            : this.setState({ businesses: [], food: "" });
        });
    }
  };

  render() {
    const { businesses } = this.state;

    return (
      <div className="App">
        <Header />
        <h3>Enter Search Criteria And Find Out Where You Are Eating</h3>
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
        <div className="leftCol">
          {businesses.length ? (
            <div>
              {this.props.random ? (
                <div>
                  <h1>You Will Be Eating At:</h1>
                  <h5>(Click the name to go to restaurant's yelp page)</h5>
                  {getRandomPlace(this.state, this.handleChangeRandom)}

                  <button className="more" onClick={this.tryAgain}>
                    Pick Again?
                  </button>
                </div>
              ) : (
                <div>
                    
                  <h1>Businesses</h1>
                  <h5>(Click the name to go to restaurant's yelp page)</h5>
                  <ul className="businesses">
                    {businesses.map((business, index) => (
                      <li key={business.id}>
                        <a href={business.url}>{business.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h1>No Businesses :(</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default RandomFood;

import React, { Component } from "react";
import Header from "./Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getLocation,
  getPrice,
  getDistance,
  getTerm,
  getOpenNow,
  getRandomPlace,
  getNumberPossible
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
      food: ""
    };
    this.handleChangeTerm = this.handleChangeTerm.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeDistance = this.handleChangeDistance.bind(this);
    this.handleChangeOpenNow = this.handleChangeOpenNow.bind(this);
    this.handleChangeNumPossible = this.handleChangeNumPossible.bind(this);
    this.handleChangeRandom = this.handleChangeRandom.bind(this);
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

  handleChangeRandom(place) {
    this.setState({ food: place });
  }

  tryAgain = () => {
    this.setState({ food: "" });
  };

  getFood = () => {
    if (this.state.location === "") {
      toast.error("Location is required");
    } else {
      var params = {
        price: this.state.price,
        distance: this.state.distance,
        term: this.state.term,
        openNow: this.state.openNow,
        numPossible: this.state.numPossible
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
      if (params.openNow === false) {
        params.openNow = "Inconceivable";
      }

      fetch(
        "/api/findFood/" +
          this.state.location +
          "/" +
          params.term +
          "/" +
          params.distance +
          "/" +
          params.price +
          "/" +
          params.numPossible +
          "/" +
          params.openNow
      )
        .then(res => res.json())
        .then(body => {
            toast.success("Success");
          body.businesses
            ? this.setState({ businesses: body.businesses, food: "" })
            : this.setState({ businesses: [], food: "" });
        }
        );
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
              <h1>You Will Be Eating At:</h1>
              {getRandomPlace(this.state, this.handleChangeRandom)}
              
              <button className="more" onClick={this.tryAgain}>
                Pick Again?
              </button>
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

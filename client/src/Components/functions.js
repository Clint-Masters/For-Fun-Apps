import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function getLocation(props, handleChange) {
  return (
    <p>
      <label htmlFor="location">Location: </label>
      <input
      disabled={props.currentLocation}
        id="location"
        type="text"
        placeholder="ex: Waco, 76706"
        value={props.location}
        onChange={handleChange}
      />{!props.currentLocation ? "*" : ""}
    </p>
  );
}

export function getTerm(props, handleChange) {
  return (
    <p>
      <label htmlFor="term">Term: </label>
      <input
        id="term"
        type="text"
        placeholder="ex: 'food' or 'restaurant' "
        value={props.term}
        onChange={handleChange}
      />
    </p>
  );
}

export function getPrice(props, handleChange) {
  return (
    <p>
      <label htmlFor="price">Price: </label>
      <select id="price" value={props.price} onChange={handleChange}>
        <option value="">-</option>
        <option value="1">$</option>
        <option value="2">$$</option>
        <option value="3">$$$</option>
        <option value="4">$$$$</option>
      </select>
    </p>
  );
}

export function getDistance(props, handleChange) {
  return (
    <p>
      <label htmlFor="distance">Distance: </label>
      <select id="distance" value={props.distance} onChange={handleChange}>
        <option value="">-</option>
        <option value="8050">5 Miles</option>
        <option value="16100">10 Miles</option>
        <option value="24140">15 Miles</option>
        <option value="32187">20 Miles</option>
        <option value="40000">25 Miles</option>
      </select>
    </p>
  );
}

export function getNumberPossible(props, handleChange) {
  return (
    <p>
      <label htmlFor="numPossible">Amount of Choices: </label>
      <select
        id="numPossible"
        value={props.numPossible}
        onChange={handleChange}
      >
        <option value="">-</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
      </select>
    </p>
  );
}

export function getOpenNow(props, handleChange) {
  return (
    <p>
      <label htmlFor="openNow">Must Be Open Now: </label>
      <label className="switch">
        <input
          id="openNow"
          type="checkbox"
          checked={props.openNow}
          onChange={handleChange}
        />
        <span className="slider round" />
      </label>
    </p>
  );
}

export function getRandomPlace(props) {
  var place = Math.floor(Math.random() * props.businesses.length);
  if (!props.food) {
    for (var i = 0; i < props.businesses.length; i++) {
      if (i === place) {
        props.food = props.businesses[i].name;
        props.foodUrl = props.businesses[i].url;
        return <p><span className="businesses"><a href={props.businesses[i].url}>{props.businesses[i].name}</a></span></p>;
      }
    }
  } else {
    return <p><span className="businesses"><a href={props.foodUrl}>{props.food}</a></span></p>;
  }
  return <p><span /></p>;
}

export function getCurrentLocation(props, handleChange){
  return <p>
    <label htmlFor="currentLocation">Use Current Location: </label>
    <span className={props.currentLocation ? "checkbox clicked" : "checkbox"} onClick={handleChange}>
  <span className={props.currentLocation ? "checkmark draw":""}></span>
</span>
  </p>;
}

export function handleChangeTerm(event) {
  this.setState({ term: event.target.value });
}

export function handleChangeLocation(event) {
  this.setState({ location: event.target.value });
}

export function handleChangeDistance(event) {
  this.setState({ distance: event.target.value });
}

export function handleChangePrice(event) {
  this.setState({ price: event.target.value });
}

export function handleChangeOpenNow(event) {
  this.setState({ openNow: event.target.checked });
}

export function handleChangeNumPossible(event) {
  this.setState({ numPossible: event.target.value });
}

export function handleChangeCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      this.handleSuccessPosition,
      this.handleErrorPosition
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

export function handleSuccessPosition(position) {
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

export function handleErrorPosition(error) {
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

export function handleChangeRandom(place) {
  this.setState({ food: place });
}

export function tryAgain()  {
  this.setState({ food: "" });
};

export function getFood() {
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
}

export function getResults(businesses, props){
  return (
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
  );
}
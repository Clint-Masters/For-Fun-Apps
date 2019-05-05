import React from "react";
export function getLocation(props, handleChange) {
  return (
    <p>
      <label htmlFor="location">Location: </label>
      <input
        id="location"
        type="text"
        placeholder="ex: Waco, 76706"
        value={props.location}
        onChange={handleChange}
      />
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
        return <span className="businesses">{props.businesses[i].name}</span>;
      }
    }
  } else {
    return <span className="businesses">{props.food}</span>;
  }
  return <span />;
}

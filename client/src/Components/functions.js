import React from "react";
export function getLocation(props, handleChange) {
  return (
    <input
      type="text"
      placeholder="ex: Waco, 76706"
      value={props.location}
      onChange={handleChange}
    />
  );
}

export function getTerm(props, handleChange) {
  return (
    <input
      type="text"
      placeholder="ex: 'food' or 'restaurant' "
      value={props.term}
      onChange={handleChange}
    />
  );
}

export function getPrice(props, handleChange) {
  return (
    <select value={props.price} onChange={handleChange}>
      <option value="">-</option>
      <option value="1">$</option>
      <option value="2">$$</option>
      <option value="3">$$$</option>
      <option value="4">$$$$</option>
    </select>
  );
}

export function getDistance(props, handleChange) {
  return (
    <select value={props.radius} onChange={handleChange}>
      <option value="">-</option>
      <option value="8050">5 Miles</option>
      <option value="16100">10 Miles</option>
      <option value="24140">15 Miles</option>
      <option value="32187">20 Miles</option>
      <option value="40000">25 Miles</option>
    </select>
  );
}

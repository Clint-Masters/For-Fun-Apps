import React, { Component } from "react";
import {getLocation, getPrice, getDistance, getTerm} from './functions';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { businesses: [], term: '', location: '', price: '', distance: '' };
    this.handleChangeTerm = this.handleChangeTerm.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeDistance = this.handleChangeDistance.bind(this);
  }

  handleChangeTerm(event) {
    this.setState({term: event.target.value});
  }

  handleChangeLocation(event) {
    this.setState({location: event.target.value});
  }

  handleChangeDistance(event) {
    this.setState({distance: event.target.value});
  }

  handleChangePrice(event) {
    this.setState({price: event.target.value});
  }

  getFood = () => {
    var params = {price: this.state.price, distance: this.state.distance, term: this.state.term}
    if(params.price===''){
        params.price='Inconceivable';
    }
    if(params.distance===''){
        params.distance='Inconceivable';
    }
    if(params.term===''){
        params.term='Inconceivable';
    }
    fetch("/api/findFood/"+this.state.location+"/"
    +params.term+"/"+params.distance+"/"+params.price)
    .then(function(response) {
        return response.json();
      })
      .then(function(body) {
        body.businesses
          ? this.setState({ businesses: body.businesses })
          : this.setState({ businesses: [] })
      });
  };

  render() {
    const { businesses } = this.state;

    return (
      <div className="App">
        <div className="leftCol">
          {businesses.length ? (
            <div>
              <h1>Businesses</h1>
              <ul className="businesses">
                {businesses.map((business, index) => (
                  <li key={business.id}>{business.name}</li>
                ))}
              </ul>
              <button className="more" onClick={this.getFood}>
                Get Food
              </button>
            </div>
          ) : (
            <div>
              <h1>No Businesses :(</h1>
            </div>
          )}
        </div>
        <div className="rightCol">
          <div>
            <h1>Search</h1>
            Term: &nbsp; {getTerm(this.state, this.handleChangeTerm)}
            <br />
            Location: &nbsp; {getLocation(this.state, this.handleChangeLocation)}
            <br />
            Price: &nbsp; {getPrice(this.state, this.handleChangePrice)}
            <br />
            Distance: &nbsp; {getDistance(this.state, this.handleChangedistance)}
            <br />
            <button className="more" onClick={this.getFood}>
                Get Food
              </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;

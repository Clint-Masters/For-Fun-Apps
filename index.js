const express = require("express");
require('dotenv').config()
const path = require("path");
const generatePassword = require("password-generator");
var request = require("request");

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Put all API endpoints under '/api'
app.get("/api/passwords", (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  );

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

app.get("/api/findFood/:location/:term/:distance/:price", (req, res) => {
  console.log(req.params);
  var url = "https://api.yelp.com/v3/businesses/search?location="+req.params.location+"&limit=10";
  if(req.params.term!=='Inconceivable'){
    url += "&term="+req.params.term;
  }
  if(req.params.price!=='Inconceivable'){
    url += "&price="+parseInt(req.params.price);
  }
  if(req.params.distance!=='Inconceivable'){
    url += "&distance="+parseInt(req.params.distance);
  }
  request(url, {
    'auth': {
      'bearer': process.env.YELP_KEY
    }
  },
   function(error, response, body) {
    console.log("error:", error); // Print the error if one occurred
    console.log("statusCode:", response.statusCode); // Print the response status code if a response was received
    console.log("body:", body); // Print the HTML for the Google homepage.
    res.send(body);
  });
  
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Food finder listening on ${port}`);

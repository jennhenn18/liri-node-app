// adding code to read and set any environment variables with the dotenv package
require("dotenv").config();

// Load the NPM packages
var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');
const axios = require('axios');
var moment = require('moment');

// import spotify keys file
var keys = require("./keys.js");

// create variable to access spotify keys
var spotify = new Spotify(keys.spotify);


/////////////////////////////////////////// START ///////////////////////////////////////////

inquirer.prompt([
    // getting started prompt
    {
        type: "list",
        message: "Welcome to the Liri Bot! I'm here to help you find more information on songs, movies, or concerts. What can I help you with today?",
        choices: ["Search Spotify", "Search OMDB", "Search concerts", "You pick"],
        name: "getstarted"
    }
]).then(function(response) {
    // if user chooses to search spotify run spotify prompt
    if (response.getstarted === "Search Spotify") {
        promptSpotify();
    // if user chooses to search OMDB run OMDB prompt
    } else if (response.getstarted === "Search OMDB") {
        promptOMDB();
    // if user chooses to search concerts run concert prompt
    } else if (response.getstarted === "Search concerts") {
        promptConcert();
    // if user chooses liri bot to pick run liri bot function
    } else if (response.getstarted === "You pick") {
        // liriBot();
    } 
});

///////////////////////////////////////////// SPOTIFY /////////////////////////////////////////////

// run Spotify prompt function
function promptSpotify() {
    // ask the user what song to search
    inquirer.prompt([
        {
            type: "input",
            message: "What song would you like me to look-up?",
            name: "song"
        }
    ]).then(function(response) {
        // if response null display "The Sign by Ace of Base"
        if (response === null) {
            var userInput = "The Sign"
            searchSpotify(userInput);
        // else search the song
        } else {
            var userInput = response.song
            searchSpotify(userInput);
        }
    });
}


// run search spotify function and pass through the song they chose
function searchSpotify(userInput) {
    // pass the song to the Spotify API
    spotify.search({ type: 'track', query: userInput, limit: 1 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      console.log("Artist name: " + data.tracks.items[0].album.artists[0].name); 
      console.log("Album name: " + data.tracks.items[0].album.name); 
      console.log("Song name: " + userInput); 
      console.log("Preview URL: " + data.tracks.items[0].preview_url); 
      console.log("Popularity: " + data.tracks.items[0].popularity);
      });

}

/////////////////////////////////////////// END OF SPOTIFY ////////////////////////////////////////



////////////////////////////////////////////// OMDB //////////////////////////////////////////////

// run OMDB prompt function
function promptOMDB() {
    // ask the user what movie to search
    inquirer.prompt([
        {
            type: "input",
            message: "What movie would you like me to look-up?",
            name: "movie"
        }
    ]).then(function(response) {
            var userInput = response.movie
            searchOMDB(userInput);
    });
}

// search OMDB
function searchOMDB(userInput) {
    // GET request for OMDB API using axios
    axios({
        method: "get",
        url: "http://www.omdbapi.com/?t=" + userInput + "&apikey=trilogy",
    }).then(function (response) {
        console.log("Movie title: " + response.data.Title);
        console.log("Year released: " + response.data.Year);
        console.log("IMDB rating: " + response.data.Ratings[0].Value);
        console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors/Actresses: " + response.data.Actors);
        });
}

//////////////////////////////////////////// END OF OMDB ////////////////////////////////////////////



//////////////////////////////////////////// CONCERT SEARCH /////////////////////////////////////////

// run concert prompt function
function promptConcert() {
    // ask the user what band/artist to search
    inquirer.prompt([
        {
            type: "input",
            message: "What artist or band would you like me to look-up?",
            name: "concert"
        }
    ]).then(function(response) {
            var userInput = response.concert
            searchConcert(userInput);
    });
}

// search concert API
function searchConcert(userInput) {
    // GET request for Bands in Town API using axios
    axios({
        method: "get",
        url: "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp",
    }).then(function (response) {
        console.log("Name of venue: " + response.data[0].venue.name);
        console.log("Venue location: " + response.data[0].venue.city);
        // store date in var
        var concertDate = response.data[0].datetime;
        console.log("Date of concert: " + moment(concertDate).format("MMM Do YY"));
        });
}
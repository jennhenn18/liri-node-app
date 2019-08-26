// adding code to read and set any environment variables with the dotenv package
require("dotenv").config();

// Load the NPM packages
var inquirer = require("inquirer");
var Spotify = require('node-spotify-api');
const axios = require('axios');
var moment = require('moment');
var fs = require("fs");

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
        choices: ["Search Spotify", "Search OMDB", "Search concerts", "Liri picks"],
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
    } else if (response.getstarted === "Liri picks") {
        liriBot();
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

        // store results in an object variables
        var spotifyResults = {
            artistName: data.tracks.items[0].album.artists[0].name,
            albumName: data.tracks.items[0].album.name,
            songName: userInput,
            previewURL: data.tracks.items[0].preview_url,
            popularity: data.tracks.items[0].popularity
        }
        
        // display answers in the command line
        console.log("Artist name: " + spotifyResults.artistName); 
        console.log("Album name: " + spotifyResults.albumName); 
        console.log("Song name: " + spotifyResults.songName); 
        console.log("Preview URL: " + spotifyResults.previewURL); 
        console.log("Popularity: " + spotifyResults.popularity);

        // convert object into a string
        var stringObj = JSON.stringify(spotifyResults)

        // append the information to spotifylog.txt file
        fs.appendFile("spotifylog.txt", stringObj, function(err) {
            // If an error was experienced we will log it.
            if (err) {
                console.log(err);
            }

            // If no error is experienced, we'll log the phrase "Content Added" to our node console.
            else {
                console.log("Spotify Results Added!");
            }
        })
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

        // store results in an object
        var omdbResults = {
            moveTitle: response.data.Title,
            yearReleased: response.data.Year,
            imdbRating: response.data.Ratings[0].Value,
            rottenRating: response.data.Ratings[1].Value,
            country: response.data.Country,
            lanuage: response.data.Language,
            plot: response.data.Plot,
            actors: response.data.Actors
        }

        // display answers in the command line
        console.log("Movie title: " + omdbResults.moveTitle);
        console.log("Year released: " + omdbResults.yearReleased);
        console.log("IMDB rating: " + omdbResults.imdbRating);
        console.log("Rotten Tomatoes rating: " + omdbResults.rottenRating);
        console.log("Country: " + omdbResults.country);
        console.log("Language: " + omdbResults.lanuage);
        console.log("Plot: " + omdbResults.plot);
        console.log("Actors/Actresses: " + omdbResults.actors);

        // convert object into a string
        var stringObj = JSON.stringify(omdbResults)

        // append the information to omdlog.txt file
        fs.appendFile("omdblog.txt", stringObj, function(err) {
            // If an error was experienced we will log it.
            if (err) {
                console.log(err);
            }

            // If no error is experienced, we'll log the phrase "Content Added" to our node console.
            else {
                console.log("OMDB Results Added!");
            }
        })
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

        // store results in an object
        var concertResults = {
            venue: response.data[0].venue.name,
            location: response.data[0].venue.city,
            date: moment(response.data[0].datetime).format("MMM Do YY"),
        }

        // display results in command line
        console.log("Name of venue: " + concertResults.venue);
        console.log("Venue location: " + concertResults.location);
        console.log("Date of concert: " + concertResults.date);

        // convert object into a string
        var stringObj = JSON.stringify(concertResults)

        // append the information to omdlog.txt file
        fs.appendFile("concertslog.txt", stringObj, function(err) {
            // If an error was experienced we will log it.
            if (err) {
                console.log(err);
            }

            // If no error is experienced, we'll log the phrase "Content Added" to our node console.
            else {
                console.log("Concert Results Added!");
            }
        })
        });
}

////////////////////////////////////// END OF CONCERT SEARCH /////////////////////////////////////////


//////////////////////////////////////// LIRI BOT SEARCH /////////////////////////////////////////////

function liriBot() {
   fs.readFile("random.txt", "utf8", function(error,data) {
        // if the code experiences any errors it will log the error to the console
        if (error) {
            return console.log(error);
        }

        // split the contents in random.txt by the , into an array
        var dataArr = data.split(",")

        // store "I want it that way" into a variable
        var song = dataArr[1];
        
        // pass in song to Spotify function
        searchSpotify(song);
   })
}

//////////////////////////////////////// END OFLIRI BOT SEARCH ///////////////////////////////////////////
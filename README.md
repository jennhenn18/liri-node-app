# Liri Bot

I'm happy to introduce the new entertainment bot, Liri Bot! Whether it's music, movies, or concerts the Liri Bot has your back. 

### Getting started

  1) Download the GitHub repo to your computer
  2) In your terminal navigate to where you stored the liri.js file and run "node liri.js"
  3) Next, Liri will ask you what category you need help with or to let her decide. Select an option in order to search.
  4) Search sytnax:

    - Search Spotify > spotify-this-song "[song name]"
    - Search OMDB > movie-this "[movie name]"
    - Search concerts > concert-this "[name of artist or band]"
    - Liri picks > do-what-it-says

  5) Liri Bot will return information based on your search
  6) Type "clear" in your terminal to start over

### Demo
This [video](https://github.com/jennhenn18/liri-node-app/blob/master/assets/71xNdYVmcl.mp4) will walk-through the different Liri Bot prompts. Beginning with Search Spotify and ending with Liri picks.

### Technologies used

For the creation of the Liri Bot I used the following technologies:
- **NodeJS**
- **NPM packages**:
    - [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
    - [Axios](https://www.npmjs.com/package/axios)
    - [Moment](https://www.npmjs.com/package/moment)
    - [DotEnv](https://www.npmjs.com/package/dotenv)
    - [Inquirer](https://www.npmjs.com/package/inquirer)
- **APIs**:
    - [OMDB](http://www.omdbapi.com/)
    - [BandsinTown](https://rest.bandsintown.com/artists/)

*Deployed site [here](https://jennhenn18.github.io/liri-node-app/)*
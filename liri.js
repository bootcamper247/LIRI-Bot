require("dotenv").config();

// Include Packages and run npm install <pkg> in this folder
var fs = require("fs");
var keys = require("./keys.js")
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify)

var cmd = "";
var searchStr = "";
var queryStr = "";

//if LIRI cmd <-this-> is not provided
if (process.argv.length <= 2) {
  logIt("Usage: " + "liri.js" + " <concert-this|spotify-this-song|movie-this|do-what-it-says> <'PARAM'>");
  process.exit(-1);
}

cmd = process.argv[2];

//if  search string is provided
if (process.argv.length == 4) {
  searchStr = process.argv[3];
}
logIt(" ");
logIt("< Result For : " + cmd + " " + searchStr + " >");
logIt(" ");

// Based on the cmd we run the appropriate API
switch (cmd) {
  case "concert-this":
    getConcert();
    break;

  case "movie-this":
    getMovie();
    break;

  case "do-what-it-says":
    doThis();
    break;

  case "spotify-this-song":
    getSong();
    break;

  default:
  // code block
}

function logIt(text) {

  console.log(text);

  fs.appendFile("log.txt", text + "\n", function (err) {
    if (err) {
      return logIt("Error: " + err);
    }
  });
};

function doThis() {

  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    logIt("From File : " + data);
    logIt(" ");

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    searchStr = dataArr[1];
    if (dataArr[0] == "movie-this") {
      getMovie();
    } else if (dataArr[0] == "concert-this") {
      getConcert();
    } else if (dataArr[0] == "spotify-this-song") {
      getSong();
    }
  });
}

function getSong() {

  // check if search string is provided
  if (searchStr == "") {
    searchStr = "the sign - ace of base";
  }
  spotify.search({ type: 'track', query: searchStr, limit: 1 }, function (err, data) {
    if (err) {
      return logIt('Error occurred: ' + err);
    }
    var result = data.tracks.items;
    if (result.length > 0){
    for (var i = 0; i < result.length; i++) {     //needed only if setting limit > 1
      logIt("Artist Name   : " + result[i].album.artists[0].name);
      logIt("Album Name    : " + result[i].album.name);
      logIt("Link to Track : " + result[i].external_urls.spotify);
      logIt("Song Name     : " + result[i].name);
    }
  }else {
    logIt("Sorry no match found" );
  }
  logIt(" ");
  });
}

function getMovie() {

  // if search string is not provided
  if (searchStr == "") {
    searchStr = "Mr. Nobody";
    logIt("If you haven't watched 'Mr. Nobody,' then you should: <http://www.imdb.com/title/tt0485947/>");
    logIt("It's on Netflix!");
  }
  queryStr = "http://www.omdbapi.com/?apikey=trilogy&t=" + searchStr;

  // Then run a request with axios to the OMDB API with the movie specified
  axios.get(queryStr)
    .then(function (response) {
      if (response.data.Title) {
        logIt(" ");
        logIt("Title                  : " + response.data.Title);
        logIt("Year Released          : " + response.data.Year);
        logIt("IMDB Rating            : " + response.data.imdbRating);
        if (response.data.Ratings) {
          if (response.data.Ratings.length > 1) {
            logIt("Rotten Tomatoes Rating : " + response.data.Ratings[1].Value);
          } else {
            logIt("Rotten Tomatoes Rating : N/A");
          }
        }
        else {
          logIt("Rotten Tomatoes Rating : N/A");
        }
        logIt("Country Produced In    : " + response.data.Country);
        logIt("Language               : " + response.data.Language);
        logIt("Actors                 : " + response.data.Actors);
        logIt(" ");
        logIt("Plot : " + response.data.Plot);
      } else {
        logIt("Sorry : This movie does not exist in our Database");
      }
      logIt(" ");
    })
    .catch(function (error) {
      logIt(error);
    });
}

function getConcert() {

  // check if search string is provided
  if (searchStr == "") {
    searchStr = "maroon 5";
  }

  queryStr = "https://rest.bandsintown.com/artists/" + searchStr + "/events?app_id=codingbootcamp"

  // Run a request with axios to the Bands in Town Artist Events API with the artist specified
  axios.get(queryStr)
    .then(function (response) {
      if (response.data.length) {
        logIt(response.data.length + " Events Found ");
        logIt(" ");
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i].venue) {
            logIt("(" + (i + 1) + ")")
            logIt("Venue            : " + response.data[i].venue.name);
            logIt("Location         : " + response.data[i].venue.city + ", " + response.data[i].venue.country);
            logIt("Date(MM/DD/YYYY) : " + moment(response.data[i].datetime).format("L"));
            logIt(" ");
          }
        }
      } else {
        logIt("Sorry, No Matches Found");
      }
    })
    .catch(function (error) {
      // logIt("Error: " + error.message);
      logIt("Sorry: No Matches Found");
    });
}

// logIt("The movie's rating is: " + JSON.stringify(response.data));

// logIt(searchStr.trim().replace(/ /g, "+"));



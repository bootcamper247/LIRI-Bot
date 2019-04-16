
##### Georgia Tech Coding Boot Camp at Prototype Prime

# LIRI-Bot
## node/npm/axios/OMDBAPI/Bands In Town API/node-spotify-api/moment.js

- A command line node app that takes in parameters and returns data
![Image of concert-this](https://github.com/bootcamper247/LIRI-Bot/blob/master/images/useage.png)

- liri.js can take in one of the following commands:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

### Usage of the Commands

1. `node liri.js concert-this <artist/band name here>`

   * Searches the Bands in Town Artist Events API for an artist and renders the following info about each event to the terminal:
   
   ```
       * Name of the venue.
       * Venue location.
       * Date of the Event (use moment to format this as "MM/DD/YYYY")
   ```
     
   ![Image of concert-this](https://github.com/bootcamper247/LIRI-Bot/blob/master/images/concert.png)
     
   * If no artist is provided then app search defaults to the band "maroon 5".
 

2. `node liri.js spotify-this-song '<song name here>'`

   * Shows the following information about the song in your terminal/bash window
   
   ```
       * Artist(s).
       * The song's name.
       * A preview link of the song from Spotify.
       * The album that the song is from.
   ```

   * If no song is provided then app search defaults to "The Sign" by Ace of Base.
   
   * Current Limit for records returned is set to 1.
   ![Image of concert-this](https://github.com/bootcamper247/LIRI-Bot/blob/master/images/spotify.png)

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If no movie is provided, then app search defaults to, the movie 'Mr. Nobody.'

     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

     * It's on Netflix!
   ![Image of concert-this](https://github.com/bootcamper247/LIRI-Bot/blob/master/images/movie.png)

4. `node liri.js do-what-it-says`

   * Using the `fs` Node package, LIRI reads the text inside of random.txt and then uses it to call one of LIRI's commands.

     * It runs for `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

     * Text in random.txt can be edited to test out the feature for movie-this and concert-this.
   ![Image of concert-this](https://github.com/bootcamper247/LIRI-Bot/blob/master/images/dothis.png)

### Additionally

* Output is logged to terminal/bash window, and also added to a .txt file called `log.txt`.
 <https://github.com/bootcamper247/LIRI-Bot/blob/master/log.txt>

* Each command run is appended to the `log.txt` file. 

* If cloning this app from github, please supply your own `.env` file for it to work.






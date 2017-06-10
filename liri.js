var inquirer = require("inquirer");
var request = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var keys = require("./keys.js");
var spotKeys = require("./spotkeys.js");
var command = process.argv[2];
var input = process.argv[3];

var spotify = new Spotify({
  id: spotKeys.spotKeys.id,
  secret: spotKeys.spotKeys.secret
});



switch(command) {
    case "movie-this": 
        movieSearch(input)
        break;
    case "spotify-this-song":
        songSearch(input)
        break;
    case "my-tweets":
    	twitterSearch()
    	break;
        
}


	/////////OMDB API/////////////

	function movieSearch(moviename) {

     var queryUrl = "http://www.omdbapi.com/?t=" + moviename + "&y=&plot=short&apikey=40e9cece";
		//console.log(queryUrl);
		
		request(queryUrl , function(error, response,body) {
		//function(error, response, body) is 'CALL BACK' function...above code is asynchronouse

		console.log("Move's Rating is: " + JSON.parse(body).imdbRating);
		//why JSON.parse --> after parse it we can see imdb rating key out of object
		console.log("Title of the movi: " + JSON.parse(body).Title);
		console.log("Movie's Rating is: " + JSON.parse(body).imdbRating);
		//why JSON.parse --> after parse it we can see imdb rating key out of object
		console.log("Year the movie came out: " + JSON.parse(body).Year);
		console.log("Country where the movie was produced: " + JSON.parse(body).Country);
		console.log("Language of the movie: " + JSON.parse(body).Language);
		console.log("Plot of the movie: " + JSON.parse(body).Plot);
		console.log("Actors in the movie: " + JSON.parse(body).Actors);
		console.log("Rotten Tomatoes URL: " + JSON.parse(body).Ratings.Source);
		console.log("Rotten Tomatoes URL: " + JSON.parse(body).Ratings.Value);

		});  

		console.log("====================");


	}

	

/////////////Spotify/////////////////


function songSearch(song) {
spotify.search({ type: 'track', query: song }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

for(i=0; i<data.tracks.items.length; i++) 
{
console.log(data.tracks.items[i].album.name); 

}
});	


}


///////////////Twitter/////////////////

function twitterSearch() {

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret,
});

client.get('search/tweets', {
    q: 'madhurid1617', // 'NodeProjectLIRI',
    count:10
}    , function(error, tweets, response) {
  if (!error) {
    tweets.statuses.forEach(function(tweet, index) {
            console.log((index + 1) + ") " + tweet.text);
      
        })
  }
});

}



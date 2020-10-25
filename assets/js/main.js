
// quotes generator - need to update on html to BULMA
$(document).ready(function () {

  /* 

    gif section

  */
  // #gif-search
  // queryURL for Giphy API
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=chuck+norris&api_key=dc6zaTOxFJmzC";
  // count the number of gifs rendered on the page
  var numberGifs = document.querySelectorAll('.chuck-gif').length;
  // set a maximum number of gifs to return
  var maxGifs = 3;
  $("#gif-search").on("click", function () {
    // remove the first image if there are already maxGifs on the page
    if (numberGifs === maxGifs) {
      document.querySelectorAll('.chuck-gif')[maxGifs - 1].remove();
    };
    // make the ajax request and add the image
    $.ajax({
      url: queryURL,
      method: "GET",
      responseType: 'application/json',
    }).then(function (response) {
      console.log(response);
      // randomly choose an image object from the giphy api response
      var giphy_object = response.data[Math.floor(Math.random() * response.data.length)];
      // assign the image url to a variable
      var giphy_image = giphy_object.images.downsized_large.url;
      // place the image onto the web page
      $(`#gif-images`).prepend(`<img class="chuck-gif" src="${giphy_image}" alt="Chuck Norris animated gif will return"/>`);
      // update the numberGifs value
      numberGifs = document.querySelectorAll('.chuck-gif').length;
    });

  });

  /* 

    joke/quotes section

  */
  // #joke-search
  var chuckNorris = "https://api.icndb.com/jokes/random";
  $("#joke-search").on("click", function () {
    $("#joke-search").html("Get another one!");
    $.getJSON(chuckNorris, function (json) {
      $("#quote").html("<em>\"" + json.value.joke + "\"</em>").addClass("animated bounceIn");
      // display
      document.querySelector("#quoteCont").style.display = 'block';
    });
  });

  /*

    movies section

  */


  // create an array of all of chuck's movies that appear in the imdb database
  // we got the these ids by going to imdb, searching for chuck norris, then
  // looking at id values in the html for each movie. Maybe a bit complicated... but it works
  var chuckMovies = ['tt1600194', 'tt2712740', 'tt1764651', 'tt0432267', 'tt0480273', 'tt0364725', 'tt0247144', 'tt0312450', 'tt0304584', 'tt0106168', 'tt0234516', 'tt0163949', 'tt0185114', 'tt0176943', 'tt0116341', 'tt0114697', 'tt0107101', 'tt0324568', 'tt0105402', 'tt0102045', 'tt0099399', 'tt0095296', 'tt0094792', 'tt0165166', 'tt0091055', 'tt0090927', 'tt0089348', 'tt0088936', 'tt0089604', 'tt0087727', 'tt0085862', 'tt0083960', 'tt0084684', 'tt0082350', 'tt0081259', 'tt0079168', 'tt0079227', 'tt0075783', 'tt0070705', 'tt0070743', 'tt0068935', 'tt0065225'];
// function to display hidden content
  $("#movie-search").on("click",newFunction());
  $("#movie-search").on("click", function (event) {
    event.preventDefault();
    // api key ... apikey=k_bU3y02ls
    // 2nd api key = k_D6Gu5xqd
    var api_key = 'k_bU3y02ls';

    // get a random chuck movie using the id
    var chuck_movie_id = chuckMovies[Math.floor(Math.random() * chuckMovies.length)];

    // construct the url
    var imdb_url = `https://imdb-api.com/en/API/Posters/${api_key}/${chuck_movie_id}`;

    // make ajax request
    $.ajax({
      url: imdb_url,
      method: "GET",

    }).then(function (response) {
      //$("#movie-view").text(JSON.stringify(response));
      // render the poster
      pickPoster(response);
      console.log(response);

    });

    // // Here we construct our URL
    // var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
  });

  // randomly select a poster from the api payload
  function pickPoster(data) {
    /*  quick reference for the object that's returned from imdb 
    {
      "imDbId": the id for the imdb asset,
      "title": title of the movie,
      "posters" [
        {
          "id": unique image id,
          "link": url to the image
        }
      ]
    }
    */

    // get the movie title
    var movie_title = data.title;

    // check if there are posters
    if (data.posters.length > 0) {
      // choose a random poster
      var poster_link = data.posters[Math.floor(Math.random() * data.posters.length)];
      // pass the movie title and poster link to the renderPoster function
      renderPoster(movie_title, poster_link.link);
    }
    else {
      $("#movie-view").html(`<p>No Poster for ${movie_title}</p>`);
    }
  }

  // render the poster
  function renderPoster(movie_title, poster_link) {
    $("#movie-view").html(`<img src="${poster_link}" alt="${movie_title}"/>`)
  }

});

function newFunction() {
  $("#movie-search").on(`click`, function(){
    $("#movieCont").removeClass("is-hidden")
  });
}


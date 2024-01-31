var client_id = 'b672497f3e5a4284b82d05fdd7eca04c';
var client_secret = '2619786cafc04531b202a1a4d3c6439d';
var access_token = '';

//We create the Spotify class with the API to make the call to
function Spotify() {
  this.apiUrl = 'https://api.spotify.com/';
}

//Search for information on an artist, adding the possibility of obtaining their albums.
Spotify.prototype.getArtist = function (artist) {

  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/search?type=artist&q=' + artist,
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done( function(response){
    $("#results").html("");;
    let artists =response.artists.items;
    artists.forEach(artist => {
      console.log();
      $("#results").append("<div class='artist'><h1>"+artist.name+"</h1>"+
                           "<h2>Popularity: "+artist.popularity+"</h2>"+
                           "<img src="+artist.images[1].url+
                           " height="+artist.images[1].height+
                           " width="+artist.images[1].width+"></img>"+
                           "</div>");
      

    });
  });
};

//Search the albums of an artist, given the id of the artist
Spotify.prototype.getArtistById = function (artistId) {

  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/artists/' + artistId + '/albums',
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done( function(response){
    console.log(response);
  });
};

//This fragment is the first thing that is loaded, when the $(document).ready
$(function () {
  $.ajax({
    type: "POST",
    url: "https://accounts.spotify.com/api/token",
    beforeSend: function (xhr) {
      xhr.setRequestHeader ("Authorization", "Basic " + btoa(client_id + ":" + client_secret));
    },
    dataType: "json",
    data: { grant_type: "client_credentials" }

  }).done( function(response) {    
    access_token = response.access_token;
       
  });

  var spotify = new Spotify();

  $('#bgetArtist').on('click', function () {
    spotify.getArtist($('#artistName').val());
  });

  $('#results').on('click', '.artistId', function () {
    spotify.getArtistById($(this).attr("data-id"));
  });

  
  
});
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
    $("#results").html("");
    let artists =response.artists.items;
    
    if(artists.length != 0){
      artists.forEach(artist => {
        if(artist.images[2] == null){
          
        }else{
          $("#results").append("<div class='artist'>"+
          "<h2><a href='' data-id="+artist.id+" class='artistId'>"+artist.name+"</a></h2>"+
          "<h3>Popularity: "+artist.popularity+"</h3>"+
          "<img src="+artist.images[2].url+
          " height="+artist.images[2].height+
          " width="+artist.images[2].width+"></img>"+
          "</div>");
        }
      });
    }else{
      $("#results").append("<p>No artists with this name have been found.</p>");
     
    }
     
  });
};
Spotify.prototype.getTracks = function (track) {

  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/search?type=track&q=' + track,
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done( function(response){
    $("#tracks").html("");
    let tracks =response.tracks.items;
    
    if(tracks.length != 0){
      tracks.forEach(track => {
        
        if(track.album.images[1] == null){
          
        }else{
          $("#tracks").append("<div class='artist'>"+
          "<h2>"+track.name+"</h2>"+
          "<h3>Popularity: "+track.popularity+"</h3>"+
          "<h5>Album: "+"<a href='' data-id="+track.album.id+" class='albumId'>"+track.album.name+"</a>"+"</h5>"+
          "<img src="+track.album.images[1].url+
          " height="+track.album.images[1].height+
          " width="+track.album.images[1].width+"></img>"+
          "</div>");
        }
      });
    }else{
      $("#tracks").append("<p>No tracks with this name have been found.</p>");
     
    }
     
  });
};

//Search the albums of an artist, given the id of the artist
Spotify.prototype.getArtistById = function (artistId,artistName) {

  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/artists/' + artistId + '/albums',
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done( function(response){
    
    $("#results").html("");
    let albums = response.items;
    albums.forEach(album=>{
      
      $("#results").append(
        "<div class = 'album'>"+
          "<h3>"+"<a href='' data-id="+album.id+" class='albumId'>"+album.name+"</a></h3>"+
          "<h6>"+artistName+"</h6>"+
          "<img src="+album.images[2].url+" height="+album.images[2].height+" width="+album.images[2].width+">"+
        "</div>"
      );
    })
  });
};

//Get tracks of an album, given the id of the Album
Spotify.prototype.getAlbumById = function(albumId, albumName){
  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/albums/' + albumId + '/tracks?limit=50',
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done(function(response){
    $("#tracks").html("");
    $("#tracks").append("<h1>"+albumName+"</h1>"+"<h2>"+response.items[0].artists[0].name+"</h2>");
    
    let tracks = response.items;
    tracks.forEach(track=>{
      let minutos = Math.floor((track.duration_ms/1000/60)%60);
      let segundos = Math.floor((track.duration_ms/1000)%60);
      if(segundos<10){
        segundos = "0"+segundos;
      }
      
      $("#tracks").append(
        "<div class='track'>"+
          "<p>"+track.track_number+"</p>"+
          "<p>"+track.name+"</p>"+
          "<p>"+minutos+":"+segundos+"</p>"+
        "</div>"
      );
    })
  });
}
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
    spotify.getTracks($('#artistName').val());
  });

  $('#results').on('click', '.artistId', function (e) {
    
    e.preventDefault();
    spotify.getArtistById($(this).attr("data-id"),$(this).text());
  });
  
  $('#results').on('click', '.albumId', function (e) {
    
    e.preventDefault();
    spotify.getAlbumById($(this).attr("data-id"),$(this).text());
  });
  
  $('#tracks').on('click', '.albumId', function (e) {
    
    e.preventDefault();
    spotify.getAlbumById($(this).attr("data-id"),$(this).text());
  });

});
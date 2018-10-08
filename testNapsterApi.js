
var player = new Audio();
var isPlaying = true;

// function to play or pause audio
function Jukebox() {

  this.play_pause = () => {
    if (isPlaying) {
      player.pause();
      isPlaying = !isPlaying;
    }
    else {
      player.play();
      isPlaying = !isPlaying;
    }
  }
  // play this clicked
  this.playSelected = (event) => {
    handleSound($(event).attr("data-song"));
  }
}

// handle for Jukebox()
var jukeBox = new Jukebox();

// pull audio clip
var handleSound = (index) => {
  player.src = index;
  player.play();
}

// Napster API key
var apiKey = "MjYxOTU3NTItZjAzZC00YTJlLWI0NTItY2IzYTkzNmNjZTc0";
var optionsList = $('#search-option-list');

// display search options
$('#search-option-list,#musicList,.music-card').click(() => {
  $('#search-option-list').css({ 'display': 'none' });
})

// call first five artist names; click to search; display in search-option-list div
$('#queryArtist').on({
  input: (evt) => {
    if (evt.target.value.length > 3)
      $.ajax({
        url: `http://api.napster.com/v2.2/search?apikey=${apiKey}&query=${evt.target.value}&type=artist`
        ,
        success: function (response) {
          optionsList.empty();
          for (var i = 0; i < 5; i++) {
            optionsList.append(`<div class="option" data-id=${response.search.data.artists[i].id} onClick="loadTracks(this)">${response.search.data.artists[i].name}</div>`);
          }
        }
      })
  },
  focus: (evt) => {
    $('#search-option-list').css({ 'display': 'flex' });
  }
})

// function called to load 10 tracks
var song_list = $('#musicList');

function loadTracks(evt) {
  var artist_id;
  artist_id = (typeof evt === 'string')? evt : evt.getAttribute('data-id');
  $.ajax({
    url: `http://api.napster.com/v2.2/artists/${artist_id}/tracks/top?apikey=${apiKey}&limit=10`
    ,
    success: function (response) {
      var arrSongs = response.tracks;
      arrSongs.forEach((elem) => {
        song_list.prepend(
          `<div class="music-card" data-song=${elem.previewURL} style="background-image:url(http://direct.napster.com/imageserver/v2/albums/${elem.albumId}/images/200x200.jpg);" onClick="jukeBox.playSelected(this)">
            <h6>${elem.name}</h6>
            <div class="songImg">
            </div>
           </div>`)
        });
      handleSound(arrSongs[0].previewURL);
    }
  });
}
//ajax call for SeatGeek API---------------------------------------------------------------------------------------
var artist = $("#queryArtist").val().trim();

function SeatGeek() {
  var queryURL = "https://api.seatgeek.com/2/performers?slug=" + artist + "&client_id=OTA5NzI3MnwxNTM4NTMyNDM0LjI0"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (results) {
    artists = (results.performers[0].url);

    console.log(results.performers[0].url);
    console.log(results.performers[0].slug);

  })
}
//ajax call for SeatGeek API---------------------------------------------------------------------------------------
SeatGeek();

// // Initialize Firebase
// var config = {
//   apiKey: "AIzaSyD6nJlQQmvGywIq2nVo1MLLRkV3y1WYi2s",
//   authDomain: "skynetdate.firebaseapp.com",
//   databaseURL: "https://skynetdate.firebaseio.com",
//   projectId: "skynetdate",
//   storageBucket: "skynetdate.appspot.com",
//   messagingSenderId: "888406917389"
// };
// firebase.initializeApp(config);
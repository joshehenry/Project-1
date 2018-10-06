var options_list = $('#search-option-list');
var song_list = $('#musicList');

var player  = new Audio();
var isPlaying = true;

// function to play or pause audio
function Jukebox(){ 

  this.play_pause = () => {
      if(isPlaying){
        player.pause();
        isPlaying  = !isPlaying;
        }
      else{
        player.play();
        isPlaying  = !isPlaying;
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
  player.src=index;
  player.play();
}

// Napster API key
var apiKey = "MjYxOTU3NTItZjAzZC00YTJlLWI0NTItY2IzYTkzNmNjZTc0";

// call first five artist names; click to search; display in search-option-list div
$('#artist').on({
  input:(evt) => {
    if(evt.target.value.length > 3)
      $.ajax({
         url: `http://api.napster.com/v2.2/search?apikey=${apiKey}&query=${evt.target.value}&type=artist`
         ,
         success: function(response){
            options_list.empty();
            for(var i=0;i<5;i++){
                options_list.append(`<div class="option" data-id=${response.search.data.artists[i].id} onClick="loadTracks(this)">${response.search.data.artists[i].name}</div>`);
            }
          }
        })
    },
    focus: (evt) => {
      $('#search-option-list').css({'display':'flex'});
    }

})

// function called to load 10 tracks
function loadTracks(evt){
  var artist_id;
  artist_id = (typeof evt === 'string')? evt : evt.getAttribute('data-id');
  $.ajax({
      url:`http://api.napster.com/v2.2/artists/${artist_id}/tracks/top?apikey=${apiKey}&limit=10`
      ,
      success: function(response){
        var arrSongs = response.tracks;
          arrSongs.forEach((elem) => {
          song_list.prepend(
          `<div class="music-card" data-song=${elem.previewURL} style="background-image:url(http://direct.napster.com/imageserver/v2/albums/${elem.albumId}/images/200x200.jpg);" onClick="jukeBox.playSelected(this)">
            <h5>${elem.name}</h6>
            <div class="songImg">
            </div>
           </div>`)
        });
      handleSound(arrSongs[0].previewURL);
      }
    });
}
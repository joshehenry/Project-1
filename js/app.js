// ------------------begin code call to Napster API submit search to database and add to recent search list
// handles for Jukebox()
var jukeBox = new Jukebox();
var player = new Audio();
var isPlaying = true;

// play audio clip
var handleSound = (index) => {
    player.src = index;
    player.play();
}

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
    this.playSelected = (evt) => {
        handleSound($(evt).attr('data-song'));
    }
}

// Napster API key
var apiKey = "MjYxOTU3NTItZjAzZC00YTJlLWI0NTItY2IzYTkzNmNjZTc0";
var optionsList = $('#search-option-list');

//SeatGeek API key
var clientID = "OTA5NzI3MnwxNTM4NTMyNDM0LjI0"

// display search options
$('#search-option-list, #musicList, .music-card').click(() => {
    $('#search-option-list').css({ 'display': 'none' });
})

// first three letters returns artist name for search; click option to loadtracks
$('#topic-input').on({
    input: (evt) => {
        if (evt.target.value.length > 3)
            $.ajax({
                url: `https://api.napster.com/v2.2/search?apikey=${apiKey}&query=${evt.target.value}&type=artist`
                ,
                success: function (response) {
                    optionsList.empty();
                    for (var i = 0; i < 5; i++) {
                        optionsList.append(`<div class="option" data-name="${response.search.data.artists[i].name}" data-id="${response.search.data.artists[i].id}" onClick="loadTracks(this)">${response.search.data.artists[i].name}</div>`);
                    }
                }
            })
    },
    focus: (evt) => {
        $('#search-option-list').css({ 'display': 'flex' });
    }
})

// function handle to load 10 tracks and declaration of global variables
var song_list = $('#musicList');
var artist_name = "";
var artist_id = "";
var artist_url = "";

// function to load top 10 artist tracks from AJAX call to Napster API
function loadTracks(evt) {
    song_list.empty();
    artist_id = $(evt).attr('data-id');
    artist_name = $(evt).attr('data-name');
    // console.log(artist_id);
    // console.log(artist_name);

    // call w/pass artist_name to SeatGeek API
    seatGeek(artist_name);

    $.ajax({
        url: `https://api.napster.com/v2.2/artists/${artist_id}/tracks/top?apikey=${apiKey}&limit=12`
        ,
        success: function (response) {
            var arrSongs = response.tracks;
            arrSongs.forEach((elem) => {
                song_list.append(
                    `<div class="music-card-container">
                      <div class="music-card" data-song="${elem.previewURL}" style="background-image:url(http://direct.napster.com/imageserver/v2/albums/${elem.albumId}/images/200x200.jpg);" onClick="jukeBox.playSelected(this)">
                      <div class="songImg">
                      </div>
                    </div><h6>${elem.name}</h6></div>`)
            });
            handleSound(arrSongs[0].previewURL);
        }
    });
}

// Initialize Firebase SkyNetData
var config = {
    apiKey: "AIzaSyD6nJlQQmvGywIq2nVo1MLLRkV3y1WYi2s",
    authDomain: "skynetdate.firebaseapp.com",
    databaseURL: "https://skynetdate.firebaseio.com",
    projectId: "skynetdate",
    storageBucket: "skynetdate.appspot.com",
    messagingSenderId: "888406917389"
};
firebase.initializeApp(config);

// handle for firebase.database();
var database = firebase.database();

// listener for search entry w/prevent form submission upon page load
$('#topic-input').on('click', function (event) {
    event.preventDefault();
    // check if input not blank
    if ($('#topic-input').val().trim() != "") {
        // console.log(artist_id);
        // console.log(artist_name);
        // console.log(artist_url);

        // store global artist parameters in newArtist object
        var newArtist = {
            name: artist_name,
            id: artist_id,
            url: artist_url
        };
        // console.log(newArtist);

        // Push newArtist data to database
        database.ref().push(newArtist);

        // Reset artist search field
        $('#topic-input').val("");
        $(optionsList).empty();
    }
});

// Event listener for addition to Firebase database and adding row to #new-artist tbody
database.ref().limitToLast(10).on('child_added', function (childSnapshot) {
    // console.log(childSnapshot.val());

    // handle for childSnapshot.val();
    var snap = childSnapshot.val();

    // grab variables from snap
    artist_id = snap.id;
    artist_name = snap.name;
    artist_url = snap.url;
    // console.log(artist_id);
    // console.log(artist_name);
    // console.log(artist_url);

    // create new row; clickable to load top tracks from artist
    var newRow = $("<tr>").append(
        $(`<td class="waves-effect" data-name="${artist_name}" data-id="${artist_id}" onClick="loadTracks(this)">${artist_name}</td>`)
    );

    // append new row to table
    $('#new-artist > tbody').prepend(newRow);
});
// ------------------end code call to Napster API submit search to database and add to recent search list

//ajax call for SeatGeek API---------------------------------------------------------------------------------------
function seatGeek() {

    var queryURL = `https://api.seatgeek.com/2/performers?q=${artist_name}&client_id=OTA5NzI3MnwxNTM4NTMyNDM0LjI0`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (results) {
        artist_url = results.performers[0].url;
        console.log(results.performers[0].name);
        console.log(artist_url);
        console.log(artist_name);

        // replace html <a class="url"></a>
        $("#url").replaceWith(`<a id="url" class="btn-large waves-effect waves-red lighten-3" href="${artist_url}" target="_blank" >Click Me For ${artist_name} Tickets!</a>`);

    })
};
  //ajax call for SeatGeek API -----------------------------------------------------------------------------------------------------
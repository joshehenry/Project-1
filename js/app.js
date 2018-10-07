const Calendar = document.querySelector('.datepicker');
M.Datepicker.init(Calendar, {
  showClearBtn: true
});

//ajax call for SeatGeek API---------------------------------------------------------------------------------------
function SeatGeek() {
  var queryURL = 'https://api.seatgeek.com/2/events?&postal_code=77018&per_page=10&client_id=OTA5NzI3MnwxNTM4NTMyNDM0LjI0'

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (results) {

    console.log(results);
    console.log(results.events[0]);

  })
};

SeatGeek();

//ajax call for SeatGeek API -----------------------------------------------------------------------------------------------------

$(document).ready(function () {
  $('#modal').modal();
  $('#modal').modal('open');
});

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

// Click event listener for add-artist button w/prevent form submission upon page load
$("#add-artist").on("click", function (event) {
  event.preventDefault();

  // grab user inputs
  var artistName = $("#artist-input").val().trim();
  console.log(artistName);

  // store artist input in newArtist object
  var newArtist = {
    name: artistName
  };
  console.log(newArtist);

  // Push newArtist data to database
  database.ref().push(newArtist);

  // Reset artist search field
  $("#artist-input").val("");
});

// Event listener for addition to Firebase database and adding row to #new-Artist tbody
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // handle for childSnapshot.val();
  var snap = childSnapshot.val();

  // grab variables from snap
  var artistName = snap.name;
  console.log(artistName);

  // create new row
  var newRow = $("<tr>").append(
    $("<td>").text(artistName)
  );

  // append new row to table
  $("#new-Artist > tbody").prepend(newRow);

});
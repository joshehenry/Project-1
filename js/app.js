//ajax call for SeatGeek API---------------------------------------------------------------------------------------


    function SeatGeek() {
        var queryURL = 'https://api.seatgeek.com/2/events?&postal_code=77018&per_page=10&client_id=OTA5NzI3MnwxNTM4NTMyNDM0LjI0'
       
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(results) {
            
            console.log(results);
            console.log(results.events[0]);       
            
            
        })};
        

        SeatGeek();

//ajax call for SeatGeek API -----------------------------------------------------------------------------------------------------
        //
$(document).ready(function(){
   $('#modal').modal();
   $('#modal').modal('open'); 
});

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD6nJlQQmvGywIq2nVo1MLLRkV3y1WYi2s",
    authDomain: "skynetdate.firebaseapp.com",
    databaseURL: "https://skynetdate.firebaseio.com",
    projectId: "skynetdate",
    storageBucket: "skynetdate.appspot.com",
    messagingSenderId: "888406917389"
  };
  firebase.initializeApp(config);

const Calendar = document.querySelector('.datepicker');
M.Datepicker.init(Calendar,{
  showClearBtn: true
});

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
        //function SeatGeek() {
       
            //var queryURL = 'https://cXXXXXXX.web.cddbp.net/webapi/xml/1.0/'
            //$.ajax({
              //url: queryURL,
              //method: "GET"
            //}).then(function(results) {
                
               // console.log(results.events[1]);
                //console.log(results);
                
            
    
           // })};
           //'http://api.seatgeek.com/2/recommendations?performers.id=35&performers.id=87&postal_code=77018&per_page=10&client_id=OTA5NzI3MnwxNTM4NTMyNDM0LjI0'
           //'https://api.seatgeek.com/2/events?geoip=true?client_id=OTA5NzI3MnwxNTM4NTMyNDM0LjI0'


        //api.searchArtist(req artistName, req callback, opt matchMode)

//var Gracenote = require("node-gracenote");
//var clientId = "327746368";
//var clientTag = "8DD47F2D2D8A0CBE8D8C3903214BE5C1";
//var userId = "joshehenry";
//var api = new Gracenote(clientId,clientTag,userId);
//api.searchArtist("Kings of Leon", function(err, result) {
	// Search Result as array
//});



        //Gracenote
        //App Name:
        //Project
        //Client ID for Web API, Rhythm API and eyeQ
        //327746368-8DD47F2D2D8A0CBE8D8C3903214BE5C1
        //License information for GNSDK and Entourage
        //Client ID: 327746368
        //Client Tag: 8DD47F2D2D8A0CBE8D8C3903214BE5C1
        //License String:

         
//curl "https://api.seatgeek.com/2/events?client_id=OTA5NzI3MnwxNTM4NTMyNDM0LjI0" 
//curl "https://api.seatgeek.com/2/events?client_id=OTA5NzI3MnwxNTM4NTMyNDM0LjI0&client_secret=311d......."

//$ curl = 'https://api.seatgeek.com/2/events/739515?callback=fireEvent'

//Example Response
//fireEvent({
    //"stats": {...},
    //"title": "Houston Rodeo Livestock Show and Rodeo (Zac Brown Band Performance)",
   // "url": "/houston-rodeo-livestock-show-and-rodeo-zac-brown-band-performance-tickets/sports/2012-03-12/739515/",
    //"datetime_local": "2012-03-12T18:45:00",
   // "performers": [...],
    //"venue": {...},
   // "short_title": "Houston Rodeo Livestock Show and Rodeo (Zac Brown Band Performance)",
  //  "datetime_utc": "2012-03-12T23:45:00",
    //"score": 267.608,
    //"taxonomies": [...],
    //"type": "sports",
    //"id": 739515
//})

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
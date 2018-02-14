
(function(){

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB2-brY9WU1yl18sqenEopoQeMLrSUw5hY",
    authDomain: "my-fire-9da77.firebaseapp.com",
    databaseURL: "https://my-fire-9da77.firebaseio.com",
    projectId: "my-fire-9da77",
    storageBucket: "my-fire-9da77.appspot.com",
    messagingSenderId: "274167886619"
  };
  firebase.initializeApp(config);

  //get elements
  var preObject = document.getElementById('elementObject');

  //create references
  var dbRef = firebase.database().ref().child('dataObject');

  //sync object changes
  //dbRef.on('value', snap => myObject.innerText = snap.val());

 dbRef.on('value', snap => console.log(snap.val()));

}());

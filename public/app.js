
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


  //USEFUL PARTS

  //connection to database
  var mySpots = firebase.database().ref().child('spotsTest');

  //data logged to console
  mySpots.on('value', snap => console.log(snap.val()));


/*
  //MY TESTS

  //connection to database
  var mySpots = firebase.database().ref().child('spotsTest');
  var spotList = mySpots.child('spot-1');

  //get html element
  var ulList = document.getElementById('list');
  var myObject = document.getElementById('myElement'); //remove this

  //data logged to console
  mySpots.on('value', snap => console.log(snap.val()));

  //intersting that 'null, 1' handles the level of indentation for children of the object
  mySpots.on('value', snap => {
    myElement.innerText = JSON.stringify(snap.val(), null, 1);
  });

  //append data to element when data is added to database
  spotList.on('child_added', snap => {
    var li = document.createElement('li');
    li.innerText = snap.val();
    li.id = snap.key; //may not need this
    ulList.appendChild(li);
  });

  //remove element when data is removed from database
  spotList.on('child_removed', snap => {
    var liToRemove = document.getElementById(snap.key)
    liToRemove.remove();
  });

  //update element when data us changed in database
  spotList.on('child_changed', snap => {
    var liChanged = document.getElementById(snap.key);
    liChanged.innerText = snap.val();
  });
*/

/*
  //TRAINING EXAMPLES

  //get elements
  var myObject = document.getElementById('myElement');
  var ulList = document.getElementById('list');

  //create database references
  var dbRef = firebase.database().ref().child('dataObject');
  var dbRefList = dbRef.child('home');

  //sync object changes
  dbRef.on('value', snap => {
    myElement.innerText = JSON.stringify(snap.val(), null, 3);
  });

  dbRefList.on('child_added', snap => {
    var li = document.createElement('li');
    li.innerText = snap.val();
    li.id = snap.key;
    ulList.appendChild(li);
  });

  //useful for updating display when data is changed
  dbRefList.on('child_changed', snap => {
    var liChanged = document.getElementById(snap.key);
    liChanged.innerText = snap.val();
  });

  dbRefList.on('child_removed', snap => {
    var liToRemove = document.getElementById(snap.key)
    liToRemove.remove();
  });
*/
}());

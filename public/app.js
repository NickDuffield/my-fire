
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
  var myObject = document.getElementById('myElement');
  var ulList = document.getElementById('list');

  //create references
  var dbRef = firebase.database().ref().child('dataObject');
  var dbRefList = dbRef.child('home');

  //sync object changes
  dbRef.on('value', snap => {
    myElement.innerText = JSON.stringify(snap.val(), null, 3);
  });

  //sync list changes - may be useful to me. everytime a spot is added it is then pinned to the map
  //dbRefList.on('child_added', snap => console.log(snap.val()));

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



}());

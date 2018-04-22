
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

  // Get elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogout = document.getElementById('btnLogout');

  btnLogin.addEventListener('click', e => {
    //console.log('event fired');
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  btnSignUp.addEventListener('click', e => {
    // TODO: check 4 real email
    //console.log('event fired');
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      //console.log(firebaseUser);
      console.log('you are in');
      btnLogout.classList.remove('hide');
    } else {
      console.log('you are out');
      btnLogout.classList.add('hide');
    }
  });

}());

/* @TODO
  - display signed in users name
*/

var dataBtn = document.getElementById('dataBtn');

dataBtn.addEventListener('click', function(e) {

  var userId = firebase.auth().currentUser.uid;
  var coords = {lat:45.5230, lng: 122.6636};
  var iconImg = 'assets/marker-park.svg';
  var imgUrl = 'placeholder for now';
  var spotName = 'Burnside Skatepark';

  postNewSpot(userId, coords, iconImg, imgUrl, spotName);

});

function postNewSpot(userId, coords, iconImg, imgUrl, spotName) {
  // A post entry.
  var spotData = {
    userId: userId,
    coords: coords,
    iconImg: iconImg,
    imgUrl: imgUrl,
    spotName: spotName

  };

  // Get a key for a new Post.
  var newSpotKey = firebase.database().ref().child('spots').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/spots/' + newSpotKey] = spotData;

  //This could be for messaging
  //updates['/user-posts/' + userId + '/' + newSpotKey] = spotData;

  return firebase.database().ref().update(updates);
}


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
  const btnRegister = document.getElementById('btnRegister');
  const btnLogout = document.getElementById('btnLogout');

  btnLogin.addEventListener('click', e => {
    //console.log('event fired');
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, pass);

    // look at this message for user feedback
    promise.catch(e => console.log(e.message));
  });

  btnRegister.addEventListener('click', e => {

    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass);

    // look at this message for user feedback
    promise.catch(e => console.log(e.message));

  });


  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  var displayName = document.getElementById('displayName');

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {

      // @TODO
      // register isn't creating a new user ref in database
      // app to feedback if there is a no user or password mismatch

      var userDisplayName = firebase.auth().currentUser.displayName;

      //console.log(userId);

      //console.log('you are in');
      //console.log(userDisplayName);
      console.log(firebaseUser);
      btnLogout.classList.remove('hide');

    } else {

      console.log('you are out');

      //displayName.innerHTML = 'Sign in or register';
      btnLogout.classList.add('hide');
    }

  });

}());




// pushing data as a signed in user

var dataBtn = document.getElementById('dataBtn');

dataBtn.addEventListener('click', function(e) {

  var user = firebase.auth().currentUser;

  // how to update user profiles

  // @TODO could we add a dsiplayName at registration
  user.updateProfile({
    displayName: "Nick Duffield"
    //photoURL: "https://example.com/jane-q-user/profile.jpg"
  }).then(function() {
    // Update successful.
    console.log('Update successful');
  }).catch(function(error) {
    // An error happened.
    console.log('An error happened');
  });

  /*var userId = firebase.auth().currentUser.uid;
  var coords = {lat:45.5230, lng: 122.6636};
  var iconImg = 'assets/marker-park.svg';
  var imgUrl = 'placeholder for now';
  var spotName = 'Burnside Skatepark';

  postNewSpot(userId, coords, iconImg, imgUrl, spotName);*/

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

  var userData = {
    email: 'foo',
    username: 'bah'
  }

  // Get a key for a new Post.
  var newSpotKey = firebase.database().ref().child('spots').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/spots/' + newSpotKey] = spotData;
  //updates['/users/' + userId + '/' + newSpotKey] = spotData;
  //This could be for messaging
  //updates['/user-posts/' + userId + '/' + newSpotKey] = spotData;

  //adds info to user id
  updates['/users/' + userId] = userData;

  return firebase.database().ref().update(updates);
}

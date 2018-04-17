
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

// test push data event

var dataBtn = document.getElementById('dataBtn');

dataBtn.addEventListener('click', function(e) {

  var dataTest = "New value";
  var databaseRef = firebase.database().ref('sample-data');
  var userRef = databaseRef.child('users');
  userRef.push(dataTest);

  // @TODO try this link https://firebase.google.com/docs/database/web/read-and-write?authuser=1

  //console.log('data sent');

});

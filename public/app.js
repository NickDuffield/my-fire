
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
  const txtUserName = document.getElementById('txtUserName');
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnRegister = document.getElementById('btnRegister');
  const btnLogout = document.getElementById('btnLogout');

  // may want to refactor this code based on docs
  btnLogin.addEventListener('click', e => {

    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);

    promise.catch(e => console.log(e.message));

  });

  btnRegister.addEventListener('click', e => {

    const username = txtUserName.value;
    const email = txtEmail.value;
    const password = txtPassword.value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
      // capture user id
      var userId = firebase.auth().currentUser.uid;
      writeUserData(userId);
    }, function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == 'auth/weak-password') {
          console.log('The password is too weak.');
          //alert('The password is too weak.');
        } else {
          console.log(errorMessage);
          //alert(errorMessage);
        }

    });

    function writeUserData(userId) {
      firebase.database().ref('users/' + userId).set({
        username: username,
        //...
      });
    }

  });

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log('you are in');
      btnLogout.classList.remove('hide');
    } else {
      console.log('you are out');
      btnLogout.classList.add('hide');
    }
  });

}());

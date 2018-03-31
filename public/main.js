// reference to messages collection in database
var messagesRef = firebase.database().ref('messages');

// listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  // get values
  var name = getInputVal('name');
  var company = getInputVal('company');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');

  //pass data to save message function
  saveMessage(name, company, email, phone, message);

  // show alert
  document.querySelector('.alert').style.display = 'block';

  // hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  }, 3000);

  // clear form
  document.getElementById('contactForm').reset();
}

// really interesting function. @TO DO could I use this for my hide show function???
function getInputVal(id) {
  return document.getElementById(id).value;
}

// save message to firebase
function saveMessage(name, company, email, phone, message) {
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    company: company,
    email: email,
    phone: phone,
    message: message
  });
}

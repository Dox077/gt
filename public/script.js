function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  document.getElementById('profile-id').innerText = profile.getId();
  document.getElementById('profile-name').innerText = profile.getName();
  document.getElementById('profile-email').innerText = profile.getEmail();
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    document.getElementById('profile-id').innerText = '';
    document.getElementById('profile-name').innerText = '';
    document.getElementById('profile-email').innerText = '';
  });
}

gapi.load('auth2', function () {
  gapi.auth2.init({
    client_id: 'YOUR_CLIENT_ID',
  });
});

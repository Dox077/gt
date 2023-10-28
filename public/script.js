// Define your client ID (replace with your actual value)
const CLIENT_ID = '1023049278699-489s2oqrr75au1a0e214hjvtqr99kfbk.apps.googleusercontent.com';
const SPREADSHEET_ID = '1UDDarsUSFfdEhALQUlPvONklLpR0jzeV5kTaJ6Nslr4';

// Array with Google Sheets API discovery documents
const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];

// Authorized scopes
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

// Initialize the Google API client
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES,
  }).then(function () {
    // Listen for sign-in state changes
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

    // Enable the "Store IP Address" button
    document.getElementById('storeButton').disabled = false;
  });
}

// ... The rest of your code

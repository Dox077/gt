// Define your client ID and API key (replace with your actual values)
const CLIENT_ID = '1023049278699-trtl5or23n92gpp2gmnkkg5b2o4ji64f.apps.googleusercontent.com';
const API_KEY = 'AIzaSyA-hcANdJmipBAeDxGO7A7I2Xao5xex0XE';
const SPREADSHEET_ID = 'Y1UDDarsUSFfdEhALQUlPvONklLpR0jzeV5kTaJ6Nslr4';

// Array with Google Sheets API discovery documents
const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];

// Authorized scopes
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

// Load the Google Sheets API and authenticate the user
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES,
  }).then(function () {
    // Listen for sign-in state changes
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    // User is signed in, enable the "Store IP Address" button
    document.getElementById('storeButton').disabled = false;
  } else {
    // User is not signed in, disable the "Store IP Address" button
    document.getElementById('storeButton').disabled = true;
  }
}

// Handle the click event of the "Store IP Address" button
function storeIpAddress() {
  fetch('https://ipinfo.io/json')
    .then(response => response.json())
    .then(data => {
      const ipAddress = data.ip;
      appendIpAddressToSheet(ipAddress);
    })
    .catch(error => {
      console.error('Error fetching IP address:', error);
    });
}

// Append the IP address to the Google Sheet
function appendIpAddressToSheet(ipAddress) {
  gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Ip', // Update with your sheet name and range
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [[ipAddress]],
    },
  }).then(function (response) {
    console.log('IP Address stored in Google Sheet:', response);
    alert('IP Address stored in Google Sheet');
  }, function (error) {
    console.error('Error storing IP address in Google Sheet:', error);
    alert('Failed to store IP address in Google Sheet');
  });
}

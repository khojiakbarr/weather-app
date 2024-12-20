const API_KEY = "YOUR_API_KEY"; // O'zingizning API kalitingizni kiriting
const city = "London"; // Kerakli shahar nomi

// Shahar koordinatalarini olish
fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
)
  .then((response) => response.json())
  .then((data) => {
    const lat = data.coord.lat; // Latitude
    const lon = data.coord.lon; // Longitude
    console.log(`Shahar: ${city}`);
    console.log(`Latitude: ${lat}, Longitude: ${lon}`);

    // Haftalik prognozni olish
    const oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${API_KEY}`;
    fetch(oneCallURL)
      .then((response) => response.json())
      .then((forecast) => {
        console.log(`${city} uchun haftalik prognoz:`);
        forecast.daily.forEach((day) => {
          const date = new Date(day.dt * 1000); // Unix vaqtni inson o'qiydigan formatga aylantirish
          console.log(` 
            Sana: ${date.toDateString()}
            Kunduzgi harorat: ${day.temp.day} °C
            Kechasi harorat: ${day.temp.night} °C
            Bosim: ${day.pressure} hPa
            Shamol tezligi: ${day.wind_speed} m/s
            Yomg'ir ehtimoli: ${day.pop * 100}%
            Ob-havo tavsifi: ${day.weather[0].description}
          `);
        });
      });
  })
  .catch((error) => console.error("Xato yuz berdi:", error));

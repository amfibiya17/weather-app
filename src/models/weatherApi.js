const apIKey = require('./apIKey');

class WeatherApi {
  constructor() {
    this.apIKey = apIKey;
  }

  loadWeather(city, country, callback) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&lang=en&units=metric&appid=${this.apIKey}`
    )
      .then((info) => info.json())
      .then((responseJson) => {
        callback(responseJson);
      });
  }
}

module.exports = WeatherApi;

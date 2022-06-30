const apIKey = require('./apIKey');

class WeatherApi {
  constructor() {
    this.apIKey = apIKey;
  }

  loadWeather(search, callback) {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=${this.apIKey}=${search}&aqi=no`
    )
      .then((info) => info.json())
      .then((responseJson) => {
        callback(responseJson.response.results);
      });
  }
}

module.exports = WeatherApi;

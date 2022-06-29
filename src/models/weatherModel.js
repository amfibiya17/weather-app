class WeatherModel {
  constructor() {
    this.weather = [];
  }

  getWeather() {
    return this.weather;
  }

  addWeather(weather) {
    this.weather = weather;
  }
}

module.exports = WeatherModel;

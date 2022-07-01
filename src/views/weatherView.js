class WeatherView {
  constructor(model, api) {
    this.model = model;
    this.api = api;
    this.mainContainerEl = document.querySelector('#card');
    this.searchCityEl = document.querySelector('#search-city-input');
    this.searchCountryEl = document.querySelector('#search-country-input');
    this.searchButtonEl = document.querySelector('#search-button');

    this.searchButtonEl.addEventListener('click', () => {
      this.api.loadWeather(
        this.searchCityEl.value,
        this.searchCountryEl.value,
        (weather) => {
          if (weather.cod === 200) {
            this.model.addWeather(weather);
            this.searchCityEl.value = '';
            this.searchCountryEl.value = '';
            this.displayWeather();
          } else {
            document.querySelector('.weather').style.display = 'none';
            document.querySelector('.error').style.display = '';
          }
        }
      );
    });
  }

  displayWeather() {
    const weather = this.model.getWeather();

    document.querySelector('.error').style.display = 'none';
    document.querySelector('.weather').style.display = '';

    document.querySelector('#city').innerText = weather.name;

    document.querySelector('#temperature').innerText = Math.round(
      weather.main.temp
    );

    const { icon } = weather.weather[0];
    document.querySelector(
      '.icon'
    ).src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    document.querySelector('#condition').innerText = weather.weather[0].main;

    document.querySelector('#feels-like').innerText = Math.round(
      weather.main.feels_like
    );

    document.querySelector('#humidity').innerText = weather.main.humidity;

    document.querySelector('#wind-kph').innerText = Math.round(
      weather.wind.speed
    );
  }
}

module.exports = WeatherView;

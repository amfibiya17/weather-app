const WeatherModel = require('../models/weatherModel');

describe('WeatherModel', () => {
  let model;

  beforeEach(() => {
    model = new WeatherModel();
  });

  it('returns an empty weather attributes list', () => {
    expect(model.getWeather()).toEqual([]);
  });

  it('adds the data to weather attributes list', () => {
    model.addWeather([
      {
        location: {
          name: 'London',
          country: 'United Kingdom',
        },
        current: {
          temp_c: 20.0,
          feelslike_c: 20.0,
          condition: {
            text: 'Partly cloudy',
            icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
            code: 1003,
          },
          uv: 6.0,
          wind_kph: 22.0,
          humidity: 60,
        },
      },
    ]);
    expect(model.getWeather()).toEqual([
      {
        location: {
          name: 'London',
          country: 'United Kingdom',
        },
        current: {
          temp_c: 20.0,
          feelslike_c: 20.0,
          condition: {
            text: 'Partly cloudy',
            icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
            code: 1003,
          },
          uv: 6.0,
          wind_kph: 22.0,
          humidity: 60,
        },
      },
    ]);
  });
});

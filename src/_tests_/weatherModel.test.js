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
        weather: [
          {
            main: 'Clouds',
            icon: '04n',
          },
        ],
        main: {
          temp: 28.48,
          feels_like: 28.61,
          humidity: 63,
        },
        wind: {
          speed: 4.63,
        },
        sys: {
          country: 'GB',
        },
      },
    ]);

    expect(model.getWeather()).toEqual([
      {
        weather: [
          {
            main: 'Clouds',
            icon: '04n',
          },
        ],
        main: {
          temp: 28.48,
          feels_like: 28.61,
          humidity: 63,
        },
        wind: {
          speed: 4.63,
        },
        sys: {
          country: 'GB',
        },
      },
    ]);
  });
});

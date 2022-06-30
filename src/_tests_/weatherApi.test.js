const WeatherApi = require('../models/weatherApi');

require('jest-fetch-mock').enableMocks();

describe('WeatherApi', () => {
  describe('loadWeather', () => {
    it('returns weather attributes from the www.weatherapi.com back end server', (done) => {
      const api = new WeatherApi();

      fetch.mockResponseOnce(
        JSON.stringify({
          response: {
            results: [
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
            ]
          },
        })
      );

      api.loadWeather('search', (headlines) => {
        expect(headlines).toEqual([
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
        done();
      });
    });
  });
});

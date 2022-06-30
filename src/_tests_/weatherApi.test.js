const WeatherApi = require('../models/weatherApi');

require('jest-fetch-mock').enableMocks();

describe('WeatherApi', () => {
  describe('loadWeather', () => {
    it('returns weather attributes from the openweathermap.org back end server', (done) => {
      const api = new WeatherApi();

      fetch.mockResponseOnce(
        JSON.stringify({
          response: {
            results: [
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
            ],
          },
        })
      );

      api.loadWeather('city', 'country', (headlines) => {
        expect(headlines).toEqual([
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
        done();
      });
    });
  });
});

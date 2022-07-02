/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const WeatherApi = require('../models/weatherApi');
const WeatherModel = require('../models/weatherModel');
const WeatherView = require('../views/weatherView');

require('jest-fetch-mock').enableMocks();

describe('Weather view', () => {
  let view;
  let model;
  let api;

  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    model = new WeatherModel();
    api = new WeatherApi();
    view = new WeatherView(model, api);
  });

  it('displays weather attributes', () => {
    model.addWeather({
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
    });

    view.displayWeather();

    expect(document.querySelectorAll('.weather').length).toEqual(1);
  });

  it('can click', () => {
    const mockLoadWeather = jest.fn();
    api.loadWeather = mockLoadWeather;
    view.searchCityEl.value = 'City';
    view.searchCountryEl.value = 'Country';

    view.searchButtonEl.click();

    expect(mockLoadWeather.mock.calls.length).toEqual(1);
    expect(mockLoadWeather.mock.calls[0][0]).toEqual('City', 'Country');
  });

  describe('buttonCheck', () => {
    it('input should be cleared on "search" button click', () => {
      view.searchCityEl.value = 'City';
      view.searchCountryEl.value = 'Country';

      view.buttonCheck({
        main: { temp: 18.67, feels_like: 18.03, humidity: 55 },
        weather: [
          {
            main: 'Clouds',
            icon: '04n',
          },
        ],
        cod: 200,
        sys: { country: 'FR' },
        wind: { speed: 1.54 },
      });

      expect(view.searchCityEl.value).toEqual('');
      expect(view.searchCountryEl.value).toEqual('');
    });
  });
});

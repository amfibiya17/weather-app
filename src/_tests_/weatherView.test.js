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

    expect(view.searchCityEl.value).toEqual('');
    expect(view.searchCountryEl.value).toEqual('');

    // expect(mockLoadWeather.mock.calls.length).toEqual(1);
    // expect(mockLoadWeather.mock.calls[0][0]).toEqual('City', 'Country');
  });
});

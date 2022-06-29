const WeatherApi = require('./src/models/weatherApi');
const WeatherModel = require('./src/models/weatherModel');
const WeatherView = require('./src/views/weatherView');

const api = new WeatherApi();
const model = new WeatherModel();
const view = new WeatherView(model, api);

console.log('Hello!');

let angular = require('angular');
require('angular-ui-router');
require('angular-material');
require('./module/weather/module.js');
let configRouter = require('./config.js').module;
let HttpService = require('./service/http-service').service;
let HelperService = require('./service/helper-service').service;
let countries = require('./lib/countries.min.json');
let codes = require('./lib/codes.json');

let dependencies = [
  'ui.router',
  'ngMaterial',
  'best.weather',
];

angular
  .module('weatherApp', dependencies)
  .service('HttpService', HttpService)
  .service('HelperService', HelperService)
  .constant('API_KEY', '9be11b953f7de76a2d6bec9d53f58479')
  .constant('API_DOMAIN', 'http://api.openweathermap.org/data/2.5/weather')
  .constant('COUNTRIES', countries)
  .constant('COUNTRIES_CODES', codes)
  .config(configRouter);

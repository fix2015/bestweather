let angular = require('angular');
let mainComponent = require('./components/main/component.js').component;
let bestCitiesComponent = require('./components/best-cities/component.js').component;
let countryComponent = require('./components/country/component.js').component;

angular
    .module('best.weather', [])
    .component('main', mainComponent)
    .component('bestCities', bestCitiesComponent)
    .component('country', countryComponent);


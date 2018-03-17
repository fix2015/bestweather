let main = require('./module/weather/components/main/index.js').config;

let configRouter = function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state(main),

    $urlRouterProvider.otherwise('/');
};

configRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

exports.module =  configRouter;

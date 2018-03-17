class HttpService {
    constructor ($http, $q, API_DOMAIN, API_KEY) {
        this._http = $http;
        this._q = $q;
        this._domain = API_DOMAIN;
        this._apiKey = API_KEY;
    }

    getWeatherByCode (query) {
        let deferred = this._q.defer();
        this._http({
            method: 'GET',
            url: this._domain,
            params: {q: query, appid: this._apiKey, lang: 'ua'}
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response.data);
        });


        return deferred.promise;
    }

}
HttpService.$inject = ['$http', '$q', 'API_DOMAIN', 'API_KEY'];

exports.service = HttpService;

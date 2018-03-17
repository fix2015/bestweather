class HelperService {
    constructor (COUNTRIES, COUNTRIES_CODES) {
        this._countries = COUNTRIES;
        this._countriesCodes = COUNTRIES_CODES;
    }

    convertKelvinToCelsius (kel) {
        return kel - 273.15;
    }

    getCountries(){
        return this._countries;
    }

    getCountriesCode(country){
        return this._countriesCodes.filter((val) => val.name == country);
    }


}
HelperService.$inject = ['COUNTRIES', 'COUNTRIES_CODES'];

exports.service = HelperService;

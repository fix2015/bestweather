class MainController {
    constructor(HttpService, HelperService){
        this._httpService = HttpService;
        this._helpService = HelperService;
        this._countries = this._helpService.getCountries();
        this._bestCityParams = {
            temp: 21,
            humidity: 80
        };
        this.bestCity = [];
        this._checkedCountries = [];
        this._errorCountries = [];
        this._chekingCountry = null;
        this._progress = false;
        this._paramsForMan = true;
    }

    changeParams(){
        let params=null;
        this._paramsForMan = !this._paramsForMan;

        if(this._paramsForMan){
            params = {
                temp: 21,
                humidity: 80
            };
        }else{
            params = {
                temp: 22,
                humidity: 80
            };
        }

        this._bestCityParams = params;
    }

    stop(){
        this._progress = !this._progress;
    }

    findByAllCities(){
        let arr = [];
        for(let country in this._countries){
            arr.push({country, cities: this._countries[country]});
        }
        this._progress = true;
        this.getDataByCountry(arr.slice());
    }

    getDataByCountry(countries){
        let arr = countries.splice(0,1);
        if(arr.length > 0 && this._progress) {
            this.findByCounty(arr[0].country, arr[0].cities, () => {
                this.getDataByCountry(countries);
            });
        }else{
            console.log('finish find best cities');
        }
    }

    findByCounty(country, cities, next){
        let citiesArr = cities.slice(),
            countryCodeArr = this._helpService.getCountriesCode(country),
            countryCode = [];
        this._chekingCountry = country;

        if(countryCodeArr.length === 0){
            if(this._errorCountries.indexOf(country) === -1) this._errorCountries.push(country);
            if(next) next();
            return
        } else{
            countryCode = countryCodeArr[0].code
        }

        this.getData(country, countryCode, citiesArr, () => {
            if(this._checkedCountries.indexOf(country) === -1) this._checkedCountries.push(country);
            this._chekingCountry = null;
            if(next) next()
        });
    }

    getData(country, code, cities, callback){
        let city = cities.splice(0,1);
        if(city.length>0){
            let query = `${city},${code}`;
            this._httpService.getWeatherByCode(query)
                .then((val) => {
                    let temp = Math.round(this._helpService.convertKelvinToCelsius(val.main.temp)),
                        humidity = val.main.humidity;
                    console.log(temp, humidity)
                    if(this._bestCityParams.temp === temp && this._bestCityParams.humidity === humidity){
                        this.bestCity.push({country: country, city: city[0], temp, humidity});
                    }
                    this.getData(country, code, cities, callback);
                })
                .catch((err) => {
                    console.log(`${err.message} - ${city}`);
                    this.getData(country, code, cities, callback);
                })
        }else{
            console.log(this.bestCity)
            callback && callback();
        }
    }

    $onInit(){

    }
}

const MainComponent = {
    template: `
     <md-content class="md-padding" layout-xs="column" layout="row" layout-align="center center" xmlns="http://www.w3.org/1999/html">
        <div flex-md="100" flex-gt-md="50" layout="column">
          <md-card md-theme-watch="">
            <md-card-title>
              <md-list>
                  <md-subheader class="md-no-sticky">Find the best city with params: temp {{$ctrl._bestCityParams.temp}}C and humidity {{$ctrl._bestCityParams.humidity}}% 
                    <button class="md-raised md-primary md-button md-ink-ripple" ng-click="$ctrl.findByAllCities()">Find</button>
                    <button class="md-raised md-warn md-button md-ink-ripple" ng-if="$ctrl._progress" ng-click="$ctrl.stop()">Stop</button>
                     <md-switch ng-model="$ctrl.paramsForMan" aria-label="Switch 1" ng-change="$ctrl.changeParams()">
                        City for: {{ $ctrl._paramsForMan ? 'Man' : 'Woman' }}
                      </md-switch>
                  </md-subheader>
                  <md-list-item>
                   <div layout="row">
                      <div flex>
                            <country 
                                countries="$ctrl._countries" 
                                cheking-country="$ctrl._chekingCountry" 
                                checked-countries="$ctrl._checkedCountries" 
                                error-countries="$ctrl._errorCountries"
                                find-by-county="$ctrl.findByCounty(country, cities)" 
                                >
                            </country>
                       </div>
                      <div flex>
                        <best-cities cities="$ctrl.bestCity"></best-cities>
                      </div>
                    </div>
                  </md-list-item>
              </md-list>
            </md-card-title>
           </md-card>
        </div>
      </md-content>
    `,
    controller: MainController
}

exports.component = MainComponent;
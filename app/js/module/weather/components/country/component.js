class CountryController {
    constructor(){

    }

    $onInit(){

    }
}

const CountryComponent = {
    bindings: {
        countries: '<',
        chekingCountry: '<',
        checkedCountries: '<',
        errorCountries: '<',
        findByCounty: '&'
    },
    template: `
        <p ng-repeat="(country, cities) in $ctrl.countries">
            <span>Country - {{country}}  </span>
            <a ng-click="$ctrl.findByCounty({country: country, cities: cities})" ng-if="$ctrl.chekingCountry != country">
                <i class="fas fa-cloud-download-alt"></i>
            </a> 
            <i ng-if="$ctrl.checkedCountries.indexOf(country) !== -1"  class="fas fa-check-circle"></i>
            <i ng-if="$ctrl.errorCountries.indexOf(country) !== -1" class="fas fa-times-circle"></i>
            <md-progress-circular md-diameter="20px" ng-if="$ctrl.chekingCountry == country"/>
        </p>
    `,
    controller: CountryController
}

exports.component = CountryComponent;
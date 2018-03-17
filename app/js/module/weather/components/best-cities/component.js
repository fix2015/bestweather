class BestCitiesController {
    constructor(){

    }

    $onInit(){

    }
}

const BestCitiesComponent = {
    bindings: {
        cities: '<'
    },
    template: `
     <p ng-repeat="(ind, obj) in $ctrl.cities">
        Country - {{obj.country}}, city - {{obj.city}}
      </p>
    `,
    controller: BestCitiesController
}

exports.component = BestCitiesComponent;
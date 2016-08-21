angular.module('rounterRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider){
    
    $routeProvider
    
        .when('/', {
            templateUrl : 'views/pages/home.html',
            controller : 'homeController',
            controllerAs : 'homeVM'
        
        })
        .when('/about', {
            templateUrl : 'views/pages/about.html',
            controller : 'aboutController',
            controllerAs : 'aboutVM'
        
        })
        .when('/contact', {
            templateUrl : 'views/pages/contact.html',
            controller : 'contactController',
            controllerAs : 'contactVM'
        
        });
    
    $locationProvider.html5Mode(true);
});
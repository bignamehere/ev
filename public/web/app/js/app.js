angular.module('evApp', ['rounterRoutes'])

.controller('mainController', function(){

    // bind the view model
    var vm = this;
    
    vm.bigMessage = 'A Smooth sea never made a skilled sailor.';
      
})

.controller('homeController', function(){
    var vm = this;
    vm.message = 'Home Page';
})

.controller('aboutController', function(){
    var vm = this;
    vm.message = 'About Page';
})

.controller('contactController', function(){
    var vm = this;
    vm.message = 'Contact Page';
})
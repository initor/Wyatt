// Main .js of Wyatt.in

(function(){
  // Declare the module of Angular
  var app = angular.module('WyattIn', ['ngMaterial', 'infinite-scroll']);


  app.controller('PortraitsCtrlr', ['$http', function($http){

  }]);
  
  // Config theming
  app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryColor('pink')
    .accentColor('orange');
  });
})();

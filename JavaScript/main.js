// Main .js of Wyatt.in

(function(){
  // Declare the module of Angular
  var app = angular.module('WyattIn', ['ngMaterial', 'infinite-scroll']);

  app.controller('PortraitsCtrlr', ['$http', function($http){
    var ctrl = this;
    ctrl.loadItems = function(){
      for(int i = 0; i<50; i++){
        var item = {};
        item.index = i;
        item.content = 'YOYOYO, this is the ' + i + ' item!';
        items.push(item);
      }
    };
  }]);

  app.items = [];

  for(int i = 0; i<50; i++){
    var item = {};
    item.index = i;
    item.content = 'YOYOYO, this is the ' + i + ' item!';
    items.push(item);
  }

})();

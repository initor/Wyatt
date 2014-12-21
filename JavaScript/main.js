// Main .js of Wyatt.in

(function(){
  // Declare the module of Angular
  var app = angular.module('WyattIn', ['ngMaterial', 'infinite-scroll']);

  app.controller('PortraitsCtrlr', ['$http', function($http){
    this.pictures = pics;
    ctrl.loadItems = function(){
      for(var i = 0; i<50; i++){
        var item = {};
        item.index = i;
        item.content = 'YOYOYO, this is the ' + i + ' item!';
        this.pictures.push(item);
      }
    };
  }]);

  app.pics = [];

  for(var i = 0; i<50; i++){
    var item = {};
    item.index = i;
    item.content = 'YOYOYO, this is the ' + i + ' item!';
    pics.push(item);
  }

})();

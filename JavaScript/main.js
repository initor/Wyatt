// Main .js of Wyatt.in

(function(){
  // Declare the module of Angular
  var app = angular.module('WyattIn', ['ngMaterial', 'infinite-scroll']);

  app.controller('PortraitsCtrlr', ['$http', function($http){
    this.pictures = pics;
    var newDate = new Date();
    this.loadItems = function(){
      for(var i = 0; i<50; i++){
        var item = {};
        item.index = i;
        item.content = "LastSync: " + newDate.today() + " @ " + newDate.timeNow();
        this.pictures.push(item);
      }
    };
  }]);

  var pics = [];

  for(var i = 0; i<50; i++){
    var item = {};
    item.index = i;
    item.content = 'YOYOYO, this is the ' + i + ' item!';
    pics.push(item);
  }

})();

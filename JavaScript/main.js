// Main .js of Wyatt.in

(function(){
  // Declare the module of Angular
  var app = angular.module('WyattIn', ['ngMaterial', 'infinite-scroll']);

  app.controller('PortraitsCtrlr', ['$http', function($http){
    this.pictures = pics;
    car currentPics = this.pictures;
    this.loadItems = function(currentPics.length){
      for(var i = 0; i<50; i++){
        var item = {};
        item.index = ori + i;
        item.content = new Date();
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

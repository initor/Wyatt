// Main .js of Wyatt.in

(function(){
  // Declare the module of Angular
  var app = angular.module('WyattIn', ['ngMaterial', 'infinite-scroll']);

  app.controller('PortraitsCtrlr', ['$http', function($http){
    var ctl = this;
    ctl.pictures = pics;

    this.loadItems = function(){
      for(var i = 0; i<50; i++){
        var item = {};
        item.index = ctl.pictures.length + i;
        item.content = new Date();
        ctl.pictures.push(item);
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

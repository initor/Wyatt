// Main .js of Wyatt.in

(function(){
  // Declare the module of Angular
  var app = angular.module('WyattIn', ['ngMaterial', 'infinite-scroll']);

  app.controller('PortraitsCtrlr', ['$http', function($http){
    var ctl = this;

    this.loadItems = function(){
      var tempLoadPics = [];
      for(var i = 0; i<4; i++){
        var item = {};
        item.index = pics.length + 1;
        item.content = new Date();
        tempLoadPics.push(item);
      }

      while(tempLoadPics.length){
        pics.push(tempLoadPics.splice(0,2));
      }
    };
  }]);

  var pics = [];

  var initialLoadPics = [];
  for(var i = 0; i<10; i++){
    var item = {};
    item.index = i;
    item.content = new Date();
    initialLoadPics.push(item);
  }

  while(initialLoadPics.length){
    pics.push(initialLoadPics.splice(0,2));
  }

})();

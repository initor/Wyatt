// Main .js of Wyatt.in

(function(){
  // Declare the module of Angular
  var app = angular.module('WyattIn', ['ngMaterial', 'infinite-scroll']);

  app.controller('PortraitsCtrlr', ['$http', function($http){
    var ctl = this;
    ctl.pictures = pics;

    this.loadItems = function(){
      var tempLoadPics = [];
      for(var i = 0; i<16; i++){
        var item = {};
        item.index = indexOfPics;
        indexOfPics++;
        item.content = new Date();
        item.url = urlOfDemeImg;
        tempLoadPics.push(item);
      }

      while(tempLoadPics.length){
        ctl.pictures.push(tempLoadPics.splice(0,2));
      }
    };
  }]);

  var pics = [];
  var indexOfPics = 0;
  var urlOfDemeImg = 'http://farm3.staticflickr.com/2807/9317135155_0a078a007e_k.jpg';

  var initialLoadPics = [];
  for(var i = 0; i<10; i++){
    var item = {};
    item.index = indexOfPics;
    indexOfPics++;
    item.content = new Date();
    item.url = urlOfDemeImg;
    initialLoadPics.push(item);
  }

  while(initialLoadPics.length){
    pics.push(initialLoadPics.splice(0,2));
  }

})();

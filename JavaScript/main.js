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
  var urlOfDemeImg = 'http://images.apple.com/live/2014-sept-event/images/b920a3040b8d0d31f8b0d938e1566557c6deb479_xlarge.jpg';

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

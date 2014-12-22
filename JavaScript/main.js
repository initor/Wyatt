// Main .js of Wyatt.in

(function(){
  // Declare the module of Angular
  var app = angular.module('WyattIn', ['ngMaterial', 'infinite-scroll']);

  var pics = [];
  var indexOfPics = 0;
  var urlOfDemeImg = 'http://farm3.staticflickr.com/2807/9317135155_0a078a007e_k.jpg';
  var captions = '"He does math problems out loud in his sleep."<br>"She collects vintage teacups."';

  var initialLoadPics = [];

  $http.get('http://api.flickr.com/services/feeds/groups_pool.gne?id=998875@N22&lang=en-us&format=json&jsoncallback=?')
  .success(function(data, status, header, config){
    angular.foreach(data.items, function(item, key){
      var urlOfPic = (item.media.m).replace("_m.jpg", ".jpg");
      var i = {};
      item.index = indexOfPics;
      indexOfPics++;
      item.created = new Date();
      item.caption = captions;
      item.url = urlOfPic;

      initialLoadPics.push(item);
    });
  }).error(function(data, status, header, config){

  });

  while(initialLoadPics.length){
    pics.push(initialLoadPics.splice(0,2));
  }

  app.controller('PortraitsCtrlr', ['$http', function($http){
    var ctl = this;
    ctl.pictures = pics;

    this.loadItems = function(){
      var tempLoadPics = [];
      for(var i = 0; i<16; i++){
        var item = {};
        item.index = indexOfPics;
        indexOfPics++;
        item.created = new Date();
        item.caption = captions;
        item.url = urlOfDemeImg;
        tempLoadPics.push(item);
      }

      while(tempLoadPics.length){
        ctl.pictures.push(tempLoadPics.splice(0,2));
      }
    };
  }]); 
})();

// Main .js of Wyatt.in

(function(){
  // Declare the module of Angular
  var app = angular.module('WyattIn', ['ngMaterial', 'infinite-scroll']);
 
  var indexOfPics = 0;
  var urlOfDemeImg = 'http://farm3.staticflickr.com/2807/9317135155_0a078a007e_k.jpg';
  var captions = '"He does math problems out loud in his sleep."<br>"She collects vintage teacups."'; 

  app.controller('PortraitsCtrlr', ['$http', function($http){
    var ctl = this;
    ctl.pictures = [];  
    var initialLoadPics = [];

    $http.get('https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=eb6e83fd2b255ab9adfef687f4c18e63&user_id=30414895@N07&format=json&per_page=40')
    .success(function(data, status, header, config){
      angular.forEach(data.items, function(item, key){
        var urlOfPic = (item.media.m);
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
      ctl.pictures.push(initialLoadPics.splice(0,2));
    }

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

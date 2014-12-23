// Main .js of Wyatt.in

(function(){
  // Declare the module of Angular
  var app = angular.module('WyattIn', ['ngMaterial', 'infinite-scroll']);

  var indexOfPics = 0;
  var urlOfDemeImg = 'http://farm3.staticflickr.com/2807/9317135155_0a078a007e_k.jpg';
  var captions = '"He does math problems out loud in his sleep."<br>"She collects vintage teacups."';

  app.controller('PortraitsCtrlr', ['$http', '$parse', function($http, $parse){
    var ctl = this;
    ctl.pictures = [];
    var originalLoads = [];

    $http.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=595c6d500b09a6e37151e0d099eee03b&photoset_id=72157649472095227&extras=description%2C+date_upload%2C+date_taken%2C+owner_name%2C+icon_server%2C+original_format%2C+geo%2C+tags%2C+machine_tags%2C+media%2C+url_k%2C+url_o&format=json&nojsoncallback=1&auth_token=72157649479403870-f6f68d8485975c03&api_sig=cf620b094521e6fab8209a0c7b3c231d')
    .success(function(data, status, header, config){
      angular.forEach(data.photoset.photo, function(item, key){
        item.index = indexOfPics;
        indexOfPics++;
        item.caption = 'YoYoYo!';
        item.datetaken = new Date(item.datetaken);
        originalLoads.push(item);
      });

      for(var i = 0; i < 3; i++){
        ctl.pictures.push(originalLoads.splice(0,2));
      }
    }).error(function(data, status, header, config){
    });

    this.loadItems = function(){
      if(originalLoads.length >= 6){
        for(var i = 0; i < 3; i++){
          ctl.pictures.push(originalLoads.splice(0,2));
        }
      }else{
        while(originalLoads.length){
          ctl.pictures.push(originalLoads.splice(0,2));
        }
      }
    };
  }]);
})();

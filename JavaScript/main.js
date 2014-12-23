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

    $http.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=595c6d500b09a6e37151e0d099eee03b&photoset_id=72157649472095227&extras=date_upload%2C+date_taken%2C+owner_name%2C+icon_server%2C+original_format%2C+last_update%2C+geo%2C+tags%2C+machine_tags%2C+url_sq%2C+url_t%2C+url_s%2C+url_m%2C+url_o&format=json&nojsoncallback=1&auth_token=72157649479403870-f6f68d8485975c03&api_sig=6336a189b366d9d7541fd067a02ccbcd')
    .success(function(data, status, header, config){
      angular.forEach(data.photoset.photo, function(item, key){
        item.index = indexOfPics;
        indexOfPics++;
        item.caption = 'YoYoYo!';
        initialLoadPics.push(item);
      });

      while(initialLoadPics.length){
        ctl.pictures.push(initialLoadPics.splice(0,2));
      }
    }).error(function(data, status, header, config){
    });

    this.loadItems = function(){
      var tempLoadPics = [];
      for(var i = 0; i<16; i++){
      }

      while(tempLoadPics.length){
        ctl.pictures.push(tempLoadPics.splice(0,2));
      }
    };
  }]);
})();

// Main .js of Wyatt.in

(function(){
  // Declare the module of Angular
  var app = angular.module('WyattIn', ['ngMaterial', 'infinite-scroll']);

  var indexOfPics = 0;
  var urlOfDemeImg = 'http://farm3.staticflickr.com/2807/9317135155_0a078a007e_k.jpg';
  var captions = '"He does math problems out loud in his sleep."<br>"She collects vintage teacups."';

  app.controller('PortraitsCtrlr', ['$http', '$sce', function($http, $sce){
    var ctl = this;
    ctl.pictures = [];
    ctl.loadingLinear = true;
    var originalLoads = [];

    $http.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=16c28cba59fbe3b8685bc2316a38a1a0&photoset_id=72157649472095227+&extras=description%2C+date_taken%2C+url_k%2C+url_o&format=json&nojsoncallback=1')
    .success(function(data, status, header, config){
      angular.forEach(data.photoset.photo, function(item, key){
        item.index = indexOfPics;
        indexOfPics++;
        item.datetaken = new Date(item.datetaken.split(" ")[0]);
        item.description._content = $sce.trustAsHtml(item.description._content);
        originalLoads.push(item);
      });
 
      ctl.loadingLinear = false;

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

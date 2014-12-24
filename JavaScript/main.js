(function(){
  // Declare the module of Angular
  var app = angular.module('WyattIn', ['ngMaterial', 'infinite-scroll']);

  var indexOfPics = 0;
  var urlOfDemeImg = 'http://farm3.staticflickr.com/2807/9317135155_0a078a007e_k.jpg';
  var captions = '"He does math problems out loud in his sleep."<br>"She collects vintage teacups."';

  app.controller('PortraitsCtrlr', ['$http', '$sce', function($http, $sce){
    var ctl = this;

    // Initialize loadingLinear show boolean
    ctl.loadingLinear = true;

    ctl.pictures = [];
    ctl.originalLoads = [];

    $http.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=16c28cba59fbe3b8685bc2316a38a1a0&photoset_id=72157649472095227+&extras=description%2C+date_taken%2C+url_k%2C+url_o&format=json&nojsoncallback=1')
    .success(function(data, status, header, config){
      angular.forEach(data.photoset.photo, function(item, key){
        item.index = indexOfPics;
        indexOfPics++;
        item.datetaken = new Date(item.datetaken.split(" ")[0]);
        item.description._content = $sce.trustAsHtml(item.description._content);
        ctl.originalLoads.push(item);
      });

      ctl.originalLoads.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.datetaken) - new Date(a.datetaken);
      });
      ctl.loadingLinear = false;

      for(var i = 0; i < 3; i++){
        ctl.pictures.push(ctl.originalLoads.splice(0,2));
      }
    }).error(function(data, status, header, config){
    });

    this.loadItems = function(){

      // Show loading linear
      ctl.loadingLinear = true;

      if(ctl.originalLoads.length >= 6){
        for(var i = 0; i < 3; i++){
          ctl.pictures.push(ctl.originalLoads.splice(0,2));
        }
      }else{
        while(ctl.originalLoads.length){
          ctl.pictures.push(ctl.originalLoads.splice(0,2));
        }
      }

      // Hide loading linear
      ctl.loadingLinear = false;
    };
  }]);
})();

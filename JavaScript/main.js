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

    function generateGeoApiUrl(pId, wId){
      return 'https://api.flickr.com/services/rest/?method=flickr.places.getInfo&api_key=eb6e83fd2b255ab9adfef687f4c18e63&place_id=' + pId + '&woe_id=' + wId + '&format=json&nojsoncallback=1';
    }

    function getGeoInfo(pId, wId){
    }

    $http.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=eb6e83fd2b255ab9adfef687f4c18e63&photoset_id=72157649472095227&extras=url_o%2C+url_k%2C+url_h%2C+geo%2C+description%2C+date_taken&format=json&nojsoncallback=1&auth_token=72157649912589211-177ed8b1e0fa4ebd&api_sig=a6a0ec4b1586a50b7a0cac502b5287e7')
    .success(function(data, status, header, config){
      angular.forEach(data.photoset.photo, function(item, key){
        item.index = indexOfPics;
        indexOfPics++;
        item.datetaken = new Date(item.datetaken.split(" ")[0]);
        item.description._content = $sce.trustAsHtml(item.description._content);

        var url_dpl = '';
        if(item.url_k){
          url_dpl = item.url_k;
        }else if(item.url_h){
          url_dpl = item.url_h;
        }else{
          url_dpl = item.url_o;
        }

        item.url_dpl = url_dpl;
        // if(item.place_id && item.woeid){
        //   item.geoInfo = getGeoInfo(item.place_id, item.woeid);
        // }
        //
        // // Get Geo Info
        // var geoApiUrl = generateGeoApiUrl(pId, wId);
        // $http.get(geoApiUrl).success(function(data, status, header, config){
        //   return data.place.locality._content;
        // }).error(function(data, status, header, config){
        //   return status;
        // });

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

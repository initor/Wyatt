(function(){
  // Declare the module of Angular
  var app = angular.module('WyattIn', ['ngMaterial', 'infinite-scroll']);

  // Display images only when fully loaded
  app.directive('waitforload', function() {
      return {
          restrict: 'A',
          link: function(scope, element, attrs) {
              element.bind('load', function() {
                  scope.$apply(attrs.show);
              });
          }
      };
  });

  app.controller('PortraitsCtrlr', ['$http', '$sce', '$filter', function($http, $sce, $filter){
    var ctl = this;

    // Initialize loadingLinear show boolean
    ctl.loadingLinear = true;
    ctl.pictures = [];
    ctl.originalLoads = [];
    ctl.readonly = true;

    $http.get('https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=eb6e83fd2b255ab9adfef687f4c18e63&photoset_id=72157649472095227&extras=url_c%2C+camera%2C+url_k%2C+url_z%2C+url_h%2C+geo%2C+description%2C+date_taken&format=json&nojsoncallback=1')
    .success(function(data, status, header, config){
      angular.forEach(data.photoset.photo, function(item, key){

        var dateMeta = new Date(item.datetaken.split(" ")[0]);
        item.loaded = false;
        item.meta = [];
        item.meta.push($filter('date')(dateMeta, 'EEEE, MMMM d, y'));

        // Handle picture resolution differences
        var url_dpl = '';
        if(item.url_k){
          url_dpl = item.url_k;
        }else if(item.url_h){
          url_dpl = item.url_h;
        }else if(item.url_c){
          url_dpl = item.url_c;
        }else{
          url_dpl = item.url_z;
        }
        item.url_dpl = url_dpl;

        // Handle camera meta data
        item.dslr = false;
        item.ios = false;

        if(item.camera){
          if(item.camera.indexOf('Canon') > -1){
            item.dslr = true;
          }
          if(item.camera.indexOf('Apple') > -1){
            item.ios = true;
          }
        }

        item.loaded = false;
        ctl.originalLoads.push(item);
      });

      setMetaInfo(ctl.originalLoads);

      ctl.originalLoads.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.datetaken) - new Date(a.datetaken);
      });

      ctl.loadingLinear = false;

    }).error(function(data, status, header, config){
    });


    ctl.show = function(pic){

      pic.loaded = true;
    }

    // Concatenate Geo Ajax Url
    function generateGeoApiUrl(pId, wId){
      return 'https://api.flickr.com/services/rest/?method=flickr.places.getInfo&api_key=eb6e83fd2b255ab9adfef687f4c18e63&place_id=' + pId + '&woe_id=' + wId + '&format=json&nojsoncallback=1';
    }

    // Concatenate Exif Ajax Url
    function generateExifApiUlr(pId, scrt){
      return 'https://api.flickr.com/services/rest/?method=flickr.photos.getExif&api_key=eb6e83fd2b255ab9adfef687f4c18e63&photo_id=' + pId + '&secret=' + scrt + '&format=json&nojsoncallback=1';
    }

    // Get Geo Info
    function getGeoInfo(pId, wId, item){
      var geoApiUrl = generateGeoApiUrl(pId, wId);
      $http.get(geoApiUrl).success(function(data, status, header, config){

        item.geoInfo = {};

        if(!angular.isUndefined(data.place.locality) && data.place.locality !== null){
          item.geoInfo = data.place.locality._content;
        }

        if(item.geoInfo.length>0){
          item.meta.push(item.geoInfo);
        }
        item.geoInfo.finishFetching = true;

      }).error(function(data, status, header, config){
        return status;
      });
    }

    // Get Exif Info
    function getExifInfo(pId, scrt, item){
      var exifApiUrl = generateExifApiUlr(pId, scrt);
      $http.get(exifApiUrl).success(function(data, status, header, config){
        item.exifInfo = {};

        var make = '';
        var model = '';
        var lensModel = '';

        angular.forEach(data.photo.exif, function(item, key){
          if( item.tag === 'Make' ){
            make = item.raw._content;
          }
          if( item.tag === 'Model' ){
            model = item.raw._content;
          }
          if( item.tag === 'LensModel' ){
            lensModel = item.raw._content;
          }
        });

        if(model.indexOf(make) === -1){
          item.exifInfo.Model = make + ' ' + model;
        }else{
          item.exifInfo.Model = model;
        }

        item.exifInfo.LensModel = lensModel;

        if(item.exifInfo.LensModel.length>0){
          item.meta.push(item.exifInfo.LensModel);
        }

        item.exifInfo.finishFetching = true;

      }).error(function(data, status, header, config){
        return status;
      });
    }

    // Set meta info of each pic
    function setMetaInfo(arrayOfPics){
      angular.forEach(arrayOfPics, function(item, key){
        if(item.place_id && item.woeid){
          getGeoInfo(item.place_id, item.woeid, item);
        }
        getExifInfo(item.id, item.secret, item);
      });
    }

  }]);
})();

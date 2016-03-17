

var Artist = angular.module('myApp');


Artist.controller('artistCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http){


  $rootScope.mainArtist = [];

  $rootScope.thisArtist = function(thisartist, thisnumber){
      $rootScope.mainArtist = $rootScope.Artist[thisnumber];
      console.log($rootScope.mainArtist.uid);
  }


});





Artist.directive('artistDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'artist/artist.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});

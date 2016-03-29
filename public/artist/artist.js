

var Artist = angular.module('myApp');


Artist.controller('artistCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http){


  $rootScope.mainArtist = [];

  $rootScope.thisArtist = function(thisArtist, thisNumber){

    for (a in $rootScope.Artist){
      if($rootScope.Artist[a].uid==thisArtist){
        $rootScope.mainArtist = $rootScope.Artist[a];
        console.log($rootScope.mainArtist.uid);
      }
    }




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

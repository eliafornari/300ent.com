

var Artist = angular.module('myApp');


Artist.controller('artistCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http, anchorSmoothScroll, $window){


  $rootScope.mainArtist = "";

  $rootScope.thisArtist = function(thisArtist, thisNumber){
    $rootScope.mainArtist = thisArtist;
  }


var scroll,windowheight;

windowheight = window.innerHeight;

setTimeout(function(){


$scope.artistPositions=[];

  for (i in $rootScope.Artist){
    var artistPosition =  jQuery('#artist-content-'+$rootScope.Artist[i].uid).offset().top;
    artistPosition = windowheight*i;
    var object = {
                    "name": $rootScope.Artist[i].uid,
                    "offset":artistPosition
                  }

    $scope.artistPositions = $scope.artistPositions.concat(object);

  }




    jQuery('.artist').bind("scroll.artist", function(event) {

        scroll =  jQuery('.artist').scrollTop();

        for (i in $scope.artistPositions){

          if((scroll > ($scope.artistPositions[i].offset - 1)) && (scroll < ($scope.artistPositions[i].offset + windowheight -1 ))){
            $rootScope.mainArtist = $scope.artistPositions[i].name;
          }else{

          }


       }//for loop


        $scope.$apply();

    });//scroll bind



}, 2500);









//..................................................changing anchor link on click
$rootScope.gotoAnchorArtist = function(x) {
  anchorSmoothScroll.scrollTo(x);
};











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

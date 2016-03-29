
angular.module('myApp')


.controller('navCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http){

$rootScope.isNavOpen = false;

  $scope.openNav = function(){
    $rootScope.isNavOpen = !$rootScope.isNavOpen;
  }

  $scope.closeNav = function(){
    $rootScope.isNavOpen = false;
  }




  $rootScope.navOpenArtist=function(){
    $rootScope.openArtists($rootScope.Artist[0].uid,0);
  }

  $rootScope.navOpenRelease=function(){
    $rootScope.openRelease($rootScope.Release[0].uid,0);
  }

  $rootScope.navOpenJournal=function(){
    $rootScope.openJournal($rootScope.Journal[0].uid,0);
  }



})


.directive('logoDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'components/logo.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('exDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'components/ex.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})


.directive('navDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'components/nav.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});

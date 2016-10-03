
angular.module('myApp')


.controller('navCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http){

$rootScope.isNavOpen = false;

  $scope.openNav = function(){
    $rootScope.isNavOpen = !$rootScope.isNavOpen;
    if($rootScope.firstLoading==true){
      $rootScope.scrollToHome();
    }
    $rootScope.removeSplashMobile = true;

  }


  if($rootScope.isMobile){
    $rootScope.isNavOpen = false;
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








  $rootScope.navOpenArtist_m = function(){
    $rootScope.hideHomeArtist=false;
    $rootScope.hideHomeRelease=true;
    $rootScope.hideHomeJournal=true;

    $rootScope.closeAllSections();

  }
  $rootScope.navOpenRelease_m=function(){
    $rootScope.hideHomeArtist=true;
    $rootScope.hideHomeRelease=false;
    $rootScope.hideHomeJournal=true;

    $rootScope.closeAllSections();


  }

  $rootScope.navOpenJournal_m=function(){
    $rootScope.hideHomeArtist=true;
    $rootScope.hideHomeRelease=true;
    $rootScope.hideHomeJournal=false;

    $rootScope.closeAllSections();


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

.directive('arrowDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'components/icons/arrow.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})


.directive('mailDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'components/icons/mail.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('flagDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'components/icons/flag.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('navMobileDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'components/nav-mobile.html',
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


angular.module('myApp')


.controller('navCtrl', ['$scope', '$location', '$rootScope', '$routeParams', '$timeout', '$http', function($scope, $location, $rootScope, $routeParams, $timeout,	$http){

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



$rootScope.isSearch = function(field){
  var search = $location.search();
  if(search['filter']){return true}else{return false};
}


  $rootScope.navOpenArtist=function(){
    // $rootScope.openArtists();
    // $rootScope.scrollToHome();
    // $rootScope.firstLoading=false;
    $location.path('/artist', true);
  }

  $rootScope.navOpenRelease=function(){
    $rootScope.openRelease($rootScope.Release[0].uid,0);
  }

  $rootScope.navOpenJournal=function(){

  }



  $rootScope.navOpen=(path)=>{
    $location.path('/'+path, true);

    //
    // if(path=='journal'){
    //   $rootScope.openJournal($rootScope.Journal[0].uid,0);
    // }else if(path=='release'){
    //   $rootScope.openRelease($rootScope.Release[0].uid,0);
    // }else if(path=='artist'){
    //   $location.path('/artist', true);
    // }else if(path=='contact'){
    //   $location.path('/artist', true);
    // }else if(path=='about'){
    //
    // }
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









}])


.directive('logoDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/components/logo.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('exDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/components/ex.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('arrowDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/components/icons/arrow.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})


.directive('mailDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/components/icons/mail.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('flagDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/components/icons/flag.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('navMobileDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/components/nav-mobile.html',
    replace: true
  };
})

.directive('navDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/components/nav.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});

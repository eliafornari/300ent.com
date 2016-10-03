/*
  Configure routes used with ngRoute. We chose not to use $locationProvider.html5Mode(true);
  because using HTML5 pushstate requires that server routes are setup to mirror the routes
  in this file. Since this isn't a node course we're going to skip it. For all intensive
  purposes, html5 mode and url hash mode perform the same when within an angular app.
*/
angular.module('myApp.routes', ['ngRoute', 'ngAnimate', 'ngResource'])

.run(['$anchorScroll', '$route', '$rootScope', '$location', '$routeParams','$templateCache', function($anchorScroll, $route, $rootScope, $location, $routeParams, $templateCache) {



  $rootScope.showTime=false;
  $rootScope.time="";
  var date = new Date();
  var n = date.toTimeString();
  $rootScope.time = n;





//a change of path should not reload the page


    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        else if (reload === true){

          var currentPageTemplate = $route.current.templateUrl;
            $templateCache.remove(currentPageTemplate);

        var un = $rootScope.$on('$locationChangeSuccess', function () {
              $route.current = '/'+$routeParams.category+'/'+$routeParams.event;
              un();
              $route.reload();
          });
        }
        return original.apply($location, [path]);
    };


}])



  .filter('trustUrl', function ($sce) {
      return function(url) {
        if (url){
          return $sce.trustAsResourceUrl(url);
        }
      };
    })

.config(['$routeProvider', '$locationProvider' , function($routeProvider, $locationProvider) {



  // use the HTML5 History API
  $locationProvider.html5Mode(true);

  $routeProvider


  // $locationChangeStart
  // .when('/journal', {
  //   templateUrl: 'home/home.html',
  //   controller: 'journalCtrl',
  //   resolve: {
  //       resolveObject: function($route){
  //        //**here you cannot use $routeParam to get "yourRouteParam"** property
  //       // you must use : $route.current.params
  //       }
  //   }
  // })

    .when('/journal', {
      templateUrl: 'home/home.html',
      controller: 'journalCtrl'
    })

    .when('/release', {
      templateUrl: 'home/home.html',
      controller: 'releaseCtrl'
      })

    .when('/artist', {
      templateUrl: 'home/home.html',
      controller: 'artistCtrl'
      })

    .when('/contact', {
      templateUrl: 'home/home.html',
      controller: 'contactCtrl'
      })

    .when('/about', {
      templateUrl: 'home/home.html',
      controller: 'aboutCtrl'
      })

    .when('/privacy', {
      templateUrl: 'privacy/privacy.html',
      controller: 'privacyCtrl'
    })



    /*............................. Take-all routing ........................*/


    .when('/', {
      // redirectTo: 'matthew30matthew30matthew'
      templateUrl: 'home/home.html',
      controller: 'homeCtrl',
      reloadOnSearch: true,
      // resolve: {
      //        function($q, $timeout) {
      //           var deferred = $q.defer();
      //           $timeout(function(){
      //               return deferred.resolve();
      //           }, 200);
      //           return deferred.promise;
      //       }
      //   }

    })


    // put your least specific route at the bottom
    .otherwise({redirectTo: '/'})






}])

.controller('routeController', function($scope, $location, $rootScope, $routeParams, $timeout, $interval, $window){

  $rootScope.location = $location.path();

$rootScope.firstLoading = true;
$rootScope.isChrome = false;




//.........TIME

  $rootScope.showTime=true;

$interval(function(){
  var date = new Date();
  var n = date.toTimeString();
  $rootScope.time = n;
}, 1000, 30000);
// $rootScope.time = new Date(year, month, day, hours, minutes, seconds, milliseconds);





jQuery($window).resize(function(){
  $rootScope.windowHeight = $window.innerHeight;
  $rootScope.splashScroll = $rootScope.windowHeight;
  // windowHeight = angular.element($window).height(); // Window Height
  $rootScope.checkSize();
  $scope.landscapeFunction();

    $scope.$apply();
});












//..............................................................................mobile
//....this is the function that checks the header of the browser and sees what device it is
var test = navigator.userAgent.match('GSA');

if (test == 'GSA'){
  $rootScope.isChrome = true;
}


$rootScope.isMobile, $rootScope.isDevice, $rootScope.isMobileDevice;
$rootScope.checkSize = function(){


    $rootScope.checkDevice = {
          Android: function() {
              return navigator.userAgent.match(/Android/i);
          },
          BlackBerry: function() {
              return navigator.userAgent.match(/BlackBerry/i);
          },
          iOS: function() {
              return navigator.userAgent.match(/iPhone|iPad|iPod/i);
          },
          Opera: function() {
              return navigator.userAgent.match(/Opera Mini/i);
          },
          Windows: function() {
              return navigator.userAgent.match(/IEMobile/i);
          },
          any: function() {
              return ($rootScope.checkDevice.Android() || $rootScope.checkDevice.BlackBerry() || $rootScope.checkDevice.iOS() || $rootScope.checkDevice.Opera() || $rootScope.checkDevice.Windows());
          },
          chromeMobile: function(){
            return navigator.userAgent.match('CriOS');
          }
      };

    //........checks the width

      $scope.mobileQuery=window.matchMedia( "(max-width: 767px)" );
      $rootScope.isMobile=$scope.mobileQuery.matches;


    //.........returning true if device

      if ($scope.checkDevice.any()){
        $rootScope.isDevice= true;

      }else{
          $rootScope.isDevice=false;
      }

      if (($rootScope.isDevice==true)&&($scope.isMobile==true)){
        $rootScope.isMobileDevice= true;
      }else{
          $rootScope.isMobileDevice=false;
      }




        if ($rootScope.isDevice){

            $rootScope.mobileLocation = function(url){
              $location.path(url).search();
            }

            $rootScope.mobileExternalLocation = function(url){
              $window.open(url, '_blank');
            }


        } else if (!$rootScope.isDevice){


            $rootScope.mobileLocation = function(url){
              return false;
            }

            $rootScope.mobileExternalLocation = function(url){
              return false;
            }
        }






  }//checkSize


$rootScope.checkSize();




 $rootScope.landscapeView = false;
 $rootScope.pageLoading = false;


 //function removing website if landscape

  $scope.landscapeFunction = function(){

    if ($rootScope.isMobile==true){
        if(window.innerHeight < window.innerWidth){
          $rootScope.landscapeView = true;
          $rootScope.pageLoading = true;
          jQuery(".landscape-view-wrapper").css({
            "width":"100vw",
            "height": "100vh",
            "display": "block"
        });

        }else{
          $rootScope.landscapeView = false;
          $rootScope.pageLoading = false;

        }
    }

  }

$scope.landscapeFunction();




})//......end of the route controller


.directive('closeRightDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'components/close-right.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})
.directive('closeLeftDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'components/close-left.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('pageLoadingSpinner', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'A',
    // templateUrl: 'components/loader.html',
    replace: true,
    link: function(scope, elem, attrs) {

      //
      // $rootScope.$on('$routeChangeStart', function() {
      //
      //     $rootScope.pageLoading = true;
      //     scope.logoHide = true;
      //
      // });
      //
      //
      // $rootScope.$on('$routeChangeSuccess', function() {
      //
      //   // $timeout(function () {
      //     scope.logoHide = false;
      //     $rootScope.pageLoading = false;
      //   // }, 1000);
      //
      //
      // });

    }
  };
});

'use strict'

import 'angular'
import 'angular-route'
import 'angular-animate'
import 'angular-resource'
import 'angular-touch'
import 'angular-loader'
import Prismic from 'prismic.io'
import jQuery from "jquery"

angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'ngAnimate',
  'ngTouch',
  'infinite-scroll'
])


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




  .filter('trustUrl', ['$sce', function ($sce) {
      return function(url) {
        if (url){
          return $sce.trustAsResourceUrl(url);
        }
      };
    }])


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

        .when('/press/:press', {
          templateUrl: 'views/press/detail-press.html',
          controller: 'pressDetailCtrl',
          reloadOnSearch: true
        })

        .when('/press', {
          templateUrl: 'views/press/press.html',
          controller: 'pressCtrl',
          reloadOnSearch: true
        })

        .when('/journal/:journal', {
          templateUrl: 'views/home.html',
          controller: 'journalCtrl'
        })

        .when('/journal', {
          templateUrl: 'views/home.html',
          controller: 'journalCtrl'
        })

        .when('/release/:release', {
          templateUrl: 'views/home.html',
          controller: 'releaseCtrl'
        })


        .when('/release', {
          templateUrl: 'views/home.html',
          controller: 'releaseCtrl'
          })

        .when('/artist/:artist', {
          templateUrl: 'views/home.html',
          controller: 'artistCtrl'
        })

        .when('/artist', {
          templateUrl: 'views/home.html',
          controller: 'artistCtrl'
          })

        .when('/contact', {
          templateUrl: 'views/home.html',
          controller: 'contactCtrl'
          })

        .when('/about', {
          templateUrl: 'views/home.html',
          controller: 'aboutCtrl'
          })

        // .when('/privacy', {
        //   templateUrl: 'privacy/privacy.html',
        //   controller: 'privacyCtrl'
        // })



        /*............................. Take-all routing ........................*/


        .when('/', {
          // redirectTo: 'matthew30matthew30matthew'
          templateUrl: 'views/home.html',
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


.controller('appCtrl', ['$scope', '$location', '$rootScope', '$routeParams', '$timeout', '$interval', '$window', 'anchorSmoothScroll', function($scope, $location, $rootScope, $routeParams, $timeout, $interval, $window, anchorSmoothScroll){


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





$rootScope.removeSplashMobile = false;

$rootScope.scrollToHome = function(){
  anchorSmoothScroll.scrollOneViewport();
  setTimeout(function(){
    $rootScope.removeSplashMobile = true;
  }, 1000)
  // $rootScope.firstLoading=false;
}






//..........................................................GET

$rootScope.Artist =[];
$rootScope.Release ={results:[]};
$rootScope.Journal ={results:[]};

$rootScope.getContentType = function(type, orderField){

      Prismic.Api('https://threehundred.cdn.prismic.io/api', function (err, Api) {
          Api.form('everything')
              .ref(Api.master())

              .query(Prismic.Predicates.at("document.type", type))
              .orderings('['+orderField+']')
              .pageSize(100)
              .submit(function (err, response) {


                  if (type =='artist'){
                    $rootScope.Artist = response.results;
                    $scope.$broadcast('artistReady');
                  }else if(type=='release'){
                    $rootScope.Release = response.results;
                    $scope.$broadcast('releaseReady');
                  }else if(type =='journal'){
                    $rootScope.Journal = response.results;
                    $scope.$broadcast('journalReady');
                  }

                  // The documents object contains a Response object with all documents of type "product".
                  var page = response.page; // The current page number, the first one being 1
                  var results = response.results; // An array containing the results of the current page;
                  // you may need to retrieve more pages to get all results
                  var prev_page = response.prev_page; // the URL of the previous page (may be null)
                  var next_page = response.next_page; // the URL of the next page (may be null)
                  var results_per_page = response.results_per_page; // max number of results per page
                  var results_size = response.results_size; // the size of the current page
                  var total_pages = response.total_pages; // the number of pages
                  var total_results_size = response.total_results_size; // the total size of results across all pages
                    return results;
              });
        });


};



$rootScope.getContentType('artist', 'my.artist.index');





$rootScope.getPaginatedList = function(type, orderField, page){

  $rootScope.paginationInProcess=true;

      Prismic.Api('https://threehundred.cdn.prismic.io/api', function (err, Api) {
          Api.form('everything')
              .ref(Api.master())
              .query(Prismic.Predicates.at("document.type", type))
              .orderings('['+orderField+']')
              .pageSize(10)
              .page(page)
              .submit(function (err, response) {

                if (type =='release'){

                  if(!$rootScope.Release){
                    $rootScope.Release=response;
                    $scope.$broadcast('releaseReady');
                  }else{
                    $rootScope.Release.results=$rootScope.Release.results.concat(response.results);
                  }

                  $rootScope.Release.page = response.page;
                  $rootScope.Release.next_page = response.next_page;
                  $rootScope.Release.prev_page = response.prev_page;
                  $rootScope.Release.total_pages = response.total_pages;
                  $rootScope.Release.page = response.page;



                }else if(type=='journal'){
                  if(!$rootScope.Journal){
                    $rootScope.Journal=response;
                    $scope.$broadcast('journalReady');
                  }else{
                    $rootScope.Journal.results=$rootScope.Journal.results.concat(response.results);
                  }

                  $rootScope.Journal.page = response.page;
                  $rootScope.Journal.next_page = response.next_page;
                  $rootScope.Journal.prev_page = response.prev_page;
                  $rootScope.Journal.total_pages = response.total_pages;
                  $rootScope.Journal.page = response.page;

                }

                $rootScope.paginationInProcess=false;


              });
        });


};







if(!$rootScope.Release.results.length){
  $rootScope.getPaginatedList('release', 'my.release.date desc', 1);
}else{
}

if(!$rootScope.Journal.results.length){
  $rootScope.getPaginatedList('journal', 'my.journal.date desc', 1);
}





$scope.scrollerFN=()=>{

    setTimeout(function(){

      var home_release_element = angular.element(document.querySelector( '.home-release' ))
      home_release_element.bind("scroll.release", function() {
          var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
          // var body = document.body, html = document.documentElement;
          var docHeight = Math.max(home_release_element[0].scrollTop, home_release_element[0].scrollHeight);
          // var docHeight = element[0].scrollTop;
          var windowBottom = windowHeight + home_release_element[0].scrollTop;

          if ((windowBottom >= docHeight) &&($rootScope.paginationInProcess==false)) {
              // alert('bottom reached');
              if(($rootScope.Release.page +1)<$rootScope.Release.total_pages){
                var next = $rootScope.Release.page +1;
                $rootScope.getPaginatedList('release', 'my.release.date', next);
              }

          }
      });







      var journal_element = angular.element(document.querySelector( '.home-journal' ))
      journal_element.bind("scroll.journal", function() {
          var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
          // var body = document.body, html = document.documentElement;
          var docHeight = Math.max(journal_element[0].scrollTop, journal_element[0].scrollHeight);
          // var docHeight = element[0].scrollTop;
          var windowBottom = windowHeight + journal_element[0].scrollTop;

          if ((windowBottom >= docHeight) &&($rootScope.paginationInProcess==false)) {
              if(($rootScope.Journal.page +1)<$rootScope.Journal.total_pages){
                var next = $rootScope.Journal.page +1;
                $rootScope.getPaginatedList('journal', 'my.journal.date', next);
              }

          }
      });





      var release_element = angular.element(document.querySelector( '.release' ))
      release_element.bind("scroll.releasedetail", function() {
          var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
          // var body = document.body, html = document.documentElement;
          var docHeight = Math.max(release_element[0].scrollTop, release_element[0].scrollHeight);
          // var docHeight = element[0].scrollTop;
          var windowBottom = windowHeight + release_element[0].scrollTop;

          if ((windowBottom >= docHeight) &&($rootScope.paginationInProcess==false)) {
              // alert('bottom reached');
              if(($rootScope.Release.page +1)<$rootScope.Release.total_pages){
                var next = $rootScope.Release.page +1;
                $rootScope.getPaginatedList('release', 'my.release.date', next);
              }

          }
      });

    }, 1000);


}




$rootScope.$on("$routeChangeSuccess", function(){
  $scope.scrollerFN();
})

  $scope.scrollerFN();




















  $rootScope.getArtistType = function(id){

        Prismic.Api('https://threehundred.cdn.prismic.io/api', function (err, Api) {
            Api.form('everything')
                .ref(Api.master())
                .query(Prismic.Predicates.at("document.id", id))
                .submit(function (err, response) {


                });
          });


  };

$rootScope.getArtistType("VvppaiMAACUAQUu1");





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







}])//......end of the route controller

.directive('closeRightDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/components/close-right.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})
.directive('closeLeftDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/components/close-left.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('pageLoadingSpinner', function() {
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


var jquerymousewheel = require('./vendor/jquery.mousewheel.js')($);
var jqueryUI = require('./vendor/jquery-ui.min.js');

var about = require("./about.js");
var artist = require("./artist.js");
var contact = require("./contact.js");
var home = require("./home.js");
var journal = require("./journal.js");
var press = require("./press.js");
var nav = require("./nav.js");
var release = require("./release.js");
var services = require("./services.js");
var infiniteScroll = require("./vendor/infiniteScroll.js");

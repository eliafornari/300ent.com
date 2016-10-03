(function(){var requirejs,require,define,__inflate;(function(e){function a(e,t){var n=t&&t.split("/"),i=r.map,s=i&&i["*"]||{},o,u,a,f,l,c,h;if(e&&e.charAt(0)==="."&&t){n=n.slice(0,n.length-1),e=n.concat(e.split("/"));for(l=0;h=e[l];l++)if(h===".")e.splice(l,1),l-=1;else if(h===".."){if(l===1&&(e[2]===".."||e[0]===".."))return!0;l>0&&(e.splice(l-1,2),l-=2)}e=e.join("/")}if((n||s)&&i){o=e.split("/");for(l=o.length;l>0;l-=1){u=o.slice(0,l).join("/");if(n)for(c=n.length;c>0;c-=1){a=i[n.slice(0,c).join("/")];if(a){a=a[u];if(a){f=a;break}}}f=f||s[u];if(f){o.splice(0,l,f),e=o.join("/");break}}}return e}function f(t,n){return function(){return u.apply(e,s.call(arguments,0).concat([t,n]))}}function l(e){return function(t){return a(t,e)}}function c(e){return function(n){t[e]=n}}function h(r){if(n.hasOwnProperty(r)){var s=n[r];delete n[r],i[r]=!0,o.apply(e,s)}if(!t.hasOwnProperty(r))throw new Error("No "+r);return t[r]}function p(e,t){var n,r,i=e.indexOf("!");return i!==-1?(n=a(e.slice(0,i),t),e=e.slice(i+1),r=h(n),r&&r.normalize?e=r.normalize(e,l(t)):e=a(e,t)):e=a(e,t),{f:n?n+"!"+e:e,n:e,p:r}}function d(e){return function(){return r&&r.config&&r.config[e]||{}}}var t={},n={},r={},i={},s=[].slice,o,u;o=function(r,s,o,u){var a=[],l,v,m,g,y,b;u=u||r,typeof o=="string"&&(o=__inflate(r,o));if(typeof o=="function"){s=!s.length&&o.length?["require","exports","module"]:s;for(b=0;b<s.length;b++){y=p(s[b],u),m=y.f;if(m==="require")a[b]=f(r);else if(m==="exports")a[b]=t[r]={},l=!0;else if(m==="module")v=a[b]={id:r,uri:"",exports:t[r],config:d(r)};else if(t.hasOwnProperty(m)||n.hasOwnProperty(m))a[b]=h(m);else if(y.p)y.p.load(y.n,f(u,!0),c(m),{}),a[b]=t[m];else if(!i[m])throw new Error(r+" missing "+m)}g=o.apply(t[r],a);if(r)if(v&&v.exports!==e&&v.exports!==t[r])t[r]=v.exports;else if(g!==e||!l)t[r]=g}else r&&(t[r]=o)},requirejs=require=u=function(t,n,i,s){return typeof t=="string"?h(p(t,n).f):(t.splice||(r=t,n.splice?(t=n,n=i,i=null):t=e),n=n||function(){},s?o(e,t,n,i):setTimeout(function(){o(e,t,n,i)},15),u)},u.config=function(e){return r=e,u},define=function(e,t,r){t.splice||(r=t,t=[]),n[e]=[e,t,r]},define.amd={jQuery:!0}})(),__inflate=function(name,src){var r;return eval(["r = function(a,b,c){","\n};\n//@ sourceURL="+name+"\n"].join(src)),r},define("lib/api/events",["require","exports","module"],function(e,t,n){t.api={LOAD_PROGRESS:"loadProgress",PLAY_PROGRESS:"playProgress",PLAY:"play",PAUSE:"pause",FINISH:"finish",SEEK:"seek",READY:"ready",OPEN_SHARE_PANEL:"sharePanelOpened",CLICK_DOWNLOAD:"downloadClicked",CLICK_BUY:"buyClicked",ERROR:"error"},t.bridge={REMOVE_LISTENER:"removeEventListener",ADD_LISTENER:"addEventListener"}}),define("lib/api/getters",["require","exports","module"],function(e,t,n){n.exports={GET_VOLUME:"getVolume",GET_DURATION:"getDuration",GET_POSITION:"getPosition",GET_SOUNDS:"getSounds",GET_CURRENT_SOUND:"getCurrentSound",GET_CURRENT_SOUND_INDEX:"getCurrentSoundIndex",IS_PAUSED:"isPaused"}}),define("lib/api/setters",["require","exports","module"],function(e,t,n){n.exports={PLAY:"play",PAUSE:"pause",TOGGLE:"toggle",SEEK_TO:"seekTo",SET_VOLUME:"setVolume",NEXT:"next",PREV:"prev",SKIP:"skip"}}),define("lib/api/api",["require","exports","module","lib/api/events","lib/api/getters","lib/api/setters"],function(e,t,n){function m(e){return!!(e===""||e&&e.charCodeAt&&e.substr)}function g(e){return!!(e&&e.constructor&&e.call&&e.apply)}function y(e){return!!e&&e.nodeType===1&&e.nodeName.toUpperCase()==="IFRAME"}function b(e){var t=!1,n;for(n in i)if(i.hasOwnProperty(n)&&i[n]===e){t=!0;break}return t}function w(e){var t,n,r;for(t=0,n=f.length;t<n;t++){r=e(f[t]);if(r===!1)break}}function E(e){var t="",n,r,i;e.substr(0,2)==="//"&&(e=window.location.protocol+e),i=e.split("/");for(n=0,r=i.length;n<r;n++){if(!(n<3))break;t+=i[n],n<2&&(t+="/")}return t}function S(e){return e.contentWindow?e.contentWindow:e.contentDocument&&"parentWindow"in e.contentDocument?e.contentDocument.parentWindow:null}function x(e){var t=[],n;for(n in e)e.hasOwnProperty(n)&&t.push(e[n]);return t}function T(e,t,n){n.callbacks[e]=n.callbacks[e]||[],n.callbacks[e].push(t)}function N(e,t){var n=!0,r;return t.callbacks[e]=[],w(function(t){r=t.callbacks[e]||[];if(r.length)return n=!1,!1}),n}function C(e,t,n){var r=S(n),i,s;if(!r.postMessage)return!1;i=n.getAttribute("src").split("?")[0],s=JSON.stringify({method:e,value:t}),i.substr(0,2)==="//"&&(i=window.location.protocol+i),i=i.replace(/http:\/\/(w|wt).soundcloud.com/,"https://$1.soundcloud.com"),r.postMessage(s,i)}function k(e){var t;return w(function(n){if(n.instance===e)return t=n,!1}),t}function L(e){var t;return w(function(n){if(S(n.element)===e)return t=n,!1}),t}function A(e,t){return function(n){var r=g(n),i=k(this),s=!r&&t?n:null,o=r&&!t?n:null;return o&&T(e,o,i),C(e,s,i.element),this}}function O(e,t,n){var r,i,s;for(r=0,i=t.length;r<i;r++)s=t[r],e[s]=A(s,n)}function M(e,t,n){return e+"?url="+t+"&"+_(n)}function _(e){var t,n,r=[];for(t in e)e.hasOwnProperty(t)&&(n=e[t],r.push(t+"="+(t==="start_track"?parseInt(n,10):n?"true":"false")));return r.join("&")}function D(e,t,n){var r=e.callbacks[t]||[],i,s;for(i=0,s=r.length;i<s;i++)r[i].apply(e.instance,n);if(b(t)||t===o.READY)e.callbacks[t]=[]}function P(e){var t,n,r,i,s;try{n=JSON.parse(e.data)}catch(u){return!1}t=L(e.source),r=n.method,i=n.value;if(t&&H(e.origin)!==H(t.domain))return!1;if(!t)return r===o.READY&&a.push(e.source),!1;r===o.READY&&(t.isReady=!0,D(t,l),N(l,t)),r===o.PLAY&&!t.playEventFired&&(t.playEventFired=!0),r===o.PLAY_PROGRESS&&!t.playEventFired&&(t.playEventFired=!0,D(t,o.PLAY,[i])),s=[],i!==undefined&&s.push(i),D(t,r,s)}function H(e){return e.replace(h,"")}var r=e("lib/api/events"),i=e("lib/api/getters"),s=e("lib/api/setters"),o=r.api,u=r.bridge,a=[],f=[],l="__LATE_BINDING__",c="http://wt.soundcloud.dev:9200/",h=/^http(?:s?)/,p,d,v;window.addEventListener?window.addEventListener("message",P,!1):window.attachEvent("onmessage",P),n.exports=v=function(e,t,n){m(e)&&(e=document.getElementById(e));if(!y(e))throw new Error("SC.Widget function should be given either iframe element or a string specifying id attribute of iframe element.");t&&(n=n||{},e.src=M(c,t,n));var r=L(S(e)),i,s;return r&&r.instance?r.instance:(i=a.indexOf(S(e))>-1,s=new p(e),f.push(new d(s,e,i)),s)},v.Events=o,window.SC=window.SC||{},window.SC.Widget=v,d=function(e,t,n){this.instance=e,this.element=t,this.domain=E(t.getAttribute("src")),this.isReady=!!n,this.callbacks={}},p=function(){},p.prototype={constructor:p,load:function(e,t){if(!e)return;t=t||{};var n=this,r=k(this),i=r.element,s=i.src,a=s.substr(0,s.indexOf("?"));r.isReady=!1,r.playEventFired=!1,i.onload=function(){n.bind(o.READY,function(){var e,n=r.callbacks;for(e in n)n.hasOwnProperty(e)&&e!==o.READY&&C(u.ADD_LISTENER,e,r.element);t.callback&&t.callback()})},i.src=M(a,e,t)},bind:function(e,t){var n=this,r=k(this);return r&&r.element&&(e===o.READY&&r.isReady?setTimeout(t,1):r.isReady?(T(e,t,r),C(u.ADD_LISTENER,e,r.element)):T(l,function(){n.bind(e,t)},r)),this},unbind:function(e){var t=k(this),n;t&&t.element&&(n=N(e,t),e!==o.READY&&n&&C(u.REMOVE_LISTENER,e,t.element))}},O(p.prototype,x(i)),O(p.prototype,x(s),!0)}),window.SC=window.SC||{},window.SC.Widget=require("lib/api/api")})()

'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'ngAnimate',
  'myApp.routes',
  'myApp.Service'
])

.directive('googleAnalytics', function(){
  return{
    restrict: 'A',
    link: function(){


    }
  }
});

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

'use strict';

/* Services */
var Service = angular.module('myApp.Service', ['ngResource']);

Service.factory('resourceService', function($resource, $routeParams, $q, $cacheFactory){

// var canceler = $q.defer();

return $resource('/data/:collection/:season.json',{},{get:{method:'GET', isArray: true}})
  // canceler.resolve();  // Aborts the $http request if it isn't finished.

});
// , params:{collection:$routeParams.collection , season:$routeParams.season}

Service.factory("CacheService", function($cacheFactory) {

   return { data:{ scrollY: 0 } };

});


Service.factory('detailService', function($resource, $routeParams, $q){


return $resource('/data/:collection/:season.json',{},{get:{method:'GET'}})

});

Service.factory('getService', function($http, $q, $timeout){

    return {
              get: function(url) {


              // var dfd = $q.defer();
              // $timeout(function(){

                  // the $http API is based on the deferred/promise APIs exposed by the $q service
                  // so it returns a promise for us by default
                  return $http.get(url)
                      .then(function(response) {


                          if (typeof response.data === 'object') {
                              return response.data;
                          } else {
                              // invalid response
                              console.log('rejected');
                              return $q.reject(response.data);
                          }

                          // dfd.resolve(response);

                      }, function(response) {
                          // something went wrong
                          return $q.reject(response.data);
                      });



                    // },2000);
                    // return dfd.promise;



              }
          };

    // return $resource('/data/'+url+'.json',{},{get:{method:'GET'}})


});




Service.factory('homeService', function($http, $q){

    return {
              get: function() {
                  // the $http API is based on the deferred/promise APIs exposed by the $q service
                  // so it returns a promise for us by default
                  return $http.get('/data/home.json')
                      .then(function(response) {



                          if (typeof response.data === 'object') {
                              return response.data;
                          } else {
                              // invalid response
                              console.log('rejected');
                              return $q.reject(response.data);
                          }

                      }, function(response) {
                          // something went wrong
                          return $q.reject(response.data);
                      });
              }
          };


});







//.................................................google SEO


Service.service('PageTitle', function() {
      var title = 'Angel Sanchez';
      return {
        title: function() { return title; },
        setTitle: function(newTitle) { title = newTitle; }
      };
    });



Service.service('MetaInformation', function() {
      var metaDescription = '';
      var metaKeywords = '';
      return {
        metaDescription: function() { return metaDescription; },
        metaKeywords: function() { return metaKeywords; },
        reset: function() {
          metaDescription = '';
          metaKeywords = '';
        },
        setMetaDescription: function(newMetaDescription) {
          metaDescription = newMetaDescription;
        },
        appendMetaKeywords: function(newKeywords) {
          for (var key in newKeywords) {
            if (metaKeywords === '') {
              metaKeywords += newKeywords[key].name;
            } else {
              metaKeywords += ', ' + newKeywords[key].name;
            }
          }
        }
      };
    });









    Service.service('anchorSmoothScroll', function($location, $rootScope, $window){

        // this.scrollTo = function(eID) {
        //
        //     // This scrolling function
        //     // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        //
        //     var startY = currentYPosition();
        //     var stopY = elmYPosition(eID);
        //     var distance = stopY > startY ? stopY - startY : startY - stopY;
        //     if (distance < 100) {
        //         scrollTo(0, stopY); return;
        //     }
        //     var speed = Math.round(distance / 100);
        //     if (speed >= 20) speed = 20;
        //     var step = Math.round(distance / 25);
        //     var leapY = stopY > startY ? startY + step : startY - step;
        //     var timer = 0;
        //     if (stopY > startY) {
        //         for ( var i=startY; i<stopY; i+=step ) {
        //             setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        //             leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        //         } return;
        //     }
        //     for ( var i=startY; i>stopY; i-=step ) {
        //         setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        //         leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        //     }
        //
        //     function currentYPosition() {
        //         // Firefox, Chrome, Opera, Safari
        //         if (self.pageYOffset) return self.pageYOffset;
        //         // Internet Explorer 6 - standards mode
        //         if (document.documentElement && document.documentElement.scrollTop)
        //             return document.documentElement.scrollTop;
        //         // Internet Explorer 6, 7 and 8
        //         if (document.body.scrollTop) return document.body.scrollTop;
        //         return 0;
        //     }
        //
        //     function elmYPosition(eID) {
        //         var elm = document.getElementById(eID);
        //         var y = elm.offsetTop;
        //         var node = elm;
        //         while (node.offsetParent && node.offsetParent != document.body) {
        //             node = node.offsetParent;
        //             y += node.offsetTop;
        //         } return y;
        //     }
        //
        // };




        this.scrollOneViewport = function() {



            setTimeout(function(){
              var number, element, scroll, scrollPosition, windowheight;



                      // $('.div1').get(0).scrollTop($('.div1 div.active').position().top);
                     element = jQuery('html,body');
                    //  scrollPosition =  jQuery('.artist').scrollTop();
                    //  scrollLength = document.getElementById("artist").scrollHeight;
                     windowheight = window.innerHeight;
                     if ($rootScope.isMobile && $rootScope.isDevice){
                        windowheight = $window.innerHeight + 130;
                     }




                      // event.preventDefault();

                      element.stop().animate({
                        scrollTop: windowheight
                      },1000,
                        'easeInOutQuart'
                        // function() {
                        //   // $location.path(section, false);
                        //   // console.log($location.path());
                        // }
                      );
                    }, 100);

          }





        this.scrollTo = function(id) {



            setTimeout(function(){
              var number, element, scroll, scrollPosition, windowheight;
                      number =  jQuery('#'+id).offset().top;
                      console.log("number: "+number);


                      // $('.div1').get(0).scrollTop($('.div1 div.active').position().top);
                     element = jQuery('.artist');
                     scrollPosition =  jQuery('.artist').scrollTop();
                     scrollLength = document.getElementById("artist").scrollHeight;
                     windowheight = $rootScope.windowHeight;


                     scroll = scrollPosition + number;




                      element.stop().animate({
                        scrollTop: scroll
                      },1000,
                        'easeInOutQuart'
                        // function() {
                        //   // $location.path(section, false);
                        //   // console.log($location.path());
                        // }
                      );
                    }, 200);

          }











//............RELEASE


          this.scrollToRelease = function(id) {


              setTimeout(function(){
                  var number, element, scroll, scrollPosition, windowheight;
                        number =  jQuery('#'+id).offset().top;
                        console.log("number: "+number);


                        // $('.div1').get(0).scrollTop($('.div1 div.active').position().top);
                       element = jQuery('.release');
                       scrollPosition =  jQuery('.release').scrollTop();
                      //  scrollLength = document.getElementById("release").scrollHeight;
                       windowheight = $rootScope.windowheight;


                       scroll = scrollPosition + number;


                        // event.preventDefault();

                        element.stop().animate({
                          scrollTop: scroll
                        },1000,
                          'easeInOutQuart'
                          // function() {
                          //   // $location.path(section, false);
                          //   // console.log($location.path());
                          // }
                        );
                      }, 200);

            }




            this.scrollJournalTop = function(id) {


                setTimeout(function(){
                  var number, element, scroll, scrollPosition, windowheight;


                          // $('.div1').get(0).scrollTop($('.div1 div.active').position().top);
                         element = jQuery('.journal');

                          element.stop().animate({
                            scrollTop: 0
                          },1000,
                            'easeInOutQuart'

                          );
                              //
                        }, 200);

              }



              this.scrollToTop = function(id) {


                  setTimeout(function(){
                    var number, element, scroll, scrollPosition, windowheight;


                            // $('.div1').get(0).scrollTop($('.div1 div.active').position().top);
                           element = jQuery('#'+id);

                            element.stop().animate({
                              scrollTop: 0
                            },1000,
                              'easeInOutQuart'

                            );
                                //
                          }, 200);

                }

// easeInOutQuart


    });


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


var Home = angular.module('myApp');


Home.controller('homeCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http, $sce, $templateCache, $route, $window, anchorSmoothScroll){

$scope.isSplash = true;

$rootScope.isArtist = false;
$rootScope.isRelease = false;
$rootScope.isJournal = false;
$rootScope.isContact = false;
$rootScope.isAbout = false;


$rootScope.closeAllSections = function(){


  $rootScope.isArtist = false;
  $rootScope.isRelease = false;
  $rootScope.isJournal = false;
  $rootScope.isContact = false;
  $rootScope.isAbout = false;
  $rootScope.mainArtist = "";
  $location.path('/', false);
  $rootScope.openSare = false;
  // $rootScope.toggleVideo('hide');
  setTimeout(function(){
    $rootScope.mainJournal = [];
    $rootScope.journalLoading = true;
  }, 300);



  $rootScope.isReleaseVideo = false;
}



$rootScope.refreshTemplate = function(){
  var currentPageTemplate = $route.current.templateUrl;
  $templateCache.remove(currentPageTemplate);
}


$rootScope.Artist =[];
$rootScope.Release =[];
$rootScope.Journal =[];











//..........................................................MESSAGE
$rootScope.thisIndex=0;
$scope.showingMessage=true;
$scope.messageArray=[];
$scope.isDone=false;
$scope.final_messageArray=[];

$scope.message = "AN INDEPENDENT AMERICAN RECORD LABEL";

$scope.$watch('pageLoading' ,function(){

  for (i =0; i < ($scope.message.length); i++){


    // setTimeout(function(){
        // jQuery("#msg").append($scope.message[i]);

        if($scope.message[i]==" "){
          $scope.messageArray.push("");
        }else{
          $scope.messageArray.push($scope.message[i]);

        }

        $scope.isDone=true;

        // $scope.$apply();
    // }, 300);

    if($scope.isDone){
      $scope.final_messageArray =$scope.messageArray;
    }
  }

});


$scope.enterAppear = false;





$rootScope.enter=function(){
  $rootScope.firstLoading = false;
  $scope.$apply();
}





//..........................................................GET



$rootScope.getContentType = function(type, orderField){

      Prismic.Api('https://threehundred.cdn.prismic.io/api', function (err, Api) {
          Api.form('everything')
              .ref(Api.master())

              .query(Prismic.Predicates.at("document.type", type))
              .orderings('['+orderField+']')
              .pageSize(100)
              .submit(function (err, response) {

                  var Data = response;

                  // setTimeout(function(){
                  //   $rootScope.firstLoading = false;
                  //   $scope.$apply();
                  // }, 3000);


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
$rootScope.getContentType('release', 'my.release.date desc');
$rootScope.getContentType('journal', 'my.journal.date desc');










  $rootScope.openArtists = function(artist, number){

    $rootScope.isArtist = true;
    $rootScope.isRelease = false;
    $rootScope.isJournal = false;
    $rootScope.isAbout = false;
    $rootScope.isContact = false;

    $location.path('artist', false);
    $rootScope.whatArtist = artist;
    $rootScope.thisArtist(artist, number);

    $rootScope.gotoAnchorArtist('artist-content-'+artist);

  }


  $rootScope.openRelease = function(release, number){

    $rootScope.isArtist = false;
    $rootScope.isRelease = true;
    $rootScope.isJournal = false;
    $rootScope.isAbout = false;
    $rootScope.isContact = false;

    $location.path('release', false);
    $rootScope.whatRelease = release;
    $rootScope.thisRelease(release, number);

    $rootScope.gotoAnchorRelease('release-item-'+release);

  }

  $rootScope.openJournal = function(journal, number){

    $rootScope.isArtist = false;
    $rootScope.isRelease = false;
    $rootScope.isJournal = true;
    $rootScope.isAbout = false;
    $rootScope.isContact = false;

    $location.path('journal', false);
    $rootScope.whatJournal = journal;
    $scope.$watch('jorunalReady' ,function(){
      console.log("jorunalReady");
      setTimeout(function(){

        $rootScope.thisJournal(journal, number);


      }, 600);
    });

  }

  $rootScope.openContact = function(){
    $rootScope.isContact = true;
    $location.path('contact', false);

    $rootScope.isArtist = false;
    $rootScope.isRelease = false;
    $rootScope.isJournal = false;
    $rootScope.isAbout = false;
  }

  $rootScope.openAbout = function(){
    $rootScope.isAbout = true;
    $location.path('about', false);

    $rootScope.isArtist = false;
    $rootScope.isRelease = false;
    $rootScope.isJournal = false;
    $rootScope.isContact = false;
  }



















$rootScope.channel_statistics;



  $.get(
    "https://www.googleapis.com/youtube/v3/channels?",{
      part: 'statistics',
      // maxResults: 50,
      id: 'UClO3VS7C-pHAoRh6fYddbLQ',
      key: 'AIzaSyBmZ8Wa0u4cbP_kI_LYDQ-xT521xTeKcFo'
    },
      function(data){

        $rootScope.channel_statistics = data.items[0].statistics;
        // $scope.baseUrl = 'https://www.youtube.com/embed/'+$rootScope.channel_data[0].id.videoId+'?rel=0&amp;&autoplay=0&controls=1&loop=1&showinfo=0&modestbranding=1&theme=dark&color=white&wmode=opaque';
        // $scope.main_video = $sce.trustAsResourceUrl($scope.baseUrl);
        // $scope.main_title = $rootScope.channel_data[0].title;
        // part=subscriberSnippet&channelId=UClO3VS7C-pHAoRh6fYddbLQ&mySubscribers=false&key={YOUR_API_KEY}

      }
  );




$rootScope.splashScroll=0;
$rootScope.windowHeight = $window.innerHeight;
if ($rootScope.isMobile && $rootScope.isDevice){
  $rootScope.firstLoading = false;
  $rootScope.windowHeight = $window.innerHeight + 60;
}else{


  angular.element($window).bind("scroll", function() {


      var scroll = this.pageYOffset;
      $rootScope.splashScroll = scroll;


      if(scroll>=$rootScope.windowHeight){
        $rootScope.firstLoading = false;
        angular.element($window).unbind("scroll");
      }


      $scope.$apply();
  });


}


$rootScope.removeSplashMobile = false;

$rootScope.scrollToHome = function(){
  anchorSmoothScroll.scrollOneViewport();
  $rootScope.removeSplashMobile = true;

}



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



























// 
//
// var previewToken = 'V31lbScAAIHkBbp9*V31_eicAABXmBlcw';
//
// Prismic.Api('https://threehundred.cdn.prismic.io/api', function (err, Api) {
//     var stPatrickRef = Api.ref("1-records");
//     // Now we'll use this reference for all our calls
//     Api.form('everything')
//         .ref(stPatrickRef)
//         .query(Prismic.Predicates.at("document.type", "journal")).submit(function (err, response) {
//             if (err) {
//                 console.log(err);
//                 done();
//           }
//
//           console.log(response);
//             // The documents object contains a Response object with all documents of type "product"
//             // including the new "Saint-Patrick's Cupcake"
//         });
//
//
//
// }, previewToken);



});





Home.directive('splashDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'home/splash.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});


Home.directive('homeMobileDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'home/homeMobile.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});







// $scope.formData = {};

//   $scope.searchFunction = function () {
//     $http({
//       method: 'GET',
//       url: 'https://api.spotify.com/v1/tracks/' + $scope.formData.artist
//     }).then(function successCallback(response) {
//         // this callback will be called asynchronously
//         // when the response is available
//
//         $scope.response = response;
//         $scope.data = response.data;
//
//       }, function errorCallback(response) {
//         // called asynchronously if an error occurs
//         // or server returns response with an error status.
//       });
//
//
//       console.log($scope.data);
// };




//.......................................CONTENTFUL



// var request = new XMLHttpRequest();
//
// request.open('GET', 'https://cdn.contentful.com/spaces/wnrvjkdhaqmd/entries?access_token=b2e4949056c52a21c1142781b5ada1d1226bfbc578cd191ec591375d95f0dca5');


// var contentful = require('contentful');
// var client = contentful.createClient({
//   accessToken: 'b2e4949056c52a21c1142781b5ada1d1226bfbc578cd191ec591375d95f0dca5',
//   space: 'mql5rhikew08'
// });





// $scope.getContentType = function(content_type){
//   //  var request = new XMLHttpRequest();
//    var access_token = 'b2e4949056c52a21c1142781b5ada1d1226bfbc578cd191ec591375d95f0dca5';
//    var get = "https://cdn.contentful.com/spaces/mql5rhikew08/entries?access_token="+ access_token +"&content_type="+content_type;
//
//
//    $http({
//      method: 'GET',
//      url: get
//     }).then(function successCallback(response) {
//        // this callback will be called asynchronously
//        // when the response is available
//
//           if(content_type=='artist'){
//             $rootScope.Artist = response.data.items;
//           }else if(content_type=='release'){
//             $rootScope.Release = response.data.items;
//           }else if(content_type=='journal'){
//             $rootScope.Journal = response.data.items;
//           }
//
//           setTimeout(function(){
//             $rootScope.firstLoading = false;
//             $scope.$apply();
//           }, 200);
//
//
//
//
//
//      }, function errorCallback(response) {
//        // called asynchronously if an error occurs
//        // or server returns response with an error status.
//      });
//
//
//
//   //  request.open('GET', get);
//   //  request.onreadystatechange = function () {
//   //    if (this.readyState === 4) {
//   //     //  console.log('Status:', this.status);
//   //     //  console.log('Headers:', this.getAllResponseHeaders());
//   //     //  console.log('Body:', this.response);
//    //
//   //      if(content_type=='artist'){
//   //        $rootScope.Artist = JSON.parse(this.response.items);
//   //        console.log(this.response.items);
//   //      }else if(content_type=='release'){
//   //        $rootScope.Release = this.responseText.items;
//   //      }else if(content_type=='journal'){
//   //        $rootScope.Journal = this.responseText.items;
//   //      }
//   //      setTimeout(function(){
//   //        $rootScope.firstLoading = false;
//   //        $scope.$apply();
//   //      }, 2000);
//    //
//   //    }
//   //  };
//   //  request.send();
// }
//

//
// // $scope.getContentType('artist');
// // $scope.getContentType('release');
// // $scope.getContentType('journal');



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



var Release = angular.module('myApp');


Release.controller('releaseCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http, anchorSmoothScroll){


  $rootScope.mainRelease = [];

  $rootScope.thisRelease = function(thisRelease, thisnumber){
      $rootScope.mainRelease = $rootScope.Release[thisnumber];
  }



$rootScope.isReleaseVideo = false;

  $scope.flipRelease=function(){
    $rootScope.isReleaseVideo = !$rootScope.isReleaseVideo;
  }










  //..................................................changing anchor link on click
  $rootScope.gotoAnchorRelease = function(x) {
    anchorSmoothScroll.scrollToRelease(x);
  };









});





Release.directive('releaseDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'release/release.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});



var Journal = angular.module('myApp');


Journal.controller('journalCtrl', ['$scope', '$location', '$rootScope', '$routeParams', '$timeout',	'$http', 'anchorSmoothScroll', '$route' ,function($scope, $location, $rootScope, $routeParams, $timeout,	$http, anchorSmoothScroll, $route){


  $rootScope.mainJournal = [];
  $rootScope.openSare = false;
  $scope.journalLength;
  $rootScope.journalLoading = true;


  $rootScope.thisJournal = function(thisJournal, thisnumber){
    // setTimeout(function(){
    //   console.log($route.current.params);
    //
    // }, 900);
      for (i in $rootScope.Journal){

        if( thisJournal == $rootScope.Journal[i].uid){

          $rootScope.mainJournal = $rootScope.Journal[i];
            console.log($rootScope.mainJournal);
        }
      }
      anchorSmoothScroll.scrollJournalTop();

      setTimeout(function(){
        $rootScope.journalLoading = false;
        $rootScope.$apply();
      }, 1000);
  }


// setTimeout(function(){
//
// }, 600);



$rootScope.getNextJournal = function(uid){


  $scope.journalLength = $scope.Journal.length;


  for (j in $rootScope.Journal){
    if(uid == $rootScope.Journal[j].uid){

      if(j < ($scope.journalLength-1)){
        j++;
        $rootScope.mainJournal = $rootScope.Journal[j];
      }else if(j >= ($scope.journalLength-1)){
        j++;
        $rootScope.mainJournal = $rootScope.Journal[0];
      }

      anchorSmoothScroll.scrollJournalTop();

    }

  }

  $rootScope.openSare = false;


}



$rootScope.openShare =function(){
    $rootScope.openSare = !$rootScope.openSare;
}







//
// //DETAIL CHECK
//
// if ($location.path() == '/journal/'+$routeParams.id){
//
// console.log("$routeParams.id: "+$routeParams.id);
//
//
//   $scope.$watch('jorunalReady' ,function(){
//     console.log("jorunalReady");
//     setTimeout(function(){
//
//
//
//     }, 600);
//   });
//
// };
//


// $scope.$on('journalReady', function() {
//
//
// console.log('changed');
//
//   if($location.path() == '/journal'){
//   console.log($location.path());
//     console.log('now');
//
//     setTimeout(function(){
//       $scope.journalLoading = false;
//       $scope.$apply();
//     }, 2000);
//   }
 //
 //
 // });








}]); //controller





Journal.directive('journalDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'journal/journal.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});



Journal.directive('journalLoaderDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {




    }
  };
});

var About = angular.module('myApp');

About.controller('aboutCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http){




});





About.directive('aboutDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'about/about.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});

var Contact = angular.module('myApp');

Contact.controller('contactCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http){




});





Contact.directive('contactDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'contact/contact.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});
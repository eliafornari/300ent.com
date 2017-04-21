'use strict';

/* Services */
var Service = angular.module('myApp');

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

Service.factory('getService', ['$http', '$q', '$timeout', function($http, $q, $timeout){

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


}]);




Service.factory('homeService', ['$http', '$q', function($http, $q){

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
                              return $q.reject(response.data);
                          }

                      }, function(response) {
                          // something went wrong
                          return $q.reject(response.data);
                      });
              }
          };


}]);







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









    Service.service('anchorSmoothScroll', ['$location', '$rootScope', '$window', function($location, $rootScope, $window){

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
                        // }
                      );
                    }, 100);

          }





        this.scrollTo = function(id) {



            setTimeout(function(){
              var number, element, scroll, scrollPosition, windowheight, scrollLength;
                      number =  jQuery('#'+id).offset().top;


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
                  var number, element, scroll, scrollPosition, windowheight, scrollLength;
                        number =  jQuery('#'+id).offset().top;

                        // $('.div1').get(0).scrollTop($('.div1 div.active').position().top);
                       element = jQuery('.release');
                       scrollPosition =  jQuery('.release').scrollTop();
                       scrollLength = document.getElementById("release").scrollHeight;
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




            this.scrollTopElement = function(elementName) {


                setTimeout(function(){
                  var number, element, scroll, scrollPosition, windowheight;


                          // $('.div1').get(0).scrollTop($('.div1 div.active').position().top);
                         element = jQuery('.'+elementName);

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


    }]);

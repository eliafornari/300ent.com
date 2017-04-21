import Prismic from 'prismic.io'

var Press = angular.module('myApp');


Press.controller('pressCtrl', ['$scope', '$location', '$rootScope', '$routeParams',	'$http', 'anchorSmoothScroll', '$route', '$window', function($scope, $location, $rootScope, $routeParams, $http, anchorSmoothScroll, $route, $window){

console.log("press ctrl");
  $rootScope.mainPress = {};
  $rootScope.isView='press';

  $scope.pressLength;
  $scope.pressLoading = true;
  // $rootScope.scrollToHome();
  $rootScope.firstLoading=false;
  // $rootScope.closeAllSections();
  $scope.currentImage='';
  $rootScope.paginationInProcess=false;
  $rootScope.Press;


$rootScope.swapImage=(url)=>{
  $scope.currentImage=url;
}



  $rootScope.isView='press';
  $rootScope.mainJournal = [];
  $rootScope.journalLoading = true;
  $rootScope.isReleaseVideo = false;



  $scope.getPressList = function(type, orderField, page){
    $rootScope.paginationInProcess=true;
  var url = '/api/prismic/press/get?order='+orderField+'&type='+type+'&page='+page;
  if($location.search().filter){
    url = url + '&filter='+$location.search().filter
  }


  $http({
  method: 'GET',
  url: url
  }).then(function(response) {
      // this callback will be called asynchronously
      // when the response is available
          var Data = response.data;
          if(!$rootScope.Press){
            $rootScope.Press=Data;
          }else{
            $rootScope.Press.results=$rootScope.Press.results.concat(Data.results);
          }

          $scope.$broadcast('pressReady');
          $rootScope.paginationInProcess=false;

          // The documents object contains a Response object with all documents of type "product".
          $rootScope.Press.page = Data.page; // The current page number, the first one being 1
          var results = Data.results; // An array containing the results of the current page;
          // you may need to retrieve more pages to get all results
          $rootScope.Press.prev_page = Data.prev_page; // the URL of the previous page (may be null)
          $rootScope.Press.next_page = Data.next_page; // the URL of the next page (may be null)
          $rootScope.Press.results_per_page = Data.results_per_page; // max number of results per page
          $rootScope.Press.results_size = Data.results_size; // the size of the current page
          $rootScope.Press.total_pages = Data.total_pages; // the number of pages
          $rootScope.Press.total_results_size = Data.total_results_size; // the total size of results across all pages
    }, function(err) {
      console.log(err);
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });




  };







  // $rootScope.thisPress = function(thisPress){
  //     for (var i in $rootScope.Press){
  //       if( thisPress == $rootScope.Press[i].uid){
  //         $rootScope.mainPress = $rootScope.Press[i];
  //       }
  //     }
  //     anchorSmoothScroll.scrollTopElement('press');
  //
  //     setTimeout(function(){
  //       $rootScope.pressLoading = false;
  //       $rootScope.$apply();
  //     }, 600);
  // }


  if(!$rootScope.Press){
    $scope.getPressList('press', 'my.press.date', 1);
  }else{
    // $scope.getPressList('press', 'my.press.date', 0);
    if($location.search()){
      $rootScope.Press.results=[];
      $scope.getPressList('press', 'my.press.date', 1);
    }
  }



    setTimeout(function(){
      angular.element($window).bind("scroll.press", function() {
          var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
          var body = document.body, html = document.documentElement;
          var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
          var windowBottom = windowHeight + window.pageYOffset;
          if ((windowBottom >= docHeight) &&($rootScope.paginationInProcess==false)) {
              // alert('bottom reached');
              if($rootScope.Press.next_page){
                var next = $rootScope.Press.page +1;
                $scope.getPressList('press', 'my.press.date', next);
              }

          }
      });
    }, 1000);









 // ART IS NOTHING WITHOUT FUNCTIONALITY
 // ART IS NOTHING WITHOUT TECHNOLOGY
 // ART IS NOTHING WITHOUT



}]); //controller



Press.controller('pressDetailCtrl', ['$scope', '$location', '$rootScope', '$routeParams', '$timeout',	'$http', 'anchorSmoothScroll', '$route' ,function($scope, $location, $rootScope, $routeParams, $timeout,	$http, anchorSmoothScroll, $route){

  $scope.isShare = false;
  $scope.pressLoading = true;
  $rootScope.scrollToHome();
  $rootScope.firstLoading=false;
  $scope.pressDetail = {}
  $rootScope.isView='press';


  $rootScope.getNextPress = function(uid){
    $scope.pressLength = $scope.Press.length;
    for (var j in $rootScope.Press){
      if(uid == $rootScope.Press[j].uid){
        if(j < ($scope.pressLength-1)){
          j++;
          $rootScope.mainPress = $rootScope.Press[j];
        }else if(j >= ($scope.pressLength-1)){
          j++;
          $rootScope.mainPress = $rootScope.Press[0];
        }
        anchorSmoothScroll.scrollTopElement('press');
      }
    }
    $scope.openShare = false;
  }



  $scope.openShare =function(){
    $scope.isShare = !$scope.isShare;
  }




  $scope.getSingle=(queryString, uid)=>{

    Prismic.Api('https://threehundred.cdn.prismic.io/api', function (err, Api) {

        Api.form('everything')
            .ref(Api.master())
            .query(Prismic.Predicates.at(queryString, uid))
            .submit(function (err, response) {
              $scope.pressDetail=response.results[0];
              $scope.pressLoading = false;

            });
      });
  }


  $scope.getSingle('my.press.uid', $routeParams.press);










}]);




// Prismic.Api('https://threehundred.cdn.prismic.io/api', function (err, Api) {
//     Api.form('everything')
//         .ref(Api.master())
//         .query(
//           Prismic.Predicates.at("document.type", type),
//           Prismic.Predicates.at('document.tags', []) ]
//           { orderings : '['+orderField+']' }
//         )
//         .pageSize(5)
//         .page(page)
//         .submit(function (err, response) {
//
//             var Data = response;
//             console.log($rootScope.Press);
//             if(!$rootScope.Press){
//               $rootScope.Press=response;
//             }else{
//               $rootScope.Press.results=$rootScope.Press.results.concat(response.results);
//             }
//
//             $scope.$broadcast('pressReady');
//             console.log($rootScope.Press);
//             $rootScope.paginationInProcess=false;
//
//             // The documents object contains a Response object with all documents of type "product".
//             $rootScope.Press.page = response.page; // The current page number, the first one being 1
//             var results = response.results; // An array containing the results of the current page;
//             // you may need to retrieve more pages to get all results
//             $rootScope.Press.prev_page = response.prev_page; // the URL of the previous page (may be null)
//             $rootScope.Press.next_page = response.next_page; // the URL of the next page (may be null)
//             $rootScope.Press.results_per_page = response.results_per_page; // max number of results per page
//             $rootScope.Press.results_size = response.results_size; // the size of the current page
//             $rootScope.Press.total_pages = response.total_pages; // the number of pages
//             $rootScope.Press.total_results_size = response.total_results_size; // the total size of results across all pages
//               return results;
//         });
//   });

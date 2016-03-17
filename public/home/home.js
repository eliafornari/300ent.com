
var Home = angular.module('myApp');


Home.controller('homeCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http){



$rootScope.isArtist = false;
$rootScope.isRelease = false;
$rootScope.isJournal = false;


$rootScope.closeAllSections = function(){
  $rootScope.isArtist = false;
  $rootScope.isRelease = false;
  $rootScope.isJournal = false;
  $location.path('/', false);
}


$rootScope.Artist =[];
$rootScope.Release =[];
$rootScope.Journal =[];




//..........................................................GET




$rootScope.getContentType = function(type){

      Prismic.Api('https://threehundred.cdn.prismic.io/api', function (err, Api) {
          Api.form('everything')
              .ref(Api.master())
              .query(Prismic.Predicates.at("document.type", type)).submit(function (err, response) {

                  var Data = response;

                  setTimeout(function(){
                    $rootScope.firstLoading = false;
                    $scope.$apply();
                  }, 200);


                  if (type =='artist'){
                    $rootScope.Artist = response.results;
                  }else if(type=='release'){
                    $rootScope.Release = response.results;
                  }else if(type =='journal'){
                    $rootScope.Journal = response.results;
                  }

                  // The documents object contains a Response object with all documents of type "product".
                  var page = response.page; // The current page number, the first one being 1
                  var results = response.results; // An array containing the results of the current page;
                  console.log(results);
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



$rootScope.getContentType('artist');
$rootScope.getContentType('release');











  $rootScope.openArtists = function(artist, number){

    $rootScope.isArtist = true;
    $rootScope.isRelease = false;
    $rootScope.isJournal = false;
    $location.path('artist', false);
    $rootScope.whatArtist = artist;
    $rootScope.thisArtist(artist, number);

  }


  $rootScope.openRelease = function(release, number){

    $rootScope.isArtist = false;
    $rootScope.isRelease = true;
    $rootScope.isJournal = false;
    $location.path('release', false);
    $rootScope.whatRelease = release;
    $rootScope.thisRelease(release, number);

  }



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

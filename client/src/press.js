import Prismic from 'prismic.io'

var Press = angular.module('myApp');


Press.controller('pressCtrl', ['$scope', '$location', '$rootScope', '$routeParams', '$timeout',	'$http', 'anchorSmoothScroll', '$route' ,function($scope, $location, $rootScope, $routeParams, $timeout,	$http, anchorSmoothScroll, $route){


  $rootScope.mainPress = {};

  $scope.pressLength;
  $scope.pressLoading = true;
  $rootScope.scrollToHome();
  $rootScope.firstLoading=false;
  // $rootScope.closeAllSections();

$scope.currentImage='';


$rootScope.swapImage=(url)=>{
  $scope.currentImage=url;
}



  $rootScope.isView='press';
  $rootScope.mainJournal = [];
  $rootScope.journalLoading = true;
  $rootScope.isReleaseVideo = false;



  $scope.getPressList = function(type, orderField){

        Prismic.Api('https://threehundred.cdn.prismic.io/api', function (err, Api) {
            Api.form('everything')
                .ref(Api.master())

                .query(Prismic.Predicates.at("document.type", type))
                .orderings('['+orderField+']')
                .pageSize(10)
                .submit(function (err, response) {

                    var Data = response;

                      $rootScope.Press = response;
                      $scope.$broadcast('pressReady');
                      console.log($rootScope.Press);



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



  $scope.getPressList('press', 'my.press.date');




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
              console.log(err);
              console.log(response);
              $scope.pressDetail=response.results[0];
              $scope.pressLoading = false;

            });
      });
  }


  $scope.getSingle('my.press.uid', $routeParams.press);





}]);

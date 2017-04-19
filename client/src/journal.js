
import Prismic from 'prismic.io'
var Journal = angular.module('myApp');


Journal.controller('journalCtrl', ['$scope', '$location', '$rootScope', '$routeParams', '$timeout',	'$http', 'anchorSmoothScroll', '$route' ,function($scope, $location, $rootScope, $routeParams, $timeout,	$http, anchorSmoothScroll, $route){

  $rootScope.mainJournal = {};
  $scope.isShare = false;
  $scope.journalLength;
  $rootScope.journalLoading = true;


  $rootScope.thisJournal = function(thisJournal){
    $scope.getSingle('my.journal.uid', $routeParams.journal);
    // for (var i in $rootScope.Journal.results){
    //   if( thisJournal == $rootScope.Journal.results[i].uid){
    //     $rootScope.mainJournal = $rootScope.Journal.results[i];
    //   }
    // }
    anchorSmoothScroll.scrollTopElement('journal');

    setTimeout(function(){
      $rootScope.journalLoading = false;
      $rootScope.$apply();
    }, 1000);
  }




  $scope.getSingle=(queryString, uid)=>{

    Prismic.Api('https://threehundred.cdn.prismic.io/api', function (err, Api) {

        Api.form('everything')
            .ref(Api.master())
            .query(Prismic.Predicates.at(queryString, uid))
            .submit(function (err, response) {
              $rootScope.mainJournal=response.results[0];
              $scope.pressLoading = false;
            });
      });
  }
















$rootScope.getNextJournal = function(uid){
  $scope.journalLength = $rootScope.Journal.results.length;
  for (var j in $rootScope.Journal.results){
    if(uid == $rootScope.Journal.results[j].uid){
      if(j < ($scope.journalLength-1)){
        j++;
        $rootScope.mainJournal = $rootScope.Journal.results[j];
      }else if(j >= ($scope.journalLength-1)){
        j++;
        $rootScope.mainJournal = $rootScope.Journal.results[0];
      }
      anchorSmoothScroll.scrollTopElement('journal');
    }
  }
  $scope.openShare = false;
}



$scope.openShare =function(){
  $scope.isShare = !$scope.isShare;
}







}]); //controller





Journal.directive('journalDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/journal.html',
    replace: true
  };
});



Journal.directive('journalLoaderDirective', function() {
  return {
    restrict: 'A'
  };
});

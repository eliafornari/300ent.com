

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

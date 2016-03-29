

var Journal = angular.module('myApp');


Journal.controller('journalCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http){


  $rootScope.mainJournal = [];

  $rootScope.thisJournal = function(thisJournal, thisnumber){
      $rootScope.mainJournal = $rootScope.Journal[thisnumber];
      console.log($rootScope.mainJournal.uid);
  }


});





Journal.directive('journalDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'journal/journal.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});

var About = angular.module('myApp');

About.controller('aboutCtrl', ['$scope', '$location', '$rootScope', '$routeParams', '$timeout',	'$http', function($scope, $location, $rootScope, $routeParams, $timeout, $http){

  if($rootScope.removeSplashMobile == false){
    $rootScope.scrollToHome();
  }

  $rootScope.isView='about';

}]);





About.directive('aboutDirective', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/about.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});

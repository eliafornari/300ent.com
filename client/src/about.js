var About = angular.module('myApp');

About.controller('aboutCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http){

  if($rootScope.removeSplashMobile == false){
    $rootScope.scrollToHome();
  }
  console.log("aboutCtrl");

  $rootScope.isView='about';
  console.log($rootScope.isView);

});





About.directive('aboutDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/about.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});

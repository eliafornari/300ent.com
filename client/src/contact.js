var Contact = angular.module('myApp');

Contact.controller('contactCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http){

  if($rootScope.removeSplashMobile == false){
    $rootScope.scrollToHome();
  }
  console.log("contactCtrl");

  $rootScope.isView='contact';

});





Contact.directive('contactDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/contact.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});

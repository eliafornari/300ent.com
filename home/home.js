
angular.module('myApp')


.controller('homeCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http){

$scope.formData = {};



  $scope.searchFunction = function () {
    $http({
      method: 'GET',
      url: 'https://api.spotify.com/v1/tracks/' + $scope.formData.artist

    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available

        $scope.response = response;
        $scope.data = response.data;

      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });


      console.log($scope.data);
};


//   $scope.searchFunction = function (query) {
//     $http({
//         url: 'https://api.spotify.com/v1/search',
//         method: 'GET',
//         data: {
//             q: 'artist:' + query,
//             type: 'album',
//             market: "US"
//         },
//         success: function (response) {
//           console.log(response);
//             resultsPlaceholder.innerHTML = template(response);
//         }
//     });
// };



});

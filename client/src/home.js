
var Home = angular.module('myApp');


Home.controller('homeCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http, $sce, $templateCache, $route, $window, anchorSmoothScroll){

$scope.isSplash = true;

$rootScope.isView;


$rootScope.closeAllSections = function(){


  $rootScope.isView = 'home';
  $rootScope.mainArtist = "";
  $location.path('/', false);
  // $rootScope.toggleVideo('hide');
  setTimeout(function(){
    $rootScope.mainJournal = [];
    $rootScope.journalLoading = true;
  }, 300);



  $rootScope.isReleaseVideo = false;
}



$rootScope.refreshTemplate = function(){
  var currentPageTemplate = $route.current.templateUrl;
  $templateCache.remove(currentPageTemplate);
}














//..........................................................MESSAGE
$rootScope.thisIndex=0;
$scope.showingMessage=true;
$scope.messageArray=[];
$scope.isDone=false;
$scope.final_messageArray=[];

$scope.message = "AN INDEPENDENT AMERICAN RECORD LABEL";

$scope.$watch('pageLoading' ,function(){

  for (var i =0; i < ($scope.message.length); i++){


    // setTimeout(function(){
        // jQuery("#msg").append($scope.message[i]);

        if($scope.message[i]==" "){
          $scope.messageArray.push("");
        }else{
          $scope.messageArray.push($scope.message[i]);
        }

        $scope.isDone=true;

        // $scope.$apply();
    // }, 300);

    if($scope.isDone){
      $scope.final_messageArray =$scope.messageArray;
    }
  }

});


$scope.enterAppear = false;





$rootScope.enter=function(){
  $rootScope.firstLoading = false;
  $scope.$apply();
}



$rootScope.splashScroll=0;
$rootScope.windowHeight = $window.innerHeight;
if ($rootScope.isMobile && $rootScope.isDevice){
  $rootScope.firstLoading = false;
  $rootScope.windowHeight = $window.innerHeight + 60;
}else{

  angular.element($window).bind("scroll", function() {

      var scroll = this.pageYOffset;
      $rootScope.splashScroll = scroll;

      if(scroll>=$rootScope.windowHeight){
        $rootScope.firstLoading = false;
        angular.element($window).unbind("scroll");
      }


      $scope.$apply();
  });


}












$rootScope.openArtists = function(artist){
  $rootScope.isView='artist';

  $location.path('/artist/'+artist, false);
  $routeParams.artist = artist;
  $rootScope.$broadcast("ArtistChanged");
  // if(artist){
  //   // $rootScope.thisArtist(artist);
  //   $rootScope.gotoAnchorArtist('artist-content-'+artist);
  // }
}




// $rootScope.openArtists($routeParams.artist);

  $rootScope.openRelease = function(release, number){

  $rootScope.isView='release';

    $location.path('release', false);
    $rootScope.whatRelease = release;
    $rootScope.thisRelease(release, number);

    $rootScope.gotoAnchorRelease('release-item-'+release);

  }

  $rootScope.openJournal = function(journal){

    $rootScope.isView='journal';

    $location.path('journal/'+journal, false);
    $rootScope.whatJournal = journal;
    $scope.$watch('jorunalReady' ,function(){
      console.log("jorunalReady");
      setTimeout(function(){

        $rootScope.thisJournal(journal);


      }, 600);
    });

  }

  $rootScope.openContact = function(){
    $rootScope.isView='contact';
    $location.path('contact', false);
  }



  $rootScope.openAbout = function(){
    $rootScope.isView='about';
    $location.path('about', false);
  }






if($routeParams.journal){
    // $rootScope.removeSplashMobile = true;
    // $rootScope.firstLoading = false;
    $rootScope.scrollToHome();
  if($rootScope.Journal){
    $rootScope.openJournal($routeParams.journal);
  }else{
    $rootScope.$on('journalReady', function(){
      $rootScope.openJournal($routeParams.journal);
    });
  }

}












$rootScope.channel_statistics;



  $.get(
    "https://www.googleapis.com/youtube/v3/channels?",{
      part: 'statistics',
      // maxResults: 50,
      id: 'UClO3VS7C-pHAoRh6fYddbLQ',
      key: 'AIzaSyBmZ8Wa0u4cbP_kI_LYDQ-xT521xTeKcFo'
    },
      function(data){

        $rootScope.channel_statistics = data.items[0].statistics;
        // $scope.baseUrl = 'https://www.youtube.com/embed/'+$rootScope.channel_data[0].id.videoId+'?rel=0&amp;&autoplay=0&controls=1&loop=1&showinfo=0&modestbranding=1&theme=dark&color=white&wmode=opaque';
        // $scope.main_video = $sce.trustAsResourceUrl($scope.baseUrl);
        // $scope.main_title = $rootScope.channel_data[0].title;
        // part=subscriberSnippet&channelId=UClO3VS7C-pHAoRh6fYddbLQ&mySubscribers=false&key={YOUR_API_KEY}

      }
  );



































//
//
// var previewToken = 'V31lbScAAIHkBbp9*V31_eicAABXmBlcw';
//
// Prismic.Api('https://threehundred.cdn.prismic.io/api', function (err, Api) {
//     var stPatrickRef = Api.ref("1-records");
//     // Now we'll use this reference for all our calls
//     Api.form('everything')
//         .ref(stPatrickRef)
//         .query(Prismic.Predicates.at("document.type", "journal")).submit(function (err, response) {
//             if (err) {
//                 console.log(err);
//                 done();
//           }
//
//           console.log(response);
//             // The documents object contains a Response object with all documents of type "product"
//             // including the new "Saint-Patrick's Cupcake"
//         });
//
//
//
// }, previewToken);



});





Home.directive('splashDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/splash.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});


Home.directive('homeMobileDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/homeMobile.html',
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

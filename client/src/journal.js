
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
    }, 2000);
  }




  $scope.getSingle=(queryString, uid)=>{

    Prismic.Api('https://threehundred.cdn.prismic.io/api', function (err, Api) {

        Api.form('everything')
            .ref(Api.master())
            .query(Prismic.Predicates.at(queryString, uid))
            .submit(function (err, response) {
              console.log(response);
              $rootScope.mainJournal=response.results[0];
              $scope.pressLoading = false;


              setTimeout(function(){
                $rootScope.journalAtags(response.results[0].data["journal.body"].value)
              }, 900);

              console.log(response);
            });
      });
  }

  // String.prototype.replaceAt=function(start, end, replacement) {
  //     return this.substr(start, end) + replacement+ this.substr(index + replacement.length);
  // }
  //
  // function keywordconvert(str, p1, offset, s)  {
  //   return "<a href=\"link?t="+encodeURIComponent(p1)+"\">"+p1+"</a>";
  // }



//
//   function keywordconvert(keyword, url)  {
//     return "<a href=\"link?t="+encodeURIComponent(url)+"\">"+keyword+"</a>";
//   }
//
//   $scope.searchKey=(string, keyword, url) =>{
//
//      var queryResult = angular.element(document.querySelectorAll(string));;
//        var content = angular.element(queryResult);
//        if(content[0]){
//          console.log(content);
//         //  var re = new RegExp("("+keyword+")","g");
//          content[0].innerHTML = content[0].innerHTML.replace(keyword, keywordconvert(keyword, url));
//          document.getElementById(string).appendChild(content);
//          $rootScope.$apply();
//        }
// // console.log(string, keyword, url);
//     //  var re = new RegExp("("+keyword+")","g");
//   }



// $scope.searchKey=(string, keyword, url)=>{
//   var temp_link = document.createElement("a");
//   temp_link.href = url;
//   temp_link.target = '_blank';
//   temp_link.innerHTML = keyword;
//   var queryResult = angular.element(document.querySelectorAll(string));;
//   var content = angular.element(queryResult);
//
//
//   if(content[0]){
//     content[0].appendChild(temp_link);
//     console.log(content);
//   }
// }


$scope.searchKey=(string, keyword, url)=>{

var targetWord, p, textNode, index, nodeWord, nodeAfter;

// Our target word
targetWord = keyword;

// Get the paragraph using jQuery; note that after we
// use jQuery to get it (because it fixes getElementById for
// us on older versions of IE), we then use [0] to access
// the *raw* `p` element.
// Then get the text node from it.
// p = $(string)[0];
  var queryResult = angular.element(document.querySelectorAll(string));;
  var content = angular.element(queryResult);
  console.log(content);
textNode = jQuery(string)[0];

if(content[0]){
  // Find our text in the text node
  index = textNode.innerHTML.indexOf(targetWord);
  if (index !== -1) {
    // Split at the beginning of the text
    nodeWord = textNode.splitText(index);

    // Split the new node again at the end of the word
    nodeAfter = nodeWord.splitText(targetWord.length);

    // Insert a new anchor in front of the word
    anchor = document.createElement('a');
    anchor.href = url;
    p.insertBefore(anchor, nodeWord);

    // Now move the word *into* the anchor
    anchor.appendChild(nodeWord);

    $rootScope.$apply();

  }
}



}

$rootScope.journalAtags = (element)=>{
  var i = 0;
  for (let element of $rootScope.mainJournal.data["journal.body"].value){
      i++
    // console.log(i);
    if(element.value.value[0].paragraph){
      if(element.value.value[0].paragraph.value[0].spans.length>0){
        for (let spans of element.value.value[0].paragraph.value[0].spans){
          var string = '#slice-li-text-p-'+i;
          var str = element.value.value[0].paragraph.value[0].text;
          var keyword = str.substring(spans.start, spans.end);
          $scope.searchKey(string, keyword, spans.data.value.url);
        }
      }
    }
  }
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



Journal.directive('journalText', ['$rootScope', function($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, element, attr){
        console.log(element);

        $rootScope.journalAtags(element);

    }
  };
}]);

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

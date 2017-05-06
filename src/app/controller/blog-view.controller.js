/**
 * Created by hamid on 8/30/16.
 */

(function () {
  'use strict';

  angular.module('app')
    .controller('BlogViewController', BlogViewController);

  /** @ngInject */

  function BlogViewController($scope, $http, $localStorage, $stateParams) {
    $scope.id = $stateParams.id;
    var blogAddress = 'http://ce419.herokuapp.com/blog/post';
    var commentAddress = 'http://ce419.herokuapp.com/blog/comment';
    var commentsAddress = 'http://ce419.herokuapp.com/blog/comments';

    $scope.skip = 0;
    $scope.limit = 10;
    $scope.comments = [];

    $scope.getPost = function() {
      $http({
        method: 'GET',
        url: blogAddress + "?id=" + $scope.id,
        headers: {'Content-Type': undefined, 'X-Token' : $localStorage.token},
        transformRequest: angular.identity
      }).success(function (response) {
        console.log(response);
        $scope.post = response.post;

      });
    };

    $scope.getPost();

    $scope.getMoreComments = function () {
      if ($scope.isDone)
        return;

      $http({
        method: 'POST',
        url: commentsAddress + '?post_id=' + $scope.id + '&count=' + $scope.limit + '&offset=' + $scope.skip,
        headers: {'Content-Type': undefined, 'X-Token' : $localStorage.token},
        transformRequest: angular.identity
      }).success(function (data) {
        if (data.status == 0) {


          if (data.comments.length == 0) {
            $scope.isDone = true;
            return
          }
          $scope.comments = $scope.comments.concat(data.comments);
          $scope.skip += $scope.limit;

        }
      });
    };

    $scope.getComments = function () {

      $http({
        method: 'POST',
        url: commentsAddress + '?post_id=' + $scope.id + '&count=' + $scope.limit + '&offset=' + $scope.skip,
        headers: {'Content-Type': undefined, 'X-Token' : $localStorage.token},
        transformRequest: angular.identity
      }).success(function (data) {
        if (data.status == 0) {
          $scope.comments = $scope.comments.concat(data.comments);
          $scope.skip += $scope.limit;
        }
      });
    };

    $scope.getComments();

    $scope.addComment = function () {
      var commentData = new FormData();
      var data = $scope.comment;
      data.post_id = $scope.id;
      Object.keys(data).forEach(function (el) {
        commentData.set(el, data[el])
      });
      $scope.addingComment = true;
      $http({
        method: 'POST',
        url: commentAddress,
        data: commentData,
        headers: {'Content-Type': undefined, 'X-Token' : $localStorage.token},
        transformRequest: angular.identity
      }).success(function (data) {
        $scope.addingComment = false;
        if (data.status == 0){
          $scope.comments = $scope.comments.concat(data.comment)
        }
      });
    }

    $scope.format = function (date) {
      if (!date)
        return;
      var timeStamp = new Date(date).getTime();
      timeStamp += 4*60*60*1000 + 30*60*1000;
      var time = new Date(timeStamp);
      var persianDate = moment(time.getFullYear() + ' ' +
        time.getMonth() + ' ' +
        time.getDay() + ' ' + time.getHours() + ' ' + time.getMinutes(),
        'YYYY MM DD HH mm').format('jYYYY/jMM/jDD HH:mm');
      return persianDate;
    }
  }
})();

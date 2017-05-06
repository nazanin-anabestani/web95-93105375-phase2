/**
 * Created by hamid on 8/30/16.
 */

(function () {
  'use strict';

  angular.module('app')
    .controller('BlogController', BlogController);

  /** @ngInject */

  function BlogController($scope, $http, $localStorage, $document, $window) {
    var blogAddress = 'http://ce419.herokuapp.com/blog/posts';
    var formData = new FormData();

    $scope.posts = [];
    $scope.skip = 0;
    $scope.limit = 3;

    $scope.getPosts = function() {
      if ($scope.isDone || $scope.isLoading)
        return;
      $scope.isLoading = true;
      var data = {count : $scope.limit, offset : $scope.skip };
      Object.keys(data).forEach(function (el) {
        formData.set(el, data[el])
      });
      $http({
        method: 'GET',
        url: blogAddress + '?count=' + $scope.limit + '&offset=' + $scope.skip,
        data: formData,
        headers: {'Content-Type': undefined, 'X-Token' : $localStorage.token},
        transformRequest: angular.identity
      }).success(function (data) {
        if (($scope.posts.length > 0) && (data.posts.length == 0 )) {
          $scope.isDone = true;
          return
        }
        $scope.posts = $scope.posts.concat(data.posts);
        $scope.skip += $scope.limit;
        $scope.isLoading = false;
      });
    };

    $scope.getPosts();

    angular.element($window).bind("scroll", function() {
      var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      var body = document.body, html = document.documentElement;
      var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
      var windowBottom = windowHeight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        $scope.getPosts();
      }
    });

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

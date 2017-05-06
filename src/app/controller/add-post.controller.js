/**
 * Created by hamid on 8/30/16.
 */

(function () {
  'use strict';

  angular.module('app')
    .controller('AddPostController', AddPostController);

  /** @ngInject */

  function AddPostController($scope, $http, $localStorage, $state, $stateParams) {
    $scope.id = $stateParams.id;
    var blogAddress = 'http://ce419.herokuapp.com/blog/post';
    var formData = new FormData();

    $scope.addPost = function() {
      Object.keys($scope.item).forEach(function (el) {
        formData.set(el, $scope.item[el])
      });

      $http({
        method: 'POST',
        url: blogAddress,
        data: formData,
        headers: {'Content-Type': undefined, 'X-Token' : $localStorage.token},
        transformRequest: angular.identity
      }).success(function (data) {
        $scope.post = data.post;
        $state.go('blog');

      });
    };

  }
})();

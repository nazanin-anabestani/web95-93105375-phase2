/**
 * Created by hamid on 8/30/16.
 */

(function () {
  'use strict';

  angular.module('app')
    .controller('LoginController', LoginController);

  /** @ngInject */

  function LoginController($scope, $http, $localStorage, $state) {
    var loginAddress = 'http://ce419.herokuapp.com/auth/login';
    var formData = new FormData();
    $scope.item = {};

    $scope.login = function() {
      $scope.loading = true;
      Object.keys($scope.item).forEach(function (el) {
        formData.set(el, $scope.item[el])
      });

      $http({
        method: 'POST',
        url: loginAddress,
        data: formData,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
      }).success(function (data) {
        $scope.loading = false;
        if (data.status == 0){
          $localStorage.username = $scope.item.student_number;
          $localStorage.password = $scope.item.password;
          $localStorage.token = data.token;
          $state.go('profile');
        }
      });
    }
  }
})();

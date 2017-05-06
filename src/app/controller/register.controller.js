/**
 * Created by hamid on 8/30/16.
 */

(function () {
  'use strict';

  angular.module('app')
    .controller('RegisterController', RegisterController);

  /** @ngInject */

  function RegisterController($scope, $http, $localStorage, $state) {
    var regAddress = 'http://ce419.herokuapp.com/auth/register';
    var loginAddress = 'http://ce419.herokuapp.com/auth/login';
    var formData = new FormData();
    $scope.item = {};

    $scope.add = function () {
      $scope.loading = true;
      Object.keys($scope.item).forEach(function (el) {
        formData.set(el, $scope.item[el])
      });

      $http({
        method: 'POST',
        url: regAddress,
        data: formData,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
      }).success(function (response) {
        $scope.loading = false;
        if (response.status == 0)
          login();
      });
    };

    function login() {
      $http({
        method: 'POST',
        url: loginAddress,
        data: formData,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
      }).success(function (data) {
        if (data.status == 0){
          $localStorage.username = $scope.item.student_number;
          $localStorage.password = $scope.item.password;
          $localStorage.token = data.token;
          $state.go('profile');
        }
        else
          $state.go('login');
      });
    }
  }
})();

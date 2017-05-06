/**
 * Created by hamid on 8/30/16.
 */
'use strict';
(function () {
  'use strict';

  angular.module('app').config(['$stateProvider', '$urlRouterProvider', Ctrl]);

  function Ctrl($stateProvider, $urlRouterProvider) {
    // For unmatched routes
    $urlRouterProvider.otherwise('/login');
    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: 'app/pages/register.html',
        controller: 'RegisterController'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/pages/login.html',
        controller: 'LoginController'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/pages/index.html',
        controller: 'PageController as controller'
      })
      .state('blog', {
      url: '/blog',
      templateUrl: 'app/pages/blog.html',
      controller: 'BlogController as controller'
    }).state('blog-view', {
      url: '/blog/:id',
      templateUrl: 'app/pages/blog-view.html',
      controller: 'BlogViewController as controller'
    }).state('timeline', {
      url: '/timeline',
      templateUrl: 'app/pages/timeline.html',
      controller: 'BlogViewController as controller'
    }).state('post-add', {
      url: '/add-post',
      templateUrl: 'app/pages/add-post.html',
      controller: 'AddPostController as controller'
    });
  }
})();

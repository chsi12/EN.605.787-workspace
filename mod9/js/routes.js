(function () {
    'use strict';
  
    angular.module('MenuApp')
      .config(RoutesConfig);
  
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
  
      $stateProvider
  
        .state('home', {
          url: '/',
          templateUrl: 'templates/home.template.html'
        })
  
        .state('categories', {
          url: '/categories',
          template: '<categories items="$ctrl.items"></categories>',
          controller: 'CategoriesController as $ctrl',
          resolve: {
            items: ['MenuDataService', function (MenuDataService) {
              return MenuDataService.getAllCategories()
                .then(function success(result) {
                  return result.data;
                });
            }]
          }
        })
  
        .state('items', {
          url: '/items/{categoryShortName}',
          template: '<items items="$ctrl.items" category="$ctrl.category"></items>',
          controller: 'ItemsController as $ctrl',
          resolve: {
            category: ['$stateParams', function ($stateParams) {
              return $stateParams.categoryShortName;
            }],
            items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
                .then(function success(result) {
                  return result.data['menu_items'];
                });
            }]
          }
        });
    }
  })();
  
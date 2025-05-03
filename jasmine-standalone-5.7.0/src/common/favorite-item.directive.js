(function () {
"use strict";
  
angular.module('common')
    .directive('validateFavoriteItem', ValidateFavoriteItemDirective);

ValidateFavoriteItemDirective.$inject = ['MenuService', '$q'];
function ValidateFavoriteItemDirective(MenuService, $q) {
    return {
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
        ngModel.$asyncValidators.favoriteExists = function (input) {
        if (!input) {
            return $q.resolve();
        }
        return MenuService.getMenuItem(input).then(function (menuItem) {
            if (menuItem) {
                return true;
            } else {
                return $q.reject('notfound');
            }
        });
        };
    }
    };
} })();
  
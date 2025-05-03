(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);
    
SignupController.$inject = ['MenuService', 'UserService'];
function SignupController(MenuService, UserService) {
    var $ctrl = this;
    $ctrl.user = {};
    $ctrl.menuError = false;
    $ctrl.saved = false;

    $ctrl.submit = function () {
        console.log("submit!");
        MenuService.getMenuItem($ctrl.user.favorite).then(function (item) {
            if (item) {
                var categoryName = MenuService.getMenuOrder(item.short_name)[1];
                $ctrl.menuError = false;
                UserService.saveUser($ctrl.user, item, categoryName);
                $ctrl.saved = true;
            } else {
                $ctrl.menuError = true;
                $ctrl.saved = false;
            }
        });
    };
}})();
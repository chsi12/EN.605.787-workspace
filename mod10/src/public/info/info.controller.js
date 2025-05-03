(function () {
"use strict";

angular.module('common')
    .controller('InfoController',InfoController);
    
InfoController.$inject = ['UserService'];
function InfoController(UserService) {
    var $ctrl = this;
    $ctrl.user = UserService.getUser();
}
})();
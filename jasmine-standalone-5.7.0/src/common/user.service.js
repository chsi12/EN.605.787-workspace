(function () {
"use strict";
  
angular.module('common')
.service('UserService', function () {
    var user = null;

    this.saveUser = function (info, favorite, category) {
        
        info.favoriteInfo = favorite;
        info.category = category;

        console.log(info);

        user = info;
        console.log("user saved!");
    };

    this.getUser = function () {
        return user;
    };
    });

})();
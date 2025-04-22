(function () {
    'use strict';
    angular.module('data')
    .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http'];
    function MenuDataService ($http) {
        var service = this;

        service.getAllCategories = function () {
            var response = $http({
                method: "GET",
                url: ("https://coursera-jhu-default-rtdb.firebaseio.com/categories.json"),
            });
            return response;
        }

        service.getItemsForCategory = function (categoryShortName) {
            var url = 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/'+categoryShortName+'.json'
            
            var response = $http({
                method: "GET",
                url: url
              });
              return response;
        };

        return service;
    }
})();
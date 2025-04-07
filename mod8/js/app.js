(function () {
    'use strict';
    angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService',MenuSearchService)
    .directive('foundItems',foundItems);
    
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController (MenuSearchService) {
        var control = this;

        control.searchTerm = "";
        control.found = [];
        control.result = false;

        control.search = function () {
            control.found = [];
            if(control.searchTerm.length == 0) control.result = false;
            else {
                var promise = MenuSearchService.getMatchedMenuItems(control.searchTerm);
                promise.then(function (foundItems) {
                    control.found = foundItems;
                    control.result = (control.found.length > 0);
                  })
                  .catch(function (error) {
                    console.log(error);
                  })
            }
        }
        control.removeItem = function (index) {
            control.found.splice(index,1);
        }
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService ($http) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            
            return $http({
                method: "GET",
                url: ("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"),
            }).then(function success(result) {
                    var menuItems = result.data;
                    var foundItems = [];
                    for(var category in menuItems) {
                        var items = menuItems[category].menu_items;
                        for(var item in items) {
                            var dish = items[item];

                            if(dish.description.includes(searchTerm)) {
                                foundItems.push(dish);
                            }
                        }
                    }
                    return foundItems;
                });
        };

        return service;
    }

    function foundItems (){
        var ddo = {
            restrict: 'E',
            templateUrl: "foundItems.html",
            scope: {
                foundItems: '<',
                onRemove: '&',
                query: '<'
            }
        };
        return ddo;
    }

})();
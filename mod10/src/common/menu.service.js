(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };

  service.getMenuOrder = function(menuItem) {
    
    var order = menuItem.match(/^([a-zA-Z]+)(\d+)$/);
    order[2] = order[2] - 1;
    return order;
  }

  service.getMenuItem = function(item) {
    var order = this.getMenuOrder(item);
    if (order) {
      const shortName = order[1];
      const number = order[2];

      return $http.get(ApiPath + '/menu_items/' + shortName + '/menu_items/' + number + '.json').then(function (response) {
        return response.data;
      });
    } else {
      return null;
    }
  }
}

})();

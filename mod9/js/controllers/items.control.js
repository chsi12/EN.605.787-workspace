(function () {
    'use strict';
  
    angular.module('MenuApp')
      .controller('ItemsController', ItemsController);
  
    function ItemsController(category,items) {
      var control = this;
      control.category = category;
      control.items = items;
    }
  })();
  
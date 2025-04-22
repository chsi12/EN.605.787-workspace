(function () {
    'use strict';
  
    angular.module('MenuApp')
      .controller('CategoriesController', CategoriesController);
  
    function CategoriesController(items) {
      var control = this;
      control.items = items;
    }
  })();
  
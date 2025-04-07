(function () {
    'use strict';
    angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService)
    .filter('angularDollar',angularDollar);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController (ShoppingListCheckOffService) {
        var showList = this;
        showList.items = ShoppingListCheckOffService.getToBuy();
        showList.buy = function (itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        }
    }
    
    function AlreadyBoughtController (ShoppingListCheckOffService) {
        var showList = this;
        showList.items =  ShoppingListCheckOffService.getBought();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var buyList = [ {name: "cookies", quantity: 10, pricePerItem: 2}, 
            {name: "chips", quantity: 10, pricePerItem: 3},
            {name: "salmon", quantity: 1, pricePerItem: 20},
            {name: "onions", quantity: 2, pricePerItem: 10},
            {name: "potatoes", quantity: 4, pricePerItem: 5}];
        var boughtList = [];

        service.getToBuy = function () {
            return buyList;
        }
        service.getBought = function () {
            return boughtList;
        }

        service.buyItem = function(index) {
            var item = buyList[index];
            buyList.splice(index,1);
            boughtList.push(item);
        }

        return service;
    }

    function angularDollar() {
        return function (item) {
            item = item || {name: "", quantity:0, pricePerItem:0};
            var value = item.quantity * item.pricePerItem;

            return value;
        }
    }

})();
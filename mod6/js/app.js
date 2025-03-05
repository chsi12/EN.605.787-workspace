(function () {
    'use strict';
angular.module('LunchChecker',[])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
    
function LunchCheckController ($scope) {
   $scope.checkResult = "";
   $scope.checkLunch = function () {
    var res = checkLunch($scope.itemlist);
    $scope.msgStyle = res[0];
    $scope.textBoxStyle = res[0];
    $scope.checkResult = res[1];
  };

   function checkLunch(string) {
    var msg = "Please enter data first";
    if(!string) {
        return ["red",msg];
    }
    //removes filters out empty entries
    var items = string.split(",").filter(isEmpty);
    
    var color = "green";
    if(items.length > 3) {
        msg = "Too much!";
    } else if(items.length > 0) {
        msg = "Enjoy!";
    } else {
      color = "red";
    }
    return [color,msg];
  }

  function isEmpty (string) {
    return string.trim() !== '';
  }
}
})();
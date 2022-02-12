(function () {
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.menu = ""; // "snack,cookies";

    const default_parser_message =
      "Empty items should be ignored in this version." +
      "<br/>Try: 'pizza, sauerkraut ,, icecream'";
    $scope.parser_message = default_parser_message;
    $scope.parser_status = "default";

    $scope.too_much = function () {
      var items = $scope.menu.split(',');
      console.log(items);
      if ($scope.menu == "") {
        $scope.message = "Please enter data first";
        $scope.status_class = "error";
        $scope.parser_message = default_parser_message;
      } else {
        $scope.parser_status = "unchanged";
        var light_menu = items.filter(is_dish);
        var items_removed = items.length - light_menu.length;
        if (items_removed) {
          $scope.parser_message = `${items_removed} empty item(s) have been removed.`;
          $scope.parser_status = "skimmed";
        } else {
          $scope.parser_message = default_parser_message;
          $scope.parser_status = "default";
        };
        $scope.message = light_menu.length <= 3 ? "Enjoy!" : "Too much!";
        $scope.status_class = "ok";
      }
    };
  }

  function is_dish(item) {
    return (item.trim()!="");
  }
})();

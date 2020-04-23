(function(){
'use strict'

angular.module('LunchCheck', [])

.controller('LunchCheckController',LunchCheckController);
    
LunchCheckController.$inject = ['$scope'];
    
function LunchCheckController($scope){
    
    $scope.items = "";
    
    $scope.message = "";
    
    $scope.checker = function(){
        
        if ($scope.items == "") {
            
            $scope.message = "Please enter data first";
        
        } else {
            
            var itemsEntered = $scope.items.split(',');
            var NumOfItems = itemsEntered.length;
            $scope.message = msg(NumOfItems);
        
        }
    };
    
    function msg(num){
        
        var textDisplayed = "";
        
        if (num>3) {
            
            textDisplayed = "Too much!";
        
        } else {
            
            textDisplayed = "Enjoy!";
        
        }
        
        return textDisplayed;
    }
};
    
    
})();
(function(){
'use strict'
    
angular.module('MenuApp')
.controller('itemsController',itemsController);

itemsController.$inject = ['items'];
function itemsController(items){
    
    var itemctrl = this;
    itemctrl.items = items;
    
    
}
    

})();
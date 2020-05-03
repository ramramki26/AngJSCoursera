(function(){
'use strict'
    
angular.module('MenuApp')
.controller('categoriesController',categoriesController);

categoriesController.$inject = ['categories'];
function categoriesController(categories){
    
    var catctrl = this;
    catctrl.categories = categories;
    
    
}
    

})();
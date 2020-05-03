(function(){
'use strict'
    
angular.module('MenuApp')
.component('categoriesComponent',{
    
    templateUrl: 'src/templates/categoriesTemplate.html',
    bindings: {
        
        categories: '<'
    }
})
    

})();

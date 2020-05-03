(function(){
'use strict'
    
angular.module('MenuApp')
.component('itemsComponent',{
    
    templateUrl: 'src/templates/itemsTemplate.html',
    bindings: {
        
        items: '<',

    }
})
    

})();

(function(){
'use strict'
    
angular.module('ShoppingListCheckOff',[])
    
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    
function ToBuyController(ShoppingListCheckOffService){
    var tbc = this;
    tbc.toBuyItems = ShoppingListCheckOffService.showItems("toBuyItems");
    tbc.Bought = function(index){
        
        ShoppingListCheckOffService.Bought(index);
    }
}

    
function AlreadyBoughtController(ShoppingListCheckOffService){
    var abc = this;
    abc.boughtItems = ShoppingListCheckOffService.showItems("boughtItems");
}

function ShoppingListCheckOffService(){
    var service = this;
    
    var toBuyItems = [
        
        { 
            name: "Soaps",
            quantity: 3  
        },
        
        { 
            name: "Pens",
            quantity: 5  
        },
        
        { 
            name: "Eggs",
            quantity: 12  
        },
        
        { 
            name: "T-shirts",
            quantity: 2  
        },
        
        { 
            name: "Hammer",
            quantity: 1  
        }
    ];
    
    var boughtItems = [];
    
    service.Bought = function(itemIndex){
        
        boughtItems.push(toBuyItems[itemIndex]);
        toBuyItems.splice(itemIndex,1);
    }
    
    service.showItems = function(reqItems){
        if (reqItems=="toBuyItems"){
            
            return toBuyItems;
            
        } else {
            
            return boughtItems
        }
        
    }
    
}
})();
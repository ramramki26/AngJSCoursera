(function(){
'use strict'
    
angular.module('NarrowItDownApp',[])
    
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems',FoundItemsDirective);

function FoundItemsDirective(){
    var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
            found: '<',
            onRemove: '&',
            notFound: '<'
        }
    }
    
    return ddo;
}
    
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
    var nid = this;
    nid.getMatchedMenuItems = function(searchTerm){
        
        nid.nothingFound = false;
        if(searchTerm!=="" && searchTerm!== undefined){
            
            MenuSearchService.getMatchedMenuItems(searchTerm).then(function(){
                
                nid.found = MenuSearchService.getItems();
                 if(nid.found.length===0){
          
          nid.nothingFound = MenuSearchService.nothingFound();
      }
                
            })
        } else {
            
            nid.nothingFound = MenuSearchService.nothingFound();

        }
     
         
    }
    
    nid.removeItem = function (itemIndex) {
        MenuSearchService.removeItem(itemIndex);
  }
}


MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;
  var foundItems = [];
  service.getMatchedMenuItems = function (searchTerm) {
      foundItems.splice(0,foundItems.length)
    var response = $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json"
    });

    return response.then(function(response){
           
    for (var i = 0; i < response.data.menu_items.length; i++) {
      var item = response.data.menu_items[i];
      var itemDesc = item.description
      if (itemDesc.toLowerCase().indexOf(searchTerm) !== -1) {
        
          foundItems.push(item);
      }
    }
  });
}
  service.getItems = function (){
      
      return foundItems;
  }
  
  service.removeItem = function(itemIndex) {
      
      foundItems.splice(itemIndex,1)
  }
  
  service.nothingFound = function(){
      
      return true;
  }
}
})();

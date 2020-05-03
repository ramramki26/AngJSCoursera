(function(){
'use strict'
    
angular.module('data')
.service('MenuSearchService',MenuSearchService)

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;
    
  service.getCategories = function(){
  var foundItems = [];
  var response = $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/categories.json"
    })
    
    return response.then(function(response){
           
    for (var i = 0; i < response.data.length; i++) {
      var item = response.data[i];
      foundItems.push(item);
    }
     return foundItems;   
  })
}
  
  service.getItems = function(categoryShortName){
      var foundItems = [];
      var response = $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category=" + categoryShortName)
    })
    
    return response.then(function(response){
           
    for (var i = 0; i < response.data.menu_items.length; i++) {
      var item = response.data.menu_items[i];
      foundItems.push(item);
    }
     return foundItems;   
  })
      
  }

}
  


})();

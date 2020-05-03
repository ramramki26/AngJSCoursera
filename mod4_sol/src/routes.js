(function(){
'use strict'
    
angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider,$urlRouterProvider){
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
    
    .state('home',{
        
        url:'/',
        templateUrl: 'src/templates/homeTemplate.html',
        
    })
    
    .state('categories',{
        
        url:'/categories',
        templateUrl: 'src/templates/CategoryPageTemplate.html',
        controller: 'categoriesController as catctrl',
        resolve: {
            
            categories: ['MenuSearchService',function(MenuSearchService){
        
                return MenuSearchService.getCategories();
    }]
        
    }
    })
    
    .state('items',{
        
        url:'/menu-items/{categoryShortName}',
        templateUrl: 'src/templates/itemsPageTemplate.html',
        controller: 'itemsController as itemctrl',
        resolve: {
            
            items: ['$stateParams','MenuSearchService',function($stateParams,MenuSearchService){
        
                return MenuSearchService.getItems($stateParams.categoryShortName);
    }]
        }
    });
    
    
}
    

})();

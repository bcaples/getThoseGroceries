//Define Angularjs Application
var getThoseGroceries = angular.module('getThoseGroceries',['ngCookies']);

//Run Angularjs Application
getThoseGroceries.run(function(){

});

//Needed For Laravel
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

//Angularjs Routing
getThoseGroceries.config(function($routeProvider, $locationProvider){
	$routeProvider.when('/',{
        templateUrl: '../resources/js/templates/groceryList.html',
        controller: 'GetGroceryList'
    })

    .when('/search_display_models',{
        templateUrl:'../resources/js/templates/groceryListItems.html',
        controller:'GetGroceryListItems'
    });
});
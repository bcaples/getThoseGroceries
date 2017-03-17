//Define Angularjs Application
var getThoseGroceries = angular.module('getThoseGroceries',['ngCookies', 'ngRoute', 'ngAnimate']);

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
        templateUrl: '../resources/js/templates/login.html',
    })

    .when('/groceryList',{
        templateUrl:'../resources/js/templates/groceryList.html',
    })

    .when('/groceryListItems/:listID',{
        templateUrl:'../resources/js/templates/groceryListItems.html',
    });
});
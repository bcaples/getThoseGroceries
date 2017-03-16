//Define Angularjs Controller
getThoseGroceries.controller('GroceryListController', ['$scope', '$http', '$cookieStore', 'listData', function($scope, $http, $cookieStore, listData) {
	
	$scope.getList = function() {
        $scope.userID = $cookieStore.get('userID');
        listData.getList($scope.userID, function(result) {
        	console.log("Get List Result", result);
		    $scope.list = result.list;
		});
    };
    
    $scope.addList = function() {
    	$scope.userID = $cookieStore.get('userID');
        $http({
                method: 'POST',
                data: {listName: $scope.listName, userID: $scope.userID},
                url: '/getThoseGroceries/public/addList'
        }).then(function successCallback(response) {
        	$scope.response = response.data;
        	$('#list_name').val('');
			console.log("Auth Response: ", response);
			$scope.getList();
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.deleteList = function() {
    	console.log("Delete Scope: ", $scope);
    	var deleteList = [];
    	
    	$.each($scope.list, function( key, value ) {
		  	console.log(key + ": " + value);
		  	$.each(value, function(key, value) {
			  	console.log(key + ": " + value);
			  	if (key == 'id') {
			  		console.log("Key Equals ID: ", key);
			  		if ($('#checkbox_' + value).is(':checked')) {
			  			console.log("Delete Item Checked: ", 'checkbox-' + value);
			  			deleteList.push(value);
			  		}
				}
			});
		});
        console.log("Delete List: ", deleteList);
        $http({
                method: 'POST',
                data: {deleteList: deleteList},
                url: '/getThoseGroceries/public/deleteList'
        }).then(function successCallback(response) {
        	$scope.response = response.data;
        	$scope.getList();
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.backButton = function() {
    	$('.back-button').removeClass('hidden');
    };

}]);

getThoseGroceries.factory('listData', function($http) { 
	return{
		getList: function(userID, response){
		    $http({
		            method: 'POST',
		            data: {userID: userID},
		            url: '/getThoseGroceries/public/getList'
		    }).success(response);
	    }
	}
});
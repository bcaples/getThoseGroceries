//Define Angularjs Controller
getThoseGroceries.controller('GroceryListItemsController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	$scope.listID = $routeParams.listID;
	
	$scope.getItems = function() {
        console.log("Get List ID: ", $scope.listID);
        $http({
                method: 'POST',
                data: {listID: $scope.listID},
                url: '/getThoseGroceries/public/getItems'
        }).then(function successCallback(response) {
        	$scope.items = response.data.items;
			console.log("Get List: ", $scope.items);
        }, function errorCallback(response) {
            console.log(response);
        });
    };
    
    $scope.addItem = function() {
        $http({
                method: 'POST',
                data: {itemName: $scope.itemName, listID: $scope.listID},
                url: '/getThoseGroceries/public/addItem'
        }).then(function successCallback(response) {
        	$scope.response = response.data;
        	$('#item_name').val('');
			console.log("Auth Response: ", response);
			$scope.getItems();
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.deleteItems = function() {
    	console.log("Delete Scope: ", $scope);
    	var deleteItems = [];
    	
    	$.each($scope.items, function( key, value ) {
		  	console.log(key + ": " + value);
		  	$.each(value, function(key, value) {
			  	console.log(key + ": " + value);
			  	if (key == 'id') {
			  		console.log("Key Equals ID: ", key);
			  		if ($('#checkbox_' + value).is(':checked')) {
			  			console.log("Delete Item Checked: ", 'checkbox-' + value);
			  			deleteItems.push(value);
			  		}
				}
			});
		});
        console.log("Delete List: ", deleteItems);
        $http({
                method: 'POST',
                data: {deleteItems: deleteItems},
                url: '/getThoseGroceries/public/deleteItems'
        }).then(function successCallback(response) {
        	$scope.response = response.data;
        	$scope.getItems();
        }, function errorCallback(response) {
            console.log(response);
        });
    };

}]);
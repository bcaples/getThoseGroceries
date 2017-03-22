//Define GroceryList Controller
getThoseGroceries.controller('GroceryListController', ['$scope', '$http', '$cookieStore', function($scope, $http, $cookieStore) {
	
    $scope.userID = $cookieStore.get('userID');

	//Get List
    $scope.getList = function() {
        $http({
                method: 'POST',
                data: {userID: $scope.userID},
                url: '/getThoseGroceries/public/getList'
        }).then(function successCallback(response) {
            $scope.list = response.data.list;
        }, function errorCallback(response) {
               location.reload();
               console.log("Error Processing Data");
        });
    };
    
    //Add list
    $scope.addList = function() {
    	if ($scope.listName == "" || typeof $scope.listName == "undefined" || $scope.listName == null) {
    		return false;
    	}

        $http({
                method: 'POST',
                data: {listName: $scope.listName, userID: $scope.userID},
                url: '/getThoseGroceries/public/addList'
        }).then(function successCallback(response) {
        	$scope.response = response.data;
        	$scope.listName = "";
        	$('#list_name').val('');
			$scope.getList();
        }, function errorCallback(response) {
            alert("Error Processing Data");
        });
    };

    //Delete List
    $scope.deleteList = function() {
    	var deleteList = [];
    	
    	$.each($scope.list, function( key, value ) {
		  	$.each(value, function(key, value) {
			  	if (key == 'id') {
			  		if ($('#checkbox_' + value).is(':checked')) {
			  			deleteList.push(value);
			  		}
				}
			});
		});
        
        $http({
                method: 'POST',
                data: {deleteList: deleteList},
                url: '/getThoseGroceries/public/deleteList'
        }).then(function successCallback(response) {
        	$scope.response = response.data;
        	$scope.getList();
        }, function errorCallback(response) {
            alert("Error Processing Data");
        });
    };

    //Show Back Button
    $scope.backButton = function() {
    	$('.back-button').removeClass('hidden');
    };

}]);
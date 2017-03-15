//Define Angularjs Controller
getThoseGroceries.controller('GroceryListController', ['$scope', '$http', '$cookieStore', function($scope, $http, $cookieStore) {
	
	$scope.getList = function() {
        $scope.userID = $cookieStore.get('userID');
        $http({
                method: 'POST',
                data: {userID: $scope.userID},
                url: '/getThoseGroceries/public/getList'
        }).then(function successCallback(response) {
        	$scope.list = response.data.list;
			console.log("Get List: ", $scope.list);
        }, function errorCallback(response) {
            console.log(response);
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
			console.log("Auth Response: ", response);
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.deleteList = function() {
        $http({
                method: 'POST',
                data: {emailAddress: $scope.emailAddress},
                url: '/getThoseGroceries/public/addLogin'
        }).then(function successCallback(response) {
        	$scope.response = response.data;
        	console.log("Save User: ", response);
        	console.log("User ID: ", $scope.response.userID);
            if ($scope.response.userID != "" && typeof $scope.response.userID != "undefined" && $scope.response.userID != null) {
            	$cookies.put('emailAddress', $scope.emailAddress);
            	$cookies.put('emailAddress', $scope.response.userID);
				$location.path('/groceryList');
			}else {
				$('#loginSubmit').append('<h3 class="login_error" style="color: red;">Error Creating Login</h3>');
			}
        }, function errorCallback(response) {
            console.log(response);
        });
    };

}]);
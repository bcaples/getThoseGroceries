//Define Angularjs Controller
getThoseGroceries.controller('LoginController', ['$scope', '$http', '$cookies', '$location', function($scope, $http, $cookies, $location) {
   
    $scope.emailAddressCookie = $cookies.get('emailAddress');
    
    $scope.initLogin = function() {
        if ($scope.response.emailAddressCookie != "" && typeof $scope.response.emailAddressCookie != "undefined" && $scope.response.emailAddressCookie != null ) {
    		$location.path('/groceryList');
    	}
    };
    
    $scope.authLogin = function() {
        $http({
                method: 'POST',
                data: {emailAddress: $scope.emailAddress},
                url: '/getThoseGroceries/public/authLogin'
        }).then(function successCallback(response) {
        	$scope.response = response.data;
			console.log("Auth Response: ", response);
			console.log("User ID: ", $scope.response.userID);
			if ($scope.response.userID != "" && typeof $scope.response.userID != "undefined" && $scope.response.userID != null) {
				$location.path('/groceryList');
			}else {
				$scope.addLogin();
			}
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.addLogin = function() {
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
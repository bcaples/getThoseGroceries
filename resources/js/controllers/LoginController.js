//Define Angularjs Controller
getThoseGroceries.controller('LoginController', ['$scope', '$http', '$cookies', '$cookieStore', '$location', function($scope, $http, $cookies, $cookieStore, $location) {
   
    $scope.initLogin = function() {
    	console.log('Init Login');
    	$scope.emailAddressCookie = $cookieStore.get('emailAddress');
        if ($scope.emailAddressCookie != "" && typeof $scope.emailAddressCookie != "undefined" && $scope.emailAddressCookie != null) {
        	$scope.userID = $cookieStore.get('userID');
    		$location.path('/groceryList').search({param: $scope.userID});
    		console.log('Init Login Logged You In: ', $scope.userID);
    	}
    };
    
    $scope.authLogin = function() {
    	if ($scope.emailAddress == "" || typeof $scope.emailAddress == "undefined" || $scope.emailAddress == null) {
    		return false;
    	}

        $http({
                method: 'POST',
                data: {emailAddress: $scope.emailAddress},
                url: '/getThoseGroceries/public/authLogin'
        }).then(function successCallback(response) {
        	$scope.response = response.data;
			console.log("Auth Response: ", response);
			console.log("User ID: ", $scope.response.userID);
			if ($scope.response.userID != "" && typeof $scope.response.userID != "undefined" && $scope.response.userID != null) {
				$cookieStore.put('emailAddress', $scope.emailAddress);
            	$cookieStore.put('userID', $scope.response.userID);
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
            	$cookieStore.put('emailAddress', $scope.emailAddress);
            	$cookieStore.put('userID', $scope.response.userID);
				$location.path('/groceryList');
			}else {
				$('#loginSubmit').append('<h3 class="login_error" style="color: red;">Error Creating Login</h3>');
			}
        }, function errorCallback(response) {
            console.log(response);
        });
    };

}]);
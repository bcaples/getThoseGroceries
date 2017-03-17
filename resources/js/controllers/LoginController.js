//Define Angularjs Controller
getThoseGroceries.controller('LoginController', ['$scope', '$http', '$cookies', '$cookieStore', '$location', function($scope, $http, $cookies, $cookieStore, $location) {
   	//Login User In If Cookie Set
    $scope.initLogin = function() {
    	$scope.emailAddressCookie = $cookieStore.get('emailAddress');
        if ($scope.emailAddressCookie != "" && typeof $scope.emailAddressCookie != "undefined" && $scope.emailAddressCookie != null) {
        	$scope.userID = $cookieStore.get('userID');
    		$location.path('/groceryList').search({param: $scope.userID});
    	}
    };
    
    //Login User In With Email Address
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
			if ($scope.response.userID != "" && typeof $scope.response.userID != "undefined" && $scope.response.userID != null) {
				$cookieStore.put('emailAddress', $scope.emailAddress);
            	$cookieStore.put('userID', $scope.response.userID);
				$location.path('/groceryList');
			}else {
				$scope.addLogin();
			}
        }, function errorCallback(response) {
            alert("Error Processing Data");
        });
    };

    //If No Login Exist Add One And Log User In
    $scope.addLogin = function() {
        $http({
                method: 'POST',
                data: {emailAddress: $scope.emailAddress},
                url: '/getThoseGroceries/public/addLogin'
        }).then(function successCallback(response) {
        	$scope.response = response.data;
            if ($scope.response.userID != "" && typeof $scope.response.userID != "undefined" && $scope.response.userID != null) {
            	$cookieStore.put('emailAddress', $scope.emailAddress);
            	$cookieStore.put('userID', $scope.response.userID);
				$location.path('/groceryList');
			}else {
				$('#loginSubmit').append('<h3 class="login_error" style="color: red;">Error Creating Login</h3>');
			}
        }, function errorCallback(response) {
            alert("Error Processing Data");
        });
    };

}]);
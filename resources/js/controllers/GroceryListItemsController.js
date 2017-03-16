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
    	if ($scope.itemName == "" || typeof $scope.itemName == "undefined" || $scope.itemName == null) {
    		return false;
    	}

        $http({
                method: 'POST',
                data: {itemName: $scope.itemName, listID: $scope.listID},
                url: '/getThoseGroceries/public/addItem'
        }).then(function successCallback(response) {
        	$scope.response = response.data;
        	$scope.itemName = "";
        	$('#item_name').val('');
			console.log("Auth Response: ", response);
			$scope.getItems();
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.showEdit = function($id) {
        $('.edit-panel').removeClass('hidden');
        $scope.editPanel($id);
    };

    $scope.hideEdit = function() {
        $('.edit-panel').addClass('hidden');
    };

    $scope.editPanel = function($id) {
    	$scope.id = parseInt($id)
        $http({
                method: 'POST',
                data: {itemID: $scope.id},
                url: '/getThoseGroceries/public/editPanel'
        }).then(function successCallback(response) {
        	$scope.itemEdit = response.data.itemEdit;
        	
        	$('.item-input-edit').val($scope.itemEdit.itemName);
        	console.log("dsfsdfds");
        	if ($scope.itemEdit.itemName.itemStatus == 'purchased') {
        		$("#purchased").attr('checked', 'checked');
        		console.log("It Ran Checvke");
        	}
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.editItem = function($id) {
    	$scope.id = parseInt($id)
    	console.log("dfdsfdfsdf", $scope.itemNameEdit);
    	if ($('#purchased').is(':checked')) {
    		$scope.itemStatusEdit = "purchased";
    	}else {
    		$scope.itemStatusEdit = "not_purchased";
    	}

        $http({
                method: 'POST',
                data: {itemID: $scope.id, itemNameEdit: $scope.itemNameEdit, itemStatusEdit: $scope.itemStatusEdit},
                url: '/getThoseGroceries/public/editItem'
        }).then(function successCallback(response) {
        	console.log(response);
        	$scope.response = response.data;
        	$('#purchased').prop('checked',false);
        	$('.edit-panel').addClass('hidden');
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

    $scope.printItems = function() {
        var mywindow = window.open('', 'PRINT', 'height=400,width=600');
		mywindow.document.write('<html><head><title>Grocery List</title>');
		mywindow.document.write('<style>.item-header-name{padding-right: 20px;}</style>');
	    mywindow.document.write('</head><body>');
	    mywindow.document.write($('.print-items').html());
	    mywindow.document.write('</body></html>');
		mywindow.print();
	    mywindow.close();
    };

    $scope.emailItems = function() {
    	$scope.emailHTML = $('.email-items').html();
        $http({
                method: 'POST',
                data: {emailSend: $scope.emailSend, emailHTML: $scope.emailHTML},
                url: '/getThoseGroceries/public/emailItems'
        }).then(function successCallback(response) {
        	console.log(response);
        }, function errorCallback(response) {
            console.log(response);
        });
    };
}]);
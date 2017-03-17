//Define Angularjs Controller
getThoseGroceries.controller('GroceryListItemsController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	$scope.listID = $routeParams.listID;
	
    //Get Items
	$scope.getItems = function() {
        $http({
                method: 'POST',
                data: {listID: $scope.listID},
                url: '/getThoseGroceries/public/getItems'
        }).then(function successCallback(response) {
        	$scope.items = response.data.items;
            console.log("lkdfkljdlkj: ", $scope.items);
        }, function errorCallback(response) {
            alert("Error Processing Data", $scope.items);
        });
    };
    
    //Add Items
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
			$scope.getItems();
        }, function errorCallback(response) {
            alert("Error Processing Data");
        });
    };

    //Show Edit Panel
    $scope.showEdit = function($id) {
        $('.edit-panel').removeClass('hidden');
        $scope.editPanel($id);
    };

    //Hide Edit Panel
    $scope.hideEdit = function() {
        $('.edit-panel').addClass('hidden');
    };

    //Get Edit Panel Data
    $scope.editPanel = function($id) {
    	$scope.id = parseInt($id)
        
        $http({
                method: 'POST',
                data: {itemID: $scope.id},
                url: '/getThoseGroceries/public/editPanel'
        }).then(function successCallback(response) {
        	$scope.itemEdit = response.data.itemEdit;
        	
        	$('.item-input-edit').val($scope.itemEdit.itemName);
            $scope.itemNameValidate = $scope.itemEdit.itemName;
        	if ($scope.itemEdit.itemStatus !== 'Not Purchased') {
        		$("#purchased").prop('checked', true);
                $scope.itemStatusValidate = 'purchased';
        	}else {
                $scope.itemStatusValidate = 'not_purchased';
            }
        }, function errorCallback(response) {
            alert("Error Processing Data");
        });
    };

    //Edit Item
    $scope.editItem = function($id) {
    	if ($scope.itemNameEdit == "" || typeof $scope.itemNameEdit == "undefined" || $scope.itemNameEdit == null) {
            if ($scope.itemStatusValidate == $scope.itemStatusEdit) {
                return false;
            }
    	}
        
        $scope.itemNameEdit = $('.item-input-edit').val();

    	$scope.id = parseInt($id)

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
        	$scope.response = response.data;
            $('.item-input-edit').val('');
        	$('#purchased').prop('checked', false);
            $('.edit-panel').addClass('hidden');
			$scope.getItems();
        }, function errorCallback(response) {
            alert("Error Processing Data");
        });
    };

    //Delete Item
    $scope.deleteItems = function() {
    	var deleteItems = [];
    	
    	$.each($scope.items, function( key, value ) {
		  	$.each(value, function(key, value) {
			  	if (key == 'id') {
			  		if ($('#checkbox_' + value).is(':checked')) {
			  			deleteItems.push(value);
			  		}
				}
			});
		});
        
        $http({
                method: 'POST',
                data: {deleteItems: deleteItems},
                url: '/getThoseGroceries/public/deleteItems'
        }).then(function successCallback(response) {
        	$scope.response = response.data;
        	$scope.getItems();
        }, function errorCallback(response) {
            alert("Error Processing Data");
        });
    };

    //Print Item
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

    //Email List
    /*$scope.emailListItems = function() {
        $http({
                method: 'POST',
                data: {emailAddress: $scope.emailAddess, $('.print-items').html()},
                url: '/getThoseGroceries/public/emailListItems'
        }).then(function successCallback(response) {
            $scope.response = response.data;
        }, function errorCallback(response) {
            alert("Error Processing Data");
        });
    };*/
}]);
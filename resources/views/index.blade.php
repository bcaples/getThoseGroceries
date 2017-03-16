<html>
<head>
	<meta charset="UTF-8">
	<title>Get Those Groceries!</title>
	<!-- Style Sheets -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/css/tether.min.css"/>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"/>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/css/bootstrap-select.min.css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.3.1/css/mdb.min.css"/>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
	<link rel="stylesheet" href="../resources/assets/css/style.css?version=4"/>

	<!-- Script Tags -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.1.0/angular.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.1.0/angular-sanitize.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.1.0/angular-cookies.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/js/bootstrap.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.2/js/bootstrap-select.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.3.1/js/mdb.min.js"></script>
	<script src="../resources/js/app.js"></script>
	<script src="../resources/js/controllers/GroceryListController.js"></script>
	<script src="../resources/js/controllers/GroceryListItemsController.js"></script>
	<script src="../resources/js/controllers/LoginController.js"></script>
</head>
<body ng-app="getThoseGroceries">
	<div class="header">
		<a href="#groceryList" class="btn btn-primary back-button hidden" onclick="$('.back-button').addClass('hidden');">Back To List</a>
		<h1 class="h1-responsive" align="center">Get Those Groceries!</h1>
	</div>
	<div class="container view-slide-in" id="view" autoscroll="true" ng-view>
    </div>
</body>
</html>
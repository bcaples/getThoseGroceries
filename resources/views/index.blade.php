<html>
<head>
	<meta charset="UTF-8">
	<title>Get Those Groceries</title>
	<!-- Style Sheets -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/css/tether.min.css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"/>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.3.1/css/mdb.min.css" />

	<!-- Script Tags -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.1.0/angular.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.1.0/angular-sanitize.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.1.0/angular-cookies.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/js/bootstrap.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.3.1/js/mdb.min.js"></script>
	<script src="../resources/js/app.js"></script>
	<style>
		.view-slide-in.ng-enter {
          transition: all 1s ease;
          -webkit-transition:all 1s ease;
          -moz-transition: all 1s ease;
          -o-transition: all 1s ease;
          /*opacity: 0;*/
          position: relative;
          left: -400px;
          /*width: 0;*/
        }

        .view-slide-in.ng-enter.ng-enter-active {
          /*opacity: 1;*/
          left: 0;
          /*width: 100%;*/
        }

        .view-slide-in.ng-leave.ng-leave-active{
          /*opacity: 1;*/
          right: -400px;
        }

        .view-slide-in.ng-leave{
          /*opacity: 0;*/
          right: 0px;
        }
	</style>
</head>
<body ng-app="getThoseGroceries">
	<h2 class="md-display-1">Get Those Groceries</h2>
	<div class="container view-slide-in" id="view" autoscroll="true" ng-view>
    </div>
</body>
</html>
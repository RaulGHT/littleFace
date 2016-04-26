angular.module("lf.notifications", [])
	.controller('notificationsCtrl', function($scope,$interval, notifRes) {
    	//$scope.userId = $scope.post.user_id;
    	$scope.maxItems = 5;
    	$scope.notifs = notifRes.query({limit: $scope.maxItems});
    	$scope.notifs.$promise.then(
				function(res) {
					$interval(function(){
			
					$scope.notifs=notifRes.query({limit: $scope.maxItems}); 
                    //$scope.notif=notifRes.get({id: $stateParams.id}); 
			        },10000);
    				},
    				function(err) { 
					console.log(err);
				
				});
				
    	// TODO : repeat every 5s notifRes.query({limit: $scope.maxItems, last: $scope.notifs[0].id});
    	//
    	// TODO: use this in view "_navbar" dropdown:
    	//		https://angular-ui.github.io/bootstrap/#dropdown
    	//		http://getbootstrap.com/components/#badges
	});
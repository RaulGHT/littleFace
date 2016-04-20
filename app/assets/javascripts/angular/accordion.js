angular.module("lf.accordion", [])
	.controller('accordionCtrl', function($scope, $q, $timeout, postRes) {
		$scope.data = [{label:'December', posts: []},
		               {label:'November', posts: []},
		               {label:'October', posts: []},
		               {label:'September', posts: []},
		               {label:'August', posts: []},
		               {label:'July', posts: []},
		               {label:'June', posts: []},
		               {label:'May', posts: []},
		               {label:'April', posts: []},
		               {label:'March', posts: []},
		               {label:'February', posts: []},
		               {label:'January', posts: []}];
	
		postRes.query({action: 'recent'}).$promise.then(
			function(res) {
				for (j=0; j<$scope.data.length; j++) {
					angular.copy(res[$scope.data.length - 1 - j], $scope.data[j]['posts']);
				}
				// Toggle first panel with posts
				$timeout(function () {
					for (var i = 0, len = $scope.accordion.groups.length; i < len; i++) {
						var psc = $scope.accordion.groups[i].$parent;
						if (psc.month.posts.length > 0) {
							psc.open = true;
							break;
						}
					}
				}, 1);
		});
		
	    $scope.$watch('lastPost',
	        function (post) {
	    		if (post) {
	    			var idx = $scope.data.length - 1 - new Date(post.created_at).getMonth();
	    			$scope.data[idx].posts.unshift({id: post.id, title: post.title});
	    		}
	        }
	    );
	    
		$scope.isDisabled = function(month) {
			if (month.posts && month.posts.length > 0) { return false; }
			else { return true; }
		};
	});

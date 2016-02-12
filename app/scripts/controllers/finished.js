'use strict';
angular.module('alakazamApp')
	.controller('FinishedCtrl', ['$scope', '$location', 'RapperService', 'UserService', 'FIREBASE_HOSTING', 'QUIZ_SIZE', function($scope, $location, RapperService, UserService, FIREBASE_HOSTING, QUIZ_SIZE) {
		$scope.score = UserService.getScore();
		$scope.total = QUIZ_SIZE;
		$scope.average = null;
		$scope.location = $location.absUrl();
		$scope.text = 'Can you identify rapper based only on their ad libs? I scored ' + $scope.score + ' out of ' + $scope.total + '.';
		$scope.hashtag = 'RapAdlibs, RapQuiz';

		$scope.startOver = function() {
			var r = window.confirm('Would you like to return back to the main screen to try again!');
			if (r === true) {
				UserService.resetScore();
				$location.url('intro');
			}
		};
	}]);

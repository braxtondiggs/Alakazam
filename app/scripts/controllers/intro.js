'use strict';
angular.module('alakazamApp')
    .controller('IntroCtrl', ['$scope', 'RapperService', 'FIREBASE_HOSTING', '$interval', '$timeout', '$location', 'cfpLoadingBar', function($scope, RapperService, FIREBASE_HOSTING, $interval, $timeout, $location, cfpLoadingBar) {
        cfpLoadingBar.start();
        $scope.change = false;
        $scope.getStarted = function() {
        	$location.url('quiz');
        };
        RapperService.loadRapper().$loaded().then(function() {
            function getRapper() {
                $timeout(function() {
                	$scope.image = FIREBASE_HOSTING + RapperService.getRapper().image;
                    $scope.change = true;
                }, 500);
            }
            cfpLoadingBar.complete();
            getRapper();
            $interval(function() {
                getRapper();
                $scope.change = false;
            }, 5000);
        });
    }]);

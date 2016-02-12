'use strict';
angular.module('alakazamApp', [
        'ngAnimate',
        'ngRoute',
        'firebase',
        '720kb.fx',
        '720kb.socialshare',
        'cfp.loadingBar',
        'angular-loading-bar',
        'ngStorage'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/intro', {
                templateUrl: 'views/intro.html',
                controller: 'IntroCtrl',
                controllerAs: 'intro'
            })
            .when('/quiz', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/score', {
                templateUrl: 'views/finished.html',
                controller: 'FinishedCtrl',
                controllerAs: 'finished'
            })
            .otherwise({
                redirectTo: '/intro'
            });
    }).factory('RapperService', ['$firebaseArray', 'FIREBASE_URL', function($firebaseArray, FIREBASE_URL) {
        /*global Firebase*/
        var ref = new Firebase(FIREBASE_URL + 'Rappers');
        var rappers = $firebaseArray(ref);

        var service = {
            loadRapper: function() {
                return rappers;
            },
            getRapper: function() {
                return rappers[Math.floor(Math.random() * rappers.length)];
            },
            getRapperAudio: function(rapper) {
                return rapper.adlibs[Math.floor(Math.random() * rapper.adlibs.length)];
            }
        };
        return service;
    }]).factory('UserService', ['$firebaseArray', 'FIREBASE_URL', '$sessionStorage', function($firebaseArray, FIREBASE_URL, $sessionStorage) {
        var score = $sessionStorage.score || 0;
        var service = {
            getScore: function() {
                return score;
            },
            setScore: function() {
                return score++;
            },
            resetScore: function() {
                $sessionStorage.$reset();
                score = 0;
            },
            saveScore: function(s) {
                var refScore = new Firebase(FIREBASE_URL + 'Scores');
                var list = $firebaseArray(refScore);
                list.$add(s).then(function(refScore) {
                    list.$indexFor(refScore.key());
                });
                $sessionStorage.score = s;
            }
        };
        return service;
    }]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }])
    .directive('googleAdSense', function() {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: "../../views/adsense.html",
            controller: function() {
                (adsbygoogle = window.adsbygoogle || []).push({});
            }
        };
    });

'use strict';
angular.module('alakazamApp')
    .controller('MainCtrl', ['$scope', '$location', 'cfpLoadingBar', 'RapperService', 'UserService', 'FIREBASE_HOSTING', 'QUIZ_SIZE', function($scope, $location, cfpLoadingBar, RapperService, UserService, FIREBASE_HOSTING, QUIZ_SIZE) {
        cfpLoadingBar.start();
        var audioPlayer = null;
        var audioPlayerEnded = true;
        $scope.current = 0;
        $scope.imgLoad = 0;
        RapperService.loadRapper().$loaded().then(function() {
            createQuiz();
        });

        function createQuiz() {
            function shuffleArray(array) {
                for (var i = array.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    var temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
                return array;
            }

            var arr = [],
                quiz = [];
            while (arr.length < QUIZ_SIZE) {
                var rapper = RapperService.getRapper(),
                    audio = RapperService.getRapperAudio(rapper);
                if (arr.indexOf(audio) === -1) {
                    arr.push(audio);
                    quiz[arr.length - 1] = {
                        correct: {
                            name: rapper.name,
                            image: FIREBASE_HOSTING + rapper.image,
                            audio: FIREBASE_HOSTING + audio,
                            status: null
                        },
                        selected: null,
                        answers: [{
                            name: rapper.name,
                            image: FIREBASE_HOSTING + rapper.image,
                            isCorrect: true
                        }]
                    };
                    var answers = [rapper.name];
                    while (answers.length < 4) {
                        var r = RapperService.getRapper();
                        if (answers.indexOf(r.name) === -1) {
                            answers.push(r.name);
                            quiz[arr.length - 1].answers[answers.length - 1] = {
                                name: r.name,
                                image: FIREBASE_HOSTING + r.image,
                                isCorrect: false
                            };
                        }
                    }
                    shuffleArray(quiz[arr.length - 1].answers);
                }
            }
            $scope.quiz = quiz;
        }

        $scope.loadAudio = function() {
            audioPlayer = new Audio($scope.quiz[$scope.current].correct.audio);
            audioPlayer.onended = function() {
                audioPlayerEnded = true;
            };
            audioPlayer.onloadeddata = function() {
                $scope.playAudio();
                cfpLoadingBar.complete();
            };
        };
        $scope.playAudio = function() {
            if (audioPlayerEnded === true) {
                audioPlayerEnded = false;
                audioPlayer.play();
            }
        };
        $scope.pauseAudio = function() {
            audioPlayer.pause();
            audioPlayerEnded = true;
        };
        $scope.answer = function(option) {
            $scope.pauseAudio();
            if ($scope.quiz[$scope.current].selected === null) {
                $scope.quiz[$scope.current].selected = option;
                $scope.quiz[$scope.current].correct.status = $scope.quiz[$scope.current].answers[option].isCorrect;
                if ($scope.quiz[$scope.current].correct.status) {
                    UserService.setScore();
                }
                $scope.playAudio();
            }
        };
        $scope.loaded = function() {
            $scope.imgLoad++;
            if ($scope.imgLoad ===  5) {
                $scope.loadAudio();
            }
        };
        $scope.next = function() {
            $scope.pauseAudio();
            $scope.imgLoad = 0;
            $scope.current++;
            if (QUIZ_SIZE !== $scope.current) {
                cfpLoadingBar.start();
                $scope.loadAudio();
            } else {
                UserService.saveScore(UserService.getScore());
                $location.url('score');
            }
        };
    }]).directive('imageonload', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('load', function() {
                    scope.$apply(attrs.imageonload);
                });
            }
        };
    });

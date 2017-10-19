(function () {
  'use strict';

  angular
    .module('trivialangular')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $http, $log) {
    var vm = this;

    vm.cards = [];

    vm.answer = function (answer, index) {
      if (answer === vm.details.results[index].correct_answer) {
        $log.info('Right Answer');
      } else {
        $log.info('Wrong Answer');
      }
    }

    var onFetchComplete = function (success) {
      //angular return data in data attribute
      vm.details = success.data;
      processData();

    };

    var processData = function () {
      for (var indexResults = 0; indexResults < vm.details.results.length; indexResults++) {
        vm.cards.push(processCard(vm.details.results[indexResults]));
      }
    }

    var processCard = function(myData) {
      var myCard = {
        question: myData.question,
        answers: '',
        rightAnswer:myData.correct_answer,
        responded:false
      };
      myCard.answers = [];
      myCard.answers = angular.copy(myData.incorrect_answers);
      myCard.answers.push(myData.correct_answer);
      return myCard;


    }

    var onError = function (error) {
      vm.error = "Unable to fetch the data: " + error;
    };

    $http.get("https://opentdb.com/api.php?amount=10").
    then(onFetchComplete, onError);
  }
})();

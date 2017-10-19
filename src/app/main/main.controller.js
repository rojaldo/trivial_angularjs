(function() {
  'use strict';

  angular
    .module('trivialangular')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $http, $log) {
    var vm = this;

    vm.answer = function(answer, index){
      if(answer === vm.details.results[index].correct_answer){
        $log.info('Right Answer');
      }else{
        $log.info('Wrong Answer');
      }
    }

    var onFetchComplete = function(success){
      //angular return data in data attribute
      vm.details = success.data;
    };
    
    var onError = function(error){
      vm.error = "Unable to fetch the data: " + error;
    };
    
    $http.get("https://opentdb.com/api.php?amount=10").
    then(onFetchComplete,onError);
  }
})();

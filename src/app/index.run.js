(function() {
  'use strict';

  angular
    .module('trivialangular')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();

(function () {

    function chatController($scope) {
        console.log('in chat controller');

        $scope.bla = 'nadav';

        $scope.sentMessage = function () {
            $scope.socket.emit('messageSent', 'test');
        }

    }

    chatController.$inject = ['$scope'];

    angular.module('chat.module', [])
        .controller('chatController', chatController);

})();
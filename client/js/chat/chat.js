(function () {

    function chatController($scope) {
        console.log('in chat controller');

        const chance = new Chance();
        $scope.userName = chance.hashtag().substring(0,5);

        $scope.sendMessage = function () {
            if(!$scope.messageInput) {
                return; //Only send message with content
            }

            let newMessage = {
                userName: $scope.userName,
                isOwnMessage: true,
                text: $scope.messageInput,
                time: getCurrentTime()
            };

            //Add the message to the messages List
            $scope.messages.push(newMessage);

            //Clear the input field
            $scope.messageInput = null;

            //Send the message to the server
            $scope.socket.emit('messageSend', {text: newMessage.text, time: newMessage.time, userName: newMessage.userName});

            scrollBottom();
        };

        function getCurrentTime() {
            let date = new Date();
            return date.getHours() + ':' + date.getMinutes();
        }

        function scrollBottom() {
            $(".messages-content").animate({ scrollTop: $('.messages-content').prop("scrollHeight")}, 500);

        }

        $scope.messages = [
            {
                isOwnMessage: false,
                text: 'Welcome to the chat room!'
            }
        ];

        $scope.socket.on('messageReceive', function (msg) {
            msg.isOwnMessage = false;
            $scope.messages.push(msg);

            $scope.$apply(); //Apply the changes made because of the socket
            scrollBottom();
        });

    }

    chatController.$inject = ['$scope'];

    angular.module('chat.module', [])
        .controller('chatController', chatController);

})();
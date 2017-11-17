(function () {

    function chatController($scope) {
        console.log('in chat controller');

        $scope.bla = 'nadav';

        $scope.sendMessage = function () {
            var newMessage = {
                isOwnMessage: true,
                text: $scope.messageInput,
                time: getCurrentTime()
            };

            //Add the message to the messages List
            $scope.messages.push(newMessage);

            //Clear the input field
            $scope.messageInput = null;

            //Send the message to the server
            $scope.socket.emit('messageSend', {text: newMessage.text, time: newMessage.time});

            scrollBottom();
        };

        function getCurrentTime() {
            var date = new Date();
            return date.getHours() + ':' + date.getMinutes();
        }

        function scrollBottom() {
            $(".messages-content").animate({ scrollTop: $('.messages-content').prop("scrollHeight")}, 500);

        }

        $scope.messages = [
            {
                isOwnMessage: true,
                text: 'bla bla',
                time: getCurrentTime()
            },
            {
                isOwnMessage: false,
                text: 'not my own message',
                time: getCurrentTime()
            }
        ];

        $scope.socket.on('messageReceive', function (msg) {
            msg.isOwnMessage = false;
            $scope.messages.push(msg);

            $scope.$apply(); //Apply the changes made because of the socket
            scrollBottom();
        });

        function initChat() {
            var $messages = $('.messages-content'),
                d, h, m,
                i = 0;

            $(window).load(function() {
                $messages.mCustomScrollbar();
                setTimeout(function() {
                    fakeMessage();
                }, 100);
            });


            function updateScrollbar() {
                $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
                    scrollInertia: 10,
                    timeout: 0
                });
            }

            function setDate(){
                d = new Date()
                if (m != d.getMinutes()) {
                    m = d.getMinutes();
                    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
                    $('<div class="checkmark-sent-delivered">&check;</div>').appendTo($('.message:last'));
                    $('<div class="checkmark-read">&check;</div>').appendTo($('.message:last'));
                }
            }

            function insertMessage() {
                msg = $('.message-input').val();
                if ($.trim(msg) == '') {
                    return false;
                }
                $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
                setDate();
                $('.message-input').val(null);
                updateScrollbar();
                setTimeout(function() {
                    fakeMessage();
                }, 1000 + (Math.random() * 20) * 100);
            }

            $('.message-submit').click(function() {
                insertMessage();
            });

            $(window).on('keydown', function(e) {
                if (e.which == 13) {
                    insertMessage();
                    return false;
                }
            })

            var Fake = [
                'Hi there, I\'m Jesse and you?',
                'Nice to meet you',
                'How are you?',
                'Not too bad, thanks',
                'What do you do?',
                'That\'s awesome',
                'Codepen is a nice place to stay',
                'I think you\'re a nice person',
                'Why do you think that?',
                'Can you explain?',
                'Anyway I\'ve gotta go now',
                'It was a pleasure chat with you',
                'Time to make a new codepen',
                'Bye',
                ':)'
            ]

            function fakeMessage() {
                if ($('.message-input').val() != '') {
                    return false;
                }
                $('<div class="message loading new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
                updateScrollbar();

                setTimeout(function() {
                    $('.message.loading').remove();
                    $('<div class="message new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
                    setDate();
                    updateScrollbar();
                    i++;
                }, 1000 + (Math.random() * 20) * 100);

            }

            $('.button').click(function(){
                $('.menu .items span').toggleClass('active');
                $('.menu .button').toggleClass('active');
            });
        }

        //initChat();

    }

    chatController.$inject = ['$scope'];

    angular.module('chat.module', [])
        .controller('chatController', chatController);

})();
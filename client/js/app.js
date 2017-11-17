// App
const app = angular.module('app', [
	'chat.module'
]);

// App controller
app.controller('appController', ['$scope', ($scope) => {
    $scope.socket = io();
}]);
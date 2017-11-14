// App
const app = angular.module('app', [
	'chat.module'
]);

// Service to fetch some data..
app.factory('dataServ', ['$http',($http) => {
	return {
		get : ()=> $http.get('/data')
	}
}]);

// App controller
app.controller('appController', ['$scope','dataServ', ($scope, Data) => {
	Data.get().success(resp => {
			$scope.funnyStuff = resp;
		});

    $scope.socket = io();
}]);
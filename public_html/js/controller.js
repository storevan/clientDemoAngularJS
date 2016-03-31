var sampleApp = angular.module('myapp', []);
sampleApp.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: 'pages/login.html',
            controller: 'LoginController'
        }).when('/home', {
            templateUrl: 'home.html',
//                                    controller: 'HomeCtrl'
        }).when('/register', {
            templateUrl: 'pages/register.html',
            controller: 'SignUpController'
        }).when('/changepass', {
            templateUrl: 'pages/changepass.html',
            controller: 'SignUpController'
        }).otherwise({
            redirectTo: '/'
        });
        //        $locationProvider.html5Mode(true); //Remove the '#' from URL.
    }
]);
sampleApp.controller('LoginController', function ($scope, $http, $location) {

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
//                        $scope.album = {'username':'admin','password':'1'};
    $scope.login = function () {
        var data = $.param({
            username: $scope.username,
            password: $scope.password
        });
//                            $http.get("http://localhost/DemoRestful/public/rest/rest-ful/index")
        //    .then(function(response) {
        //      $scope.data = response.data;
        //      console.log(response);
        //    });
//                            $location.path('/home');
        $http.post('http://localhost/DemoRestful/public/rest/rest-ful/index', data)
                .success(function (data, status, headers, config) {
                    console.log(data);
                    if (data.msgCode == 'success') {
                        alert(data.info)
//                        $location.path('/home');
                        window.location='http://localhost:8383/DemoAngularJS/home.html';
                    } else if (data.msgCode == 'fail') {
                        alert(data.error)
                    } else {
                        alert('Not found msg code');
                    }
                }).error(function (data, status, headers, config) {
            console.log(data);
            alert('[' + status + ']' + data);
        });
    };
});

sampleApp.controller('SignUpController', function ($scope, $location,$http) {
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $scope.register = function () {
         var data = $.param({
            username: $scope.username,
            password: $scope.password,
            retypePassword: $scope.retypePassword
        });
            $http.post('http://localhost/DemoRestful/public/rest/rest-ful/register', data)
                .success(function (data, status, headers, config) {
                    console.log(data);
                    if (data.msgCode == 'success') {
                        alert(data.info)
                        $location.path('/');
                    } else if (data.msgCode == 'fail') {
                        alert(data.error)
                    } else {
                        alert('Not found msg code');
                    }
                }).error(function (data, status, headers, config) {
            console.log(data);
            alert('[' + status + ']' + data);
        });
    };
    $scope.changepass = function () {
         var data = $.param({
            username: $scope.username,
            oldPassword: $scope.oldPassword,
            password: $scope.password,
            retypePassword: $scope.retypePassword
        });
            $http.post('http://localhost/DemoRestful/public/rest/rest-ful/changepass', data)
                .success(function (data, status, headers, config) {
                    console.log(data);
                    if (data.msgCode == 'success') {
                        alert(data.info)
                        $location.path('/');
                    } else if (data.msgCode == 'fail') {
                        alert(data.error)
                    } else {
                        alert('Not found msg code');
                    }
                }).error(function (data, status, headers, config) {
            console.log(data);
            alert('[' + status + ']' + data);
        });
    };
});

sampleApp.controller('RouterController', function ($scope, $location) {
    $scope.btnregister = function () {
        $location.path('/register');
    };
    $scope.btnchangepass = function () {
        $location.path('/changepass');
    };
});
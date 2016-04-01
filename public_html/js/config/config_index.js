var sampleApp = angular.module('myapp', []);
sampleApp.config(['$routeProvider', '$locationProvider',
    function ($routeProvider) {
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
sampleApp.controller('AppCtrl', function ($rootScope) {
    //config cau hinh duong link server
    $rootScope.appUrl = 'http://localhost/DemoRestful/public/';
    //cau hinh duong link local
    $rootScope.localUrl = 'http://localhost:8383/DemoAngularJS/';
});
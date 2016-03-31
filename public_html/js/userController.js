
homeApp.controller('UserController', function ($scope, $http, $location) {
    var load = function () {
        $http.get('http://localhost/DemoRestful/public/rest/user/index')
                .success(function (data, status, headers, config) {
                    console.log(data.user);
                    if (data.msgCode == 'success') {
                        $scope.user = data.user;
                    } else if (data.msgCode == 'fail') {
                        alert(data.error)
                    } else {
                        alert('Not found msg code');
                    }
                }).error(function (data, status, headers, config) {
            console.log(data);
            alert('[' + status + ']' + data);
        });
    }
    load();
    $scope.preInsert = function () {
        $location.path('/insertuser');
    };
    $scope.onDelete = function (index) {
        var data = $.param({
            userId: $scope.user[index].userId,
        });
        console.log($scope.user[index].userId);
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post('http://localhost/DemoRestful/public/rest/user/delete', data)
                .success(function (data, status, headers, config) {
                    if (data.msgCode == 'success') {
                        alert(data.info);
                        load();
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

    $scope.preUpdate = function (index) {
        $location.path('/updateuser/' + $scope.user[index].userId)
    };
    
});

homeApp.controller('InsertUserController', function ($scope, $http, $location) {
    var load = function () {
        $http.get('http://localhost/DemoRestful/public/rest/location/getParentLocation')
                .success(function (data, status, headers, config) {
                    console.log(data.parentLocation);
                    if (data.msgCode == 'success') {
                        $scope.parent = data.parentLocation;
                        $scope.national = $scope.parent[0].locationId;
                        $scope.role = 0;
                    } else if (data.msgCode == 'fail') {
                        alert(data.error)
                    } else {
                        alert('Not found msg code');
                    }
                }).error(function (data, status, headers, config) {
            console.log(data);
            alert('[' + status + ']' + data);
        });
    }
    load();

    $scope.getProvince = function () {
        var data = $.param({
            parentId: $scope.national,
        });
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post('http://localhost/DemoRestful/public/rest/location/getLocationByParent', data)
                .success(function (data, status, headers, config) {
                    console.log(data.user);
                    if (data.msgCode == 'success') {
                        $scope.provin = data.province;
                        $scope.province = $scope.provin[0].locationId;
                    } else if (data.msgCode == 'fail') {
                        alert(data.error)
                    } else {
                        alert('Not found msg code');
                    }
                }).error(function (data, status, headers, config) {
            console.log(data);
            alert('[' + status + ']' + data);
        });

    }

    $scope.insertUser = function () {
        var data = $.param({
            username: angular.isUndefined($scope.username) ? "" : $scope.username,
            role: $scope.role,
            firstName: angular.isUndefined($scope.firstName) ? "" : $scope.firstName,
            lastName: angular.isUndefined($scope.lastName) ? "" : $scope.lastName,
            email: angular.isUndefined($scope.email) ? "" : $scope.email,
            national: $scope.national,
            province: angular.isUndefined($scope.province) ? "-1" : $scope.province,
            homeAddress: angular.isUndefined($scope.homeAddress) ? "" : $scope.homeAddress,
            zipCode: angular.isUndefined($scope.zipCode) ? "" : $scope.zipCode,
            about: angular.isUndefined($scope.about) ? "" : $scope.about,
            website: angular.isUndefined($scope.website) ? "" : $scope.website,
            facebook: angular.isUndefined($scope.facebook) ? "" : $scope.facebook,
            twitter: angular.isUndefined($scope.twitter) ? "" : $scope.twitter,
            other: angular.isUndefined($scope.other) ? "" : $scope.other,
        });
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post('http://localhost/DemoRestful/public/rest/user/insert', data)
                .success(function (data, status, headers, config) {
                    if (data.msgCode == 'success') {
                        alert(data.info);
                        $location.path('/userinfo');
                    } else if (data.msgCode == 'fail') {
                        alert(data.error)
                    } else {
                        alert('Not found msg code');
                    }
                }).error(function (data, status, headers, config) {
            console.log(data);
            alert('[' + status + ']' + data);
        });
    }
});

homeApp.controller('UpdateUserController', function ($scope, $http, $location, $routeParams) {
    var load = function () {
        var data = $.param({
            userId: $routeParams['id'],
        });
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post('http://localhost/DemoRestful/public/rest/user/preUpdate', data)
                .success(function (data, status, headers, config) {
                    if (data.msgCode == 'success') {
                        $scope.userItem = data.userItem;
                        $scope.parent = data.national;
                        if (data.userItem[0].national > 0) {
                            $scope.national = data.userItem[0].national;
                        } else {
                            $scope.national = '-1';
                        }
                        $scope.getProvince();
                        if (data.userItem[0].province > 0) {
                            $scope.province = data.userItem[0].province;
                        } else {
                            $scope.province = '-1';
                        }
                        $scope.role = data.userItem[0].role;
                    } else if (data.msgCode == 'fail') {
                        alert(data.error)
                    } else {
                        alert('Not found msg code');
                    }
                }).error(function (data, status, headers, config) {
            console.log(data);
            alert('[' + status + ']' + data);
        });
    }
    load();
    $scope.updateUser = function () {
        var data = $.param({
            userId: $routeParams['id'],
            username: angular.isUndefined($scope.userItem[0].username) ? "" : $scope.userItem[0].username,
            role: $scope.role,
            firstName: angular.isUndefined($scope.userItem[0].firstName) ? "" : $scope.userItem[0].firstName,
            lastName: angular.isUndefined($scope.userItem[0].lastName) ? "" : $scope.userItem[0].lastName,
            email: angular.isUndefined($scope.userItem[0].email) ? "" : $scope.userItem[0].email,
            national: $scope.national,
            province: angular.isUndefined($scope.province) ? "-1" : $scope.province,
            homeAddress: angular.isUndefined($scope.userItem[0].homeAddress) ? "" : $scope.userItem[0].homeAddress,
            zipCode: angular.isUndefined($scope.userItem[0].zipCode) ? "" : $scope.userItem[0].zipCode,
            about: angular.isUndefined($scope.userItem[0].about) ? "" : $scope.userItem[0].about,
            website: angular.isUndefined($scope.userItem[0].website) ? "" : $scope.userItem[0].website,
            facebook: angular.isUndefined($scope.userItem[0].facebook) ? "" : $scope.userItem[0].facebook,
            twitter: angular.isUndefined($scope.userItem[0].twitter) ? "" : $scope.userItem[0].twitter,
            other: angular.isUndefined($scope.userItem[0].other) ? "" : $scope.userItem[0].other,
        });
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post('http://localhost/DemoRestful/public/rest/user/update', data)
                .success(function (data, status, headers, config) {
                    if (data.msgCode == 'success') {
                        alert(data.info);
                        $location.path('/userinfo');
                    } else if (data.msgCode == 'fail') {
                        alert(data.error)
                    } else {
                        alert('Not found msg code');
                    }
                }).error(function (data, status, headers, config) {
            alert('[' + status + ']' + data);
        });
    }
    $scope.getProvince = function () {
        var data = $.param({
            parentId: $scope.national,
        });
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post('http://localhost/DemoRestful/public/rest/location/getLocationByParent', data)
                .success(function (data, status, headers, config) {
                    console.log(data.user);
                    if (data.msgCode == 'success') {
                        $scope.provin = data.province;
                    } else if (data.msgCode == 'fail') {
                        alert(data.error)
                    } else {
                        alert('Not found msg code');
                    }
                }).error(function (data, status, headers, config) {
            alert('[' + status + ']' + data);
        });
    }
});
homeApp.controller('LocationController', function ($scope, $http, $location, $rootScope) {
    var load = function () {
        $http.get($rootScope.appUrl + 'rest/location/index')
                .success(function (data, status, headers, config) {
                    console.log(data.catLocation);
                    if (data.msgCode == 'success') {
                        $scope.location = data.catLocation;
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
        $location.path('/insertlocation');
    };
    $scope.onDelete = function (index) {
        var data = $.param({
            locationId: $scope.location[index].locationId,
        });
        console.log($scope.location[index].locationId);
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post($rootScope.appUrl + 'rest/location/delete', data)
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
        $location.path('/updatelocation/' + $scope.location[index].locationId)
    };
});

homeApp.controller('preInsertController', function ($scope, $http, $location, $rootScope) {
    var load = function () {
        $http.get($rootScope.appUrl + 'rest/location/getParentLocation')
                .success(function (data, status, headers, config) {
                    console.log(data.parentLocation);
                    if (data.msgCode == 'success') {
                        $scope.parent = data.parentLocation;
                        $scope.parentId = $scope.parent[0].locationId;
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
    $scope.insertLocation = function () {
        var data = $.param({
            locationName: $scope.locationName,
            parentId: $scope.parentId
        });
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post($rootScope.appUrl + 'rest/location/insert', data)
                .success(function (data, status, headers, config) {
                    if (data.msgCode == 'success') {
                        alert(data.info);
                        $location.path('/catlocation');
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

homeApp.controller('UpdateLocationController', function ($scope, $http, $location, $routeParams, $rootScope) {
    var load = function () {
        var data = $.param({
            locationId: $routeParams['id'],
        });
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post($rootScope.appUrl + 'rest/location/preUpdate', data)
                .success(function (data, status, headers, config) {
                    if (data.msgCode == 'success') {
                        $scope.locationItem = data.locationItem;
                        $scope.parent = data.parentLocation;
                        if (data.locationItem[0].parentId > 0) {
                            $scope.parentId = data.locationItem[0].parentId;
                        } else {
                            $scope.parentId = '-1';
                        }
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
    $scope.updateLocation = function () {
        var data = $.param({
            locationId: $routeParams['id'],
            locationName: $scope.locationItem[0].locationName,
            parentId: $scope.parentId
        });
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        $http.post($rootScope.appUrl + 'rest/location/update', data)
                .success(function (data, status, headers, config) {
                    if (data.msgCode == 'success') {
                        alert(data.info);
                        $location.path('/catlocation');
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
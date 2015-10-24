app.controller('archStudents', ['$scope','$http', function($scope, $http){

    $http.get('api/student/archived').then(function(response){
        $scope.students = response.data;
    });

    $scope.unarchive = function(id){
        $http.post('api/student/archive?_id='+id, {isArchived: false}).then(function(response){
            $http.get('api/student/archived').then(function(response){
                $scope.students = response.data;
            });
        })
    }
}]);
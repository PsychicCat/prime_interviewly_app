
/*
Student dialog controller
 */
app.controller('uploads', ['$scope', '$mdDialog', function($scope, $mdDialog){
    $scope.openUploads = function(ev){
        $mdDialog.show({
            controller: uploadFile,
            templateUrl: 'views/partials/dialogs/upload/upload.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
    };
    function uploadFile($scope, $mdDialog){

        $scope.submit = function(file){
            var mine = {
                file: file
            };
        console.log(mine);
        };
        $scope.close = function() {
            $mdDialog.hide();
        }
    }
}]);
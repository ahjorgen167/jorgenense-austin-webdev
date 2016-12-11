(function(){
    angular
        .module("WebAppMaker")
        .controller("HeadingController", HeadingController)

    function HeadingController($window, $scope) {
        $scope.goBack = function (){
            $window.history.back();
        }

    }
})();
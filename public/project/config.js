(function() {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
           .when("/", {
                templateUrl: "views/player/splash.view.client.html",
                controller: "SplashController",
                controllerAs: "model"
            })
           .when("/login", {
                templateUrl: "views/player/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/player/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/player/:uid", {
                templateUrl: "views/player/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/player/:uid/imagesearch", {
                templateUrl: "views/player/avatar-select.view.client.html",
                controller: "AvatarSearchController",
                controllerAs: "model"
            })
            .when("/player/:uid/friends", {
                templateUrl: "views/friend/friends-list.view.client.html",
                controller: "FriendSearchController",
                controllerAs: "model"
            })
            .when("/player/:uid/friends/:fid", {
                templateUrl: "views/friend/friends-focus.view.client.html",
                controller: "FriendFocusController",
                controllerAs: "model"
            })
            .when("/player/:pid/game", {
                templateUrl: "views/game/game-search.view.client.html",
                controller: "GameSearchController",
                controllerAs: "model"
            })
            .when("/player/:pid/game/:gid", {
                templateUrl: "views/game/game-play.view.client.html",
                controller: "GamePlayController",
                controllerAs: "model"
            })
            .when("/player/:pid/message/:fid", {
                templateUrl: "views/message/message.view.client.html",
                controller: "MessageController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/"
            });
    }
})();
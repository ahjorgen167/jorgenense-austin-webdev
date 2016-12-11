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
                        /*
            .when("/player/:uid/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/player/:uid/website/new", {
                templateUrl: "views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model"
            })
            .when("/player/:uid/website/:wid", {
                templateUrl: "views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model"
            })
            .when("/player/:uid/website/:wid/page", {
                templateUrl: "views/page/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/player/:uid/website/:wid/page/new", {
                templateUrl: "views/page/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model"
            })
            .when("/player/:uid/website/:wid/page/:pid", {
                templateUrl: "views/page/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model"
            })
            .when("/player/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when("/player/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/widget-choose.view.client.html",
                controller: "ChooseNewWidgetController",
                controllerAs: "model"
            })
            .when("/player/:uid/website/:wid/page/:pid/widget/new/:widgettype", {
                templateUrl: "views/widget/widget-new.view.client.html",
                controller: "CreateNewWidgetController",
                controllerAs: "model"
            })
            .when("/player/:uid/website/:wid/page/:pid/widget/flickr-search", {
                templateUrl: "views/widget/widget-flickr-search.view.client.html",
                controller: "WidgetFlickrImageSearchController",
                controllerAs: "model"
            })
            .when("/player/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/widget-edit.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model"
            })
            .when("/player/:uid/website/:wid/page/:pid/widget/:wgid/flickr-search", {
                templateUrl: "views/widget/widget-flickr-search.view.client.html",
                controller: "WidgetFlickrImageSearchController",
                controllerAs: "model"
            })*/
            .otherwise({
                redirectTo: "/"
            });
    }

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http.get('/api/gameloggedin').success(function(player) {
            $rootScope.errorMessage = null;
            if (player !== '0') {
                $rootScope.currentPlayer = player;
                deferred.resolve();
            } else {
                deferred.reject();
                $location.url('/');
            }
        });
        return deferred.promise;
    };
})();
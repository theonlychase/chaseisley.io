/***
Metronic AngularJS App Main Script
***/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize"
]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/
/**
`$controller` will no longer look for controllers on `window`.
The old behavior of looking on `window` for controllers was originally intended
for use in examples, demos, and toy apps. We found that allowing global controller
functions encouraged poor practices, so we resolved to disable this behavior by
default.

To migrate, register your controllers with modules rather than exposing them
as globals:

Before:

```javascript
function MyController() {
  // ...
}
```

After:

```javascript
angular.module('myApp', []).controller('MyController', [function() {
  // ...
}]);

Although it's not recommended, you can re-enable the old behavior like this:

```javascript
angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
**/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: '/assets',
        globalPath: '/assets/global',
        layoutPath: '/assets/layouts/layout3',
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        App.initComponents(); // init core components
        // Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);

// /* Setup Layout Part - Sidebar */
// MetronicApp.controller('SidebarController', ['$scope', function($scope) {
//     $scope.$on('$includeContentLoaded', function() {
//         Layout.initSidebar(); // init sidebar
//     });
// }]);

// /* Setup Layout Part - Quick Sidebar */
// MetronicApp.controller('QuickSidebarController', ['$scope', function($scope) {    
//     $scope.$on('$includeContentLoaded', function() {
//        setTimeout(function(){
//             QuickSidebar.init(); // init quick sidebar        
//         }, 2000)
//     });
// }]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('PageHeadController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {        
        // Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Theme Panel */
MetronicApp.controller('ThemePanelController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
        // Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/home/about");  
    
    $locationProvider.html5Mode(true).hashPrefix('!');
    
    $stateProvider

        // // Home
        // .state('home2', {
        //     url: "/home.html",
        //     templateUrl: "views/home.html",            
        //     data: {pageTitle: 'Home2'},
        //     controller: "HomeController",
        //     resolve: {
        //         deps: ['$ocLazyLoad', function($ocLazyLoad) {
        //             return $ocLazyLoad.load({
        //                 name: 'Home',
        //                 insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        //                 files: [
        //                     '../assets/global/plugins/morris/morris.css',                            
        //                     '../assets/global/plugins/morris/morris.min.js',
        //                     '../assets/global/plugins/morris/raphael-min.js',                            
        //                     '../assets/global/plugins/jquery.sparkline.min.js',
        //                     "../assets/layouts/layout3/css/custom.css",
        //                     "../assets/global/plugins/socicon/socicon.css",

        //                     '../assets/pages/scripts/dashboard.min.js',
        //                     'js/controllers/HomeController.js',
        //                 ] 
        //             });
        //         }]
        //     }
        // })
        
        // Blog
        .state('blog', {
            url: "/blog",
            templateUrl: "views/blog/blog.html",            
            data: {pageTitle: 'Blog'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            "/assets/layouts/layout3/css/custom.css",
                            // "/assets/global/plugins/socicon/socicon.css",
                            // "/assets/pages/css/blog.min.css",
                            
                            'js/controllers/GeneralPageController.js',
                        ] 
                    });
                }]
            }
        })
        
        // Blog
        .state('testpost1', {
            url: "/freecodecamp-basic-javascript-algorithm-problems-&-solutions",
            templateUrl: "views/blog/test_post.html",            
            data: {pageTitle: 'FreeCodeCamp Basic Javascript Algorithm Problems (& Solutions)'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            "/assets/layouts/layout3/css/custom.css",                                                   
                            
                            "/assets/global/plugins/codemirror/lib/codemirror.js",                         
                            
                            'js/controllers/GeneralPageController.js',
                        ] 
                    });
                }]
            }
        })
        
        // Projects
        .state('projects', {
            url: "/projects",
            templateUrl: "views/projects.html",            
            data: {pageTitle: 'Projects'},
            controller: "GeneralPageController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            "/assets/layouts/layout3/css/custom.css",
                            // "/assets/global/plugins/socicon/socicon.css",                           

                            "/assets/global/plugins/js.cookie.min.js", 
                            "/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js", 
                            
                            "/assets/global/plugins/cubeportfolio/js/jquery.cubeportfolio.min.js",                      

                            // "/assets/pages/scripts/portfolio.min.js", 
                            // "/assets/pages/scripts/portfolio-1.min.js",
                            // "/assets/pages/scripts/portfolio-2.min.js",
                            // "/assets/pages/scripts/portfolio-3.min.js",
                            // "/assets/pages/scripts/portfolio-4.min.js",


                            'js/controllers/GeneralPageController.js'
                        ] 
                    });
                }]
            }
        })

        // User Profile
        .state("home", {
            url: "/home",
            templateUrl: "views/profile/main.html",
            data: {pageTitle: 'Home'},
            controller: "UserProfileController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',  
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            "/assets/layouts/layout3/css/custom.css",
                            
                            // './assets/global/plugins/jquery.sparkline.min.js',
                            // './assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',

                            '/assets/pages/scripts/profile.min.js',

                            'js/controllers/UserProfileController.js'
                        ]                    
                    });
                }]
            }
        })

        // About Me
        .state("home.about", {
            url: "/about",
            templateUrl: "views/profile/about.html",
            data: {pageTitle: 'About Me'}
        })
        
}]);

/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
}]);
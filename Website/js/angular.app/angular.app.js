angular.module('app', [
  'ui.router'
])
.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {

  $urlRouterProvider.otherwise('/login');

  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'html/login.html',
    stylesheets: [
      'https://fonts.googleapis.com/css?family=Roboto:100,300',
      "css/form.css",
      "css/core/animate.css",
    ],
    scripts: [
      "js/login.js"
    ],
    })
    .state('register', {
      url: '/register',
      templateUrl: 'html/register.html',
      stylesheets: [
        'https://fonts.googleapis.com/css?family=Roboto:100,300',
        "css/form.css",
        "css/core/animate.css",
      ],
      scripts: [
        "js/register.js"
      ],
    })
    .state('registerfarm', {
      url: '/registerfarm',
      templateUrl: 'html/registerfarm.html',
      stylesheets: [
        'https://fonts.googleapis.com/css?family=Roboto:100,300',
        "css/form.css",
        "css/core/animate.css",
      ],
      scripts: [
       "js/registerfarm.js"
      ],
      controller: function($scope, $state) {
        if($user.type !== 'Farmer'){
          $state.go('login');
        }
        $scope.user = $user;
      }
    })
    // Farm routing
    .state('farm', {
      url: '/farm',
      templateUrl: 'html/farm.html',
      controller: 'FarmAuthenticationController'
    })
    .state('farm.dashboard', {
      title: 'Dashboard',
      url: '/dashboard',
      subheading: 'Tweak it up!',
      templateUrl: 'html/farm.dashboard.html',
      stylesheets: [
        "css/AdminLTE.min.css",
        "css/AdminLTE/_all-skins.min.css",
        "plugins/iCheck/flat/blue.css",
        "plugins/morris/morris.css",
        "plugins/jvectormap/jquery-jvectormap-1.2.2.css",
        "plugins/datepicker/datepicker3.css",
        "plugins/daterangepicker/daterangepicker-bs3.css",
        "plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css",
        "https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css",
        "https://maxcdn.bootstrapcdn.com/font-awesome/4.6.0/css/font-awesome.min.css"
      ],
      scripts: [
        "js/adminlte/adminlte.min.js",
        "js/adminlte/dashboard.js",
        "plugins/morris/morris.min.js",
        "plugins/sparkline/jquery.sparkline.min.js",
        "plugins/jvectormap/jquery-jvectormap-1.2.2.min.js",
        "plugins/jvectormap/jquery-jvectormap-world-mill-en.js",
        "plugins/knob/jquery.knob.js",
        "plugins/daterangepicker/daterangepicker.js",
        "plugins/datepicker/bootstrap-datepicker.js",
        "plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js",
        "plugins/slimScroll/jquery.slimscroll.min.js",
        "plugins/fastclick/fastclick.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment.min.js"
      ]
    })
  }]);

  //5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8

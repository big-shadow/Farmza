var $scripts;
var $title;
var $styles;

angular.module('app')
.run(['$rootScope', function($rootScope) {

  $rootScope.appname = $appname;
  $rootScope.api = $api;

  $rootScope.$on('$stateChangeStart', function(event, toState){
    $scripts = toState['scripts'];
    $title = toState['title'];
    $styles = toState['stylesheets'];

    toastr.clear()
  });

  $rootScope.$on('$viewContentLoading', function(event, viewConfig){
    rootScopeMechanism.SetTitleElement($title);
    rootScopeMechanism.SetStyleSheets($styles);
    rootScopeMechanism.SetStateScript($scripts);
  });

  $rootScope.$on('unauthorized', function (event, message) {
    setTimeout(
      function()
      {
        communicator.showInfo(message);
      }, 25);
    });

}]);

var rootScopeMechanism = {

  SetTitleElement: function(value) {
    if(validator.isSet(value))
    {
      $('title').html($appname + ' | ' + value);
    }
    else
    {
      $('title').html($appname);
    }
  },
  SetStyleSheets: function(stylesheets) {

    $('#styles').empty();

    if(validator.isSet(stylesheets))
    {
      stylesheets.forEach(function(entry) {
        $('#styles').append('<link rel="stylesheet" href="' + entry + '" type="text/css">');
      });
    }
  },
  SetStateScript: function(scripts) {

    $('#scripts').empty();

    if(validator.isSet(scripts))
    {
      scripts.forEach(function(entry) {
        $('#scripts').append('<script src="' + entry + '"></script>');
      });
    }
  }

};

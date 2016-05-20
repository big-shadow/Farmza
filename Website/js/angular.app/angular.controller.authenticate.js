angular.module('app')
.controller('FarmAuthenticationController', ['$rootScope', '$scope', '$http', '$state',
function ($rootScope, $scope, $http, $state) {

  if(!validator.equals($user.type, 'Farmer'))
  {
    $state.go('login');
    $rootScope.$broadcast('unauthorized', 'Login with a farmer account to view this page.');
  }
  else if(!validator.isSet($farm))
  {
    $farm = dispatcher.sendRequest($user.farmid, '/farm', 'GET');
  }

  $scope.user = $user;
  $scope.farm = $farm;

  $scope.heading = $state.current.title;
  $scope.subheading = $state.current.subheading;

}])
// TODO: Make this more complete.
.controller('CustomerAuthenticationController', function ($scope, $http, $state)
{
  if(!validator.equals($user.type, 'Customer'))
  {
    alert("No dice!");
  }

  $scope.user = $user;
});

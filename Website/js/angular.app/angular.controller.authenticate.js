angular.module('app')
.controller('FarmAuthenticationController', ['$rootScope', '$scope', '$http', '$state',
function ($rootScope, $scope, $http, $state) {

  if($user.type !== 'Farmer')
  {
    $state.go('login');
    $rootScope.$broadcast('unauthorized', 'Login with a farmer account to view this page.');
  }
  else if($farm === undefined)
  {
    $farm = helper.sendRequest($user.farmid, '/farm', 'GET');
  }

  $scope.user = $user;
  $scope.farm = $farm;

  $scope.heading = $state.current.heading;
  $scope.subheading = $state.current.subheading;

}])
// TODO: Make this more complete.
.controller('CustomerAuthenticationController', function ($scope, $http, $state)
{
  if($user.type !== 'Customer')
  {
    alert("No dice!");
  }

  $scope.user = $user;
});

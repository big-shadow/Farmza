function register()
{
  var data = $('#register').serialize();
  $cache.password = data.password;

  var response = dispatcher.sendRequest(data, '/user', 'POST');

  response.success(function(data)
  {
    $user = helper.parseJson(data);
    $user.password = $cache.password;

    if(validator.equals($user.type, 'Farmer'))
    {
      window.location.href = '/#/registerfarm';
    }
    else
    {
      window.location.href = '/#/login';
    }
  })
  .fail(function(jqXHR, textStatus)
  {
    communicator.showRequestErrors(jqXHR.responseText);
  });
}

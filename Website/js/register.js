function register()
{
  var data = $('#register').serialize();
  $cache.password = data.password;

  var response = helper.sendRequest(data, '/user', 'POST');

  response.success(function(data)
  {
    $user = helper.parseJson(data);
    $user.password = $cache.password;

    if($user.type === 'Farmer')
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
    helper.showRequestErrors(jqXHR.responseText);
  });
}

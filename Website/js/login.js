function login()
{
  var data = $('#login').serialize();
  $cache.password = data.password;

  $.ajax({
    url: 'http://hhapi.com/login',
    method: 'POST',
    data: data
  })
  .done(function(response) {

    if(validator.isSet(response))
    {
      $user = JSON.parse(response);
      $user.password = $cache.password;

      if(validator.equals($user.type, 'Farmer'))
      {
        if(!validator.isSet($user.farmid))
        {
          window.location.href = '/#/registerfarm';
        }
        else
        {
          window.location.href = '/#/farm/dashboard';
        }
      }
      else if(validator.equals($user.type, 'Customer'))
      {
        // TODO: Go to customer dashboard.
      }
      else
      {
        communicator.showDown();
      }
    }
    else
    {
      communicator.showDown();
    }
  })
  .fail(function(jqXHR, textStatus) {
    communicator.showRequestErrors(jqXHR.responseText);
  });
}

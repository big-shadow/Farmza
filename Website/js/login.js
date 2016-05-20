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

    if(response !== undefined && response !== null)
    {
      $user = JSON.parse(response);
      $user.password = $cache.password;

      if($user.type === 'Farmer')
      {
        if($user.farmid === undefined)
        {
          window.location.href = '/#/registerfarm';
        }
        else
        {
          window.location.href = '/#/farm/dashboard';
        }
      }
      else
      {
        // TODO: Go to customer dashboard.
      }
    }
    else
    {
      helper.showInfo('We\'re currently unavailible. Try again soon!');
    }
  })
  .fail(function(jqXHR, textStatus) {
    helper.showRequestErrors(jqXHR.responseText);
  });
}

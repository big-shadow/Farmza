function registerFarm()
{
  var data = $('#register').serialize();
  var response = dispatcher.sendRequest(data, '/farm', 'POST');

  response.success(function(data)
  {
    $farm = helper.parseJson(data);
    updateUser($farm.id);
  })
  .fail(function(jqXHR, textStatus)
  {
    communicator.showRequestErrors(jqXHR.responseText);
  });
}

function updateUser(farmid)
{
  $user.farmid = farmid;
  $user.password = $cache.password;
  var response = dispatcher.sendRequest($user, '/user', 'PUT');

  response.success(function(data)
  {
    $user = helper.parseJson(data);
    window.location.href = '/#/farm/dashboard';
  })
  .fail(function(jqXHR, textStatus)
  {
    communicator.showRequestErrors(jqXHR.responseText);
  });
}

// Preliminary things required to render the view.
setTimeout(
  function()
  {
    $.getJSON("json/countries.json", function(data)
    {
      for (i = 0; i < data.countries.length; i++)
      {
        var name = String(data.countries[i].name);
        $('#country').append('<option value="' + name + '">' + name + '</option>');
      }
    });

    $("#country").change(function()
    {
      $('#state').empty();

      var filename = $("#country").val().toLowerCase();
      filename = String(filename).split(' ').join('_');

      $.getJSON("json/countries/" + filename + ".json", function(data)
      {
        for (i = 0; i < data.provinces.length; i++)
        {
          var name = String(data.provinces[i]);
          $('#state').append('<option value="' + name + '">' + name + '</option>');
        }
      });
    });

    setTimeout(
      function()
      {
        $('#country option[value=Canada]').change();
      }, 100);

    }, 150);

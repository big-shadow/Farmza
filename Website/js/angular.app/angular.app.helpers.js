var dispatcher = {
  sendRequest: function(data, url, type)
  {
    try {
      delete data.created;
      delete data.updated;
    }
    catch(err) {

    }

    return $.ajax({
      url: $api.concat(url),
      method: type,
      data: data
    });
  }
}

var helper = {
  parseJson: function(string)
  {
    data = JSON.parse(string);

    try {
      data = JSON.parse(data);
    }
    catch(err) {

    }

    return data;
  }
}


var communicator = {

  down: "We're currently down for maintenance. Try again later!",
  unauthorized: "You're not authorized to view this page!",

  showRequestErrors: function(errors)
  {
    var data = helper.parseJson(errors);
    var string = String(data.error).split('.,').join('.<br>');
    this.showError(string);
  },
  showDown: function()
  {
    this.showToastr('info', this.down);
  },
  showSuccess: function(message)
  {
    this.showToastr('success', message);
  },
  showError: function(message)
  {
    this.showToastr('error', message);
  },
  showWarning: function(message)
  {
    this.showToastr('warn', message);
  },
  showInfo: function(message)
  {
    this.showToastr('info', message);
  },
  showToastr: function(type, message)
  {
    toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": true,
      "progressBar": true,
      "positionClass": "toast-top-center",
      "preventDuplicates": true,
      "onclick": null,
      "showDuration": "3000",
      "hideDuration": "2000",
      "timeOut": "9000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }

    toastr[type](message);
  }
};

function submitForm(id, url, newUrl)
{
  var data = $('#' + id).serialize();
  var response = dispatcher.sendRequest(data, url, "POST", newUrl);

  if(validator.isSet(response))
  {
    window.location.href = '/#/' + newUrl;
  }
}

var validator = {

  equals: function(val, expected)
  {
    if(val !== undefined)
    {
      if(val !== null)
      {
        if(val === expected)
        {
          return true;
        }
      }
    }
    return false;
  },
  isSet: function(val)
  {
    if(val !== undefined)
    {
      if(val !== null)
      {
          return true;
        }
    }
    return false;
  }
}

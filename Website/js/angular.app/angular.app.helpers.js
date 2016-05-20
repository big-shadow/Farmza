var helper = {

  down: "We're currently down for maintenance. Try again later!",
  unauthorized: "You're not authorized to view this page!",

  isObject: function(val) {
    return val instanceof Object;
  },
  getFirstElement: function(array) {
    if  ((array[0] != null) && (array[0] != undefined)){
      return array[0];
    }
    return array;
  },
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
  },
  parseJson: function(string)
  {
      data = JSON.parse(string);

      try {
        data = JSON.parse(data);
      }
      catch(err) {

      }

      return data;
  },
  showRequestErrors: function(errors)
  {
    var data = this.parseJson(errors);
    var string = String(data.error).split('.,').join('.<br>');
    this.showError(string);
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
  var response = helper.sendRequest(data, url, "POST", newUrl);

  if(response !== undefined)
  {
    window.location.href = '/#/' + newUrl;
  }
}

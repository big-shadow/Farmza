var formFactory = {

  // This method builds a form for a specified model, with specified properties.
  // The parameters should be in the following format:
  //
  // modelName = 'Share';
  //
  // properties = [
  // {
  //    name: 'ShareName',
  //    type: 'text',
  //    span: 'The name of the share.'
  // },
  // {
  //    name: 'Cost',
  //    type: 'text',
  //    span: 'The price per share.'
  // }];

  build: function(modelName, properties)
  {
    var html = '<div class="form animated fadeIn">';
    html += '<div id="errors"></div>';
    html += '<form id="'+modelName.toLowerCase()+'" class="form-horizontal" onsubmit="submit'+modelName+'()">';
    html += '<fieldset>';

    properties.forEach(function(property) {

      html += '<div class="form-group">';
      html += '<label class="col-md-4 control-label" for="'+property.name.toLowerCase()+'">'+property.name+'</label>';
      html += '<div class="col-md-8">';

      if(validator.equals(property.type, 'text')){

      }
      else if(validator.equals(property.type, 'radio')){

      }
      else if(validator.equals(property.type, 'select')){

      }
      else if(validator.equals(property.type, 'password')){

      }

      html += '<span class="help-block">'+property.span+'</span>';
      html += '</div>';
      html += '</div>';

    });
  }
}

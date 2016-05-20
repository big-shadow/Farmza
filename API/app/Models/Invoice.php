<?php

namespace App\Models;

use App\Models\GDSModel;

class Invoice extends GDSModel
{
  function __construct()
  {
    parent::__construct();

    $blueprint = [
      'farmid' => 'required|regex:/^\d{16}$/',
      'customerid' => 'required|regex:/^\d{16}$/',
      'description' => "required|max:200|regex:/^((\w)*(\s)?(\.)?(,)?(;)?(')?(\()?(\))?)+$/",
      'amount' => 'required|numeric',
    ];

    $this->setBlueprint($blueprint);
  }

  // Definition of the abstract method called before an upsert.
  protected function prepare()
  {

  }
}

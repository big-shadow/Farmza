<?php

namespace App\Models;

use App\Models\GDSModel;

class Customer extends GDSModel
{
  function __construct()
  {
    parent::__construct();

    $blueprint = [
      'firstname' => 'required|alpha|max:85',
      'lastname' => 'required|alpha|max:85',
      'email' => 'required|email',
    ];

    $this->setBlueprint($blueprint);
  }

  // Definition of the abstract method called before an upsert.
  protected function prepare()
  {

  }
}

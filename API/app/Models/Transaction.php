<?php

namespace App\Models;

use App\Models\GDSModel;

class Transaction extends GDSModel
{
  function __construct()
  {
    parent::__construct();

    $blueprint = [
      'farmid' => 'required|regex:/^\d{16}$/',
      'customerid' => 'required|regex:/^\d{16}$/',
      'invoiceid' => 'required|regex:/^\d{16}$/',
      'amount' => 'required|numeric'
    ];

    $this->setBlueprint($blueprint);
  }

  // Definition of the abstract method called before an upsert.
  protected function prepare()
  {

  }
}

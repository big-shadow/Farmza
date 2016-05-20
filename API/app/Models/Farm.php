<?php

namespace App\Models;

use App\Models\GDSModel;
use App\Models\User;

class Farm extends GDSModel
{
  function __construct()
  {
    parent::__construct();

    $blueprint = [
      'name' => 'required|max:25|regex:/^((\w)*(\s)*)+$/',
      'subdomain' => 'required|alpha|max:25|gdsunique:Farm',
      'mission' => "required|max:200|regex:/^((\w)*(\s)?(\.)?(,)?(;)?(')?(\()?(\))?)+$/",
      'country' => 'required|alpha|max:20',
      'state' => 'required|max:25|regex:/^((\w)*(\s)*)+$/',
      'city' => 'required|max:85|regex:/^((\w)*(\s)*)+$/',
      'streetnumber' => 'required|numeric|max:100000',
      'street' => 'required|max:35|regex:/^((\w)*(\s)*)+$/',
      'postal' => 'required|alpha_num|max:8',
      'country' => 'required|max:45|regex:/^((\w)*(\s)*)+$/',
      'phone' => 'required|max:25|regex:/^(\(?\)?-?\s?\d?)+$/',
      'email' => 'required|email|gdsunique:Farm',
    ];

    $this->setBlueprint($blueprint);
  }

  protected function prepare()
  {
    try {

    } catch (Exception $e) {

    }

  }
}

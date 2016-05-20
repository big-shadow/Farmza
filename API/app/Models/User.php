<?php

namespace App\Models;

use App\Models\GDSModel;

class User extends GDSModel
{
  function __construct()
  {
    parent::__construct();

    $blueprint = [
      'firstname' => 'required|alpha|max:12',
      'lastname' => 'required|alpha|max:12',
      'email' => 'required|email|gdsunique:User',
      'password' => 'required|between:8,16|confirmed|regex:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/',
      'gender' => 'required|alpha|max:6',
      'type' => 'required|max:12',
      'farmid' => 'numeric'
    ];

    $this->setBlueprint($blueprint);
  }

  public function login()
  {
    $entity = $this->store->fetchOne("SELECT * FROM User WHERE email = @email", [
      'email' => $this->email
    ]);

    if($entity != null && get_class($entity) == 'GDS\\Entity')
    {
      $temp = $this->password;

      $this->consume($entity->getData());
      $this->id = $entity->getKeyId();

      if(!password_verify($temp, $this->password))
      {
        return 'Wrong Password';
      }

      unset($this->password);

      return $this;
    }

    return 'Wrong Email';
  }

  // Definition of the abstract method called before an upsert.
  protected function prepare()
  {
    if(isset($this->password))
    {
      $options = [
        'cost' => 12,
      ];

      $this->password = password_hash($this->password, PASSWORD_BCRYPT, $options);
    }
  }

}

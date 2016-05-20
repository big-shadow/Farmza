<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Validator;
use \GDS\Entity;
use \GDS\Store;
use \GDS\Schema;
use \GDS\Gateway\GoogleAPIClient;

class AppServiceProvider extends ServiceProvider
{
  /**
  * Bootstrap any application services.
  *
  * @return void
  */
  public function boot()
  {
    date_default_timezone_set('America/Halifax');

    Validator::extend('gdsunique', function($attribute, $value, $parameters, $validator)
    {
      $client = GoogleAPIClient::createClientFromJson('../gdskey.json');
      $gateway = new GoogleAPIClient($client, 'laravel-api');
      $schema = new Schema($parameters[0]);
      $store = new Store($schema, $gateway);

      $entity = $store->fetchOne("SELECT * FROM ".$parameters[0]." WHERE ".$attribute." = @value", [
        'value' => $value
      ]);

      return ($entity == null || get_class($entity) != 'GDS\\Entity');
    });
  }

  /**
  * Register any application services.
  *
  * @return void
  */
  public function register()
  {
    //
  }
}

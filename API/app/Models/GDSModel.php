<?php

namespace App\Models;

use \GDS\Entity;
use \GDS\Store;
use \GDS\Schema;
use \GDS\Gateway\GoogleAPIClient;
use Illuminate\Http\Request;
use Validator;
use DateTime;

abstract class GDSModel
{
  // For GDS transactions
  private $client;
  private $gateway;
  private $schema;
  private $store;
  private $entity;
  private $class;

  // A __set override will store the instance values in this.
  private $data;

  // A place for rules to be used by Laravel's Validator. (This is set in the concrete/child class)
  private $blueprint;

  // Called by instances before an upsert.
  abstract protected function prepare();

  // Simple mutator
  public function setBlueprint($blueprint)
  {
    return $this->blueprint = $blueprint;
  }

  // Simple accessors
  public function getData()
  {
    return $this->data;
  }

  public function getEntity()
  {
    return $this->entity;
  }

  public function getClass()
  {
    return $this->class;
  }

  public function getBlueprint()
  {
    return $this->blueprint;
  }

  // Prepare this instance.
  function __construct()
  {
    $this->class = substr(get_class($this), strrpos(get_class($this), '\\') + 1);
    $this->client = GoogleAPIClient::createClientFromJson('../gdskey.json');
    $this->gateway = new GoogleAPIClient($this->client, 'laravel-api');
    $this->schema = new Schema($this->class);
    $this->store = new Store($this->schema, $this->gateway);
    $this->entity = new Entity();
    $this->entity->setSchema($this->schema);
  }

  // Override to set values.
  public function __set($name, $value)
  {
    $this->data[$name] = $value;
  }

  // Override to get values.
  public function __get($name)
  {
    if (array_key_exists($name, $this->data))
    {
      return $this->data[$name];
    }
    else if(property_exists($this, $name))
    {
      return $this->$name;
    }

    return null;
  }

  // Override to check for properties.
  public function __isset($name)
  {
    return isset($this->data[$name]);
  }

  // Override to unset for properties.
  public function __unset($name)
  {
    unset($this->data[$name]);
  }

  // Persistance
  public function upsert()
  {
    $this->schema->addDatetime('created');
    $this->schema->addDatetime('updated');

    $this->prepare();

    if(isset($this->data['id']))
    {
      $this->entity = $this->store->fetchById($this->data['id']);
    }

    foreach ($this->data as $key => $value)
    {
      if($key == 'id')
      {
        $this->entity->setKeyId($value);
        unset($this->data['id']);
      }
      else if($key == 'updated')
      {
        $value = new DateTime();
      }
      else if(is_bool($value))
      {
        $this->schema->addBoolean($key);
      }
      else if(is_int($value))
      {
        $this->schema->addInteger($key);
      }
      else if(is_float($value))
      {
        $this->schema->addDouble($key, FALSE);
      }
      else
      {
        $this->schema->addString($key);
        $value = (string)$value;
      }

      $this->entity->$key = $value;
    }

    // Check that there's more feilds than two timestamps.
    if(count($this->schema->getProperties(), COUNT_RECURSIVE) > 2)
    {
      if(!isset($this->entity->created))
      {
        $this->entity->created = new DateTime();
      }
      if(!isset($this->entity->updated))
      {
        $this->entity->updated = new DateTime();
      }

      $this->entity = $this->store->upsert($this->entity);

      // If it was an insert a collection is returned by upsert.
      if(is_array($this->entity))
      {
        $this->entity = $this->entity[0];
      }

      $this->data['id'] = $this->entity->getKeyId();

      foreach ($this->entity->getData() as $key => $value)
      {
        $this->data[$key] = $value;
      }
    }
  }

  // Fetching
  public function fetch($count = 1)
  {
    if($count == 1)
    {
      $this->entity = $this->store->fetchOne();

      if($this->entity != null)
      {
        $this->data = $this->entity->getData();
        $this->data['id'] = $this->entity->getKeyId();

        return $this;
      }
    }
    else
    {
      $entities = array();

      foreach ($this->store->fetchPage($count) as $entity)
      {
        $this->entity = $entity;
        $this->data = $entity->getData();
        $this->data['id'] = $entity->getKeyId();

        array_push($entities, clone $this);
      }

      return $entities;
    }
  }

  public function fetchById($id)
  {
    $this->entity = $this->store->fetchById($id);

    if($this->entity != null)
    {
      $this->data = $this->entity->getData();
      $this->data['id'] = $this->entity->getKeyId();

      return $this;
    }
  }

  public function fetchByNamespace($namespace)
  {
    $this->entity = $this->store->fetchByName($namespace);

    if($this->entity != null)
    {
      $this->data = $this->entity->getData();
      $this->data['id'] = $this->entity->getKeyId();

      return $this;
    }
  }

  // Deleting
  public function delete($id)
  {
    $entity = $this->store->fetchById($id);
    $this->store->delete($entity);
  }

  public function consume($array)
  {
    $this->data = [];

    foreach ($array as $key => $value)
    {
      if($key == 'id')
      {
        $this->entity->setKeyId($value);
        continue;
      }

      $this->data[$key] = $value;
    }
  }

  public function validateInsert(Request &$request)
  {
    return $this->validateRequest($request);
  }

  public function validateUpdate(Request &$request)
  {
    foreach ($this->blueprint as $key => $value)
    {
      if($key != 'id')
      {
        $value = str_replace('|gdsunique', '', $value);
        $value = str_replace('gdsunique|', '', $value);
        $value = str_replace('|required', '', $value);
        $value = str_replace('required|', '', $value);
        $value = str_replace('|confirmed', '', $value);
        $value = str_replace('confirmed|', '', $value);
      }

      $this->blueprint[$key] = $value;
    }

    return $this->validateRequest($request);
  }

  private function validateRequest(Request &$request)
  {
    $validator = Validator::make($request->all(), $this->blueprint);

    if ($validator->fails())
    {
      return $validator->errors()->all();
    }
    else
    {
      $data = $request->all();

      foreach ($data as $key => $value)
      {
        if(strpos($key, '_confirmation') !== false)
        {
          unset($data[$key]);
          $request->replace($data);
        }
        else if(
        strpos($key, 'created') !== false ||
        strpos($key, 'updated') !== false ||
        strpos($key, 'id') !== false)
        {
          continue;
        }
        else if (!array_key_exists($key, $this->blueprint))
        {
          return $key . " isn't a valid " . $this->class . " object property.";
        }
      }
    }

    return true;
  }

  public function setAncestor(GDSModel $entity)
  {
    $ancestor = $entity->getEntity();
    $this->entity->setAncestry($ancestor);
  }

}

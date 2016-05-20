<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EntityController extends Controller
{

  public function insert($entity, Request $request)
  {
    $valid = $entity->validateInsert($request);

    if($valid === true)
    {
      $entity->consume($request->all());
      $entity->upsert();
      return json_encode($entity->getData());
    }
    else
    {
      return response()->json(json_encode(['error' => $valid]), 400);
    }
  }

  public function update($entity, Request $request)
  {
    $valid = $entity->validateUpdate($request);

    if($valid === true)
    {
      $entity->consume($request->all());
      $entity->upsert();
      return json_encode($entity->getData());
    }
    else
    {
      return response()->json(json_encode(['error' => $valid]), 400);
    }
  }

  public function delete($entity, $id)
  {
    $entity->delete($id);
  }

  public function fetchTemplate($entity)
  {
    return json_encode($entity->getBlueprint());
  }

  public function fetchById($entity, $id)
  {
    $class = $entity->getClass();
    $entity = $entity->fetchById($id);

    if($entity == null)
    {
      $payload  = json_encode(['error' => "That " . $class . " record doesn't exist."]);
      return response()->json($payload, 404);
    }

    return json_encode($entity->getData());
  }

  public function fetchAll($entity)
  {
    $class = $entity->getClass();
    $entities = $entity->fetch(100);
    $json = array();

    if(count($entities) == 0)
    {
      $json = json_encode(['error' => "No " . $class . " records exist."]);
      return response()->json($json, 404);
    }

    foreach ($entities as $item)
    {
      array_push($json, json_encode($item->getData()));
    }

    return json_encode($json);
  }
}

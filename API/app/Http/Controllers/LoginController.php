<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\User;
use Validator;

class LoginController extends Controller
{
  public function login(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'email' => 'required|email',
      'password' => 'required|between:8,16|regex:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/',
    ]);

    if ($validator->fails())
    {
      $json = json_encode(['error' => $validator->errors()->all()]);
      return response()->json($json, 400);
    }

    $user = new User;
    $user->consume($request->all());

    switch($user->login())
    {
      case 'Wrong Password':
        $json = json_encode(['error' => "That's definitely not your password."]);
        return response()->json($json, 400);

      case 'Wrong Email':
        $json = json_encode(['error' => "That e-mail address isn't in our database."]);
        return response()->json($json, 400);
    }

    return json_encode($user->getData());
  }
}

<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Validator;

class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {

      // To come...
      // if (Request::secure())
      // {
      //     //
      // }

        //$validator = Validator::make(array('client_token' => $request->input('client_token')), [
        $validator = Validator::make(array('client_token' => $request->client_token)), [
          'client_token' => 'required|size:32|exists:Clients,token'
        ]);

        if ($validator->fails()) {
          return $validator->errors()->all();
        }

        return $next($request);
    }
}

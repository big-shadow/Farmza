<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::post('/login', 'LoginController@login');

Route::get('/', function () {
  return view('welcome');
});

Route::group(['prefix' => 'api'], function ()
{
  // ------------ Generic Routes ------------
  Route::group(['prefix' => '{entity}'], function ()
  {
    // Fetching
    Route::get('{id}', 'EntityController@fetchById')->where('id', '[0-9]+');
    Route::get('/', 'EntityController@fetchAll');
    Route::get('template', 'EntityController@fetchTemplate');

    // Delete
    Route::delete('/', 'EntityController@delete')->where('id', '[0-9]+');

    // Upsert
    Route::post('/', 'EntityController@insert');
    Route::put('/', 'EntityController@update');
  });

});

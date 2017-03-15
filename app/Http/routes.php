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

Route::get('/', function () {
    return view('index');
});

Route::post('/addLogin', ['uses' => '\App\Http\Controllers\LoginController@addLogin', 'as' => 'addLogin']);

Route::post('/authLogin', ['uses' => '\App\Http\Controllers\LoginController@authLogin', 'as' => 'authLogin']);

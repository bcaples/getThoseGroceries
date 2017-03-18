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

//Initial Route
Route::get('/', function () {
    return view('index');
});

//Login Routes
Route::post('/addLogin', ['uses' => '\App\Http\Controllers\LoginController@addLogin', 'as' => 'addLogin']);

Route::post('/authLogin', ['uses' => '\App\Http\Controllers\LoginController@authLogin', 'as' => 'authLogin']);

//GroceryList Routes
Route::post('/getList', ['uses' => '\App\Http\Controllers\GroceryListController@getList', 'as' => 'getList']);

Route::post('/addList', ['uses' => '\App\Http\Controllers\GroceryListController@addList', 'as' => 'addList']);

Route::post('/deleteList', ['uses' => '\App\Http\Controllers\GroceryListController@deleteList', 'as' => 'deleteList']);

//GroceryListItems Routes
Route::post('/getItems', ['uses' => '\App\Http\Controllers\GroceryListItemsController@getItems', 'as' => 'getItems']);

Route::post('/addItem', ['uses' => '\App\Http\Controllers\GroceryListItemsController@addItem', 'as' => 'addItem']);

Route::post('/editPanel', ['uses' => '\App\Http\Controllers\GroceryListItemsController@editPanel', 'as' => 'editPanel']);

Route::post('/editItem', ['uses' => '\App\Http\Controllers\GroceryListItemsController@editItem', 'as' => 'editItem']);

Route::post('/deleteItems', ['uses' => '\App\Http\Controllers\GroceryListItemsController@deleteItems', 'as' => 'deleteItems']);

Route::post('/emailListItems', ['uses' => '\App\Http\Controllers\GroceryListItemsController@emailListItems', 'as' => 'emailListItems']);

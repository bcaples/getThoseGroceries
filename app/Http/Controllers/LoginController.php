<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class LoginController extends Controller
{
	//Authenicate User
    public function authLogin()
    {
     	$userID = \DB::table('users')->where('emailAddress', \Input::get('emailAddress'))->value('id');
        
        $userData = array('userID' => $userID);
        
        return \Response::json($userData);
    }

	//Add User
    public function addLogin()
    {
        $userID = \DB::table('users')->insertGetId(
			  		['emailAddress' => \Input::get('emailAddress')]
			  );

        $userData = array('userID' => $userID);

        return \Response::json($userData);
	}
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class GroceryListController extends Controller
{
	//Get GroceryList
    public function getList()
    {
     	$list = \DB::table('groceryList')->where('userID', \Input::get('userID'))->get();
        
        $listData = array('list' => $list);
        
        return \Response::json($listData);
    }

    //Add GroceryList
    public function addList()
    {
     	$listID = \DB::table('groceryList')->insertGetId(
				  		[
				  		 'listName' => \Input::get('listName'),
				  		 'userID' => \Input::get('userID'),
				  		 'dateCreated' => date("Y-m-d H:i:s")
				  		]
				  );
        
        $listData = array('listID' => $listID);
        
        return \Response::json($listData);
    }

	//Add User
    public function deleteList()
    {
        $deleteID = DB::table('groceryList')->where('listName', '=', 100)->delete(\Input::get('listName'));
        
        $listData = array('deleteID' => $deleteID);

        return \Response::json($listData);
	}
}

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

	//Delete List
    public function deleteList()
    {
    	$deleteList = \Input::get('deleteList');
    	foreach ($deleteList as $id) {
    		\DB::table('groceryList')->where('id', '=', $id)->delete();
    	}
        
        $listData = array('deleteID' => "Deleted");

        return \Response::json($listData);
	}
}

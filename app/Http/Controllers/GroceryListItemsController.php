<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class GroceryListItemsController extends Controller
{
    //Get GroceryItems
    public function getItems()
    {
     	$items = \DB::table('groceryListItems')->where('listID', \Input::get('listID'))->get();
        
        $itemData = array('items' => $items);
        
        return \Response::json($itemData);
    }

    //Add GroceryItems
    public function addItem()
    {
     	$itemID = \DB::table('groceryListItems')->insertGetId(
				  		[
				  		 'itemName' => \Input::get('itemName'),
				  		 'listID' => \Input::get('listID'),
				  		 'itemStatus' => "Not Purchased"
				  		]
				  );
        
        $itemData = array('itemID' => $itemID);
        
        return \Response::json($itemData);
    }

	//Delete GroceryItems
    public function deleteItems()
    {
    	$deleteItems = \Input::get('deleteItems');
    	foreach ($deleteItems as $id) {
    		\DB::table('groceryListItems')->where('id', '=', $id)->delete();
    	}
        
        $itemData = array('deleteID' => "Deleted");

        return \Response::json($itemData);
	}
}

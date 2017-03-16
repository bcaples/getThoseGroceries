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
				  		 'itemStatus' => "Not Purchased",
				  		 'purchaseDate' => "0000-00-00"
				  		]
				  );
        
        $itemData = array('itemID' => $itemID);
        
        return \Response::json($itemData);
    }

    //Retrieve GroceryItem To Edit
    public function editPanel()
    {
     	$itemEdit = \DB::table('groceryListItems')->where('id', \Input::get('itemID'))->first();
        
        $itemData = array('itemEdit' => $itemEdit, 'itemID' => \Input::get('itemID'));
        
        return \Response::json($itemData);
    }

    //Edit GroceryItems
    public function editItem()
    {
    	$itemStatusEdit = "Not Purchased";
    	$purchaseDate = "0000/00/00";

    	if (\Input::get('itemStatusEdit') == "purchased") {
    		$itemStatusEdit = "Purchased";
    		$purchaseDate = date("Y-m-d H:i:s");
    	}

		$itemUpdated =  \DB::table('groceryListItems')
							->where('id', \Input::get('itemID'))
							->update(
							  	[
							  		'itemName' => \Input::get('itemNameEdit'),
							  		'itemStatus' => $itemStatusEdit,
							  		'purchaseDate' => $purchaseDate
							  	]
						); 

        $itemData = array('itemUpdated' => $itemUpdated, 'itemID' =>\Input::get('itemID'));
        
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

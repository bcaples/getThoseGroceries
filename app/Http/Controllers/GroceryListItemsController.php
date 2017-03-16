<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use Mailgun\Mailgun;

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

	//Print GroceryItems
    public function printItems()
    {
     	$items = \DB::table('groceryListItems')->where('listID', \Input::get('listID'))->get();
        
        $itemData = array('items' => $items);
        
        return \Response::json($itemData);
    }

    //Email GroceryItems
    public function emailItems()
    {
     	$mg = new Mailgun("key-6dcff304040669f3e43de5b662c54554");
        $domain = "sandbox66bb26a87f12481a844b6099f5ae1406.mailgun.org";
        $mg->sendMessage($domain, array('from'    => 'Get Those Groceries! <support@gethosegroceries.com>',
                                        'to'      => 'billycaples@gmail.com',
                                        'subject' => 'Get Those Groceries!',
                                        'html'    => \Input::get('emailHTML')
                                        ));
        $result = $mg->get("$domain/log", array('limit' => 25, 'skip'  => 0));
        $httpResponseCodeEmail = $result->http_response_code;
        return \Response::json(array('httpResponseCodeEmail' => $httpResponseCodeEmail));
    }
}

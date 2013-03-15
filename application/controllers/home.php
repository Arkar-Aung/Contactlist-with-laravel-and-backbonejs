<?php

class Home_Controller extends Base_Controller {
	
	public $restful = true;
	
	public function get_index()
	{
		return View::make('template/index');
	}
	
	public function get_contactlists()
	{
		$contact_lists =  Contactlist::get();
		foreach($contact_lists as $c)
		{
			$lists['name'] = $c->name;
			$lists['phnumber'] = $c->phnumber;		
		}
		echo json_encode($lists);
	}

	public function get_add_contactlists()
	{
		$contact_lists =  Contactlist::insert(Input::get());
		//echo json_encode($lists);
	}	
	
}
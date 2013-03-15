<?php
	class Contacts_Controller extends Base_Controller
	{
		public $restful = true;
		
		public function get_index()
		{
			$contacts = Contact::all();
			$contact = null;
			foreach($contacts as $c)
			{
				$temp['name'] = $c->name;
				$temp['phnumber'] = $c->phnumber;
				$temp['id'] = $c->id;
				$contact[] = $temp;
			}			
			return json_encode($contact);
		}
		
		public function post_create()
		{
			$input = Input::json();
			$contact = Contact::create(array(
				'name'				=> $input->name,
				'phnumber'		=> $input->phnumber
			));
			return json_encode($contact);
		}

		
		public function put_update()
		{
			$id = (int) URI::segment('2');
			$input = Input::json();
			$contact = Contact::find($id);
			$contact->name = $input->name;
			$contact->phnumber = $input->phnumber;
			$contact->save();
			return json_encode($contact);			
		}
		
		public function delete_destroy()
		{
			$id = (int) URI::segment('2');			
			$contact = Contact::find($id);			
			$contact->delete();
		}
	}

?>
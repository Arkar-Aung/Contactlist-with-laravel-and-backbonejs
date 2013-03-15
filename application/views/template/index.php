<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compactible" content="IE=edge,chrome=1" />
	<title>Contact List | Backbone</title>
	<link rel="stylesheet" type="text/css" href="css/style.css" media="all" />
</head>
<body>
	<div id="contact_container">	
	</div> <!-- end of contact_container -->
	<script id="ContactTemplate" type="text/template">
		<div id="addContactContainer">
			<input type="text" name="name" id="name" placeholder = "Name" />
			<input type="text" name="ph_no" id="ph_no" placeholder = "Phone Number" />
			<button id="addContact_btn">Add</button>
		</div>
		<ul></ul>
	</script>	
	
	<script id="ShowContactList" type="text/template">
			<span class="contact_name"><%= name %></span>
			<span class="contact_phnumber"><%= phnumber %></span>
			<span class="editContact"></span> 
			<span class="deleteContact"></span>
	</script>	
	<script src="js/underscore.js"></script>	
	<script src="js/jquery-1.8.2.min.js"></script>
	<script src="js/json2.js"></script>
	<script src="js/backbone.js"></script>
	<!--script src="js/backbone-localstorage.js"></script -->	
	<script src="js/contact_list.js"></script>
	<script>
		/*(function() {
			"use strict"
			 window.Course = Backbone.Model.extend({
				defaults: {
					'title' : '',
					'url' : ''
				},
				urlRoot : 'courses/' 
			});
		})(); */
	</script>
</body>
</html>


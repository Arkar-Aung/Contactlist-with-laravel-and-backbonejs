/*
Created by Arkar Aung
Contact LIst Version : 2.0.0
*/
	
(function($){
	var Contact = Backbone.Model.extend({ // create model
		urlRoot : '/contacts'
	});
	
	var ContactList = Backbone.Collection.extend({ // create collection
		model : Contact,			  
		//localStorage: new Backbone.LocalStorage("contact-backbone"), // use local storage adapter
	});
	
	var contactlist = new ContactList();	// for use in all view as a global collection	
		contactlist.url ="/contacts";
		contactlist.fetch();	
	
	var ListView = Backbone.View.extend({ // view for each contact
		tagName : 'li',
		events : {
			'click span.editContact' : 'editContact',
			'click span.deleteContact' : 'deleteContact',
			'click span.updateContact' : 'updateContact',
			'click span.cancel' : 'cancel'
		},
		ListTemplate : _.template($('#ShowContactList').html()),
		initialize : function(){
			this.listenTo(this.model, 'change', this.render); // to render again when model change
		},
		render : function(){
			$(this.el).html(this.ListTemplate(this.model.toJSON()));
			return this;
		},
		editContact : function(){
			name = '<input type="text" name="updateName" value="'+this.model.get('name')+'" id="updateName" />';
			phnumber = '<input type="text" name="updatePhnum" value="'+this.model.get('phnumber')+'" id="updatePhnumber" />';
			$(this.el).find('.contact_name').html(name);
			$(this.el).find('.contact_phnumber').html(phnumber);
			$(this.el).find('.editContact').replaceWith('<span class="updateContact"></span>');
			$(this.el).find('.deleteContact').after(' <span class="cancel"></span>');
		},
		deleteContact : function(){
			this.model.destroy();
		},
		updateContact : function(){
			name = $(this.el).find('#updateName').val();
			phnumber = $(this.el).find('#updatePhnumber').val();
			if(phnumber != '' && name != ''){
				this.model.set({
					name : name,
					phnumber : phnumber
				});
				this.model.save();	
				this.cancel();
			}else
			{
				alert('Both Name and Phone number fields can\'t be empty !');
			}
		},
		cancel : function(){
			name = this.model.get('name');
			phnumber = this.model.get('phnumber');
			$(this.el).find('.contact_name').html(name);
			$(this.el).find('.contact_phnumber').html(phnumber);
			$(this.el).find('.updateContact').replaceWith('<span class="editContact"></span>');
			$(this.el).find('.cancel').remove();			
		}
	});
	
	var MasterView = Backbone.View.extend({ // view for the whole app
		el : $('#contact_container'),
		template : _.template($('#ContactTemplate').html()),
		events : {
			'click button#addContact_btn' : 'addContact'
		},
		initialize : function(){
			this.listenTo(contactlist, 'all', this.render);
			this.listenTo(contactlist, 'add', this.showContact);		
		}, 
		render : function(){
			this.$el.html(this.template());
			self = this;
			_(contactlist.models).each(function(contact){
				self.showContact(contact);
			},this);
		},
		addContact : function(){
			name = this.$('#name').val();
			phnumber = this.$('#ph_no').val();

			if(phnumber != '' && name != ''){
				contact = new Contact();
				this.$('#name').val('');
				this.$('#ph_no').val('');
				contact.set({name : name,phnumber : phnumber}); // add new contact 
				contactlist.create(contact);
			}else{
				alert('Both Name and Phone number fields can\'t be empty !');
			}
			
		},
		showContact : function(contact){
			var listview = new ListView({
				model : contact
			});
			$('#contact_container ul').append(listview.render().el); // call Listview to show each contact
		}
	});
	var masterview = new MasterView();
})(jQuery);
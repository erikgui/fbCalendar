var MdlEventInfo = Backbone.Model.extend({

	
	initialize: function() {
		console.log('here', this.attributes);
		// set up the other child models
		_.bindAll(this, 'onEventDetailsChanged', 'addEventImage', 'onEventImageAdded');
		

		
	},
	// override fetch function to tell each child to fetch
	fetch: function() {
		// fetch the initial info
		this.mdlEventDetails.fetch({data: {id: this.id}});
		
		
	},
	
	
});

var MdlStubEvent = Backbone.Model.extend({

	defaults: {
		
	},
	
	
});

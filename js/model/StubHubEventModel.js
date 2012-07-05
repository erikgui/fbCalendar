window.StubHubEventModel = Backbone.Model.extend({

	initialize: function() {
		this.set({
			name: '',
			act_primary: '',
			venue: '',
			time: '',
			thumbnail: '',
			description: '',
		});
	},

});

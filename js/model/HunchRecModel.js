window.HunchRecModel = Backbone.Model.extend({

	defaults: {
		name: '',
		aliases: '',
		description: ''
	},

	initialize: function(info) {
		this.set({
			name: info.name,
			description: info.description,
			aliases: info.aliases,
		});
	},

});

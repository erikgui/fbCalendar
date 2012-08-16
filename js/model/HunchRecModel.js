/*=======================HunchRecModel===========================*/
// This model is used to save the data retrieved from Hunch. Currently,
// only the artist name is used. Description is a short blurb about the
// artist, and the aliases are the alternative IDs for the artist.
/*===============================================================*/
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

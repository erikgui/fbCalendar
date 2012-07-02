window.HunchRecModel = Backbone.Model.extend({

	defaults: {
		name: '',
		aliases: '',
		description: ''
	},

	initialize: function() {

	},

	validateItem: function(key) {
		return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
	},

});

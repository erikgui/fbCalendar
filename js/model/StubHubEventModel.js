window.StubHubEventModel = Backbone.Model.extend({

	defaults: {

	},

	initialize: function() {

	},

	validateItem: function(key) {
		return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
	},

});

window.FacebookUserModel = Backbone.Model.extend({
	defaults: {
		name: '',
		fb_id: '',
		likes: [],
	},

	initialize: function() {

	},

	validateItem: function(key) {
		return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
	},

	publishStream: function() {

	},

	fbLogin: function() {
		FB.login(function(response) {
				if (response.authResponse) {
					FB.api('/me', function(info) {
						login(response, info);
					});	   
				} else {
					//user cancelled login or did not grant authorization
				}
		}, {scope:'status_update,publish_stream,user_about_me,user_likes,user_events,user_location'});  	
	}
});
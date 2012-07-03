window.FacebookUserModel = Backbone.Model.extend({
	defaults: {
		name: '',
		fb_id: '',
		likes: [],
		access_token: ''
	},

	initialize: function() {

	},

	publishStream: function() {

	},

	fbLogin: function() {
		FB.login(function(response) {
				if (response.authResponse) {
					FB.api('/me', function(info) {
						if (response.authResponse) {
							this.set('access_token') =   response.authResponse.accessToken;
							
							/*userInfo.innerHTML                             = '<img src="https://graph.facebook.com/' + info.id + '/picture">' + info.name
																			 + "<br /> Your Access Token: " + accessToken;
							*/
							document.getElementById('user-info').innerHTML = "Hello, " + info.name + "!";
						}
					});	   
				} else {
					//user cancelled login or did not grant authorization
				}
		}, {scope:'status_update,publish_stream,user_about_me,user_likes,user_events,user_location'});  	
	}
});
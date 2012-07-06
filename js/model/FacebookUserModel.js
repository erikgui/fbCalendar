window.FacebookUserModel = Backbone.Model.extend({
	initialize: function() {
		this.set({
			name: '',
			fb_id: '',
			musicianNames: [],
			musicianIDs: '',
			teamNames: [],
			teamIDs: '',
			accessToken: '',
			accessTokenReady: false,
		});

		var self = this;
		FB.getLoginStatus(function(response) {
			if (response.authResponse) {
				FB.api('/me', function(info) {
					if (response.authResponse) {
						self.handleAuthResponse(response, info);
					}
				});	   
			} else {
				FB.login(function(response) {
					if (response.authResponse) {
						FB.api('/me', function(info) {
							if (response.authResponse) {
								console.log(response);
								console.log(info);
								self.handleAuthResponse(response, info);
							}
						});	   
					} else {
						//user cancelled login or did not grant authorization
					}
				}, {scope:'status_update,publish_stream,user_about_me,user_likes,user_events,user_location'});  
			}
		});
	},

	handleAuthResponse: function(response, info) {
		this.set('accessToken', response.authResponse.accessToken);
		this.set('accessTokenReady', true);
		this.set('id', info.id);
		this.set('name', info.name);
		this.retrieveLikes();
	},

	retrieveLikes: function() {
		var self = this;
		FB.api('/me/likes?access_token=' + self.get('accessToken'), function(response) {
			var likes = response;
			var musicianNames = [];
			var musicianIDs = [];
			var teamNames = [];
			var teamIDs = [];
			for (var i = 0 ; i < likes.data.length; i++) {
				var like = likes.data[i];
				if (like.category === 'Musician/band') {
					musicianNames.push(like.name);
					musicianIDs.push('fb_' + like.id);
				} else if (like.category === 'Professional sports team') {
					teamNames.push(like.name);
					teamIDs.push('fb_' + like.id);
				}
			}
			
			musicianIDs = musicianIDs.join();
			teamIDs = teamIDs.join();

			self.set('musicianNames', musicianNames);
			self.set('musicianIDs', musicianIDs);
			self.set('teamNames', teamNames);
			self.set('teamIDs', teamIDs);

			self.customizeEvents();
		});
	},

	customizeEvents: function() {
		var self = this;
		var musicianNames = self.get('musicianNames');
		var musicianIDs = self.get('musicianIDs');
		var teamNames = self.get('teamNames');
		var teamIDs = self.get('teamIDs');

		var collection = window.app.collection;

		// _.each(musicianNames, function(name) {
		// 	console.log(name);
		// 	collection.meta('description', name);
		// 	collection.meta('event_date_time_local', '[2012-07-01T00:00:00Z TO 2012-12-01T00:00:00Z]');
		// 	collection.fetch();		
		// });

		//filter and reconstruct Collection based on likes (preserving the original copy)
		collection.meta('view', this.view);
		collection.meta('event_date_time_local', '[NOW TO *]');
		collection.fetch({success: function() {
			console.log('filtering collection');


			window.DisplayedCollection = new StubHubEventCollection();

			for (var i = 0; i < collection.length; i++) {			
				var eventInstance = collection.at(i);
				var act_primary = eventInstance.get('act_primary');
				var musicianMatch = false;
				var teamMatch = false;
				for (var j = 0; j < musicianNames.length; j++) {
					if ((new RegExp(musicianNames[j])).test(act_primary)) {
						musicianMatch = true;
						break;
					}
				}

				for (var k = 0; k < teamNames.length; k++) {
					if ((new RegExp(teamNames[k])).test(act_primary)) {
						teamMatch = true;
						break;
					}
				}

				if (musicianMatch || teamMatch) {
					DisplayedCollection.add(eventInstance);
					window.app.view.addEvent(eventInstance);
				}

			}


			console.log(DisplayedCollection);
		}});

		



		window.app.hunch.meta('topic_ids', 'list_musician');
		window.app.hunch.meta('likes', musicianIDs);
		window.app.hunch.meta('blocked_result_ids', musicianIDs);

		console.log(window.app.hunch.url());
		window.app.hunch.fetch();
	}
});

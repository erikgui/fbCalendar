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
				}, {scope:'status_update,publish_stream,user_about_me,user_likes,user_events,user_location,rsvp_event'});  
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
			console.log(response);
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
			
			self.getRecommendations();

			self.customizeEvents();

			console.log(self.get('musicianNames'));
		});
	},

	getRecommendations: function() {
		var musicianIDs = this.get('musicianIDs');
		window.app.hunch.meta('topic_ids', 'list_musician');
		window.app.hunch.meta('likes', musicianIDs);
		window.app.hunch.meta('blocked_result_ids', musicianIDs);
		window.app.hunch.meta('API-method', 'get-recommendations');
		console.log(window.app.hunch.url());

		Hunch.api('get-recommendations', {fields: 'name,description,aliases', topic_ids: 'list_musician', likes: musicianIDs, blocked_result_ids: musicianIDs}, function(response) {
			console.log(response);
			var recs = response.recommendations;
			for (var i = 0; i < recs.length; i++) {
				window.app.hunch.add(new HunchRecModel(recs[i]));
			}
			console.log(window.app.hunch);
		});
	},

	updateCollection: function(startTime) {
		var self = this;
		var musicianNames = self.get('musicianNames');
		var musicianIDs = self.get('musicianIDs');
		var teamNames = self.get('teamNames');
		var teamIDs = self.get('teamIDs');
		var collection = window.app.collection;
		collection.meta('view', this.view);
		collection.meta('event_date_time_local', '[' + startTime + ' TO *]');
		collection.fetch({success: function() {

			console.log('filtering collection');

			window.DisplayedCollection = new StubHubEventCollection();
			console.log('startTime ', startTime);
			window.d1 = DateUtil.convertToDateObject(startTime);
			window.d2 = d1.clone().addDays(1);
			window.limit = d1.clone().addDays(8);
			console.log('d1 ', d1);
			console.log('d2 ', d2);
			
			while (!d1.equals(limit)) {
				console.log('here1');
				for (var i = 0; i < collection.length; i++) {
					console.log('here2');		
					var eventInstance = collection.at(i);
					var eventDateObj = eventInstance.get('eventDateObj');
					if (eventDateObj.between(d1, d2) && eventInstance.get('eventTotalTickets') > 0) {
						DisplayedCollection.add(eventInstance);
						window.app.view.addEvent(eventInstance);
					}
				}
				d1 = d2.clone();
				d2 = d2.addDays(1);
			}

			app.view.sortEventViews();

			var temp = new Date();
			temp = d1.clone();
			d2 = temp.addDays(1);
			limit = limit.addDays(8);	

		}});
	},

	customizeEvents: function() {
		var self = this;
		var musicianNames = self.get('musicianNames');
		var musicianIDs = self.get('musicianIDs');
		var teamNames = self.get('teamNames');
		var teamIDs = self.get('teamIDs');
		while (typeof window.app === 'undefined') {
			//ugly while loop to while for app to initialize
		}
		if (typeof window.app.collection == 'undefined') {
			window.app.collection = new StubHubEventCollection();
		}
		var collection = window.app.collection;

		//filter and reconstruct Collection based on likes (preserving the original copy)
		collection.meta('view', this.view);
		collection.meta('event_date_time_local', '[NOW TO *]');
		collection.fetch({success: function() {

			//successfully retrieved 200 items from LCS
			console.log('filtering collection');

			window.DisplayedCollection = new StubHubEventCollection();
			window.d1 = new Date();
			window.d2 = new Date().addDays(1);
			window.limit = new Date().addDays(8);
			
			while (!d1.equals(limit)) {
				for (var i = 0; i < collection.length; i++) {			
					var eventInstance = collection.at(i);
					var eventDateObj = eventInstance.get('eventDateObj');
					if (eventDateObj.between(d1, d2) && eventInstance.get('eventTotalTickets') > 0) {
						DisplayedCollection.add(eventInstance);
						window.app.view.addEvent(eventInstance);
					}
				}
				d1 = d2.clone();
				d2 = d2.addDays(1);
			}

			app.view.sortEventViews();

			var temp = new Date();
			temp = d1.clone();
			d2 = temp.addDays(1);
			limit = limit.addDays(8);	

			console.log('d1: ' + d1);
			console.log('d2: ' + d2);
			console.log('limit: ' + limit);

			/*=================Checking for dates with no events=================*/
			/*==========================Not Implemented==========================*/
			// var dateObj = new Date();
			// while (dateObj.isBefore(d2)) {
			// 	var containsDate = false;
			// 	for (var j = 0; j < window.DisplayedCollection.length; j++) {
			// 		var eventInstance = DisplayedCollection.at(j);
			// 		if (eventInstance.get('eventMonth') === dateObj.getMonth()) {
			// 			if (dateObj.getDate() === eventInstance.get('eventDate')) {
			// 				containsDate = true;
			// 				break;
			// 			}
			// 		}
			// 	}
			// 	if (!containsDate) {
			// 		var mdl = new StubHubEventModel();
			// 		mdl.setEventTime(dateObj);
			// 		var monthViews = window.app.view.meta('timelineMonthViews');
			// 		for (var k = 0; k < monthViews.length; k++) {
			// 			var mv = monthViews[k];
			// 			if (mv.meta('eventMonth') === dateObj.getMonth()) {
			// 				var dateViews = mv.meta('timelineItemViews');
			// 				for (var l = 0; l < dateViews.length; l++) {
			// 					var dv = dateViews[l];
			// 					// console.log('dv.meta("dateNumber"): ' + dv.meta('dateNumber'));
			// 					// console.log('dateObj.getDate(): ' + dateObj.getDate());
			// 					if (dv.meta('dateNumber')-1 === dateObj.getDate()) {
			// 						console.log(dv.el);
			// 						DisplayedCollection.add(mdl);
			// 						window.app.view.insertEvent(mdl, dv);
			// 					}
			// 				}
			// 			}
			// 		}
			// 		console.log('making eventMdl for date: ' + dateObj);
			// 	}
			// 	// if (!window.app.view.hasDate(dateObj)) {
			// 	// 	console.log('missing date: ' + dateObj);
			// 	// }
			// 	dateObj = dateObj.addDays(1);
			// }		
			
//			console.log(DisplayedCollection);
			// for (var idx = 0; idx < DisplayedCollection.length; idx++) {
			// 	var eventInstance = DisplayedCollection.at(idx);
			// 	var eventYear = eventInstance.get('eventYear');
			// 	var eventMonth = eventInstance.get('eventMonth');
			// 	var eventDate = eventInstance.get('eventDate');
			// 	var eventName = eventInstance.get('eventName');

			// 	var counter = 0;
			// 	var view = window.app.view;
			// 	for (var idx2 = 0; idx2 < collection.length; idx2++) {
			// 		var ei = collection.at(idx2);
			// 		if (counter < 6) {
			// 			if (ei.get('eventYear') === eventYear &&
			// 				ei.get('eventMonth') === eventMonth &&
			// 				ei.get('eventDate') === eventDate &&
			// 				ei.get('eventName') !== eventName) {
			// 				if (!view.hasEvent(ei)) {
			// 					window.app.view.addEvent(ei);
			// 					counter++;	
			// 				}
			// 			}
			// 		} else {
			// 			break;
			// 		}
			// 	}
			// }
		}});
	},
});

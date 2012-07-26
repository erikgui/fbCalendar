/*Model Dialog*/
window.TimelineDetailView = Backbone.View.extend({
	el: '#timelinedetail-container',
	events: {
		'click .rsvp-attending' : 'rsvpAttending',
		'click .rsvp-maybe': 'rsvpMaybe',
		'click .remove-event': 'removeEvent',
		'click .event-post': 'eventPost',
		'click .event-invite': 'eventInvite',
		'click .event-fbpage': 'eventFBPage',
	},

	meta: function(property, value) {
		if (typeof value === "undefined") {
			return this._meta[property];
		} else {
			this._meta[property] = value;
		}
	},

	initialize: function() {
		_.bindAll(this, 'render');
		this._meta = {};
		this.render();
	},

	changeInfo: function(eventInfo, timelineEventView) {
		var dataStr;
		this.meta('eventID', '');
		this.meta('eventInfo', eventInfo);
		this.meta('timelineEventView', timelineEventView);
		if (typeof eventInfo.get('eventSEODesc') == 'undefined') {
			console.log('eventSEODesc undef');
			if (typeof eventInfo.get('eventName') == 'undefined') {
				console.log('eventName undef');
				if (typeof eventInfo.get('venue_name') == 'undefined') {
					console.log('act_primary undef');
					dataStr = 'Name here!';
				} else {
					dataStr = eventInfo.get('venue_name');
				}
			} else {
				dataStr = eventInfo.get('eventName');
			}
		} else {
			dataStr = eventInfo.get('eventSEODesc');
		}
		var dateObj = eventInfo.get('eventDateObj');
		var data = {
			'eventName': dataStr, 
			'venueName': eventInfo.get('venue_name'),
			'eventTime' : DateUtil.getDayName(dateObj.getDay()) + 
			' ' + DateUtil.formatTime(dateObj.getHours(), dateObj.getMinutes()) +
          ', ' + DateUtil.getMonthName(dateObj.getMonth()) + 
          ' ' + dateObj.getDate() + ' ' + dateObj.getFullYear(),
			'minPrice': '  From $'+ eventInfo.get('eventMinPrice') + ' USD',
		};

		$(this.el).html(this.template(data));
		$(this.el).find('.event-img-large').css('background-image', 'url(' + eventInfo.get('thumbnail') + ')');

		$(this.el).find('.btn-custom1').attr('href', 'https://www.stubhub.com/' + eventInfo.get('genreUrlPath') + '/' + eventInfo.get('urlpath'));
		this.meta('attending', false);
		this.meta('maybe', false);

		// FB.api('/404913136233483', {fields: 'access_token'}, function(response) {
		// 	var at = response.access_token;
		// 	FB.api('/404913136233483/events', {access_token: at}, function(response){
		// 		var events = response.data;
		// 		var eventExists = false;
		// 		for (var i = 0; i < events.length; i++) {
		// 			var evt = events[i];
		// 			if (evt.name === eventInfo.get('eventSEODesc')) {
		// 				eventExists = true;
		// 				self.meta('eventID', evt.id);
		// 				break;
		// 			}
		// 		}
		// 		if (!eventExists && typeof self.meta('eventID') == 'undefined') {
		// 			FB.api('/404913136233483/events', 'post', {
		// 				access_token: at, 
		// 				name: eventInfo.get('eventSEODesc'), 
		// 				start_time: Math.round(eventInfo.get('eventDateObj').getTime()/1000)
		// 			}, function(response){
		// 				console.log(response);
		// 				var event_id = response.id;
		// 				self.meta('eventID', event_id);
		// 				FB.api(event_id+'/attending', 'post', function(response) {
		// 					console.log(response);
		// 					$('.rsvp-attending').html('<i class="icon-ok"></i><span>Attending</span>');
		// 					$('.rsvp-attending').addClass('btn-custom2');
		// 				});
		// 			});
		// 		}
		// 	});
		// });

	},

	render: function() {
		var data = {
			'eventName': 'Event Name', 
			'venueName': 'Venue Name', 
			'venueLocation': 'Venue Location', 
			'eventTime' : '10:00AM PDT',
			'minPrice': '  From $1000 USD'
		};

		$(this.el).html(this.template(data));
		$('#details-modal').modal({show: false});
		return this.el;
	},

	show: function() {
		$('#details-modal').modal({show: true});
	},

	rsvpAttending: function() {
		console.log('rsvp attending!');
		var self = this;
		if (!self.meta('attending')) {
			var eventInfo = self.meta('eventInfo');
			$('.rsvp-attending').html("<img src='img/ajax-loader2.gif'/>");
			FB.api('/404913136233483', {fields: 'access_token'}, function(response) {
				console.log(response);
				var at = response.access_token;
				FB.api('/404913136233483/events', {access_token: at}, function(response){
					console.log(response);
					var events = response.data;
					var eventExists = false;
					for (var i = 0; i < events.length; i++) {
						var evt = events[i];
						if (evt.name === eventInfo.get('eventSEODesc')) {
							eventExists = true;
							self.meta('eventID', evt.id);
							FB.api(evt.id+'/attending', 'post', function(response) {
								console.log(response);
								$('.rsvp-attending').html('<i class="icon-ok"></i><span>Attending</span>');
								$('.rsvp-attending').addClass('btn-custom2');
							});
							break;
						}
					}
					if (!eventExists && typeof self.meta('eventID') == 'undefined') {
						FB.api('/404913136233483/events', 'post', {
							access_token: at, 
							name: eventInfo.get('eventSEODesc'), 
							start_time: Math.round(eventInfo.get('eventDateObj').getTime()/1000)
						}, function(response){
							console.log(response);
							var event_id = response.id;
							self.meta('eventID', event_id);
							FB.api(event_id+'/attending', 'post', function(response) {
								console.log(response);
								$('.rsvp-attending').html('<i class="icon-ok"></i><span>Attending</span>');
								$('.rsvp-attending').addClass('btn-custom2');
							});
						});
					}
				});
			});
			self.meta('attending', true);
		} else {
			if (typeof self.meta('eventID') != 'undefined') {
				self.meta('attending', false);
				FB.api(self.meta('eventID') + '/declined', 'post', function(response) {
					$('.rsvp-attending').html('<span>Attending</span>');
					$('.rsvp-attending').removeClass('btn-custom2');
					console.log(response);
				});
			}
		}
		if (self.meta('maybe')) {
			$('.rsvp-maybe').html('<span>Maybe</span>');
			$('.rsvp-maybe').removeClass('btn-custom2');
			self.meta('maybe', false);
		}
	},

	rsvpMaybe: function() {
		console.log('rsvp maybe!');
		var self = this;
		if (!self.meta('maybe')) {
			var eventInfo = self.meta('eventInfo');
			$('.rsvp-maybe').html("<img src='img/ajax-loader2.gif'/>");
			FB.api('/404913136233483', {fields: 'access_token'}, function(response) {
				console.log(response);
				var at = response.access_token;
				FB.api('/404913136233483/events', {access_token: at}, function(response){
					console.log(response);
					var events = response.data;
					var eventExists = false;
					for (var i = 0; i < events.length; i++) {
						var evt = events[i];
						if (evt.name === eventInfo.get('eventSEODesc')) {
							eventExists = true;
							self.meta('eventID', evt.id);
							FB.api(evt.id+'/maybe', 'post', function(response) {
								console.log(response);
								$('.rsvp-maybe').html('<i class="icon-ok"></i><span> Maybe</span>');
								$('.rsvp-maybe').addClass('btn-custom2');
							});
							break;
						}
					}
					if (!eventExists && typeof self.meta('eventID') == 'undefined') {
						FB.api('/404913136233483/events', 'post', {
							access_token: at, 
							name: eventInfo.get('eventSEODesc'), 
							start_time: Math.round(eventInfo.get('eventDateObj').getTime()/1000)
						}, function(response){
							console.log(response);
							var event_id = response.id;
							self.meta('eventID', event_id);
							FB.api(event_id+'/maybe', 'post', function(response) {
								console.log(response);
								$('.rsvp-maybe').html('<i class="icon-ok"></i><span> Maybe</span>');
								$('.rsvp-maybe').addClass('btn-custom2');
							});
						});
					}
				});
			});
			self.meta('maybe', true);
		} else {
			if (typeof self.meta('eventID') != 'undefined') {
				self.meta('maybe', false);
				FB.api(self.meta('eventID') + '/declined', 'post', function(response) {
					$('.rsvp-maybe').html('<span>Maybe</span>');
					$('.rsvp-maybe').removeClass('btn-custom2');
					console.log(response);
				});
			}
		}
		if (self.meta('attending')) {
			$('.rsvp-attending').html('<span>Attending</span>');
			$('.rsvp-attending').removeClass('btn-custom2');
			self.meta('attending', false);
		}
		
	},

	removeEvent: function() {
		var tlev = this.meta('timelineEventView');
		var tliv = tlev.meta('itemView');
		var tlevs = tliv.meta('timelineEventViews');
		$('#details-modal').modal('hide');
		for (var i = 0; i < tlevs.length; i++) {
			if (tlev.meta('eventName') === tlevs[i].meta('eventName') &&
				tlev.meta('act_primary') === tlevs[i].meta('act_primary') &&
				tlev.meta('eventDate') === tlevs[i].meta('eventDate') &&
				tlev.meta('eventMonth') === tlevs[i].meta('eventMonth')) {
				console.log('removing tlev');
				tlevs.splice(i, 1);
			}
		}
		$(tlev.el).remove();
	},

	eventPost: function() {
		var eventInfo = this.meta('eventInfo');
		var dataStr;
		if (typeof eventInfo.get('eventSEODesc') == 'undefined') {
			console.log('eventSEODesc undef');
			if (typeof eventInfo.get('eventName') == 'undefined') {
				console.log('eventName undef');
				if (typeof eventInfo.get('venue_name') == 'undefined') {
					console.log('act_primary undef');
					dataStr = 'Name here!';
				} else {
					dataStr = eventInfo.get('venue_name');
				}
			} else {
				dataStr = eventInfo.get('eventName');
			}
		} else {
			dataStr = eventInfo.get('eventSEODesc');
		}
		var dateObj = eventInfo.get('eventDateObj');
		var obj = {
          method: 'feed',
          link: 'https://www.stubhub.com/' + eventInfo.get('genreUrlPath') + '/' + eventInfo.get('urlpath'),
          picture: eventInfo.get('thumbnail'),
          name: dataStr,
          caption: eventInfo.get('venue_name'),
          description: DateUtil.getDayName(dateObj.getDay()) + 
			' ' + DateUtil.formatTime(dateObj.getHours(), dateObj.getMinutes()) +
          ', ' + DateUtil.getMonthName(dateObj.getMonth()) + 
          ' ' + dateObj.getDate(),
        };
        FB.ui(obj, function(response) {
        	console.log(response);
        });
	},

	eventInvite: function() {
		var eventInfo = this.meta('eventInfo');
		var dataStr;
		if (typeof eventInfo.get('eventSEODesc') == 'undefined') {
			console.log('eventSEODesc undef');
			if (typeof eventInfo.get('eventName') == 'undefined') {
				console.log('eventName undef');
				if (typeof eventInfo.get('venue_name') == 'undefined') {
					console.log('act_primary undef');
					dataStr = 'Name here!';
				} else {
					dataStr = eventInfo.get('venue_name');
				}
			} else {
				dataStr = eventInfo.get('eventName');
			}
		} else {
			dataStr = eventInfo.get('eventSEODesc');
		}
		FB.ui({method: 'apprequests',
			title: dataStr,		
			message: 'Would you like to attend this event?',
		}, function() {

		});
	},

	eventFBPage: function() {
		var self = this;
		var eventInfo = self.meta('eventInfo');
		if (typeof self.meta('eventID') != 'undefined' && self.meta('eventID') !== '') {
			$('.event-fbpage-link').attr('href', 'https://www.facebook.com/events/' + self.meta('eventID') + '/');
			//window.open('https://www.facebook.com/events/' + self.meta('eventID') + '/','_blank');
			//console.log('https://www.facebook.com/events/' + self.meta('eventID') + '/');
			// $('.event-fbpage-link').target = "_blank";
	        window.open($('.event-fbpage-link').prop('href'));
		} else {
			FB.api('/404913136233483', {fields: 'access_token'}, function(response) {
				var at = response.access_token;
				FB.api('/404913136233483/events', {access_token: at}, function(response){
					var events = response.data;
					var eventExists = false;
					for (var i = 0; i < events.length; i++) {
						var evt = events[i];
						if (evt.name === eventInfo.get('eventSEODesc')) {
							eventExists = true;
							self.meta('eventID', evt.id);
							$('.event-fbpage-link').attr('href', 'https://www.facebook.com/events/' + self.meta('eventID') + '/');
							//console.log('https://www.facebook.com/events/' + self.meta('eventID') + '/');
							window.open($('.event-fbpage-link').prop('href'));
							break;
						}
					}
					if (!eventExists && (typeof self.meta('eventID') == 'undefined' || self.meta('eventID') === '')) {
						FB.api('/404913136233483/events', 'post', {
							access_token: at, 
							name: eventInfo.get('eventSEODesc'), 
							start_time: Math.round(eventInfo.get('eventDateObj').getTime()/1000)
						}, function(response){
							var event_id = response.id;
							self.meta('eventID', event_id);
							$('.event-fbpage-link').attr('href', 'https://www.facebook.com/events/' + self.meta('eventID') + '/');
							//console.log('https://www.facebook.com/events/' + self.meta('eventID') + '/');
							window.open($('.event-fbpage-link').prop('href'));
						});
					}
					
				});
			});
		}
		
	},
});
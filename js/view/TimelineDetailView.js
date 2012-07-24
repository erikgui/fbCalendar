/*Model Dialog*/
window.TimelineDetailView = Backbone.View.extend({
	el: '#timelinedetail-container',
	events: {
		'click .rsvp-attending' : 'rsvpAttending',
		'click .rsvp-maybe': 'rsvpMaybe',
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

	changeInfo: function(eventInfo) {
		var dataStr;
		this.meta('eventInfo', eventInfo);
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
		var data = {
			'eventName': dataStr, 
			'venueName': eventInfo.get('venue_name'),
			'eventTime' : eventInfo.get('eventDateObj').toLocaleString(),
		};
		$(this.el).html(this.template(data));
		$(this.el).find('.event-img-large').css('background-image', 'url(' + eventInfo.get('thumbnail') + ')');
		},

	render: function() {
		var data = {
			'eventName': 'Event Name', 
			'venueName': 'Venue Name', 
			'venueLocation': 'Venue Location', 
			'eventTime' : '10:00AM PDT'
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
		FB.api('/404913136233483', {fields: 'access_token'}, function(response) {
			console.log(response);
			var at = response.access_token;
			FB.api('/404913136233483/events', {access_token: at}, function(response){
				console.log(response);
				FB.api('/404913136233483/events', 'post', {access_token: at, name: 'EventTest4', start_time: Math.round(new Date().addDays(2).getTime()/1000)}, function(response){
					console.log(response);
					var event_id = response.id;
					FB.api(event_id+'/attending', 'post', function(response) {
						console.log(response);
					});
				});
			});
		});
	},

	rsvpMaybe: function() {
		console.log('rsvp maybe!');
		// FB.api('/404913136233483', {fields: 'access_token'}, function(response) {
		// 	console.log(response);
		// 	var at = response.access_token;
		// 	console.log(new Date().addDays(2).getTime());
		// 	FB.api('/404913136233483/events', 'post', {access_token: at, name: 'Get more food', start_time: Math.round(new Date().addDays(2).getTime()/1000)}, function(response){
		// 		console.log(response);
		// 	});
		// });
	},
});
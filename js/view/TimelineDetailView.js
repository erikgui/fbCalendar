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
			'minPrice': '  From $'+ eventInfo.get('eventMinPrice') + ' USD',
		};

		$(this.el).html(this.template(data));
		$(this.el).find('.event-img-large').css('background-image', 'url(' + eventInfo.get('thumbnail') + ')');

		$(this.el).find('.btn-custom1').attr('href', 'https://www.stubhub.com/' + eventInfo.get('urlpath'));
		this.meta('attending', false);
		this.meta('maybe', false);
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
		if (!this.meta('attending')) {
			var eventInfo = this.meta('eventInfo');
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
							FB.api(evt.id+'/attending', 'post', function(response) {
								console.log(response);
								$('.rsvp-attending').html('<i class="icon-ok"></i><span>Attending</span>');
								$('.rsvp-attending').addClass('btn-custom2');
							});
							break;
						}
					}
					if (!eventExists) {
						FB.api('/404913136233483/events', 'post', {
							access_token: at, 
							name: eventInfo.get('eventSEODesc'), 
							start_time: Math.round(eventInfo.get('eventDateObj').getTime()/1000)
						}, function(response){
							console.log(response);
							var event_id = response.id;
							FB.api(event_id+'/attending', 'post', function(response) {
								console.log(response);
								$('.rsvp-attending').html('<i class="icon-ok"></i><span>Attending</span>');
								$('.rsvp-attending').addClass('btn-custom2');
							});
						});
					}
				});
			});
			this.meta('attending', true);
		}
		if (this.meta('maybe')) {
			$('.rsvp-maybe').html('<span>Maybe</span>');
			$('.rsvp-maybe').removeClass('btn-custom2');
			this.meta('maybe', false);
		}
	},

	rsvpMaybe: function() {
		console.log('rsvp maybe!');
		if (!this.meta('maybe')) {
			var eventInfo = this.meta('eventInfo');
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
							FB.api(evt.id+'/maybe', 'post', function(response) {
								console.log(response);
								$('.rsvp-maybe').html('<i class="icon-ok"></i><span>Maybe</span>');
								$('.rsvp-maybe').addClass('btn-custom2');
							});
							break;
						}
					}
					if (!eventExists) {
						FB.api('/404913136233483/events', 'post', {
							access_token: at, 
							name: eventInfo.get('eventSEODesc'), 
							start_time: Math.round(eventInfo.get('eventDateObj').getTime()/1000)
						}, function(response){
							console.log(response);
							var event_id = response.id;
							FB.api(event_id+'/maybe', 'post', function(response) {
								console.log(response);
								$('.rsvp-maybe').html('<i class="icon-ok"></i><span>Maybe</span>');
								$('.rsvp-maybe').addClass('btn-custom2');
							});
						});
					}
				});
			});
			this.meta('maybe', true);
		}
		if (this.meta('attending')) {
			$('.rsvp-attending').html('<span>Attending</span>');
			$('.rsvp-attending').removeClass('btn-custom2');
			this.meta('attending', false);
		}
		
	},
});
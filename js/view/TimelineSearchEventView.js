window.TimelineSearchEventView = Backbone.View.extend({
	tagName: 'li',

	className: 'search-event-container',

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
	},

	render: function(eventInfo) {
		var dataStr;
		var self = this;
		this.meta('eventID', '');
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


		var dateObj = eventInfo.get('eventDateObj');

		var hours = dateObj.getHours();
		var minutes = dateObj.getMinutes();
		if (minutes < 10) {
			minutes = '0' + minutes.toString(); 
		}
		if (hours > 12) {
			hours = hours - 12; 
			hours = hours + ':' + minutes + ' PM';
		} else {
			hours = hours + ':' + minutes + ' AM';
		}

		var data = {
			'eventName': dataStr,
			'dateNumber': dateObj.getDate(),
			'dateName': DateUtil.getDayName(dateObj.getDay()),
			'monthName': DateUtil.getMonthName(eventInfo.get('eventMonth')),
			'eventHour': hours,
			'venueName': eventInfo.get('venue_name'),
			'eventTime': DateUtil.getDayName(dateObj.getDay()) + 
			' ' + DateUtil.formatTime(dateObj.getHours(), dateObj.getMinutes()) +
          ', ' + DateUtil.getMonthName(dateObj.getMonth()) + 
          ' ' + dateObj.getDate() + ' ' + dateObj.getFullYear(),
			'minPrice': '  From $'+ eventInfo.get('eventMinPrice') + ' USD',
			'totalTickets': eventInfo.get('eventTotalTickets') + ' tickets left',
		};
		$(this.el).append(this.template(data));

		console.log($(this.el).find('.genre-icon-source'));
		var channelId = eventInfo.get('eventChannelID');
		if (channelId === '1') {
			$(this.el).find('.genre-icon-source').attr('src', 'img/concerts-large.png');
		} else if (channelId === '174') {
			$(this.el).find('.genre-icon-source').attr('src', 'img/theatre-large.png');
		} else if (channelId === '28') {
			$(this.el).find('.genre-icon-source').attr('src', 'img/sports-large.png');
		} else if (channelId === '9999') { 
			//friends' events are catagorized into channel ID of 9999
			//if this arbitrary value causes problems it can be changed
			$(this.el).find('.genre-icon-source').attr('src', 'img/friends-large.png');
		}
		$(this.el).find('.event-img.search').css('background-image', 'url(' + eventInfo.get('thumbnail') + ')');
		$(this.el).find('.btn-custom1').attr('href', 'https://www.stubhub.com/' + eventInfo.get('genreUrlPath') + '/' + eventInfo.get('urlpath'));
	},

	rsvpAttending: function() {

	},

	rsvpMaybe: function() {

	},

	removeEvent: function() {

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

	},
});
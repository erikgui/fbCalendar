/*Model Dialog*/
window.TimelineDetailView = Backbone.View.extend({
	el: '#timelinedetail-container',

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
		var data = {
			'eventName': eventInfo.get('eventName'), 
			'venueName': eventInfo.get('venue_name'), 
			'venueLocation': 'Venue Location', 
			'eventTime' : eventInfo.get('eventDateObj'),
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
	}
});
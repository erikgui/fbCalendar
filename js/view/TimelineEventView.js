window.TimelineEventView = Backbone.View.extend({
	tagName: 'li',

	className: 'timelineevent-container',

	events: {
		'click' : 'showDetails',
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
		this.meta('eventName', eventInfo.get('eventName'));
		this.meta('act_primary', eventInfo.get('act_primary'));
		this.meta('eventDate', eventInfo.get('eventDate'));
		this.meta('eventMonth', eventInfo.get('eventMonth'));
		this.meta('eventYear', eventInfo.get('eventYear'));

		var eventName = eventInfo.get('eventName');
		var act_primary = eventInfo.get('act_primary');
		var dataStr = eventName + '<br />' + act_primary;
		if (dataStr.length > 40) {
			dataStr = eventName;
		}
		var data = {'info': dataStr};
		$(this.el).append(this.template(data));
		$(this.el).find('.event-img').css('background-image', 'url(event_img/' + eventInfo.get('thumbnail') + ')');
/*		var data = {'info': 'concert name here!'};
		$(this.el).append(this.template(data));*/
		return this.el;
	},

	showDetails: function() {
		//this.meta('timelineDetailView')
		window.app.modal.show();
	}
});

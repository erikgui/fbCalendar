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
		this.meta('eventInfo', eventInfo);

		var dataStr = eventInfo.get('eventSEODesc');
		if (typeof dataStr == 'undefined') {
			dataStr = eventInfo.get('eventName');
		} 
		if (typeof dataStr == 'undefined') {
			dataStr = eventInfo.get('act_primary');
		}
		if (typeof dataStr == 'undefined') {
			dataStr = 'What\'s my name?';
		}
		console.log(eventInfo.get('eventSEODesc'));

		// if (dataStr.length > 45) {
		// 	dataStr = dataStr.slice(0, 5);
		// 	dataStr + '...';
		// }
		var data = {'info': dataStr};
		$(this.el).append(this.template(data));
		$(this.el).find('.event-img').css('background-image', 'url(' + eventInfo.get('thumbnail') + ')');
/*		var data = {'info': 'concert name here!'};
		$(this.el).append(this.template(data));*/
		return this.el;
	},

	showDetails: function() {
		//this.meta('timelineDetailView')
		window.app.modal.changeInfo(this.meta('eventInfo'));
		window.app.modal.show();
	}
});

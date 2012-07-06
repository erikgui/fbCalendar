window.TimelineEventView = Backbone.View.extend({
	tagName: 'li',

	className: 'timelineevent-container',

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
		var eventName = eventInfo.get('eventName');
		var act_primary = eventInfo.get('act_primary');
		var data = {'info': eventName + ' act_primary: ' + act_primary};
		$(this.el).append(this.template(data));
/*		var data = {'info': 'concert name here!'};
		$(this.el).append(this.template(data));*/
		return this.el;
	}
});

window.TimelineEventView = Backbone.View.extend({
	tagName: 'li',

	className: 'timelineevent-container',

	model: StubHubEventModel,
	meta: function(property, value) {
		if (typeof value === "undefined") {
			return this._meta[property];
		} else {
			this._meta[property] = value;
		}
	},

	initialize: function(eventInfo) {
		_.bindAll(this, 'render');
		this._meta = {};
		this.render(eventInfo);
	},

	render: function(eventInfo) {
		console.log('rendering eventView');
		var eventName = eventInfo.eventName;
		var data = {'info': eventName};
		$(this.el).append(this.template(data));
/*		var data = {'info': 'concert name here!'};
		$(this.el).append(this.template(data));*/
		return this.el;
	}
});

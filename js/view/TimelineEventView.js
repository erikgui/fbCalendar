window.TimelineEventView = Backbone.View.extend({
	tagName: 'li',

	className: 'timelineevent-container',

	model: StubHubEventModel,

	initialize: function() {
		_.bindAll(this, 'render');
	},

	render: function() {
		var data = {'info': 'concert name here!'};
		$(this.el).append(this.template(data));
		return this.el;
	}
});

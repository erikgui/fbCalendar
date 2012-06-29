window.TimelineEventView = Backbone.View.extend({
	tagName: 'li',

	className: 'timelineevent-container',

	model: TimelineEventModel,

	initialize: function() {
		_.bindAll(this, 'render');
	},

	render: function() {
		$(this.el).append(this.template);
		return this.el;
	}
});

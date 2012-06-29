window.TimelineItemView = Backbone.View.extend({
	tagName: 'li',

	className: 'timelineitem-container',

	initialize: function() {
		_.bindAll(this, 'render');
	},

	render: function() {
		$(this.el).append(this.template);
		$(this.el).find('.eventInfos').append(new TimelineEventView().render());
		$(this.el).find('.eventInfos').append(new TimelineEventView().render());
		return this.el;
	}
});

window.TimelineMonthView = Backbone.View.extend({
	tagName: 'li',
	className: 'timeline-month',

	initialize: function() {
		_.bindAll(this, 'render');
	},

	render: function() {
		$(this.el).append(this.template);
	    $(this.el).append(new TimelineItemView().render());
	    $(this.el).append(new TimelineItemView().render());
	    return this;
	}
});

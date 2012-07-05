window.TimelineMonthView = Backbone.View.extend({
	tagName: 'li',
	className: 'timeline-month',
	model: StubHubEventModel,
	
	initialize: function() {
		_.bindAll(this, 'render');
	},

	render: function() {
		var data = {'month_number': 'July, 2012'};
		$(this.el).append(this.template(data));
	    $(this.el).append(new TimelineItemView().render());
	    $(this.el).append(new TimelineItemView().render());
	    $(this.el).append(new TimelineItemView().render());
	    return this;
	}
});

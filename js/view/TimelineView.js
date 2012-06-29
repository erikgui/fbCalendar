window.TimelineView = Backbone.View.extend({
	el: '.timeline',

	initialize: function() {
		_.bindAll(this, 'render');
		this.render();
	},
	
	render: function() {
		$(this.el).append(new TimelineMonthView().render().el);
		$(this.el).append(new TimelineMonthView().render().el);
	}
});

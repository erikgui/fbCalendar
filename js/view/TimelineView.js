window.TimelineView = Backbone.View.extend({
	el: '.timeline',
	model: StubHubEventModel,

	initialize: function() {
		_.bindAll(this, 'render');
		//this.model.bind('change', this.render);
		this.render();
	},
	
	render: function() {
		$(this.el).append(new TimelineMonthView().render().el);
		$(this.el).append(new TimelineMonthView().render().el);
	},

	addMonth: function() {
		$(this.el).append(new TimelineMonthView().render().el);
	}
});

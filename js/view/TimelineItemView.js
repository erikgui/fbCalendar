window.TimelineItemView = Backbone.View.extend({
	tagName: 'li',

	className: 'timelineitem-container',

	model: StubHubEventModel,
	
	initialize: function() {
		_.bindAll(this, 'render');
	},

	render: function() {
		var data = {'dateNumber': '12', 'dateName': 'M<br />o<br />n<br />'};
		$(this.el).append(this.template(data));
		$(this.el).find('.eventInfos').append(new TimelineEventView().render());
		$(this.el).find('.eventInfos').append(new TimelineEventView().render());
		$(this.el).find('.eventInfos').append(new TimelineEventView().render());
		return this.el;
	}
});

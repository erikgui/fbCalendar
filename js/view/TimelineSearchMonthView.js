window.TimelineSearchMonthView = Backbone.View.extend({
	tagName: 'li',
	className: 'timeline-search-month',

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
		this.meta('eventYear', eventInfo.get('eventYear'));
		this.meta('eventMonth', eventInfo.get('eventMonth'));
		var month_number = eventInfo.get('eventMonth');
		month_number = DateUtil.getMonthName(month_number);
		month_number = month_number + ', ' + eventInfo.get('eventYear');
		var data = {'month_number': month_number};
		$(this.el).append(this.template(data));
		var ev = new TimelineSearchEventView();
		ev.render(eventInfo);
		this.meta('searchEventViews', [ev]);
		$(this.el).find('.search-events').append(ev.el);
	},

	addEvent: function(eventInfo) {
		var searchEventViews = this.meta('searchEventViews');

		var tempEventView = new TimelineSearchEventView();
		tempEventView.render(eventInfo);
		searchEventViews.push(tempEventView);
	    this.meta('searchEventViews', searchEventViews);
	    $(this.el).append(tempEventView.el);
	}
});
window.TimelineMonthView = Backbone.View.extend({
	tagName: 'li',
	className: 'timeline-month',

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
		//this.render(eventInfo);
	},

	render: function(eventInfo) {
		this.meta('eventYear', eventInfo.get('eventYear'));
		this.meta('eventMonth', eventInfo.get('eventMonth'));
		var eventYear = eventInfo.get('eventYear');
		var month_number = this.getMonthName(eventInfo.get('eventMonth')) + ', ' + eventYear;
		
		var data = {'month_number': month_number};
		this.meta('month_number', month_number);
		$(this.el).append(this.template(data));
		
		var tempItemView = new TimelineItemView();
		tempItemView.render(eventInfo);
	    this.meta('timelineItemViews', [tempItemView]);
	    $(this.el).append(tempItemView.el);
	    
	    return this;
	}, 

	addEvent: function(eventInfo) {
		var timelineItemViews = this.meta('timelineItemViews');

		var tempItemView = new TimelineItemView();
		tempItemView.render(eventInfo);
		timelineItemViews.push(tempItemView);
	    this.meta('timelineItemViews', timelineItemViews);
	    $(this.el).append(tempItemView.el);
	},

	getMonthName: function(number) {
		switch(number) {
			case 0:
				return 'January';
				break;
			case 1:
				return 'February';
				break;
			case 2:
				return 'March';
				break;
			case 3:
				return 'April';
				break;
			case 4:
				return 'May';
				break;
			case 5:
				return 'June';
				break;
			case 6:
				return 'July';
				break;
			case 7:
				return 'August';
				break;
			case 8:
				return 'September';
				break;
			case 9:
				return 'October';
				break;
			case 10:
				return 'November';
				break;
			case 11:
				return 'December';
				break;
		}

	}
});

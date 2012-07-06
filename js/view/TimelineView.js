window.TimelineView = Backbone.View.extend({
	el: '.timeline',

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
		//this.model.bind('change', this.render);
		//this.render();
	},
	
	render: function() {
		//$(this.el).append(new TimelineMonthView().render().el);
		//$(this.el).append(new TimelineMonthView().render().el);
	},


	/*==========================================================*/
	/*========================DANGER!!!!========================*/
	/*==========================================================*/
	/*==========================================================*/
	/*==========================================================*/

	addEvent: function(eventInfo) {
		//$(this.el).append(new TimelineMonthView().render().el);
		var eventDate = eventInfo.eventDate;
		var eventMonth = eventInfo.eventMonth;
		var eventName = eventInfo.eventName;
		var monthViews = this.meta('timelineMonthViews');

		if (typeof monthViews != 'undefined') {
			var containsMonth = false;
			var containsDate = false;
			var monthView;
			var dateView;
			for (var i = 0; i < monthViews.length; i++) {
				var mv = monthViews[i];
				if (mv.meta('month_number') === eventMonth) {
					containsMonth = true;
					monthView = mv;
					var dates = mv.meta('timelineItemViews');
					for (var j = 0; j < dates.length; j++) {
						var date = dates[j];
						if (date.meta('dateNumber') === eventDate) {
							containsDate = true;
							dateView = date;
							break;
						}
					}
					break;
				}
			};

			if (typeof monthView != 'undefined') {
				if (typeof dateView != 'undefined') { //contains month and date
					//add event view
					dateView.addEvent(eventInfo);
				} else { //contains month but not specific date
					monthView.addEvent(eventInfo);
				}
			} else {
				//add monthView and each subViews
				monthViews.push(new TimelineMonthView(eventInfo));
				this.meta('timelineMonthViews', monthViews);
			}
		} else {
			var tempMonth = new TimelineMonthView(eventInfo);
			$(this.el).append(tempMonth.el);
			this.meta('timelineMonthViews', [tempMonth]);
		}

	},

});

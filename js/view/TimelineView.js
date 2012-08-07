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
		//$(this.el).append(this.template);
	},


	/*===========================================================*/
	/*Use this function to add events dynamically to the timeline*/
	/*===========================================================*/
	addEvent: function(eventInfo) {
		//$(this.el).append(new TimelineMonthView().render().el);
		var eventDate = eventInfo.get('eventDate');
		var eventMonth = eventInfo.get('eventMonth');
		var eventYear = eventInfo.get('eventYear');
		var eventName = eventInfo.get('eventName');
		var monthViews = this.meta('timelineMonthViews');

		if (typeof monthViews != 'undefined') {
			var containsMonth = false;
			var containsDate = false;
			var monthView;
			var dateView;
			for (var i = 0; i < monthViews.length; i++) {
				var mv = monthViews[i];
				if (mv.meta('eventMonth') === eventMonth && mv.meta('eventYear') === eventYear) {
					containsMonth = true;
					monthView = mv;
					var dates = mv.meta('timelineItemViews');
					for (var j = 0; j < dates.length; j++) {
						var date = dates[j];
						if (parseInt(date.meta('dateNumber'), 10) === eventDate) {
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
				var tempMonth = new TimelineMonthView();
				tempMonth.render(eventInfo);
				monthViews.push(tempMonth);
				this.meta('timelineMonthViews', monthViews);
				$(this.el).append(tempMonth.el);
			}
		} else {
			var tempMonth = new TimelineMonthView();
			tempMonth.render(eventInfo);
			$(this.el).append(tempMonth.el);
			this.meta('timelineMonthViews', [tempMonth]);
		}

	},

	insertEvent: function(eventInfo, itemView) {
		var tempDate = new TimelineItemView();
		tempDate.renderForInsert(eventInfo);
		var el = tempDate.el;
		console.log(el);
		window.itemView = itemView;
		$(itemView).before(el);
	},


	/*===================================================*/
	/*Use this function to check if events exists in view*/
	/*===================================================*/
	hasEvent: function(eventInfo) {
		var monthViews = this.meta('timelineMonthViews');
		if (typeof monthViews != 'undefined') {
			for (var i = 0; i < monthViews.length; i++) {
				var mv = monthViews[i];
				mv.hasEvent(eventInfo);
			};
		} else {
			return false;
		}
	},

	hasDate: function(eventDateObj) {
		var monthViews = this.meta('timelineMonthViews'); 
		if (typeof monthViews != 'undefined') {
			for (var i = 0; i < monthViews.length; i++) {
				var mv = monthViews[i];
				if (mv.meta('eventMonth') === eventDateObj.getMonth()) {
					var itemViews = mv.meta('timelineItemViews');
					for (var j = 0; j < itemViews.length; j++) {
						var iv = itemViews[j];
						console.log(iv.meta('eventDate'));
						if (iv.meta('eventDate') === eventDateObj.getDate()) {
							return true;
						}
					}
					return false;
				}
				return false;
			};
			return false;;
		} else {
			return false;
		}
	},

	sortEventViews: function() {
		var monthViews = this.meta('timelineMonthViews'); 
		if (typeof monthViews != 'undefined') {
			for (var i = 0; i < monthViews.length; i++) {
				var mv = monthViews[i];
				mv.sortEventViews();
			}
		}
	},
});

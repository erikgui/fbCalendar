/*=======================TimelineView=============================*/
// The outermost container/view of the timeline display format. From 
// here you can directly query whether a certain event exists or add 
// an event by providing a StubHubEventModel. The view would 
// dynamically add the even to the correct location on the timeline. 
// Event handlers for the checkbox filters on the heading of the app 
// is also written here.
/*================================================================*/
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

		this.meta('display_sports', true);
		this.meta('display_concerts', true);
		this.meta('display_theatre', true);
		this.meta('display_friends', true);
	},

	/*===========================================================*/
	/*Use this function to dynamically add events to the timeline*/
	/*===========================================================*/
	addEvent: function(eventInfo) {
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

	// This function would iteratively call the subviews to sort the EventViews based
	// on the priority of the event depending on wheather if the event is recommended or not.
	// The priority of the sorting is as follows:
	// 1. Friends' Events (events that the user's friends are going to )
	// 2. Events that matches the user's Facebook Likes
	// 3. Events that matches Hunch's recommendations based on the user's Facebook Likes
	// 4. Events near the user's location
	sortEventViews: function() {
		var monthViews = this.meta('timelineMonthViews'); 
		if (typeof monthViews != 'undefined') {
			for (var i = 0; i < monthViews.length; i++) {
				var mv = monthViews[i];
				mv.sortEventViews();
			}
		}
	},

	toggleSports: function(display) {
		var monthViews = this.meta('timelineMonthViews'); 
		if (typeof monthViews != 'undefined') {
			for (var i = 0; i < monthViews.length; i++) {
				var mv = monthViews[i];
				mv.toggleSports(display);
			}
		}
		this.meta('display_sports', display);
		if (!this.meta('display_sports') &&
			!this.meta('display_concerts') &&
			!this.meta('display_theatre') &&
			!this.meta('display_friends')) {
			$(this.el).css('display', 'none');
			$('#ajax-loader').css('display', 'none');
			$('#month-selector').css('display', 'none');
			$('#alert').css('display', 'block');
		} else {
			$('#alert').css('display', 'none');
			$(this.el).css('display', 'block');
			$('#month-selector').css('display', 'inline');
			$('#ajax-loader').css('display', 'block');
		}
	},

	toggleConcerts: function(display) {
		var monthViews = this.meta('timelineMonthViews'); 
		if (typeof monthViews != 'undefined') {
			for (var i = 0; i < monthViews.length; i++) {
				var mv = monthViews[i];
				mv.toggleConcerts(display);
			}
		}
		this.meta('display_concerts', display);
		if (!this.meta('display_sports') &&
			!this.meta('display_concerts') &&
			!this.meta('display_theatre') &&
			!this.meta('display_friends')) {
			$(this.el).css('display', 'none');
			$('#ajax-loader').css('display', 'none');
			$('#month-selector').css('display', 'none');
			$('#alert').css('display', 'block');
		} else {
			$('#alert').css('display', 'none');
			$(this.el).css('display', 'block');
			$('#month-selector').css('display', 'inline');
			$('#ajax-loader').css('display', 'block');
		}
	},

	toggleTheatre: function(display) {
		var monthViews = this.meta('timelineMonthViews'); 
		if (typeof monthViews != 'undefined') {
			for (var i = 0; i < monthViews.length; i++) {
				var mv = monthViews[i];
				mv.toggleTheatre(display);
			}
		}
		this.meta('display_theatre', display);
		if (!this.meta('display_sports') &&
			!this.meta('display_concerts') &&
			!this.meta('display_theatre') &&
			!this.meta('display_friends')) {
			$(this.el).css('display', 'none');
			$('#ajax-loader').css('display', 'none');
			$('#month-selector').css('display', 'none');
			$('#alert').css('display', 'block');
		} else {
			$('#alert').css('display', 'none');
			$(this.el).css('display', 'block');
			$('#month-selector').css('display', 'inline');
			$('#ajax-loader').css('display', 'block');
		}
	},

	toggleFriends: function(display) {
		var monthViews = this.meta('timelineMonthViews'); 
		if (typeof monthViews != 'undefined') {
			for (var i = 0; i < monthViews.length; i++) {
				var mv = monthViews[i];
				mv.toggleFriends(display);
			}
		}
		this.meta('display_friends', display);
		if (!this.meta('display_sports') &&
			!this.meta('display_concerts') &&
			!this.meta('display_theatre') &&
			!this.meta('display_friends')) {
			$(this.el).css('display', 'none');
			$('#ajax-loader').css('display', 'none');
			$('#month-selector').css('display', 'none');
			$('#alert').css('display', 'block');
		} else {
			$('#alert').css('display', 'none');
			$(this.el).css('display', 'block');
			$('#month-selector').css('display', 'inline');
			$('#ajax-loader').css('display', 'block');
		}
	},
});

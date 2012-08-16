/*=======================TimelineView=============================*/
// This is the outermost container of the search view that attaches to
// the .timeline-search div. Similar to the TimelineView, this view enables
// the functionality to addEvents, and it provides the event handler for 
// switching back to the timeline view.
/*================================================================*/
window.TimelineSearchView = Backbone.View.extend({
	el: '.timeline-search',

	events: {
		'click .clearSearch': 'clearSearch',
	},

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
		$(this.el).css('display', 'block');
	},

	addEvent: function(eventInfo) {
		var eventDate = eventInfo.get('eventDate');
		var eventMonth = eventInfo.get('eventMonth');
		var eventYear = eventInfo.get('eventYear');
		var eventName = eventInfo.get('eventName');
		var monthViews = this.meta('searchMonthViews');

		if (typeof monthViews != 'undefined') {
			var containsMonth = false;
			var monthView;
			for (var i = 0; i < monthViews.length; i++) {
				var mv = monthViews[i];
				if (mv.meta('eventMonth') === eventMonth && mv.meta('eventYear') === eventYear) {
					containsMonth = true;
					monthView = mv;
					break;
				}
			};

			if (typeof monthView != 'undefined') {
				monthView.addEvent(eventInfo);
			} else {
				//add monthView and each subViews
				var tempMonth = new TimelineSearchMonthView();
				tempMonth.render(eventInfo);
				monthViews.push(tempMonth);
				this.meta('searchMonthViews', monthViews);
				$(this.el).append(tempMonth.el);
			}
		} else {
			var tempMonth = new TimelineSearchMonthView();
			tempMonth.render(eventInfo);
			$(this.el).append(tempMonth.el);
			this.meta('searchMonthViews', [tempMonth]);
		}
	},

	render: function(response) {
		var queryraw = $('#search-input').val();
  		querytrim = jQuery.trim(queryraw);
		var data = {'numResults': response.numFound, 'searchQuery': queryraw, 'searchLocation': $('#change-loc-link span').html()};
		$(this.el).html(this.template(data));
	},

	clearSearch: function() {
		$(this.el).css('display', 'none');
		$(window.app.view.el).css('display', 'block');
		$('#ajax-loader').css('display', 'block');
		$('#secondRow').css('display', 'block');
		$('#month-selector').css('display', 'inline');
		$("#search-input").val('');
		$("#search-close").hide();
	}
});
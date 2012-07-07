window.TimelineItemView = Backbone.View.extend({
	tagName: 'li',

	className: 'timelineitem-container',
	events: {
		'click .arrow-left' : 'leftArrowClick',
		'click .arrow-right': 'rightArrowClick',
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
		this.meta('carouselPos', 0);
	},

	render: function(eventInfo) {
		var eventDate = eventInfo.get('eventDate');
		var eventMonth = eventInfo.get('eventMonth');
		var eventYear = eventInfo.get('eventYear');
		var dateObj = new Date(eventYear, eventMonth, eventDate);
		
		var data = {'dateNumber': eventDate, 'dateName': this.getDayOfWeek(dateObj.getDay())};
		this.meta('dateNumber', eventDate);
		$(this.el).append(this.template(data));
		
		var tempEventView = new TimelineEventView();
		tempEventView.render(eventInfo);
	    this.meta('timelineEventViews', [tempEventView]);
	    $(this.el).find('.eventInfos').append(tempEventView.el);
		return this.el;
	},

	addEvent: function(eventInfo) {
		var tempEventView = new TimelineEventView(eventInfo);
		tempEventView.render(eventInfo);
		var timelineEventViews = this.meta('timelineEventViews');
		timelineEventViews.push(tempEventView);
	    this.meta('timelineEventViews', timelineEventViews);
	    $(this.el).find('.eventInfos').append(tempEventView.el);
	    if (timelineEventViews.length > 3) {
	    	this.activateCarousel();
	    }
		return this.el;
	},

	getDayOfWeek: function(number) {
		switch(number) {
			case 0:
				return 'M<br/>O<br/>N<br/>';
				break;
			case 1:
				return 'T<br/>U<br/>E<br/>';
				break;
			case 2:
				return 'W<br/>E<br/>D<br/>';
				break;
			case 3:
				return 'T<br/>H<br/>U<br/>';
				break;
			case 4:
				return 'F<br/>R<br/>I<br/>';
				break;
			case 5:
				return 'S<br/>A<br/>T<br/>';
				break;
			case 6:
				return 'S<br/>U<br/>N<br/>';
				break;
		}
	},

	activateCarousel: function() {
		$(this.el).find('.arrow-right').css('display', 'block');
		$(this.el).find('.arrow-left').css('display', 'block');
	},

	deactivateCarouse: function() {
		$(this.el).find('.arrow-right').css('display', 'none');
		$(this.el).find('.arrow-left').css('display', 'none');		
	},

	leftArrowClick: function() {
		var timelineEventViews = this.meta('timelineEventViews');
		var TEMNum = timelineEventViews.length;
		var carouselPos = this.meta('carouselPos');
		if (TEMNum > 3) {
			if (carouselPos > 0) {
				$(this.el).find('.eventInfos').animate({
					left: '+=197'
				});
				this.meta('carouselPos', carouselPos-1);
			}
		}
	},

	rightArrowClick: function() {
		var timelineEventViews = this.meta('timelineEventViews');
		var TEMNum = timelineEventViews.length;
		var carouselPos = this.meta('carouselPos');
		if (TEMNum > 3) {
			if (carouselPos < (TEMNum - 3)) {
				$(this.el).find('.eventInfos').animate({
					left: '-=197'
				});
				this.meta('carouselPos', carouselPos+1);
			}
		}
	},
});

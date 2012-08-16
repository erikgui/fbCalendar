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
		var self = this;
		var eventDate = eventInfo.get('eventDate');
		var eventMonth = eventInfo.get('eventMonth');
		var eventYear = eventInfo.get('eventYear');
		var dateObj = new Date(eventYear, eventMonth, eventDate);
		
		if (eventDate < 10) {
			eventDate = '0' + eventDate;
		}

		var data = {'dateNumber': eventDate, 'dateName': this.getDayOfWeek(dateObj.getDay()), 'monthName': DateUtil.getMonthName(eventInfo.get('eventMonth'))};
		this.meta('dateNumber', eventDate);
		$(this.el).append(this.template(data));

		setTimeout(function(){$(self.el).fadeIn('slow');}, window.cascadeTimeout);
		window.cascadeTimeout = window.cascadeTimeout + 200;

		var tempEventView = new TimelineEventView();
		tempEventView.render(eventInfo, this);
	    this.meta('timelineEventViews', [tempEventView]);
	    $(this.el).find('.eventInfos').append(tempEventView.el);

		var today = new Date();
		if (eventYear === today.getFullYear()) {
			if (eventMonth === today.getMonth()) {
				if (parseInt(eventDate, 10) === today.getDate()) {
					$(this.el).find('.dateNumber').addClass('today');
					$(this.el).find('.dateSlateBackground').addClass('today');
					$(this.el).find('.dateName').addClass('today');
				}
			}
		}
		return this.el;
	},

	renderForInsert: function(eventInfo) {
		var self = this;
		var eventDate = eventInfo.get('eventDate');
		var eventMonth = eventInfo.get('eventMonth');
		var eventYear = eventInfo.get('eventYear');
		var dateObj = eventInfo.get('eventDateObj');
		
		if (eventDate < 10) {
			eventDate = '0' + eventDate;
		}
		
		var today = new Date();
		if (eventYear === today.getFullYear()) {
			if (eventMonth === today.getMonth()) {
				if (eventDate === today.getDate()) {
					console.log('today is: ' + eventMonth + eventDate + eventYear);
				}
			}
		}

		var data = {'dateNumber': eventDate, 'dateName': this.getDayOfWeek(dateObj.getDay()), 'monthName': DateUtil.getMonthName(eventInfo.get('eventMonth'))};
		this.meta('dateNumber', eventDate);
		$(this.el).append(this.template(data));

		setTimeout(function(){$(self.el).fadeIn('slow');}, window.cascadeTimeout);
		window.cascadeTimeout = window.cascadeTimeout + 200;
		console.log("returning el");
		return this.el;
	},

	addEvent: function(eventInfo) {
		var tempEventView = new TimelineEventView();
		tempEventView.render(eventInfo, this);
		var timelineEventViews = this.meta('timelineEventViews');
		timelineEventViews.push(tempEventView);
	    this.meta('timelineEventViews', timelineEventViews);
	    $(this.el).find('.eventInfos').append(tempEventView.el);
	    if (timelineEventViews.length > 3) {
	    	this.activateCarousel();
	    }
	    var dispEvents = parseInt($(this.el).find('.dispEvents').html(), 10);
	    var totalEvents = parseInt($(this.el).find('.totalEvents').html(), 10);
	    if (dispEvents < 3) {
	    	$(this.el).find('.dispEvents').html(dispEvents+1);
	    }
	    $(this.el).find('.totalEvents').html(totalEvents+1);
		return this.el;
	},

	hasEvent: function(eventInfo) {
		var eventDate = eventInfo.get('eventDate');
		var eventMonth = eventInfo.get('eventMonth');
		var eventYear = eventInfo.get('eventYear');
		var eventName = eventInfo.get('eventName');
		var timelineEventViews = this.meta('timelineEventViews');
		if (typeof timelineEventViews != 'undefined') {
			var ret = false;
			for (var i = 0; i < timelineEventViews.length; i++) {
				var tlev = timelineEventViews[i];
				if (tlev.meta('eventDate') === eventDate &&
					tlev.meta('eventMonth') === eventMonth &&
					tlev.meta('eventYear') === eventYear &&
					tlev.meta('eventName') === eventName) {
					ret = true;
					break;
				}
			};
			return ret;
		} else {
			return false;
		}
	},

	activateCarousel: function() {
		var carouselActive = this.meta('carouselActive');
		if (typeof carouselActive == 'undefined' || carouselActive === false) {
			$(this.el).find('.arrow-right').css('display', 'block');
			$(this.el).find('.arrow-left').css('display', 'block');
			$(this.el).find('.arrow-right').css('border-left', '15px solid #f97506');
		}
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
					left: '+=202'
				}, 300, 'swing');
				carouselPos = carouselPos-1;
				this.meta('carouselPos', carouselPos);
				if (carouselPos == 0) {
					$(this.el).find('.arrow-left').css('border-right', '15px solid #b5b5b5');
					$(this.el).find('.arrow-right').css('border-left', '15px solid #f97506');
				} else {
					$(this.el).find('.arrow-left').css('border-right', '15px solid #f97506');
					$(this.el).find('.arrow-right').css('border-left', '15px solid #f97506');
				}
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
					left: '-=202'
				}, 300, 'swing');
				carouselPos = carouselPos+1;
				this.meta('carouselPos', carouselPos);
				if (carouselPos == (TEMNum - 3)) {
					$(this.el).find('.arrow-left').css('border-right', '15px solid #f97506');
					$(this.el).find('.arrow-right').css('border-left', '15px solid #b5b5b5');
				} else {
					$(this.el).find('.arrow-left').css('border-right', '15px solid #f97506');
					$(this.el).find('.arrow-right').css('border-left', '15px solid #f97506');
				}
			}
		}
	},

	getDayOfWeek: function(number) {
		switch(number) {
			case 0:
				return 'SUNDAY';
				break;
			case 1:
				return 'MONDAY';
				break;
			case 2:
				return 'TUESDAY';
				break;
			case 3:
				return 'WEDNESDAY';
				break;
			case 4:
				return 'THURSDAY';
				break;
			case 5:
				return 'FRIDAY';
				break;
			case 6:
				return 'SATURDAY';
				break;
		}
	},

	sortEventViews: function() {
		var tlevs = this.meta('timelineEventViews');
		for (var i = 0; i < tlevs.length; i++) {
			var tlev = tlevs[i];
			if ($(tlev.el).attr('data-rec') === 'true') {
				$(this.el).find('.eventInfos').prepend(tlev.el);
				console.log('prepending based on user recs');
			}
			if ($(tlev.el).attr('data-like') === 'true') {
				// $(tlev.el).remove();
				$(this.el).find('.eventInfos').prepend(tlev.el);
				console.log('prepending based on user likes');
			}
		}
	},

	toggleSports: function(display) {
		var tlevs = this.meta('timelineEventViews');
		for (var i = 0; i < tlevs.length; i++) {
			var tlev = tlevs[i];
			if (display) {
				if ($(tlev.el).attr('data-channelid') === '28') {
					$(tlev.el).css('display', 'block');
				}
			} else {
				if ($(tlev.el).attr('data-channelid') === '28') {
					$(tlev.el).css('display', 'none');
				}
			}
		}
	},

	toggleConcerts: function(display) {
		var tlevs = this.meta('timelineEventViews');
		for (var i = 0; i < tlevs.length; i++) {
			var tlev = tlevs[i];
			if (display) {
				if ($(tlev.el).attr('data-channelid') === '1') {
					$(tlev.el).css('display', 'block');
				}
			} else {
				if ($(tlev.el).attr('data-channelid') === '1') {
					$(tlev.el).css('display', 'none');
				}
			}
		}
	},

	toggleTheatre: function(display) {
		var tlevs = this.meta('timelineEventViews');
		for (var i = 0; i < tlevs.length; i++) {
			var tlev = tlevs[i];
			if (display) {
				if ($(tlev.el).attr('data-channelid') === '174') {
					$(tlev.el).css('display', 'block');
				}
			} else {
				if ($(tlev.el).attr('data-channelid') === '174') {
					$(tlev.el).css('display', 'none');
				}
			}
		}
	},

	toggleFriends: function(display) {
		var tlevs = this.meta('timelineEventViews');
		for (var i = 0; i < tlevs.length; i++) {
			var tlev = tlevs[i];
			if (display) {
				if ($(tlev.el).attr('data-channelid') === '9999') {
					$(tlev.el).css('display', 'block');
				}
			} else {
				if ($(tlev.el).attr('data-channelid') === '9999') {
					$(tlev.el).css('display', 'none');
				}
			}
		}
	},

});

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

		var data = {'dateNumber': eventDate, 'dateName': this.getDayOfWeek(dateObj.getDay())};
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
				if (eventDate === today.getDate()) {
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

		var data = {'dateNumber': eventDate, 'dateName': this.getDayOfWeek(dateObj.getDay())};
		this.meta('dateNumber', eventDate);
		$(this.el).append(this.template(data));

		setTimeout(function(){$(self.el).fadeIn('slow');}, window.cascadeTimeout);
		window.cascadeTimeout = window.cascadeTimeout + 200;
		//setTimeout(function(){}, 1000);
		//window.cascadeTimeout = window.cascadeTimeout + 1000;
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

	activateCarousel: function() {
		var carouselActive = this.meta('carouselActive');
		if (typeof carouselActive == 'undefined' || carouselActive === false) {
			$(this.el).find('.arrow-right').css('display', 'block');
			$(this.el).find('.arrow-left').css('display', 'block');
			$(this.el).find('.arrow-right').css('border-left', '15px solid #f97506');
			//this.enableAutoPlay();
			//this.meta('carouselActive', true);
		}
	},

	deactivateCarouse: function() {
		$(this.el).find('.arrow-right').css('display', 'none');
		$(this.el).find('.arrow-left').css('display', 'none');		
	},

	// enableAutoPlay: function() {
	// 	var self = this;
	// 	var ff = function() {
	// 		var interval = setInterval(function() {
	// 			if (Math.random() > 0.5) {
	// 				self.moveLeft();
	// 			} else {
	// 				self.moveRight();
	// 			}
	// 		}, 5000);
	// 		self.meta('interval', interval);
	// 	}

	// 	setTimeout(ff, Math.random()*1000);
	// },

	// disableAutoPlay: function() {
	// 	console.log('clearing interval');
	// 	var interval = this.meta('interval');
	// 	clearInterval(interval);
	// },

	// moveLeft: function() {
	// 	var timelineEventViews = this.meta('timelineEventViews');
	// 	var TEMNum = timelineEventViews.length;
	// 	var carouselPos = this.meta('carouselPos');
	// 	if (TEMNum > 3) {
	// 		if (carouselPos > 0) {
	// 			$(this.el).find('.eventInfos').animate({
	// 				left: '+=197'
	// 			});
	// 			this.meta('carouselPos', carouselPos-1);
	// 		}
	// 	}
	// },

	// moveRight: function() {
	// 	var timelineEventViews = this.meta('timelineEventViews');
	// 	var TEMNum = timelineEventViews.length;
	// 	var carouselPos = this.meta('carouselPos');
	// 	if (TEMNum > 3) {
	// 		if (carouselPos < (TEMNum - 3)) {
	// 			$(this.el).find('.eventInfos').animate({
	// 				left: '-=197'
	// 			});
	// 			this.meta('carouselPos', carouselPos+1);
	// 		}
	// 	}
	// },

	leftArrowClick: function() {
		//this.disableAutoPlay();
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
		//this.disableAutoPlay();
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
});

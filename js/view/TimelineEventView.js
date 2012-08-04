window.TimelineEventView = Backbone.View.extend({
	tagName: 'li',

	className: 'timelineevent-container',

	events: {
		'click' : 'showDetails',
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
	},

	render: function(eventInfo, itemView) {
		this.meta('eventName', eventInfo.get('eventName'));
		this.meta('act_primary', eventInfo.get('act_primary'));
		this.meta('eventDate', eventInfo.get('eventDate'));
		this.meta('eventMonth', eventInfo.get('eventMonth'));
		this.meta('eventYear', eventInfo.get('eventYear'));
		this.meta('eventInfo', eventInfo);
		this.meta('itemView', itemView);

		var dataStr;
		if (typeof eventInfo.get('eventSEODesc') == 'undefined') {
			console.log('eventSEODesc undef');
			if (typeof eventInfo.get('eventName') == 'undefined') {
				console.log('eventName undef');
				if (typeof eventInfo.get('venue_name') == 'undefined') {
					console.log('act_primary undef');
					dataStr = 'Name here!';
				} else {
					dataStr = eventInfo.get('venue_name');
				}
			} else {
				dataStr = eventInfo.get('eventName');
			}
		} else {
			dataStr = eventInfo.get('eventSEODesc');
		}

		if (dataStr.length > 30) {
			dataStr = dataStr.slice(0, 30);
			dataStr = dataStr + '... ';
		} else {
			dataStr = dataStr + ' ';
		}
		var data = {'info': dataStr};
		$(this.el).append(this.template(data));
		$(this.el).find('.event-img').css('background-image', 'url(' + eventInfo.get('thumbnail') + ')');
		$(this.el).find('.info-text span').html('From $' + eventInfo.get('eventMinPrice'));


		/**/
		var channelId = eventInfo.get('eventChannelID');
		if (channelId === '1') {
			$(this.el).find('.genre-icon-source').attr('src', 'img/concerts-large.png');
		} else if (channelId === '174') {
			$(this.el).find('.genre-icon-source').attr('src', 'img/theatre-large.png');
		} else if (channelId === '28') {
			$(this.el).find('.genre-icon-source').attr('src', 'img/sports-large.png');
		}

		console.log('act_primary: ', this.meta('act_primary').toLowerCase());

		var musicianNames = FBUserModel.get('musicianNames');
		var teamNames = FBUserModel.get('teamNames');
		for (var i = 0; i < musicianNames.length; i++) {
			if (this.meta('act_primary').toLowerCase() === musicianNames[i].toLowerCase()) {
				$(this.el).attr('data-like', 'true');
			}
		}
		for (var j = 0; j < teamNames.length; j++) {
			if (this.meta('act_primary').toLowerCase() === teamNames[j].toLowerCase()) {
				$(this.el).attr('data-like', 'true');
			}
		}
		if (typeof $(this.el).attr('data-like') == 'undefined') {
			$(this.el).attr('data-like', 'false');
		}


		return this.el;
	},

	showDetails: function() {
		window.app.modal.changeInfo(this.meta('eventInfo'), this);
		window.app.modal.show();
		FB.Canvas.getPageInfo(
	        function(info) {
				$('.modal').css('top', info.clientHeight + info.scrollTop - (info.clientHeight-400) + 'px');
	        }
		);
	}
});

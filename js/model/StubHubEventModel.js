window.StubHubEventModel = Backbone.Model.extend({
	defaults: {
		act_primary: '',
		venue: '',
		thumbnail: 'url',
		eventYear: 1000,
		eventMonth: 0,
		eventDate: 1,
		eventName: 'No Name',
		eventDescription: 'No Description',
	},

	initialize: function(LCSeventInfo) {
		if (typeof LCSeventInfo != 'undefined') {
			var eventDateObj = DateUtil.convertToDateObject(LCSeventInfo.event_date_time_local);
			if (typeof eventDateObj != 'undefined') {
				this.set({
					act_primary: LCSeventInfo.act_primary,
					venue_name: LCSeventInfo.venue_name,
					urlpath: LCSeventInfo.urlpath,
					genreUrlPath: LCSeventInfo.genreUrlPath,
					eventYear: eventDateObj.getFullYear(),
					eventMonth: eventDateObj.getMonth(),
					eventDate: eventDateObj.getDate(),
					eventName: LCSeventInfo.name_primary,
					eventDateObj: eventDateObj,
					eventLCSObj: LCSeventInfo,
					eventNickname: LCSeventInfo.nickname,
					eventDescription: 'No Description',
					eventSEODesc: LCSeventInfo.seo_description,
					eventTotalTickets: LCSeventInfo.totalTickets,
					eventMinPrice: LCSeventInfo.minPrice,
					eventLatLon: LCSeventInfo.lat_lon,
					eventChannelID: LCSeventInfo.channelId,
				});
			}
			this.setThumbnail();
		}
	},

	setEventTime: function(eventDateObj) {
		this.set({
			eventYear: eventDateObj.getFullYear(),
			eventMonth: eventDateObj.getMonth(),
			eventDate: eventDateObj.getDate(),
		});
	},

	setThumbnail: function() {
		if (this.get('eventNickname') != '') {
			this.set('thumbnail', 'http://cache1.stubhubstatic.com/promotions/scratch/genre_136px/' + this.get('eventNickname') + '-136px.gif');	
		} else {
			this.set('thumbnail', '');
		}
	}
});

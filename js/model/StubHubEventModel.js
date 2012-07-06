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
					eventYear: eventDateObj.getFullYear(),
					eventMonth: eventDateObj.getMonth(),
					eventDate: eventDateObj.getDate(),
					eventName: LCSeventInfo.name_primary,
					eventDescription: 'No Description',
				});
			}
			
		}
	},

});

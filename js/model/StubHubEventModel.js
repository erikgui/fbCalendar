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
					eventDateObj: eventDateObj,
					eventDescription: 'No Description',
				});
			}
			this.setThumbnail();
		}
	},

	setThumbnail: function() {
		var act_primary = this.get('act_primary');
		if (act_primary === 'Bank Of The West Classic') {
			this.set('thumbnail', 'Bank_of_the_West_Classic.gif');
		} else if (act_primary === 'San Francisco Giants') {
			this.set('thumbnail', 'san_francisco_giants.jpg');
		} else if (act_primary === 'Les Miserables') {
			this.set('thumbnail', 'les_miserables.jpg');
		} else if (act_primary === 'Sheryl Crow') {
			this.set('thumbnail', 'sheryl_crow.png');
		} else if (act_primary === 'Reel Big Fish') {
			this.set('thumbnail', 'reel_big_fish.jpg');
 		} else if (act_primary === 'Kelly Clarkson') {
			this.set('thumbnail', 'kelly_clarkson.jpg');
 		} else if (act_primary === 'Earth, Wind and Fire') {
			this.set('thumbnail', 'earth_wind_and_fire.jpg');
 		} else if (act_primary === 'Kaskade') {
			this.set('thumbnail', 'Kaskade.jpg');
 		} else if (act_primary === '2012 U.S. Grand Prix 2-Day Pass') {
			this.set('thumbnail', 'US_grand_prix.jpg');
 		} else if (act_primary === 'NHRA Sonoma Nationals') {
			this.set('thumbnail', 'nhra_sonoma_natls.png');
 		} else if (act_primary === '2012 Red Bull U.S. Grand Prix Sunday Only Pass') {
			this.set('thumbnail', 'nhra_sonoma_natls.png');
 		} else if (act_primary === 'Barenaked Ladies') {
			this.set('thumbnail', 'barenaked_ladies.jpg');
 		} else if (act_primary === 'San Jose Giants') {
			this.set('thumbnail', 'san_jose_giants.gif');
 		} else if (act_primary === 'Oakland Athletics') {
			this.set('thumbnail', 'oakland_athletics.gif');
 		} else if (act_primary === 'John Mellencamp') {
			this.set('thumbnail', 'john_mellencamp.jpg');
 		} else if (act_primary === 'Yanni') {
			this.set('thumbnail', 'yanni.jpg');
		} else if (act_primary ==='Club America') {
			this.set('thumbnail', 'club_america.png');
		} else if (act_primary ==='Tangerine Dream') {
			this.set('thumbnail', 'tangerine_dream.jpg');
		} else if (act_primary ==='Kenny Chesney') {
			this.set('thumbnail', 'kenny_chesney.jpg');
		} else if (act_primary ==='Alberta Cross') {
			this.set('thumbnail', 'alberta_cross.jpg');
 		} else {
 			this.set('thumbnail', 'san_francisco_giants.jpg');
 		}
	}
});

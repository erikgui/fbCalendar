window.MdlConfig = Backbone.Model.extend({
	
	initialize: function() {
		this.set({
			// possible values:  United States, United Kingdom
			country: 'United States',
			// this property controls how many times a genre is encountered before the system
			// gives recommended events for that genre.  
			genreThreshold: 1
		});
		
	},
	
	getAllowedViewingDomain: function() {
		if(this.get('country') == 'United States') {
			return 'stubhub.com';
		} else if(this.get('country') == 'United Kingdom') {
			return 'stubhub.co.uk';
		}
	},
	
	getStubDomain: function() {
		if(this.get('country') == 'United States') {
			return 'www.stubhub.com';
		} else if(this.get('country') == 'United Kingdom') {
			return 'www.stubhub.co.uk';
		} else {
			return 'unknown-stubdomain';
		}
	},
	
	getNumRecommendedEventsLimit: function() {
		return 10;
	},
	
	getCountry: function() {
		return this.get('country');
	},
	
	getSearchRadius: function() {
		if(this.get('country') == 'United States') {
			return 10;
		} else if(this.get('country') == 'United Kingdom') {
			return 150;
		}
	},
	
	getProxyUrl: function() {
		return null;
	}
	
});
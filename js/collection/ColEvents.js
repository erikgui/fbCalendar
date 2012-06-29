var ColEvents = Backbone.Collection.extend({
	
	model: MdlStubEvent,
	
	initialize: function() {
	
		this._meta = {};
	
	},
	
	meta: function(property, value) {
		if (typeof value === "undefined") {
			return this._meta[property];
		} else {
			this._meta[property] = value;
		}
	},
	
	url: function() {
		var theUrl = 'http://www.stubhub.com/listingCatalog/select/?';
		var lat = geoip_latitude();
		var lon = geoip_longitude();
		var radiusInKm = this.get('radiusInKm');
		
		// if( typeof lat != 'undefined' && typeof lon != 'undefined' && typeof radiusInKm != 'undefined') {
		if( typeof lat != 'undefined' && typeof lon != 'undefined') {
			theUrl +='fq={!geofilt pt='+lat+','+lon+' sfield=lat_lon}&';
		}
		
		var allowedViewingDomain = this.get('allowedViewingDomain');
		
		theUrl +='q=stubhubDocumentType event';
		
		if(typeof allowedViewingDomain != 'undefined') {
			theUrl +=' +allowedViewingDomain:'+allowedViewingDomain +' ';
		}
		
		if(typeof this.meta('description') !== 'undefined') {
			theUrl += ' AND description:%22' + this.meta('description') + '%22 ';
		}
		
		// theUrl += ' AND event_date_local:'+ this.meta('timeRange') +'';
		theUrl += ' AND event_date_local:[NOW-8HOURS TO *] ';
		
		var venueName = this.get('venueName');
		if(typeof venueName != 'undefined') {
			theUrl += ' AND venue_name_text:"'+venueName+'" ';
		}
		
		theUrl += ' AND active:1 ';
		
		var query = this.get('query');
		if( typeof query != 'undefined') {
			theUrl +=' AND '+query;
		}
		
		theUrl+='&version=2.2&start=0&rows=10&indent=on&wt=json';
		console.log('returning url', theUrl);
		return HttpUtil.prependProxyUrl(theUrl);
	},
	
	parse: function(response) {
		var docs = response.response.docs;
		if(docs.length > 0 ) {
			//console.log('ColEvents.parse', docs);
			for (var i = 0; i < docs.length; i++) {
			
				$('#calendar').fullCalendar( 'renderEvent', {
					title: docs[i].name_primary,
					start: DateUtil.convertToDateObject(docs[i].event_date_time_local),
					allDay: false
				}, true );
			
			}
			return docs;
		} else {
			console.log('ColEvents: no event found for query', this.get('query'));
			return {};
		}
	},
	
	
	sync: function(method, model, options) {
		options.dataType = 'jsonp';
		options.jsonp = 'json.wrf';
		return Backbone.sync(method, model, options);
	
	},
	
	fetch: function(options) {
		options.add = true;
		return Backbone.Collection.prototype.fetch.call(this, options);
	
	}
	
});
window.StubHubEventCollection = Backbone.Collection.extend({
	
	model: StubHubEventModel,

	initialize: function() {
	
		this._meta = {};
	
	},
	
	meta: function(property, value) {
		if (typeof value == "undefined") {
			return this._meta[property];
		} else {
			this._meta[property] = value;
		}
	},

	clearMeta: function() {
		this._meta = {};
	},

	url: function() {
		var URL = 'http://www.stubhub.com/listingCatalog/select?';
		/*var lat = geoip_latitude();
		var lon = geoip_longitude();
		var radiusInKm = 60;*/
		
		if( typeof lat != 'undefined' && typeof lon != 'undefined' && typeof radiusInKm != 'undefined') {
			URL +='fq={!geofilt pt='+lat+','+lon+' sfield=lat_lon d='+radiusInKm+'}&';
		}
		
		URL +='q=stubhubDocumentType:event';
		
		if(typeof this.meta('allowedViewingDomain') != 'undefined') {
			URL +=' +allowedViewingDomain:'+ this.meta('allowedViewingDomain') +' ';
		}
		
		if(typeof this.meta('description') != 'undefined') {
			URL += ' AND description:%22' + this.meta('description') + '%22 ';
		}
		
		// URL += ' AND event_date_local:'+ this.meta('timeRange') +'';
		if(typeof this.meta('event_date_time_local') != 'undefined') {
			URL += ' AND event_date_time_local:' + this.meta('event_date_time_local');
		}
		
		if(typeof this.meta('venue_name_text') != 'undefined') {
			URL += ' AND venue_name_text:"'+ this.meta('venue_name_text') +'" ';
		}
		
		URL += ' AND active:1 ';
		
		if( typeof this.meta('query') != 'undefined') {
			URL +=' AND '+ this.meta('query');
		}
		
		URL +='&version=2.2&start=0&rows=10&indent=on&wt=json';
		
		console.log('returning url', URL);
		
		return HttpUtil.prependProxyUrl(URL);
	},
	
	parse: function(response) {
		var docs = response.response.docs;
		console.log(response);
		if(docs.length > 0 ) {
			//console.log('ColEvents.parse', docs);
			for (var i = 0; i < docs.length; i++) {
			/*
				$('#calendar').fullCalendar( 'renderEvent', {
					title: docs[i].name_primary,
					start: DateUtil.convertToDateObject(docs[i].event_date_time_local),
					allDay: false
				}, true );
			*/
			}
			console.log(this);
			return docs;
		} else {
			console.log('ColEvents: no event found for query');
			return {};
		}
	},
	
	
	sync: function(method, model, options) {
		options.dataType = 'jsonp';
		options.jsonp = 'json.wrf';
		return Backbone.sync(method, model, options);
	
	},
	
	fetch: function(options) {

		if (typeof options == 'undefined') {
			options = {};
			options.add = true;
		} else {
			options.add = true;	
		}

		return Backbone.Collection.prototype.fetch.call(this, options);
	
	},

});
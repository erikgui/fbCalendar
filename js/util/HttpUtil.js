var HttpUtil = new function() {
	
	this.prependProxyUrl = function(url) {
		var theUrl = url;
		var proxyUrl = CONFIG.getProxyUrl();
		if( proxyUrl != null) {
			var encodedUrl = encodeURIComponent(url);
			proxyUrl += "?url=" + encodedUrl;
			
			return proxyUrl;
		} else {
			return theUrl;
		}
	},
	
	this.buildUrl = function(url, options) {
		var theUrl = url;
		for(var name in options.data) {
			var value = options.data[name];
			if( theUrl.indexOf('?') == -1) {
				theUrl += "?";
			} else {
				theUrl += "&";
			}
			
			theUrl += name+"="+value;
		}
		
		return theUrl;
	},
	
	this.getUrl = function(targetUrl) {
		var url = CONFIG.getProxyUrl();
		if( url != null) {
			return url;
		} else {
			return targetUrl;
		}
	},
	
	this.fetchCollectionWithProxy = function(collection, options, targetUrl) {
		if(CONFIG.getProxyUrl() != null  ) {
			url = this.buildUrl(targetUrl, options);
			var opts = {data: {url: url}};
			return Backbone.Collection.prototype.fetch.call(collection, opts); 
		} else {
			return Backbone.Collection.prototype.fetch.call(collection, options);
		}
	},
	
	this.fetchModelWithProxy = function(model, options, targetUrl) {
		console.log('in fetchModelWithProxy');
		if(CONFIG.getProxyUrl() != null  ) {
			var url = this.buildUrl(targetUrl, options);
			var opts = {data: {url: url}};
			console.log('OPTS', opts);
			return Backbone.Model.prototype.fetch.call(model, opts); 
		} else {
			console.log('HERE', CONFIG.getProxyUrl());
			
			return Backbone.Model.prototype.fetch.call(model, options);
		}
	}	
	
	
}
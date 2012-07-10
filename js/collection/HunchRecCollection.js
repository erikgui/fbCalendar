/*
Collection for retrieving information from Hunch
*/
//Relevant API Links
//http://hunch.com/developers/v1/docs/reference/#result-methods

window.HunchRecCollection = Backbone.Collection.extend({

	model: HunchRecModel,

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

	clearMeta: function() {
		this._meta = {};
	},

	url: function() {

		var URL; 
		if(this.meta('API-method') === 'get-recommendations') {
			//get-recommendations
			//http://hunch.com/developers/v1/resources/console/#get-recommendations
			URL = 'http://api.hunch.com/api/v1/get-recommendations?';
		} else if(this.meta('API-method') === 'get-results') {
			//get-results
			//http://hunch.com/developers/v1/docs/reference/#result-methods
			URL = 'http://api.hunch.com/api/v1/get-results/?';			
		} else {
			console.log('HunchRecCollection: Did not specify API-method in meta');
			return '';
		}
				
		//query variables
		
		//An authorization token, authenticating your app on behalf of the user.
		if(typeof this.meta('auth_token') !== 'undefined') {
			URL += '&auth_token=' + this.meta('auth_token');
		}
		//List of topic ids. Only results in these topics will be returned as recommendations.
		if(typeof this.meta('topic_ids') !== 'undefined') {
			URL += '&topic_ids=' + this.meta('topic_ids');
		}
		//List of site names. Only results from these sites will be returned as recommendations.
		if(typeof this.meta('sites') !== 'undefined') {
			URL += '&sites=' + this.meta('sites');
		}
		//List of result ids. Only results in this list will be returned as recommendations.
		if(typeof this.meta('result_ids') !== 'undefined') {
			URL += '&result_ids=' + this.meta('result_ids');
		}
		//Bounding circle, specified in degrees and miles. Only results in this bounding circle will be returned as recommendations.
		if(typeof this.meta('lat') !== 'undefined' &&
			typeof this.meta('lng') !== 'undefined' &&
			typeof this.meta('radius') !== 'undefined') {
			URL += '&lat=' + this.meta('lat') +'&lng=' + this.meta('lng') + '&radius=' + this.meta('radius');
		}
		//Bounding rectangle, specified in degrees. Only results in this bounding rectangle will be returned as recommendations
		if(typeof this.meta('minlat') !== 'undefined' &&
			typeof this.meta('maxlat') !== 'undefined' &&
			typeof this.meta('minlng') !== 'undefined' &&
			typeof this.meta('maxlng') !== 'undefined') {
			URL += '&minlat=' + this.meta('minlat') +'&maxlat=' + this.meta('maxlat') + 
					'&minlng=' + this.meta('minlng') + '&maxlng=' + this.meta('maxlng');
		}
		//A string. Only results whose names or tags contain this string will be returned as recommendations.
		if(typeof this.meta('query') !== 'undefined') {
			URL += '&query=' + this.meta('query');
		}
		//A string. Only results whose names contain this string will be returned as recommendations.
		if(typeof this.meta('name') !== 'undefined') {
			URL += '&name=' + this.meta('name');
		}
		//A string. Only results whose tags contain this string will be returned as recommendations.
		if(typeof this.meta('tags') !== 'undefined') {
			URL += '&tags=' + this.meta('tags');
		}
		//A list of URLs. Only results with URLs in this list will be returned as recommendations.
		if(typeof this.meta('urls') !== 'undefined') {
			URL += '&urls=' + this.meta('urls');
		}		
		//List of topic ids. Results in these topics will not be returned as recommendations.
		if(typeof this.meta('blocked_topic_ids') !== 'undefined') {
			URL += '&blocked_topic_ids=' + this.meta('blocked_topic_ids');
		}
		//List of site names. Results in these sites will not be returned as recommendations.
		if(typeof this.meta('blocked_sites') !== 'undefined') {
			URL += '&blocked_sites=' + this.meta('blocked_sites');
		}
		//List of result ids. These results will not be returned as recommendations.
		if(typeof this.meta('blocked_result_ids') !== 'undefined') {
			URL += '&blocked_result_ids=' + this.meta('blocked_result_ids');
		}
		//A boolean, defaulting to false. If true, results that have been liked by the user will not be returned as recommendations.
		if(typeof this.meta('exclude_likes') !== 'undefined') {
			URL += '&exclude_likes=' + this.meta('exclude_likes');
		}
		//A boolean, defaulting to true. If true, results that have been disliked by the user will not be returned as recommendations.
		if(typeof this.meta('exclude_dislikes') !== 'undefined') {
			URL += '&exclude_dislikes=' + this.meta('exclude_dislikes');
		}
		//A boolean, defaulting to false. If true, only result ids will be returned, without result data such as names and descriptions.
		if(typeof this.meta('minimal') !== 'undefined') {
			URL += '&minimal=' + this.meta('minimal');
		}
		//A boolean, defaulting to false. If true, results that are known chain businesses will not be returned as recommendations.
		if(typeof this.meta('exclude_chains') !== 'undefined') {
			URL += '&exclude_chains=' + this.meta('exclude_chains');
		}
		//A list of result ids. The user's tastes will temporarily incorporate their positive preference for these results.
		if(typeof this.meta('likes') !== 'undefined') {
			URL += '&likes=' + this.meta('likes');
		}
		//A list of result ids. The user's tastes will temporarily incorporate their negative preference for these results.
		if(typeof this.meta('dislikes') !== 'undefined') {
			URL += '&dislikes=' + this.meta('dislikes');
		}
		//A list of Teach Hunch About You response ids. The user's tastes will temporarily incorporate these responses.
		if(typeof this.meta('responses') !== 'undefined') {
			URL += '&responses=' + this.meta('responses');
		}
		//An integer, defaulting to 10. At most this many recommendations will be returned.
		if(typeof this.meta('limit') !== 'undefined') {
			URL += '&limit=' + this.meta('limit');
		}
		//An integer, defaulting to 0. This many of the top recommendations will be skipped, and only recommendations lower than these will be returned.
		if(typeof this.meta('offset') !== 'undefined') {
			URL += '&offset=' + this.meta('offset');
		}
		//A boolean, defaulting to false. If true, some recommendations will randomly appear higher than they normally would.
		if(typeof this.meta('wildcards') !== 'undefined') {
			URL += '&wildcards=' + this.meta('wildcards');
		}
		//Application credentials, proving that the call originated from your app. user_id must be for your app, in which case it can be passed instead of an auth_token.
		if(typeof this.meta('app_id') !== 'undefined' &&
			typeof this.meta('auth_sig') !== 'undefined' &&
			typeof this.meta('user_id') !== 'undefined') {
			URL += '&app_id=' + this.meta('app_id') + '&auth_sig=' + this.meta('auth_sig') + '&user_id=' + this.meta('user_id');
		}
		//A JSONP callback. This will be prepended to the parenthesized response, which will be returned as text/javascript.
		if(typeof this.meta('callback') !== 'undefined') {
			URL += '&callback=' + this.meta('callback');
		}
		//A boolean, defaulting to false. If true, even error responses will have an HTTP response code of 200.
		if(typeof this.meta('suppress_http_errors') !== 'undefined') {
			URL += '&suppress_http_errors=' + this.meta('suppress_http_errors');
		}

		if(typeof this.meta('fields') != 'undefined') {
			URL += '&fields=' + this.meta('fields');
		}

		return HttpUtil.prependProxyUrl(URL);
	},
	
	parse: function(response) {
		console.log(response);
		return response;
	},

	fetch: function(options) {
		return Backbone.Collection.prototype.fetch.call(this, options);
	},

	sync: function(method, model, options) {
		return Backbone.sync(method, model, options);
	}
});


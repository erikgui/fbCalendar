console.log('app.js started')

window.AppRouter = Backbone.Router.extend({

	routes: {
		"" : "timeline"
	},

	initialize: function() {
		this.view = new TimelineView();
		this.collection = new StubHubEventCollection();
		this.hunch = new HunchRecCollection();
		window.CONFIG = new MdlConfig();
		//this.collection.fetch({success: function(){}});

/*		this.HunchRecCollection = new HunchRecCollection();
		this.HunchRecCollection.meta('topic_ids', 'list_musician');
		this.HunchRecCollection.meta('likes', 'hn_3570964');
		this.HunchRecCollection.meta('blocked_result_ids', 'hn_3570964');
		console.log(this.HunchRecCollection.url());
		this.HunchRecCollection.fetch();*/
	},

});


(function($){
	utils.loadTemplate(['TimelineMonthView','TimelineItemView', 'TimelineEventView'], function(){
		console.log('finish loading templates');
		window.app = new AppRouter();
		Backbone.history.start();
	});
	
})(jQuery);

/*---------------------Facebook Stuff---------------------*/
var accessToken;

/*function login(response, info){
	if (response.authResponse) {
		accessToken                                 =   response.authResponse.accessToken;
		
		userInfo.innerHTML                             = '<img src="https://graph.facebook.com/' + info.id + '/picture">' + info.name
														 + "<br /> Your Access Token: " + accessToken;
		
		userInfo.innerHTML = "Hello, " + info.name + "!";
		button.innerHTML                               = 'Logout';
	}
}*/
/*
function logout(response){
	userInfo.innerHTML                             =   "";
	document.getElementById('debug').innerHTML     =   "";
	document.getElementById('other').style.display =   "none";
}*/
/*
function updateButton(response) {
	button       =   document.getElementById('fb-auth');
	userInfo     =   document.getElementById('user-info');
	if (response.authResponse) {
		//user is already logged in and connected
		FB.api('/me', function(info) {
			login(response, info);
			customizeURL();
		});
		
		button.onclick = function() {
			FB.logout(function(response) {
				logout(response);
			});
		};
	} else {
		//user is not connected to your app or logged out
		button.innerHTML = 'Login';
		button.onclick = function() {
			FB.login(function(response) {
				if (response.authResponse) {
					FB.api('/me', function(info) {
						login(response, info);
					});	   
				} else {
					//user cancelled login or did not grant authorization
				}
			}, {scope:'status_update,publish_stream,user_about_me,user_likes,user_events,user_location'});  	
		}
	}
}
*/
/*var rsp;
var likes;

var musicians = [];
var musiciansID = '';
var sportsTeams = [];
var sportsTeamsID = '';

function customizeURL() {
	var location;
	console.log('customizing URL');
	FB.api('/me?access_token=' + accessToken, function(response) {
		
		console.log('response' + response);
		rsp = response;
		location = response.location.name;
		
		console.log('user_location: ' + location);
		//if (typeof location !== 'undefined' || location !== '') {
		//	colEvents.meta('description', location);	
		//}
		
	});
	
	FB.api('/me/likes?access_token=' + accessToken, function(response) {
		
		likes = response;
//		console.log('going inside for-loop');
		for (var i = 0 ; i < likes.data.length; i++) {
			var like = likes.data[i];
			if (like.category === 'Musician/band') {
				console.log(like.name);
				musicians.push(like.name);
				musiciansID = musiciansID + like.id + ',';
			} else if (like.category === 'Professional sports team') {
				console.log(like.name);
				sportsTeams.push(like.name);
				sportsTeamsID = sportsTeamsID + like.id + ',';
			}
		}
		
		musiciansID = musiciansID.slice(0, -1);
		sportsTeamsID = sportsTeamsID.slice(0, -1);

		var hunchURL = 'http://api.hunch.com/api/v1/get-recommendations/?topic_ids=list_musician&blocked_result_ids=' + musiciansID
					+ '&likes=' + musiciansID;

		$.ajax({
	  		url: hunchURL,
	  		dataType: 'json',
	  		success: function(data) {
	  			var hnRecs = data;

	  		}
		});

	});


	

}


function getLCSURL(data) {

	var theUrl = 'http://www.stubhub.com/listingCatalog/select?';

		theUrl +='q=stubhubDocumentType:event';
		
		// theUrl += ' AND event_date_local:'+ this.meta('timeRange') +'';
		theUrl += ' AND event_date_time_local:[NOW-8HOURS TO *]';
		
		theUrl += ' AND active:1 ';
		
		theUrl+='&version=2.2&start=0&rows=10&indent=on&wt=json';
		console.log('returning url', theUrl);

		return HttpUtil.prependProxyUrl(theUrl);

}*/
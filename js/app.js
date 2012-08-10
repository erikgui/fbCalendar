console.log('app.js started')
/*****************************************************************/
/*This is the starting point of the application including calls  */
/*to initialize the AppRouter, which ideally provides routing    */
/*for this application. However, routing features are not implem-*/
/*ented, as it seemed unnessary for the current functionalities. */
/*****************************************************************/
window.AppRouter = Backbone.Router.extend({

	routes: {
		"" : "timeline"
	},

	initialize: function() {
		console.log('creating new app router');
		window.CONFIG = new MdlConfig();

		/*The main Timeline view of the application*/
		this.view = new TimelineView();
		/*Modal for displaying specific event details*/
		this.modal = new TimelineDetailView();
		/*Collection for storing all LCS events as StubHubEventModel*/
		this.collection = new StubHubEventCollection();
		/*Hunch API model used to retrieve reccomendations for users based on facebook likes*/
		this.hunch = new HunchRecCollection();
		/*Geolocation functionality to map the user location to the nearest StubHub location based on IP address*/
		this.geo = new GeoLocationModel();

		/*Manually set the height of the application for infinite scrolling*/
		window.appHeight = 1200;
		/*cascadeTimeout is used for the animation effect of fading in the itemView tiles one by one*/
		window.cascadeTimeout = 0;
		/*some rudimentary way of preventing application to perform LCS call when it is already doing so*/
		window.loadingMore = false;
		
		/*This interval periodically queries facebook for the user's browser window information.*/
		/*When the user scrolls to the end of the page, infinite scrolling is triggered as the app*/
		/*loads more data onto the webpage. A facebook API call is also performed to lengthen the*/
		/*height of the application.*/
		window.autoUpdateInterval = setInterval(function(){
			FB.Canvas.getPageInfo(
		        function(info) {
		        	if (info.clientHeight + info.offsetTop + info.scrollTop > window.appHeight) {
		        		if (!loadingMore) {

		        			console.log('infinite scrolling!');
		        			loadingMore = true;
			        		window.cascadeTimeout = 0;
			        		FB.Canvas.setSize({height: window.appHeight+1200});
			        		window.appHeight = window.appHeight+1200;
							

							if (typeof d1 != 'undefined' &&
								typeof d2 != 'undefined' &&
								typeof limit != 'undefined') {
								if (limit.isAfter(window.app.collection.at(window.app.collection.length-1).get('eventDateObj'))) {
									var lastDate = window.app.collection.at(window.app.collection.length-1).get('eventDateObj').clone();
									while (d1.getDate() !== lastDate.getDate()) {
										for (var i = 0; i < window.app.collection.length; i++) {			
											var eventInstance = window.app.collection.at(i);
											var eventDateObj = eventInstance.get('eventDateObj');
											if (eventDateObj.between(d1, d2)) {
												DisplayedCollection.add(eventInstance);
												window.app.view.addEvent(eventInstance);
											}
										}
										
										d1 = d2.clone();
										d2 = d2.addDays(1);
										console.log('d1: ' + d1 );
										console.log('d2: ' + d1 );
									}
									var temp1 = d1.clone();
									var temp2 = d1.clone();
									d2 = temp1.addDays(1);
									limit = temp2.addDays(8);

									window.app.collection.meta('event_date_time_local', '[' + DateUtil.convertToStubDate(lastDate) + ' TO *]');
									window.app.collection.fetch({success: function() {
										while (!d1.equals(limit)) {
											for (var i = 0; i < window.app.collection.length; i++) {			
												var eventInstance = window.app.collection.at(i);
												var eventDateObj = eventInstance.get('eventDateObj');
												if (eventDateObj.between(d1, d2)) {
													DisplayedCollection.add(eventInstance);
													window.app.view.addEvent(eventInstance);
												}
											}
											
											d1 = d2.clone();
											d2 = d2.addDays(1);
										}

										var temp = new Date();
										temp = d1.clone();
										d2 = temp.addDays(1);
										limit = limit.addDays(8);


										loadingMore = false;
									}});
								} else {
									while (!d1.equals(limit)) {
										for (var i = 0; i < window.app.collection.length; i++) {			
											var eventInstance = window.app.collection.at(i);
											var eventDateObj = eventInstance.get('eventDateObj');
											if (eventDateObj.between(d1, d2)) {
												DisplayedCollection.add(eventInstance);
												window.app.view.addEvent(eventInstance);
											}
										}
										
										d1 = d2.clone();
										d2 = d2.addDays(1);
									}

						        	var temp = new Date();
									temp = d1.clone();
									d2 = temp.addDays(1);
									limit = limit.addDays(8);	

									loadingMore = false;
								}
							}

							loadingMore = false;	
							app.view.sortEventViews();
		        		}
		        		
		        	}
		        	/*Shift modal position to be always centered on the viewport*/
					$('.modal').css('top', info.clientHeight + info.scrollTop - (info.clientHeight-400) + 'px');
		        }
    		);
		}, 500);

	},

});

/*Loading Templates using a util function and initializing application via AppRouter*/
/*Note the two event handlers here are just for display purposes and does not actually*/
/*switch the application between "My Calendar" and "All Upcoming Events". */
(function($){
	utils.loadTemplate(['TimelineMonthView','TimelineItemView', 'TimelineEventView', 'TimelineDetailView'], function(){
		console.log('finish loading templates');
		window.app = new AppRouter();
		Backbone.history.start();
	});

	/*Eventlisteners for navigation buttons in the header container*/
	$('#my-calendar-btn').click(function(){
		$('#my-calendar-btn').addClass('inactive');
		$('#my-calendar-btn').addClass('active');
		$('#upcoming-events-btn').removeClass('active');
		$('#upcoming-events-btn').addClass('inactive');
	});

	$('#upcoming-events-btn').click(function(){
		$('#upcoming-events-btn').removeClass('inactive');
		$('#upcoming-events-btn').addClass('active');
		$('#my-calendar-btn').removeClass('active');
		$('#my-calendar-btn').addClass('inactive');
	});

	$( "#slider" ).slider();

	$("#search-results").hide();
	$("#search-close").hide();

	$("#search-close").click(function () {
      $("#search-input").val("");
      $('#search-results').hide();
      $("#search-close").hide();
    });

	window.changeLocActive = false;
	$('#change-loc-link a').click(function() {
		if (!window.changeLocActive) {
			console.log('clicked change loc');
			var dialog = $('#change-loc-d-template').clone();
			dialog.attr('id', 'change-loc-d');
			dialog.find('#change-loc-dialog-dismiss-template').attr('id' ,'change-loc-dialog-dismiss');
			$('#change-loc-link').append(dialog);
			dialog.css('display', 'block');
			window.changeLocActive = true;
		} 
	});
	$('#change-loc-dialog-dismiss').live('click', function(){
		console.log('hiding');
		$('#change-loc-d').remove();
		window.changeLocActive = false;
	});

	$('#search-btn').click(function() {
		searchClicked();
	});

	$('#search-input').keyup(function(e) {
		searchKeyup(e);
	});

	$('#sports-checkbox').change(function(e) {
		if ($('#sports-checkbox').is(':checked')) {
			window.app.view.toggleSports(true);
		} else {
			window.app.view.toggleSports(false);
		}
	});

	$('#concerts-checkbox').change(function(e) {
		if ($('#concerts-checkbox').is(':checked')) {
			window.app.view.toggleConcerts(true);
		} else {
			window.app.view.toggleConcerts(false);
		}
	});

	$('#theatre-checkbox').change(function(e) {
		if ($('#theatre-checkbox').is(':checked')) {
			window.app.view.toggleTheatre(true);
		} else {
			window.app.view.toggleTheatre(false);
		}
	});

	$('#friends-checkbox').change(function(e) {
		if ($('#friends-checkbox').is(':checked')) {
			window.app.view.toggleFriends(true);
		} else {
			window.app.view.toggleFriends(false);
		}
	});

	var today = new Date();
	var month = today.getMonth();
	for (var i = 0; i < 12; i++) {
		var tempMonth = month+i;
		var tempYear = today.getFullYear();
		while (tempMonth > 11) {
			tempMonth = tempMonth - 11;
			tempYear = tempYear + 1;
		}
		$('#month-selector').append('<option>' + DateUtil.getMonthName(tempMonth) + ', ' + tempYear + '</option>');
	}

	$('#month-selector').change(function(e) {
		var value = $('#month-selector').val();
		$('.timeline').html('');
		window.app.view = new TimelineView();

		window.app.collection.reset();
		var monthName = value.substr(0, value.indexOf(",")).trim();
		var monthNumber = DateUtil.getMonthNumber(monthName)+1;
		var year = value.substr(value.indexOf(",") + 1).trim();
		if (monthNumber-1 == today.getMonth() && year == today.getFullYear()) {
			window.FBUserModel.customizeEvents();
		} else {
			window.FBUserModel.updateCollection(year + '-' + monthNumber + '-1T00:00:00Z');
		}
		
		FB.Canvas.setSize({height: 1200});
		window.appHeight = 1200;
		window.cascadeTimeout = 0;
		window.loadingMore = false;
	});

})(jQuery);

/*This function is called when the user specifies a new location.*/
/*The entire timeline is reconstructed again from the bottom up.*/
function setpgeo(geoID, location, element) {
	console.log('clicked: ', location);
	var loc = location.slice(0, location.indexOf(','));
	if (typeof window.app.geo != 'undefined') {
		window.app.geo.replaceLocation(loc);
		$('.timeline').html('');
		window.app.view = new TimelineView();
		
		window.app.collection = new StubHubEventCollection();
		window.FBUserModel.customizeEvents();

		FB.Canvas.setSize({height: 1200});
		window.appHeight = 1200;
		window.cascadeTimeout = 0;
		window.loadingMore = false;
	}
	console.log('hiding');
	$('#change-loc-d').remove();
	window.changeLocActive = false;
}

/*Search Bar Event Handlers*/
function searchClicked() {
	// var queryVal = $('#search-input').val();
	// queryVal = $.trim(queryVal);
	// if (queryVal !== '') {
	// 	console.log(searchVal);
	// 	$('.timeline').html('');
	// 	//new view specifically for displaying search results
	// 	window.app.searchView = new TimelineView();
	// 	//new collection storing models of search results
	// 	window.app.searchCollection = new StubHubEventCollection();

	// 	//customizing query

	// 	//fetch from LCS
	// 	window.app.searchCollection.fetch({success: function() {
	// 		for (var i = 0; i < collection.length; i++) {			
	// 			var eventInstance = searchCollection.at(i);
	// 			var eventDateObj = eventInstance.get('eventDateObj');
	// 			if (eventInstance.get('eventTotalTickets') > 0) {
	// 				window.app.searchView.addEvent(eventInstance);
	// 			}
	// 		}
	// 	}});

	//}
}

function searchKeyup(e) {
	var area = 'AND ancestorGeoDescriptions:SF Bay Area AND';
	if (typeof window.app.geo != 'undefined') {
		area = 'AND ancestorGeoDescriptions:' + window.app.geo.get('loc') + ' AND';
	}
	EVENT_URL = 'http://www.stubhub.com/listingCatalog/select/?fq=stubhubDocumentType:event AND ancestorGenreIds:(28 OR 174 OR 1) AND book_of_business_id:1 ' + area + ' active:1 &start=0&rows=5&fl=channelId,act_primary,seo_description_en_US,eventGeoDescription,city,lat_lon,event_time_local,event_date_local,event_date_time_local,genreUrlPath,urlpath&wt=json&q=(';
  	GENRE_URL = 'http://www.stubhub.com/listingCatalog/select/?fq=stubhubDocumentType:event AND active:1 &start=0&rows=5&fl=act_primary_en_US,genre_parent_name,genreUrlPath&wt=json&sfield=lat_lon&pt=' + geoip_latitude() + ',' + geoip_longitude() + '&group=true&group.field=eventGenreParentDescription_facet_str&group.main=true&sort=geodist() asc&q=(act_primary_en_US:"';
  	var queryraw = $('#search-input').val();
  	querytrim = jQuery.trim(queryraw);
  	var eventquerypre = querytrim.replace(/ /g," AND "); 
	var genrequerypre = querytrim.replace(/ /g," AND ");
	var eventquery = eventquerypre + '*) OR ("' + querytrim + '"~1000000^10)';
	var genrequery = genrequerypre + '")';

	//Check if enter key is pressed 
	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 13) {
		console.log('enter key was pressed');

		$.ajax({
				url: EVENT_URL + eventquery,
				dataType: 'jsonp',
				jsonp: 'json.wrf',
				success: function(response) {
					enterPressedCallback(response);
				}
		});

	} else {
		if (querytrim.length > 1) {
			$.ajax({
				url: EVENT_URL + eventquery,
				dataType: 'jsonp',
				jsonp: 'json.wrf',
				success: function(response) {
					eventCallback(response);
				}
			});
			$.ajax({
				url: GENRE_URL + genrequery,
				dataType: 'jsonp',
				jsonp: 'json.wrf',
				success: function(response) {
					genreCallback(response);
				}
			});
			$('#search-close').show();
			$('#searchall').empty().show();
			$('#searchall').append('<li class="result searchall" style="color:#0088cc;font-weight:bold;"><a href="http://www.stubhub.com/search/doSearch?searchStr=' + querytrim + '&pageNumber=1&resultsPerPage=50&searchMode=event&start=0&rows=50&geo_exp=1">Search StubHub for "'+ querytrim + '" tickets</a></li>');
		} else {
			$('#eventresults').hide();
			$('#genreresults').hide();
			$('#searchall').hide();
			$("#search-results").hide();
			$('#hide').show();
			$('#search-close').hide();
		}
	}
}

function eventCallback(data, textStatus) {
	var list = data.response.docs;
	var results = $('#eventresults').empty().show();
	if (list.length > 0) {
		$("#search-results").show();
		results.append('<li class="resulttype">Upcoming events</li>');

		$.each(list, function(s) {

			if (list[s].channelId == 28) {
				var title = list[s].seo_description_en_US;
			} else {
				var title = list[s].act_primary;
			}

			var hour = list[s].event_time_local.slice(0,2);
			var minute = list[s].event_time_local.slice(3,5);
			if (hour > 12) {
				time = hour - 12 + ':' + minute + ' PM';
			} else if (hour = 12) {
				time = 12 + ':' + minute + ' PM';
			} else {
				time = hour + ':' + minute + ' AM';
			}

			var date = dateFormat(list[s].event_date_time_local, "dddd, mmmm d, yyyy");

			html = '<div class="title"><a target="_blank" href="http://www.stubhub.com/' + list[s].genreUrlPath + '/' + list[s].urlpath + '">' + title + '</div>' + 
			'<div class="venuedate">' + list[s].eventGeoDescription + '<span>, ' +list[s].city + '<span> on ' + date + '<span> at ' + time + '</a></div>';
			results.append('<li class="result">' + html + '</li>');
		
		});
	} else {
		$('#eventresults').empty().show();
	}
}
  
  
function genreCallback(data, textStatus) {
	var list = data.response.docs;
	var results = $('#genreresults').empty().show();
	if (list.length > 0) {
		results.append('<li class="resulttype">Teams, artists and performers</li>');
		$.each(list, function(s) {

			html = '<div class="title genretitle"><a target="_blank" href="http://www.stubhub.com/' + list[s].genreUrlPath + '">' + list[s].genre_parent_name + '</div>';
			results.append('<li class="result">' + html + '</li>');
		});

	} else {
		$('#genreresults').empty().show();
	}
}

function enterPressedCallback(data) {
	var list = data.response.docs;

	$('.timeline').html('');

	//new view specifically for displaying search results
	window.app.searchView = new TimelineView();
	//new collection storing models of search results
	window.app.searchCollection = new StubHubEventCollection();

	for (var i = 0; i < list.length; i++) {

	}

}
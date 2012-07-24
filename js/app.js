console.log('app.js started')

window.AppRouter = Backbone.Router.extend({

	routes: {
		"" : "timeline"
	},

	initialize: function() {
		window.CONFIG = new MdlConfig();
		this.view = new TimelineView();
		this.modal = new TimelineDetailView();
		this.collection = new StubHubEventCollection();
		this.hunch = new HunchRecCollection();

		this.geo = new GeoLocationModel();

/*		this.HunchRecCollection = new HunchRecCollection();
		this.HunchRecCollection.meta('topic_ids', 'list_musician');
		this.HunchRecCollection.meta('likes', 'hn_3570964');
		this.HunchRecCollection.meta('blocked_result_ids', 'hn_3570964');
		console.log(this.HunchRecCollection.url());
		this.HunchRecCollection.fetch();*/
		window.appHeight = 1200;
		window.cascadeTimeout = 0;
		window.loadingMore = false;
		
		setInterval(function(){
			FB.Canvas.getPageInfo(
		        function(info) {
		        	if (info.clientHeight + info.offsetTop + info.scrollTop > window.appHeight) {
		        		if (!loadingMore) {
		        			loadingMore = true;

		        			console.log('infinite scrolling!');
			        		window.cascadeTimeout = 0;
			        		FB.Canvas.setSize({height: window.appHeight+1200});
			        		window.appHeight = window.appHeight+1200;
							
							//for (var idx = 0; idx < collection.length; idx++) {
								//var counter = 0;
							console.log('d1: ' + d1);
							console.log('d2: ' + d2);
							console.log('limit: ' + limit);
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
								

								console.log('d1: ' + d1);
								console.log('d2: ' + d2);
								console.log('limit: ' + limit);
							}

							loadingMore = false;	
		        		}
		        		
		        	}

					$('.modal').css('top', info.clientHeight + info.scrollTop - 300 + 'px');
					$('#header-container').css('top', info.scrollTop + 'px');
		        }
    		);
		}, 500);

	},

});

/*Loading Templates using a util function and initializing application via AppRouter*/
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

})(jQuery);

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

//1200
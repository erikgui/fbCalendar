/*Model Dialog*/
window.TimelineDetailView = Backbone.View.extend({
	el: '#timelinedetail-container',

	meta: function(property, value) {
		if (typeof value === "undefined") {
			return this._meta[property];
		} else {
			this._meta[property] = value;
		}
	},

	initialize: function() {
		_.bindAll(this, 'render');
		this._meta = {};
		this.render();
	},

	initializeInfo: function(eventInfo) {

	},

	render: function() {
		$(this.el).append(this.template());
		$('#details-modal').modal({show: false});
		return this.el;
	},

	show: function() {
		$('#details-modal').modal({show: true});
	}
});
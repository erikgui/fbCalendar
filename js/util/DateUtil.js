var DateUtil = new function() {
   
    this.formatSolrDate = function (country, dateString) {
        dateString = dateString.replace('T', ' ');
        dateString = dateString.replace('Z', '');
		
        var d = Date.parse(dateString);
		
        if( country == 'United States') {
            return d.toString('ddd, MMMM d, yyyy h:mm t');                       
        } else if( country == 'United Kingdom') {
            return d.toString('dddd, MMMM d, yyyy H:mm') + ' GMT';
        } else {
            console.error('formatDate.invalid.country', country);
            return 'error';
        }
    };
    
    this.formatDate = function(dateString, country, fromFormat) {
      var d = Date.parseExact(dateString, fromFormat);
      
      return this.formatDateForCountry(d, country);
      
    };
    
    
    this.formatDateForCountry = function(d, country) {
        if( country == 'United States') {
            return d.toString('ddd, MMMM d, yyyy h:mm tt');                       
        } else if( country == 'United Kingdom') {
            return d.toString('dddd, MMMM d, yyyy H:mm') + ' GMT';
        } else {
            console.error('formatDate.invalid.country', country);
            return 'error';
        }
    };
    
    this.formatReviewDate = function(dateString, country, fromFormat) {
        var d = Date.parseExact(dateString, fromFormat);
        if( country == 'United States') {
            return d.toString('MM/dd/yyyy');                       
        } else if( country == 'United Kingdom') {
            return d.toString('dd/MM/yyyy');                       
        } else {
            console.error('formatDate.invalid.country', country);
            return 'error';
        }
      
    },
    this.convertToDateObject = function(dateString) {
        if (typeof dateString != 'undefined') {
            dateString = dateString.replace('T', ' ');
            dateString = dateString.replace('Z', '');
            var d = Date.parse(dateString);
            return d; 
        }
	},
	
    this.convertZventsDateToStubDate = function(zventsDate) {
	var months = {'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'};
	
	var strDate = new String(zventsDate);
	
	var comps = strDate.split(" ");
	
	var mm = months[comps[1]];
	var yyyy = comps[5];
	var dd = comps[2];
	return yyyy+'-'+mm+'-'+dd;
    }
}
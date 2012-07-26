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
      
    };

    this.convertToDateObject = function(dateString) {
        if (typeof dateString != 'undefined') {
            dateString = dateString.replace('T', ' ');
            dateString = dateString.replace('Z', '');
            var d = Date.parse(dateString);
            return d; 
        }
	};

    this.convertToStubDate = function(dateObj) {
        if (typeof dateObj != 'undefined') {
            var year = dateObj.getFullYear();
            var month = dateObj.getMonth()+1;
            var date = dateObj.getDate()+1;
            return year + '-' + month + '-' + date + 'T00:00:00Z';
        }
    };
	
    this.convertZventsDateToStubDate = function(zventsDate) {
	var months = {'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'};
	
	var strDate = new String(zventsDate);
	
	var comps = strDate.split(" ");
	
	var mm = months[comps[1]];
	var yyyy = comps[5];
	var dd = comps[2];
	return yyyy+'-'+mm+'-'+dd;
    };

    this.getDayName = function(number) {
        switch(number) {
            case 0:
                return 'Sunday';
                break;
            case 1:
                return 'Monday';
                break;
            case 2:
                return 'Tuesday';
                break;
            case 3:
                return 'Wednesday';
                break;
            case 4:
                return 'Thursday';
                break;
            case 5:
                return 'Friday';
                break;
            case 6:
                return 'Saturday';
                break;
        }
    };

    this.getMonthName = function(number) {
        switch(number) {
            case 0:
                return 'January';
                break;
            case 1:
                return 'February';
                break;
            case 2:
                return 'March';
                break;
            case 3:
                return 'April';
                break;
            case 4:
                return 'May';
                break;
            case 5:
                return 'June';
                break;
            case 6:
                return 'July';
                break;
            case 7:
                return 'August';
                break;
            case 8:
                return 'September';
                break;
            case 9:
                return 'October';
                break;
            case 10:
                return 'November';
                break;
            case 11:
                return 'December';
                break;
        }

    };

    this.formatTime = function(hour, minutes) {
        var h = hour
        var suffix = '';
        if (h < 10) {
            h = '0' + h;
            suffix = 'AM'
        } else if (h > 12) {
            h = h - 12;
            h = '0' + h;
            suffix = 'PM'
        }
        var m = minutes;
        if (m < 10) {
            m = '0' + m;
        }
        return h + ':' + m + ' ' + suffix + ' PDT'
    }
}
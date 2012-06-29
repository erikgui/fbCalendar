var CurrencyUtil = new function() {
    this.formatPrice = function(price, country) {
        if(country == 'United Kingdom') {
            return '&pound;'+price;
        } else if(country == 'United States') {
            return '$'+price;
        } else {
            return price;
        }
    }
}
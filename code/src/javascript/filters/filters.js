// {{ value | ceil }} - Round to Integer Value

app.filter('ceil', function() {
    return function(input) {
        return Math.ceil(input);
    };
});


// {{ value | abs }} - Absolute Value

app.filter('abs', function() {
    return function(input) {
        return Math.abs(input);
    };
});
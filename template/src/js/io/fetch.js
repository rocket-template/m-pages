var fetch = function(url, options) {
	var defaults = {
		url: '/api' + url,
		type: options['type'],
		dataType: 'json',
		timeout: 30000
	};
	$.extend(true, defaults, options);
	return $.ajax(defaults);
};

var exp = {};
['get', 'post'].forEach(function(method) {
	exp[method] = function(url, options) {
		options = options || {};
		options['type'] = method.toUpperCase();
		return fetch(url, options);
	};
});

module.exports = exp;
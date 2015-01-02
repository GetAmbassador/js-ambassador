var url = require('url');
var http = require('https');

/**
 * The main mbsy constructor, takes the api key, api username and additional options
 * Visit https://getambassador.com/api for api id and key
 * @param {String} api_username The users API id
 * @param {String} api_key The users API key
 * @param {Object} options Optional options
 */
var Mbsy = function(api_username, api_key, options) {
  // Set default options
  options = options || {
    api_format: 'json', //this library doesn't support xml so far
    api_version: '2',
    api_host: 'getambassador.com'
  };

  // Set up the config for requests being made with the instance of this
  this.config = {
    api_username: api_username,
    api_key: api_key,
    api_host: options.api_host,
    api_version: options.api_version,
    api_format: options.api_format
  };

  return this;
};

/**
 * Generates the URL object to be passed to the HTTP request for a specific
 * API method call
 * @param  {Object} query  The query object
 * @param  {String} method The mbsy method to call with the request
 * @return {Object} The URL object for this request
 */
Mbsy.prototype._generateNiceUrl = function(query, method) {
  query = query || {};
  var result = url.parse(url.format({
    protocol: 'https',
    hostname: this.config.api_host,
    pathname: 'api/v' + this.config.api_version + '/' 
    				+ this.config.api_username + '/' 
    				+ this.config.api_key + '/' 
    				+ this.config.api_format + '/' 
    				+ method,
    query: query,
    agent: false
  }));
  // HACK: Fixes the redirection issue in node 0.4.x
  if (!result.path) { result.path = result.pathname + result.search; }
  //console.log(result);
  return result;
};

/**
 * Function to do a HTTP Get request with the current query
 * @param  {Object} request_query The current query object
 * @param  {Function} cb The callback function for the returned data
 * @return {void}
 */
Mbsy.prototype._doRequest = function(request_query, cb) {
  // Pass the requested URL as an object to the get request
  var req = http.get(request_query, function(res) {
      var data = [];
      res
      .on('data', function(chunk) { data.push(chunk); })
      .on('end', function() {
          var urldata = data.join('').trim();
          var result;
          try {
            result = JSON.parse(urldata);
          } catch (exp) {
            result = {'response': { 'code': '500', 'message': 'JSON Parse Failed' } };
          }
          cb(null, result);
      });
  })
  .on('error', function(e) {
      cb(e);
  });
};


// Export as main entry point in this module
module.exports = Mbsy;

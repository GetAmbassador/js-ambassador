mbsy
====

Node.js wrapper for the [Ambassador](https://getambassador.com) API.

### Installation

	$ npm install mbsy

### Usage

    var msby = require('mbsy').createClient(<Company_Username>, <API_Key>);

	/**
	 * Retrieves details about a given ambassador including their active share links.
	 * Automatically creates the requested ambassador if they do not exist yet.
	 * @param  {Object} params as described on https://getambassador.com/api#v2_method_ambassador_get
	 * @param  {Function} cb The callback function with the results
	 * @return {void}
	 */
    msby.Ambassador.get(
        {
            email: 'ambassador@example.com',
            auto_create: 1,
        },
        function(err, data) {
            console.log(err, data);
        }
    );

	/**
	 * Records an instance of a campaign referral event.
	 * @param  {Object} params as described on https://getambassador.com/api#v2_method_event_record
	 * @param  {Function} cb The callback function with the results
	 * @return {void}
	 */
    msby.Event.record(
        {
            email: 'ambassador@example.com',
            campaign_uid: 1234,
            short_code: 'abc',
            revenue: 0
        },
        function(err, data) {
            console.log(err, data);
        }
    );

	/**
	 * Generic api call
	 * Check all available methods on https://getambassador.com/api
	 * @param  {String} method eg. "company/get"
	 * @param  {Object} method params
	 * @param  {Function} cb The callback function with the results
	 * @return {void}
	 */
    msby.Custom.get(
    	'shortcode/get',
        {
            sandbox: 0
        },
        function(err, data) {
            console.log(err, data);
        }
    );

### License

(The MIT License)

Copyright (c) 2013 SocialBro <aartiles@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

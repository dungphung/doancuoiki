var Fetch = require('whatwg-fetch');
var rooUrl = 'https://api.imgur.com/3/';
var apiKey = 'adcb0abc5e283c8';
var AppActions = require('../actions/AppActions');


module.exports = window.api = {
    get: function(url) {
        return fetch(rooUrl + url, {
            headers: {
              'Authorization': 'Client-ID ' + apiKey
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);
            AppActions.receiveData(data);
        })
    }
};

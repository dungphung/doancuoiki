var Fetch = require('whatwg-fetch');
var rooUrl = 'https://api.imgur.com/3/';
var apiKey = 'adcb0abc5e283c8';
var image_store = require('../stores/image-store')
var  _ = require('lodash');
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
            var images = _.reject(data.data, function(image) {
                return image.is_album
            })
            AppActions.receiveImages(images);
        }.bind(this));
    },
    getImage: function(url) {
        return fetch(rooUrl + url, {
            headers: {
              'Authorization': 'Client-ID ' + apiKey
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            AppActions.receiveImage(data.data)
        }.bind(this))
    },
    getComment: function(url) {
        return fetch(rooUrl + url, {
            headers: {
              'Authorization': 'Client-ID ' + apiKey
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            AppActions.receiveComment(data.data);
        }.bind(this))
    }
};

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var  AppAPI = require('../utils/AppAPI');
var  ImagesAPI = require('../utils/ImagesAPI');
var  _ = require('lodash');

var CHANGE_EVENT = 'change';

var _images = [];

var AppStore = assign({}, EventEmitter.prototype,{

    setImages: function(data){
        _images = data;
    },
    getImages: function() {
        return _images;
    },
    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT,callback);
    }
});

AppDispatcher.register(function(payload){
    var action = payload.action;
    switch (action.actionType) {
        case AppConstants.GET_IMAGES:
            ImagesAPI.get("topics/" + action.url)
            break;
        case AppConstants.RECEIVE_IMAGES:
            AppStore.setImages(action.images);
            AppStore.emitChange();
            break;
        case AppConstants.GET_IMAGE:
            ImagesAPI.getImage('gallery/image/' + action.url)
            break;
        case AppConstants.RECEIVE_IMAGE:
            AppStore.setImages(action.image);
            AppStore.emitChange();
            break;
    }
    return true;
});

module.exports = AppStore;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var eventEmitter = require('events').EventEmitter;
var assign = require('object-assign');



var CHANGE_EVENT = 'change';

var _topics = [];

var AppStore = assign({}, eventEmitter.prototype,{

    setTopics: function(topics) {
        _topics = topics.data;
    },
    getTopics: function() {
      return _topics;
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
        case AppConstants.RECEIVE_DATA:
            console.log('receive data....')
            
            AppStore.setTopics(action.topics);

            AppStore.emit(CHANGE_EVENT);

            break;
    }

    return true;
});

module.exports = AppStore;

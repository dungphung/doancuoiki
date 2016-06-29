var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var  ImagesAPI = require('../utils/ImagesAPI');


var CHANGE_EVENT = 'change';

var _Comments = [];

var CommentStore = assign({}, EventEmitter.prototype,{

    setComments: function(data){
        _Comments = data;
    },
    getComments: function() {
        return _Comments;
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
        case AppConstants.GET_COMMENT:
          console.log("get comment call");
          var url = 'gallery/' + action.url + '/comments';
          console.log(url);
          ImagesAPI.getComment(url);
          break;
        case AppConstants.RECEIVE_COMMENT:
          console.log(action.comments)
          CommentStore.setComments(action.comments);
          CommentStore.emitChange();
          break;
    }
    return true;
});

module.exports = CommentStore;

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');


var AppActions = {
    receiveData: function(topics) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVE_DATA,
            topics: topics
        })
    },
    getImages: function(url) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.GET_IMAGES,
            url: url
        })
    },
    receiveImages: function(images) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVE_IMAGES,
            images: images
        })
    },
    getImage: function(url) {
      AppDispatcher.handleViewAction({
          actionType: AppConstants.GET_IMAGE,
          url: url
      })
    },
    receiveImage: function(image) {
      AppDispatcher.handleViewAction({
          actionType: AppConstants.RECEIVE_IMAGE,
          image: image
      })
    },
    getComment: function(url) {
      AppDispatcher.handleViewAction({
          actionType: AppConstants.GET_COMMENT,
          url: url
      })
    },
    receiveComment: function(comments) {
      AppDispatcher.handleViewAction({
          actionType: AppConstants.RECEIVE_COMMENT,
          comments: comments
      })
    }

};

module.exports = AppActions;

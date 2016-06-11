var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');


var UserAction = {
    addNewUser: function(newUser) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.ADD_NEWUSER,
            newUser: newUser
        })
    },

    // kiểm tra tên đn lúc đăng ký
    checkUserName: function(UserName) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.CHECK_USERNAME,
            UserName: UserName
        })
    },
    changeStateUserName: function(state) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.CHANGE_STATE,
            state: state
        })
    },

    // kiểm tra tên đn lúc đăng nhập
    CheckUser: function(User) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.LOGIN,
            User: User
        })
    },

    ReceiveResultLogin: function(Result) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.RECEIVE_RESULTLOGIN,
            Result: Result
        })
    },
    //thông báo đăng nhập
    IsLogin: function() {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.ISLOGIN,
            result: true
        })
    },
    // Thong báo đăng xuất
    IsLogOut: function() {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.LOGOUT,
            result: false
        })
    },

    // set tên đăng nhập cho trang home sau khi đăng ký thành công
    setUserName: function(username) {
      AppDispatcher.handleViewAction({
        actionType: AppConstants.SET_USERNAME,
        username: username
      })
    }


};

module.exports = UserAction;

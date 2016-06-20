var AppConstants = require('../constants/AppConstants');
var eventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserAPI = require('../utils/UserAPI');

var CHANGE_EVENT = 'change';

var _ResultSignUp;
var _ResultLogin = '';
var _IsLogin = false;
var UserName = '';
var UserStore = assign({}, eventEmitter.prototype,{

    // đặt giá trị user name
    setUserName: function(name) {
        UserName = name;
    },
    getUserName: function() {
      return UserName;
    },

    // Lấy trạng thái đăng nhập vào hoặc đã đăng kí.
    setIsLogin: function(Result) {
        _IsLogin = Result;
    },
    getIsLogin: function() {
        console.log(_IsLogin);
        return _IsLogin;
    },

    // Kết quả của việc đăng nhập
    setResultLogin: function(Result) {
        _ResultLogin = Result;
    },
    getResultLogin: function() {
        return _ResultLogin;
    },

    //Kết quả của việc đăng ký
    setResultSignUp: function(result) {
        _ResultSignUp = result;
    },
    getResultSignUp: function() {
        return _ResultSignUp;
    },

    // Thông báo sự kiện
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
        case AppConstants.ADD_NEWUSER:

            console.log('Add user....');

            UserAPI.addNewUser(action.newUser);

            UserStore.emit(CHANGE_EVENT);

            break;
        case AppConstants.CHECK_USERNAME:
          console.log("Check user name .....");

          UserAPI.checkUserName(action.UserName);

          break;
        case AppConstants.CHANGE_STATE:
          console.log("Change state...");

          UserStore.setResultSignUp(action.state);

          UserStore.emitChange();

          break;
        case AppConstants.LOGIN:
          console.log("Login....");

          UserAPI.Login(action.User);

          break;
        case AppConstants.RECEIVE_RESULTLOGIN:
          console.log("Receive result login.....");

          UserStore.setResultLogin(action.Result);

          if (action.Result.result == "success") {
              UserStore.setUserName(action.Result.name);
          }

          UserStore.emitChange();

          break;
        case AppConstants.ISLOGIN:
          console.log("Is Login...");

          UserStore.setIsLogin(action.result);

          UserStore.emitChange();

          break;
        case AppConstants.LOGOUT:
          console.log("Logout.....");

          UserStore.setIsLogin(action.result);

          UserStore.emitChange();

          break;

        case AppConstants.SET_USERNAME:
          UserStore.setUserName(action.username);
          UserStore.emitChange();
          break;

        case AppConstants.VIEW_ALL_JOURNEYS:
          console.log('View all journeys...');
          UserStore.emitChange();
          break;
        }

    return true;
});

module.exports = UserStore;

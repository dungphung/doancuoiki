var UserAction = require('../actions/UserAction');
var Firebase = require('firebase');

var config = {
  apiKey: "AIzaSyA0tpa6jRDkfl-TjdLBBjsVPldxBPAypvM",
  authDomain: "database-4d92f.firebaseapp.com",
  databaseURL: "https://database-4d92f.firebaseio.com",
  storageBucket: "database-4d92f.appspot.com",
};
Firebase.initializeApp(config);


module.exports = {
    addNewUser: function(newUser) {
        var NewUser = new Firebase.database().ref('Users');
        NewUser.child(newUser.username).set({
            email: newUser.email,
            password: newUser.password
        })
        UserAction.setUserName(newUser.username);

    },
    checkUserName: function(UserName) {
      var Users = new Firebase.database().ref('Users/' + UserName);
       Users.once("value")
        .then(function(snapshot) {
            UserAction.changeStateUserName(!snapshot.exists());
        })
    },
    Login: function(User) {
      var result;
      result = "123";
      var UserName = new Firebase.database().ref('Users/' + User.username );
       UserName.once("value")
        .then(function(snapshot) {
            if (snapshot.exists()) {
                if(snapshot.val().password == User.password) {
                    var Result = {
                        name: User.username,
                        result: "success"
                    }
                    UserAction.ReceiveResultLogin(Result);
                } else {
                  var Result = {
                      name: User.username,
                      result: "wrong password"
                    }
                    UserAction.ReceiveResultLogin(Result);
                }


            } else {

              var Result = {
                  name: User.username,
                  result: "wrong username"
                }
                UserAction.ReceiveResultLogin(Result);
            }
        })
    }

};

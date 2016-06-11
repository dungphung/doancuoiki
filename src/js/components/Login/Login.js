var React = require('react');
var UserStore = require('../../stores/UserStore');
var UserAction = require('../../actions/UserAction');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var withRouter = ReactRouter.withRouter;
var count = 0;

var Login = React.createClass({

    getInitialState: function() {
        return {
            ResultLogin: '',
            showalert: false
        }
    },
    componentWillMount: function() {
      UserStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
      UserStore.removeChangeListener(this._onChange);
    },
    render: function() {
        var HiddenAlert = {
            visibility: "hidden"
        }
        var VisibleAlert = {
            visibility: "visible"
        }
        return (
            <div className="formLogin">
                  <div className="alert alert-danger" style={this.state.showalert ? VisibleAlert : HiddenAlert}>
                      <strong>{this.showalertText()}</strong>
                  </div>
                  <div className="container well" id="form-login">
                  <h2>Login</h2>
                  <form className="form-horizontal" role="form" onSubmit={this.handleSubmit} >
                      <div className="form-group" id="">
                        <label className="control-label col-sm-2" for="username" >UserName:</label>
                        <div className="col-sm-10">
                          <input type="username" ref="username" className="form-control"  placeholder="Enter UserName" />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="control-label col-sm-2" for="pwd">Password:</label>
                        <div className="col-sm-10">
                          <input type="password" ref="password" className="form-control" id="pwd" placeholder="Enter password" />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                          <button type="submit" className="btn btn-primary" >Submit</button>
                        </div>
                      </div>
                  </form>
                </div>
            </div>
          )
        },
        showalertText: function() {
           if (this.state.ResultLogin.result == "wrong password") {
                return "Sai mật khẩu.";
           } else {
              if (this.state.ResultLogin.result == "wrong username") {
                  return "Tên đăng nhập không tồn tại.";
              }
           }
        },
        _onChange: function() {
          this.setState({ResultLogin: UserStore.getResultLogin()});
            if (this.state.ResultLogin.result == "success") {
                UserAction.IsLogin();
                this.props.router.push('/home');
            }
            else {
                if ( this.state.ResultLogin.result == "wrong password" || this.state.ResultLogin.result == "wrong username") {
                    this.setState({showalert: true});
                  }
                }
        },
        handleSubmit: function(e) {
            e.preventDefault();
            var User = {
                  username: this.refs.username.value.trim(),
                  password: this.refs.password.value.trim()
              }
              UserAction.CheckUser(User);
        }

});


module.exports = withRouter(Login);

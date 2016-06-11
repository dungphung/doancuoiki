var React = require('react');
var UserStore = require('../../stores/UserStore');
var UserAction = require('../../actions/UserAction');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var withRouter = ReactRouter.withRouter;


var SignUp = React.createClass({
    getInitialState: function() {
        return {
            CheckUserName: false,
            ShowError: 0,
            ShowErrorText: false,
        }
    },
    componentWillMount: function() {
        UserStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChange);
    },

    render: function() {
      return (
        <div id="signupbox" style={{marginTop: "50px"}} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                    <div className="panel panel-info">
                        <div className="panel-heading">
                            <div className="panel-title">Sign Up</div>

                        </div>
                        <div className="panel-body" >
                            <form id="signupform" className="form-horizontal" role="form" onSubmit={this.handleSubmit}>

                                <div id="signupalert" style={this.state.ShowError ? {visibility: "visible", maxHeight: "60px",  textAlign: "center"} : {visibility: "hidden", maxHeight: "20px"} } className={this.handleChangeClass()}>
                                    <h5>{this.handleError()}</h5>

                                </div>

                                <div className="form-group">
                                    <label for="username" className="col-md-3 control-label">User Name</label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" onChange={this.handleonChangeInput} ref="UserN" name="username" placeholder="User Name" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label for="email" className="col-md-3 control-label">Email</label>
                                    <div className="col-md-9">
                                        <input type="text" className="form-control" name="email" ref="Email" placeholder="Email Address" />
                                    </div>
                                </div>



                                <div className="form-group">
                                    <label for="password" className="col-md-3 control-label">Password</label>
                                    <div className="col-md-9">
                                        <input type="password" className="form-control" name="passwd" ref="Pass" placeholder="Password" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="col-md-offset-3 col-md-9">
                                        <button id="btn-signup" type="submit" className="btn btn-info"><i className="fa fa-hand-o-right"></i> &nbsp; Sign Up</button>
                                        <span style={{marginLeft: "8px"}}>or</span>
                                    </div>
                                </div>

                                <div style={{borderTop: "1px solid #999", paddingTop:" 20px"}}  className="form-group">

                                    <div className="col-md-offset-3 col-md-9">
                                        <button id="btn-fbsignup" type="button" className="btn btn-primary"><i className="icon-facebook"></i>   Sign Up with Facebook</button>
                                    </div>

                                </div>



                            </form>
                         </div>
                    </div>


         </div>
      )
    },
    _onChange: function() {
        var Result = UserStore.getResultSignUp();

        if (Result) {
            this.setState({CheckUserName: true,ShowError: true, ShowErrorText: 6});
        } else {
            this.setState({CheckUserName: false, ShowError: true, ShowErrorText: 2})
        }

    },
    handleonChangeInput: function(e) {
        var UserName = e.target.value;

        if (UserName.length > 0 && UserName.length <3) {
            this.setState({ShowError: true, ShowErrorText: 1})
        } else {
            if (UserName.length == 0 )
            {
              this.setState({ShowError: false})
            }
            else {
              UserAction.checkUserName(UserName);
            }

        }
    },
    handleError: function() {
        if( this.state.ShowErrorText == 1) {
            return <p>Tên đăng nhập không được dưới 3 kí tự</p>
        } else {
            if(this.state.ShowErrorText == 2)
              return <p>Tên đăng nhập trùng</p>
            else {
              if (this.state.ShowErrorText == 3) {
                  return <p>Bạn cần nhập vào user name</p>
              } else {
                if (this.state.ShowErrorText == 4 ) {
                  return <p>Bạn cần nhập vào email</p>
                } else {
                    if (this.state.ShowErrorText == 5)
                      return <p>Bạn cần nhập password</p>
                    else {
                      return <p>User name sử dụng được</p>
                    }
                }
              }

            }
        }
    },
    handleChangeClass: function() {
        return this.state.CheckUserName && this.state.ShowErrorText == 6 ? "alert alert-success" : "alert alert-danger"
    },
    handleSubmit: function(e) {
        e.preventDefault();

        if (this.state.CheckUserName && this.state.ShowErrorText == 6 && this.refs.Email.value.trim().length > 0  && this.refs.Pass.value.trim().length > 0) {
            UserAction.addNewUser({
                username: this.refs.UserN.value.trim(),
                email: this.refs.Email.value.trim(),
                password: this.refs.Pass.value.trim()
            });
            UserAction.IsLogin(); //Thong bao dn
            this.props.router.push('/home')
        } else {
            if (this.refs.UserN.value.trim().length == 0) {
                this.setState({ShowError: true, ShowErrorText: 3})
            } else {
              if (this.refs.Email.value.trim().length == 0) {
                  this.setState({ShowError: true, ShowErrorText: 4})
              } else {
                  if (this.refs.Pass.value.trim().length == 0) {
                      this.setState({ShowError: true, ShowErrorText: 5})
              }
            }
        }
      }
    }
})


module.exports = withRouter(SignUp);

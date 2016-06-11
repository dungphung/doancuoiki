var React = require('react');
var UserAction = require('../../actions/UserAction');
var ReactRouter = require('react-router');
var withRouter = ReactRouter.withRouter;
var Link = ReactRouter.Link;
var UserStore = require('../../stores/UserStore')

var HomeLogin = React.createClass({
    getInitialState: function() {
        return {
          IsLogin: ''
        }
    },
    componentDidMount: function(){
        UserStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        UserStore.removeChangeListener(this._onChange);
    },

    render: function() {

        return (
            <div>
                {this.state.IsLogin ? this.renderLoginHome() : this.renderNotLoginHome()}
            </div>
        )
    },
    renderNotLoginHome: function() {
        return (
          <div>
              <h2>Bạn cần đăng nhập <Link to="/login">Log In now</Link></h2>
          </div>
        )
    },
    renderLoginHome: function() {
        return (
          <div>
              <h2>Đăng nhập thành công </h2>
          </div>
        )
    },
    _onChange: function() {
        this.setState({IsLogin: UserStore.getIsLogin()});
    }
})

module.exports = withRouter(HomeLogin);

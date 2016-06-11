var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var UserStore = require('../../stores/UserStore');
var UserAction = require('../../actions/UserAction');
var withRouter = ReactRouter.withRouter;

var count = 0;

var NavItem = React.createClass({
  getInitialState: function() {
      return {
        IsLogin: '',
        UserName: ''
      }
  },
  componentWillMount: function() {
      UserStore.addChangeListener(this._onChange)
  },

    render: function() {
        return (
          <div>
                {this.state.IsLogin ? this.renderLogin() : this.renderNotLogin()}
          </div>

        )
    },
    _onChange: function() {
      this.setState({IsLogin: UserStore.getIsLogin(),
                      UserName: UserStore.getUserName()});
    },
    renderNotLogin: function() {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#">Home</a></li>
          <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
          <li><Link to="/signup"><span className="glyphicon glyphicon-user"></span>Sign up</Link></li>
        </ul>
      )

    },
    renderLogin: function() {

      return (
        <div>
          <ul className="nav navbar-nav">
            <li><a href="#">Home</a></li>

          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a><span className="glyphicon glyphicon-user"></span>{this.state.UserName}</a></li>
            <li onClick={this.handleOnClick}><Link to="/"><span className="glyphicon glyphicon-log-out"></span> Log out</Link></li>
          </ul>
        </div>

      )

    },
    handleOnClick: function(e) {
      e.preventDefault();

      UserAction.IsLogOut();

      this.setState({IsLogin: false});

      this.props.router.push('/');

    }
});

module.exports = withRouter(NavItem);

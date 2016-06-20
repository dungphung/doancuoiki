var React = require('react');
var UserAction = require('../../actions/UserAction');
var ReactRouter = require('react-router');
var withRouter = ReactRouter.withRouter;
var Link = ReactRouter.Link;
var UserStore = require('../../stores/UserStore');
var AddJourney = require('./AddJourney');
var ListJourneys = require('./ListJourneys');

var MyJourney = React.createClass({
	getInitialState: function() {
        return {
            IsLogin: ''
        }
    },
    componentWillMount: function() {
      UserStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
      UserStore.removeChangeListener(this._onChange);
    },

    render: function () {
      console.log('rendering....')
    	return (
    		<div>
    			{this.state.IsLogin ? this.renderLoginMyJourney() : this.renderNotLoginMyJourney()}
    		</div>
    	)
    },

    renderNotLoginMyJourney: function() {
        return (
          <div>
              <h2>Bạn cần đăng nhập <Link to="/login">Log In now</Link></h2>
          </div>
        )
    },
    renderLoginMyJourney: function() {
        return (
          <div className="container">
            <div className="row">
              <div className="col-md-4 well">
                <AddJourney />
              </div>
              <div className="col-md-8 well">
                <ListJourneys />
              </div>
            </div>
          </div>
        );
    },
    _onChange: function() {
      console.log('onChange');
        this.setState({IsLogin: UserStore.getIsLogin()});
    }
});

module.exports = withRouter(MyJourney);
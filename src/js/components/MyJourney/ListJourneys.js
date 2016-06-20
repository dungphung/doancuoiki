var React = require('react');
var UserAction = require('../../actions/UserAction');
var ReactRouter = require('react-router');
var withRouter = ReactRouter.withRouter;
var Link = ReactRouter.Link;
var UserStore = require('../../stores/UserStore');

var ListJourneys = React.createClass({
	render: function () {
		return (
			<div>
				<h5>MY JOURNEYS</h5>
				<hr />
			</div>
		);
	}
});

module.exports = ListJourneys;
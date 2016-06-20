var React = require('react');
var UserAction = require('../../actions/UserAction');
var ReactRouter = require('react-router');
var withRouter = ReactRouter.withRouter;
var Link = ReactRouter.Link;
var UserStore = require('../../stores/UserStore');

var AddJourney = React.createClass({
	render: function () {
		return (
			<div>
				<h5>ADD A NEW JOURNEY</h5>
				<label for="Title">Title:</label>
				<input type="text" className="form-control" id="Title" placeholder="Title"/>
				<br />
				<label for="Description">Description:</label>
				<textarea className="form-control" rows="3" id="Description" placeholder="Write some description..."></textarea>
				<br />
				<label for="Image">Image:</label>
				<input type="file" id="Image"/>
				<br />
				<button type="button" className="btn btn-primary">ADD</button>
			</div>
		);
	}
});

module.exports = AddJourney;
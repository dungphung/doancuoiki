var React = require('react');
var AppStore = require('../stores/AppStore');

var ReactRouter = require('react-router');

var Link = ReactRouter.Link;
function getTopicState() {
    return {
        Topics: AppStore.getTopics()
    }
}
var TopicList = React.createClass({
    getInitialState: function() {
        return getTopicState();
    },
    componentWillMount : function() {
        AppStore.addChangeListener(this._onChange)
    },
    render: function() {
        return (
            <div className="list-group container">
                <h3>Topics List</h3>
                <ul>{this.renderTopics()}</ul>
            </div>
        )
    },
    _onChange: function() {
      this.setState(getTopicState());
    },
    renderTopics: function() {
        return this.state.Topics.map(function(topic){
                return <Link to={"topics/" + topic.id} className="list-group-item" key={topic.id}>
                  <h4>{topic.name}</h4>
                  <p>{topic.description}</p>
                </Link>
        })
    }

});


module.exports = TopicList;

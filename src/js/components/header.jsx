var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var AppStore = require('../stores/AppStore');


var Header = React.createClass ({
    getInitialState: function() {
        return {
          topics: []
        }
    },
    componentWillMount: function() {
        AppStore.addChangeListener(this._onChange);
    },
    render: function() {
        return (
              <nav className="navbar navbar-default header">
                  <div className="container-fluid">
                      <Link to={"/"} className="navbar-brand">Imgur Browser</Link>
                      <ul className="nav navbar-nav navbar-right">
                          {this.renderTopics()}
                      </ul>
                  </div>
              </nav>
        );
    },
    renderTopics: function() {
        return this.state.topics.slice(0, 4).map(function(topic){
            return <li key={topic.id}>
                <Link activeClassName="active" to={"topics/" + topic.id}>
                    {topic.name}
                </Link>
            </li>
        })
    },
    _onChange: function() {
      this.setState({
          topics: AppStore.getTopics()
      })
    }


});
 module.exports = Header;

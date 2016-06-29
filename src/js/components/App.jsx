var React = require('react');
var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var Header = require('./header');
var TopicList = require('./TopicList');


var App = React.createClass({

    render: function(){
        return (
            <div>
                <Header />
                {this.content()}
            </div>
        );
    },
    content: function() {
      if(this.props.children)
        return this.props.children
      else {
          return <TopicList />
      }
    }
});

module.exports = App;

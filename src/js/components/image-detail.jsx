var React = require('react');
var AppActions = require('../actions/AppActions');
var ImageStore = require('../stores/image-store');
var CommentStore = require('../stores/comment-store')
var CommentBox = require('./CommentBox');
var image_detail = React.createClass({
    getInitialState: function() {
        return {
            image: null,
            comments: null
        }
    },
    componentWillMount : function() {
        ImageStore.addChangeListener(this._onChange);
        CommentStore.addChangeListener(this._onChange);
    },
    componentDidMount : function() {
        AppActions.getImage(this.props.params.id);
        AppActions.getComment(this.props.params.id);
    },
    componentWillUnmount: function() {
      ImageStore.removeChangeListener(this._onChange);
      CommentStore.removeChangeListener(this._onChange);
    },
    render: function() {
        console.log(this.state.image)
        return (
            <div className="ImageDetail">
              {this.state.image ? this.renderConTent() : null}
          </div>
        )
    },
    renderConTent: function() {
      return (
        <div className="container">
            <div className="panel panel-default">
                <div className="panel-heading">
                      <h4>{this.state.image.title}</h4>
                </div>
                <div className="panel-body">
                    {this.renderImage()}
                </div>
                <div className="panel-footer">
                    <h5>{this.state.image.description}</h5>
                </div>
                <h3>Comments</h3>
                {this.renderComments()}
            </div>
          </div>
        )
    },
    renderImage: function() {
        if(this.state.image.animated) {
            return (
                <video preload="auto" autoPlay="autoPlay" loop="loop" webkit-playsinline>
                      <source src={this.state.image.mp4} type="video/mp4"></source>
                </video>
            )
        }else {
            return <img src={this.state.image.link} />
        }
    },
    renderComments: function() {
        if(!this.state.comments) {
          return null
        }
        return  <CommentBox comments={this.state.comments} />
    },
    _onChange: function() {
        this.setState({
            image: ImageStore.getImages(),
            comments: CommentStore.getComments()
        })
    }
});

module.exports = image_detail;

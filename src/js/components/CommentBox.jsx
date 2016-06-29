var React = require('react');


var CommentBox = React.createClass({
    render: function() {
      return (
          <ul className="list-group">
              {this.renderComment()}
          </ul>
      )
    },
    renderComment: function() {
      return this.props.comments.slice(0, 20).map(function(comment){
          return (
              <li className="list-group-item comment-box" key={comment.id}>
                  <span className="badge">{comment.ups}</span>
                  <h5 ClassName="Comment-Author">{comment.author}</h5>
                  {comment.comment}
              </li>
          )
      })
    }

});

module.exports = CommentBox;

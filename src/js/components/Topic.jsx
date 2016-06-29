var React = require ('react');
var imagesAPI =  require('../utils/imagesAPI');
var AppActions = require('../actions/AppActions');
var image_store = require('../stores/image-store');
var ImagePreview = require('./ImagePreview')

var Topic = React.createClass({
    getInitialState: function() {
        return {
            images: []
        }
    },
    componentWillMount : function() {
      image_store.addChangeListener(this._onChange);
    },
    componentWillReceiveProps: function(nextProps){
      AppActions.getImages(this.props.params.id);
    },
    componentWillUnmount: function() {
      image_store.removeChangeListener(this._onChange);
    },
    componentDidMount : function() {
        AppActions.getImages(this.props.params.id);
    },
    render: function() {
      return ( <div className="topic">
              {this.renderImages()}
          </div>)
    },
    renderImages: function(){
        return this.state.images.slice(0, 20).map(function(image) {
            console.log("Image: ",image)
            return <ImagePreview key={image.id} {...image}/>
        })
    },
    _onChange: function() {
      this.setState({images: image_store.getImages()})
    }
});

module.exports = Topic;

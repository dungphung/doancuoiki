var React = require('react');
var NavItem = require('./NavItem');



var NavBar = React.createClass ({
    render: function() {

      var navStyle = {
        WebkitBoxShadow: "0 0 4px rgba(0,0,0,0.4)",
        MozBoxShadow: "0 0 4px rgba(0,0,0,0.4)",
        boxShadow: "0 0 4px rgba(0,0,0,0.4)",
        boderRadius: 0
      }


      return (
          <div>
              <nav style={navStyle} className="navbar navbar-default">
                  <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-collapse">
                              <span className="icon-bar"></span>
                              <span className="icon-bar"></span>
                              <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">ADVENTURE</a>
                  </div>
                  <div className="collapse navbar-collapse" id="nav-collapse">
                      {<NavItem />}
                  </div>
              </nav>
              <div>
                  {this.props.children}
              </div>
          </div>
      )
    }
})

module.exports = NavBar;

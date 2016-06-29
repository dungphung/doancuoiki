

var Routes = require('./routes');
var React = require('react');
var ReacDOM = require('react-dom');
var AppAPI = require('./js/utils/AppAPI');
AppAPI.get('topics/defaults');
//var  = require('./js/components/App');
ReacDOM.render(
      Routes,
      document.getElementById('app')
);

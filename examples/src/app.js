var React = require('react'),
	Bracket = require('react-bracket');

var Basic = require('./samples/basic.jsx');
var LateEntry = require('./samples/lateentry.jsx');
var CustomData = require('./samples/customdata.jsx');

React.render(
  <div>
		<h2>Basic</h2>
		<Basic />
		<h2>Late Entry</h2>
		<LateEntry />
		<h2>Custom Data</h2>
		<CustomData />
  </div>,
	document.getElementById('example')
);

var React = require('react'),
	Bracket = require('react-bracket');

var data = [
  [
    [0, 1],
    null,
    [2, 3],
    null,
    null,
    null,
    null,
    null,
  ],
  [
    [null, 4],
    [3, 5],
    null,
    null,
  ],
  [
    [null, 5],
    null,
  ],
  [
    [],
  ],
  [

  ]
];

var participants = (function(){
    var participants = [];
    var i;
    for(i = 0; i<6; i++){
			participants.push('Participant '+i);
    }
    return participants;
  })();

module.exports = React.createClass({
  render: function(){
    return (
			<div>
				<Bracket data={data} participants={participants} />
	    </div>
		);
  }
});

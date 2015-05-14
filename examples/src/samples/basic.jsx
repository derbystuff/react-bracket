var React = require('react'),
	Bracket = require('react-bracket');

var data = [
  [
    [0, 1],
    [2, 3],
  ],
  [
    [0, 3]
  ],
  [
    [3],
  ],
];

var participants = (function(){
    var participants = [];
    var i;
    for(i = 0; i<4; i++){
			participants.push('Participant '+i);
    }
    return participants;
  })();

module.exports = React.createClass({
  render: function(){
    return <Bracket data={data} participants={participants} />
  }
});

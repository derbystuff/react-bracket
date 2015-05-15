var React = require('react'),
	Bracket = require('react-bracket');

var layout = [
  [
    1,
    2,
  ],
  [
    3
  ],
  [
    4
  ],
];

var data = {
	1: {
		top: 0,
		bottom: 1
	},
	2: {
		top: 2,
		bottom: 3
	},
	3: {
		top: 1,
		bottom: 2
	},
	4: {
		winner: 1
	}
};

var participants = (function(){
  var participants = [];
  var i;
  for(i = 0; i<4; i++){
		participants.push('Participant '+i);
  }
  return participants;
})();

var getParticipant = function(options){
	var index = options.data[options.info][options.placement];
	var participant = participants[index];
	return participant?<span>{participant}</span>:<span>&nbsp;</span>;
};

module.exports = React.createClass({
  render: function(){
    return <Bracket layout={layout} data={data} participants={participants} getParticipant={getParticipant} />
  }
});

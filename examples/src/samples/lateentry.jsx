var React = require('react'),
	Bracket = require('react-bracket');

var layout = [
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

var getParticipant = function(options){
	var participant = participants[(options.info||[])[options.index]];
	return participant?<span>{participant}</span>:<span>&nbsp;</span>;
};

module.exports = React.createClass({
  render: function(){
    return (
			<div>
				<Bracket layout={layout} participants={participants} getParticipant={getParticipant}/>
	    </div>
		);
  }
});

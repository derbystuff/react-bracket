React-Bracket
---

React-Bracket is a bracket chart component for React.  Its modeled after a
mixture of http://codepen.io/aronduby/pen/qliuj and http://www.aropupu.fi/bracket/
as well as my own design choices.

Status: Pudding
===

This is still very much a thought process in the works.  Very little has been
solidified, but still you can consider it usable.  Just know that there will
more than likely be changes in the API.

Usage
===

```
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

React.render(
  <Bracket layout={layout} data={data} participants={participants} getParticipant={getParticipant} />,
	document.body
);
```

![Image of Output](https://raw.githubusercontent.com/derbystuff/react-bracket/master/images/basic.png)

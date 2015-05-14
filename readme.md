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
var Bracket = require('react-bracket');

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
    [null, 5],
    [3, 6],
    null,
    null,
  ],
  [
    [null, 6],
    null,
  ],
  [
    [],
  ],
  [
    []
  ]
];

var racers = (function(){
    var racers = [];
    var i;
    for(i = 0; i<10; i++){
      racers.push('Racer '+i);
    }
    return racers;
  })();

<Bracket data={data} participants={racers} title="Test Bracket" />
```

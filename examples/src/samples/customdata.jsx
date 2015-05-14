var React = require('react'),
	Bracket = require('react-bracket');

var data = [
  [
    [{car: 101, phase1: 0.25}, {car: 102, phase2: 0.25}],
    [{car: 103}, {car: 104, phase1: 0.002, phase2: 0.12}],
  ],
  [
    [{car: 102, phase1: 0.25}, {car: 104, phase2: 0.35}]
  ],
  [
    [{car: 104}]
  ]
];

var racers = (function(){
    var participants = [];
    var i;
    for(i = 0; i<4; i++){
			participants.push({
          driver: 'Participant '+i,
          number: 101+i
        });
    }
    return participants;
  })();

var Participant = React.createClass({
  render: function(){
    var info = this.props.info;
    return (
      <span>
        {info.driver} ({info.number}) <span className="right"><input type="text" className="phase-time" defaultValue={info.phase1||''} /><input type="text" className="phase-time"  defaultValue={info.phase2||''} /></span>
      </span>
    );
  }
});

var ParticipantPicker = React.createClass({
  render: function(){
    var options = this.props.participants.map(function(info, index){
      return <option key={index} value={index}>{info.driver+' ('+info.number+')'}</option>;
    });
    return (
      <select>{options}</select>
    );
  }
});

var isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

module.exports = React.createClass({
  getRacerInfo: function(options){
    var carNumber = (options.id||{}).car, participants = options.participants;
    var cars = participants.filter(function(entry){
      return entry.number === carNumber;
    });
    var car = cars.shift();
    if(!car){
      return {
        display: <ParticipantPicker participants={participants} />
      };
    }
    if(options.overallWinner){
      return {
        display: car.driver+' ('+car.number+')'
      };
    }
    car.phase1 = options.id.phase1 || '';
    car.phase2 = options.id.phase2 || '';
    return {
      display: <Participant info={car} />
    };
  },
  render: function(){
    return (
      <Bracket data={data} participants={racers} competitorInfo={this.getRacerInfo} />
    )
  }
});

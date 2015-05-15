var React = require('react'),
	Bracket = require('react-bracket');

var layout = [
  [
    0,
    1,
  ],
  [
    2
  ],
  [
    3
  ]
];

var data = [
	{
		top: {
			car: 101,
			phase1: 0.125
		},
		bottom: {
			car: 102,
			phase2: 0.225
		}
	},
	null,
	{
		top: {
			car: 102
		}
	},
	null
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

var defaults = function(){
	var res = {};
	Array.prototype.slice.call(arguments).forEach(function(item){
		res = Object.keys(item).reduce(function(p, key){
			p[key] = item[key];
			return p;
		}, res);
	});
	return res;
};

module.exports = React.createClass({
  getRacerInfo: function(options){
		var phase = options.data[options.info];
		var participants = options.participants;
		if(!phase){
      if(options.level===0){
				return <ParticipantPicker participants={participants} />;
			}
			return <span>&nbsp;</span>;
    }
		var driverInfo = phase[options.placement];
		if(!driverInfo){
			return <span>&nbsp;</span>;
		}
		var carNumber = driverInfo.car;
    var cars = participants.filter(function(entry){
      return entry.number === carNumber;
    });
    var car = cars.shift();
    if(!car){
      return <ParticipantPicker participants={participants} />;
    }
    if(options.isFinal){
      return {
        display: car.driver+' ('+car.number+')'
      };
    }
    var details = defaults(car, {
			phase1: driverInfo.phase1||'',
			phase2: driverInfo.phase2||''
		});
    return <Participant info={details} />;
  },
  render: function(){
    return (
      <Bracket className="bigger" layout={layout} data={data} participants={racers} getParticipant={this.getRacerInfo} />
    )
  }
});

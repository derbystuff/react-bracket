var React = require('react');
var classNames = require('classnames');

var classList = function(component, defaults){
  var result = defaults;
  var keys = (component.props.className||'').split(/[ \t]+/g);
  keys.forEach(function(key){
    result[key]=true;
  });
  return classNames(result);
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

var Bracket = React.createClass({
	getParticipant: function(info){
		if(this.props.getParticipant){
			var control = this.props.getParticipant(defaults(info, {participants: this.props.participants, data: this.props.data}));
      return <span className="participant" key={info.key}>{control}</span>;
		}
		return <span className="participant">getParticipant property not defined</span>;
	},
	getRound: function(options){
		var {
					key,
					heats,
          level,
					isFinal
				} = options;
		if(isFinal){
			return (
				<div className="round" key={key}>
					{this.getFinal({key, level, winner: heats[0]})}
				</div>
			);
		}
		var heats = heats.map(function(info, key){
			if(info===null){
				return [
					this.getHeatPlaceholder({
						key,
            level
					}),
					<div className="spacer" key={key+"-spacer"}></div>
				];
			}
			return [
				this.getHeat({
					info,
          level,
					key
				}),
				<div className="spacer" key={key+"-spacer"}></div>
			];
		}.bind(this));
		return (
			<div className="round" key={key}>
				<div className="spacer"></div>
				{heats}
			</div>
		);
	},
	getHeatPlaceholder: function(options){
		var {key} = options;
		return (
			<div className="heat" key={key}>
				<div className="placeholder-top">&nbsp;</div>
				<div className="placeholder-filler"></div>
				<div className="placeholder-bottom">&nbsp;</div>
			</div>
		);
	},
	getHeat: function(options){
		var {
			    info,
					key,
          level
				} = options;
		return (
			<div className="heat" key={key}>
				<div className="participant-top">{this.getParticipant({level, info, index: 0, placement: 'top'})}</div>
				<div className="filler"></div>
				<div className="participant-bottom">{this.getParticipant({level, info, index: 1, placement: 'bottom'})}</div>
			</div>
		);
	},
	getFinal: function(options){
		var {
          winner,
          key
        } = options;
    return (
			<div className="heat">
				<div className="participant-filler"></div>
				<div className="participant-center">{this.getParticipant({level: key, info: winner, index: 0, placement: 'winner', isFinal: true})}</div>
				<div className="participant-filler"></div>
			</div>
		);
	},
	render: function(){
		var layout = this.props.layout || [];
		var lastHeat = layout.length-1;
		var rounds = layout.map(function(heats, key){
			return this.getRound({heats, key, level: key, isFinal: key===lastHeat});
		}.bind(this));
    var classNames = classList(this, {
      'bracket': true
    });
		return (
			<div className={classNames}>
				<div className="rounds">
					{rounds}
				</div>
			</div>
		)
	}
});

module.exports = Bracket;

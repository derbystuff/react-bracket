var React = require('react');

var isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var getHeat = function(index, level, competitors, participants, competitorInfo){
  var top = competitorInfo({
    competitors: competitors,
    id: competitors[0],
    participants: participants
  });
  var bottom = competitorInfo({
    competitors: competitors,
    id: competitors[1],
    participants: participants
  });
  return [
    <li className={"game game-top "+(top.className||'')} key={level+'-'+index+'-1'}>{top.display}</li>,
    <li className="game game-spacer" key={level+'-'+index+'-2'}>&nbsp;</li>,
    <li className={"game game-bottom "+(top.className||'')} key={level+'-'+index+'-3'}>{bottom.display}</li>,
    <li className="spacer" key={level+'-'+index+'-4'}>&nbsp;</li>
  ];
};

var emptyHeat = function(index, level){
  return [
    <li className="game game-top-filler" key={level+'-'+index+'-1'}>&nbsp;</li>,
    <li className="game game-blank" key={level+'-'+index+'-2'}>&nbsp;</li>,
    <li className="game game-bottom-filler" key={level+'-'+index+'-3'}>&nbsp;</li>,
    <li className="spacer" key={level+'-'+index+'-4'}>&nbsp;</li>
  ];
};

var HeatGroup = React.createClass({
  render: function(){
    var level = this.props.level;
    var participants = this.props.participants;
    var heats = this.props.competitors.map(function(item, index){
      return Array.isArray(item)?
        getHeat(index, level, item, participants, this.props.competitorInfo):
        emptyHeat(index, level);
    }.bind(this));
    return (
      <ul className={'round round-'+level}>
        <li className="spacer">&nbsp;</li>
        {heats}
      </ul>
    );
  }
});

var Final = React.createClass({
  render: function(){
    var winner = this.props.competitorInfo({
      id: this.props.winner,
      participants: this.props.participants,
      overallWinner: true
    });
    return (
      <ul className='round round-final'>
        <li className="spacer">&nbsp;</li>
        <li className="game game-top winner">{winner.display||''}</li>
        <li className="spacer">&nbsp;</li>
      </ul>
    );
  }
});

var Bracket = React.createClass({
  render: function(){
    var data = this.props.data;
    var participants = this.props.participants;
    var competitorInfo = this.props.competitorInfo || function(options){
      var id = options.id, participants = options.participants;
      if(isNumeric(id)){
        var competitor = participants[id]+' ('+id+')';
        return {
          display: competitor
        };
      }
      return {
        display: <span>&nbsp;</span>
      };
    };
    var wIndex = data.length-1;
    var heatsListing = data.map(function(competitors, level){
      return level!==wIndex?
        <HeatGroup competitors={competitors} level={level} participants={participants} key={level} competitorInfo={competitorInfo} />:
        <Final key={level} winner={(competitors[0]||[])[0]} participants={participants} competitorInfo={competitorInfo} />
    });
    return (
      <div className="bracket">
        {heatsListing}
      </div>
    );
  }
});

module.exports = Bracket;

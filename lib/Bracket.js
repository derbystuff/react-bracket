'use strict';

var React = require('react');

var isNumeric = function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var getHeat = function getHeat(index, level, competitors, participants, competitorInfo) {
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
  return [React.createElement(
    'li',
    { className: 'game game-top ' + (top.className || ''), key: level + '-' + index + '-1' },
    top.display
  ), React.createElement(
    'li',
    { className: 'game game-spacer', key: level + '-' + index + '-2' },
    ' '
  ), React.createElement(
    'li',
    { className: 'game game-bottom ' + (top.className || ''), key: level + '-' + index + '-3' },
    bottom.display
  ), React.createElement(
    'li',
    { className: 'spacer', key: level + '-' + index + '-4' },
    ' '
  )];
};

var emptyHeat = function emptyHeat(index, level) {
  return [React.createElement(
    'li',
    { className: 'game game-top-filler', key: level + '-' + index + '-1' },
    ' '
  ), React.createElement(
    'li',
    { className: 'game game-blank', key: level + '-' + index + '-2' },
    ' '
  ), React.createElement(
    'li',
    { className: 'game game-bottom-filler', key: level + '-' + index + '-3' },
    ' '
  ), React.createElement(
    'li',
    { className: 'spacer', key: level + '-' + index + '-4' },
    ' '
  )];
};

var HeatGroup = React.createClass({
  displayName: 'HeatGroup',

  render: function render() {
    var level = this.props.level;
    var participants = this.props.participants;
    var heats = this.props.competitors.map((function (item, index) {
      return Array.isArray(item) ? getHeat(index, level, item, participants, this.props.competitorInfo) : emptyHeat(index, level);
    }).bind(this));
    return React.createElement(
      'ul',
      { className: 'round round-' + level },
      React.createElement(
        'li',
        { className: 'spacer' },
        ' '
      ),
      heats
    );
  }
});

var Final = React.createClass({
  displayName: 'Final',

  render: function render() {
    var winner = this.props.competitorInfo({
      id: this.props.winner,
      participants: this.props.participants,
      overallWinner: true
    });
    return React.createElement(
      'ul',
      { className: 'round round-final' },
      React.createElement(
        'li',
        { className: 'spacer' },
        ' '
      ),
      React.createElement(
        'li',
        { className: 'game game-top winner' },
        winner.display || ''
      ),
      React.createElement(
        'li',
        { className: 'spacer' },
        ' '
      )
    );
  }
});

var Bracket = React.createClass({
  displayName: 'Bracket',

  render: function render() {
    var data = this.props.data;
    var participants = this.props.participants;
    var competitorInfo = this.props.competitorInfo || function (options) {
      var id = options.id,
          participants = options.participants;
      if (isNumeric(id)) {
        var competitor = participants[id] + ' (' + id + ')';
        return {
          display: competitor
        };
      }
      return {
        display: React.createElement(
          'span',
          null,
          ' '
        )
      };
    };
    var wIndex = data.length - 1;
    var heatsListing = data.map(function (competitors, level) {
      return level !== wIndex ? React.createElement(HeatGroup, { competitors: competitors, level: level, participants: participants, key: level, competitorInfo: competitorInfo }) : React.createElement(Final, { key: level, winner: (competitors[0] || [])[0], participants: participants, competitorInfo: competitorInfo });
    });
    return React.createElement(
      'div',
      { className: 'bracket' },
      heatsListing
    );
  }
});

module.exports = Bracket;
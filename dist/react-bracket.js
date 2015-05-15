(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Bracket = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window.React : typeof global !== "undefined" ? global.React : null);
var classNames = require('classnames');

var classList = function classList(component, defaults) {
	var result = defaults;
	var keys = (component.props.className || '').split(/[ \t]+/g);
	keys.forEach(function (key) {
		result[key] = true;
	});
	return classNames(result);
};

var defaults = function defaults() {
	var res = {};
	Array.prototype.slice.call(arguments).forEach(function (item) {
		res = Object.keys(item).reduce(function (p, key) {
			p[key] = item[key];
			return p;
		}, res);
	});
	return res;
};

var Bracket = React.createClass({
	displayName: 'Bracket',

	getParticipant: function getParticipant(info) {
		if (this.props.getParticipant) {
			var control = this.props.getParticipant(defaults(info, { participants: this.props.participants, data: this.props.data }));
			return React.createElement(
				'span',
				{ className: 'participant', key: info.key },
				control
			);
		}
		return React.createElement(
			'span',
			{ className: 'participant' },
			'getParticipant property not defined'
		);
	},
	getRound: function getRound(options) {
		var key = options.key;
		var heats = options.heats;
		var level = options.level;
		var isFinal = options.isFinal;

		if (isFinal) {
			return React.createElement(
				'div',
				{ className: 'round', key: key },
				this.getFinal({ key: key, level: level, winner: heats[0] })
			);
		}
		var heats = heats.map((function (info, key) {
			if (info === null) {
				return [this.getHeatPlaceholder({
					key: key,
					level: level
				}), React.createElement('div', { className: 'spacer', key: key + '-spacer' })];
			}
			return [this.getHeat({
				info: info,
				level: level,
				key: key
			}), React.createElement('div', { className: 'spacer', key: key + '-spacer' })];
		}).bind(this));
		return React.createElement(
			'div',
			{ className: 'round', key: key },
			React.createElement('div', { className: 'spacer' }),
			heats
		);
	},
	getHeatPlaceholder: function getHeatPlaceholder(options) {
		var key = options.key;

		return React.createElement(
			'div',
			{ className: 'heat', key: key },
			React.createElement(
				'div',
				{ className: 'placeholder-top' },
				' '
			),
			React.createElement('div', { className: 'placeholder-filler' }),
			React.createElement(
				'div',
				{ className: 'placeholder-bottom' },
				' '
			)
		);
	},
	getHeat: function getHeat(options) {
		var info = options.info;
		var key = options.key;
		var level = options.level;

		return React.createElement(
			'div',
			{ className: 'heat', key: key },
			React.createElement(
				'div',
				{ className: 'participant-top' },
				this.getParticipant({ level: level, info: info, index: 0, placement: 'top' })
			),
			React.createElement('div', { className: 'filler' }),
			React.createElement(
				'div',
				{ className: 'participant-bottom' },
				this.getParticipant({ level: level, info: info, index: 1, placement: 'bottom' })
			)
		);
	},
	getFinal: function getFinal(options) {
		var winner = options.winner;
		var key = options.key;

		return React.createElement(
			'div',
			{ className: 'heat' },
			React.createElement('div', { className: 'participant-filler' }),
			React.createElement(
				'div',
				{ className: 'participant-center' },
				this.getParticipant({ level: key, info: winner, index: 0, placement: 'winner', isFinal: true })
			),
			React.createElement('div', { className: 'participant-filler' })
		);
	},
	render: function render() {
		var layout = this.props.layout || [];
		var lastHeat = layout.length - 1;
		var rounds = layout.map((function (heats, key) {
			return this.getRound({ heats: heats, key: key, level: key, isFinal: key === lastHeat });
		}).bind(this));
		var classNames = classList(this, {
			'bracket': true
		});
		return React.createElement(
			'div',
			{ className: classNames },
			React.createElement(
				'div',
				{ className: 'rounds' },
				rounds
			)
		);
	}
});

module.exports = Bracket;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"classnames":undefined}]},{},[1])(1)
});
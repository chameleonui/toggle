var $ = require('jquery');
var Emitter = require('emitter');
var inherit = require('inherit');

module.exports = Toggle;

var defaults = {
	classOff: 'is-hidden'
};

function Toggle(element, target, options) {
	this.options = options || {};
	for (var i in defaults) {
		if (!(this.options[i])) this.options[i] = defaults[i];
	}

	Emitter.call(this);
	var _this = this;
	this._$targets = [];
	this._states = [];
	
	if (target instanceof Array) {
		$.each(target, function(){
			_this._$targets.push($(this));
		});
	} else {
		_this._$targets.push($(target));
	}

	if (element instanceof Array) {
		$.each(element, function() {
			$(this).data('plugin-toggle', _this);
		});
	} else {
		$(element).data('plugin-toggle', _this);
	}

	$.each(this._$targets, function(){
		_this._states.push(_this._hasClassOff(this));
	});

}

// Inherit features from Emmiter 
inherit(Toggle, Emitter);

Toggle.prototype.open = function() {
	var _this = this;
	$.each(this._$targets, function(){
		_this._open(this);
	});
	return this;
};

Toggle.prototype._open = function(target) {
	var _this = this;
	target.removeClass(_this.options.classOff);
	this.emit('open');
	return this;
};

Toggle.prototype.close = function() {
	var _this = this;
	$.each(this._$targets, function(){
		_this._close(this);
	});
	return this;
};

Toggle.prototype._close = function(target) {
	var _this = this;
	target.addClass(_this.options.classOff);
	this.emit('close');
	return this;
};

Toggle.prototype.toggle = function() {
	var _this = this;
	$.each(this._$targets, function(){
		_this._hasClassOff(this) ? _this._open(this) : _this._close(this);
	});
	this.emit('toggle');
	return this;
};

Toggle.prototype.reset = function() {
	var _this = this;
	$.each(this._$targets, function(index, target){
		if (_this._states[index]) {
			_this._close(target);
		} else {
			_this._open(target);
		}
	});

};

Toggle.prototype._hasClassOff = function(target) {
	return target.hasClass(this.options.classOff);
};
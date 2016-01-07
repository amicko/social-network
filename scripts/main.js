var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var $ = require('jquery');

Parse.initialize("nioeBPmBY0PpjU6RagvScJ264gcRkC4Xbz43A4EP", "0OQW1Gf06iEyq9OzxBw8iLcC0Gjv3JkM61rtoiap");

var nav = document.getElementById('nav');
var main = document.getElementById('main');

var NavComponent = require('./components/NavComponent.js');
var HomeComponent = require('./components/HomeComponent.js');
var RegisterComponent = require('./components/RegisterComponent.js');

var Router = Backbone.Router.extend({
	routes: {
		'' : 'home',
		'register' : 'register'
	},
	home: function() {
		ReactDOM.render(<NavComponent router={this}/>, nav)
		ReactDOM.render(<HomeComponent router={this}/>, main)
	},
	register: function() {
		ReactDOM.render(<NavComponent router={this}/>, nav)
		ReactDOM.render(<RegisterComponent router={this}/>, main)
	}
});

var r = new Router();
Backbone.history.start();
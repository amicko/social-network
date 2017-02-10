var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var Parse = require('parse');
var $ = require('jquery');

// Parse.initialize("nioeBPmBY0PpjU6RagvScJ264gcRkC4Xbz43A4EP", "0OQW1Gf06iEyq9OzxBw8iLcC0Gjv3JkM61rtoiap");
Parse.initialize('nioeBPmBY0PpjU6RagvScJ264gcRkC4Xbz43A4EP','unused');
Parse.serverURL = 'https://lions-den.herokuapp.com/parse';

var nav = document.getElementById('nav');
var main = document.getElementById('main');

var NavComponent = require('./components/NavComponent.js');
var HomeComponent = require('./components/HomeComponent.js');
var RegisterComponent = require('./components/RegisterComponent.js');
var LoginComponent = require('./components/LoginComponent.js');
var ProfileComponent = require('./components/ProfileComponent.js');
var UserSettingsComponent = require('./components/UserSettingsComponent.js');
var MessageCenterComponent = require('./components/MessageCenterComponent.js');

var Router = Backbone.Router.extend({
	routes: {
		'' : 'home',
		'register' : 'register',
		'login' : 'login',
		'profile/:userId' : 'profile',
		'user-settings/:userId' : 'userSettings',
		'message-center/:userId' : 'messageCenter'
	},
	home: function() {
		ReactDOM.render(<NavComponent router={this}/>, nav)
		ReactDOM.render(<HomeComponent router={this}/>, main)
	},
	register: function() {
		ReactDOM.render(<NavComponent router={this}/>, nav)
		ReactDOM.render(<RegisterComponent router={this}/>, main)
	},
	login: function() {
		ReactDOM.render(<NavComponent router={this}/>, nav)
		ReactDOM.render(<LoginComponent router={this}/>, main)
	},
	profile: function(userId) {
		ReactDOM.render(<NavComponent router={this}/>, nav)
		ReactDOM.render(<ProfileComponent router={this} profile={userId} user={Parse.User.current()}/>, main)
	},
	userSettings: function(userId) {
		ReactDOM.render(<NavComponent router={this}/>, nav)
		ReactDOM.render(<UserSettingsComponent router={this} profile={userId}/>, main)
	},
	messageCenter: function(userId) {
		ReactDOM.render(<NavComponent router={this}/>, nav)
		ReactDOM.render(<MessageCenterComponent router={this} profile={userId}/>, main)
	}
});

var r = new Router();
Backbone.history.start();

//New Parse/Heroku Code Examples
// var obj = new Parse.Object('GameScore');
// obj.set('score',1337);
// obj.save().then(function(obj) {
//   console.log(obj.toJSON());
//   var query = new Parse.Query('GameScore');
//   query.get(obj.id).then(function(objAgain) {
//     console.log(objAgain.toJSON());
//   }, function(err) {console.log(err); });
// }, function(err) { console.log(err); });

function getRandom(min, max) {
	return Math.random() * (max - min) + min;
}

function getRandomSeries() {
	var number = Math.round(getRandom(1, 3));
	if(number == 1) {
		return 'The Next Generation'
	}
	else if(number == 2) {
		return 'Deep Space Nine'
	}
	else if(number == 3) {
		return 'Voyager'
	}
}

var getRandomSeason = getRandom(1, 7);
var getRandomEpisode = getRandom(1, 26);

console.log('Series: ' + getRandomSeries() +' Season ' + Math.round(getRandomSeason) + ' Episode ' + Math.round(getRandomEpisode))
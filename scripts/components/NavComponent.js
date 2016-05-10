var React = require('react');

module.exports = React.createClass({
		

	render: function() {
		if(!(Parse.User.current())) {
			return (
			<div className="navBar">
				<img src="../images/stock-vector-lion-head-icon-94999156.jpg" />
				<span id="title"><a href="#">The Lion's Den</a></span>
				<ul id="navBarListRight">
					<li><a href="#register">Register</a></li>
					<li><a href="#login">Login</a></li>
				</ul>
			</div>
		)}
		else {
			return (
			<div className="navBar">
				<img src="http://www.mma-hk.cz/image/data/mma-logo-lev.png" />
				<span id="title"><a href="#">The Lion's Den</a></span>
				<ul id="navBarListRight">
					<li><a href={'#profile/' + Parse.User.current().get('userLegalName').toLowerCase().split(' ').join('.')} onClick={this.onProfileClick}>Profile</a></li>
					<li><a href={'#message-center/' + Parse.User.current().id}>Messages</a></li>
					<li><a href={'#user-settings/' + Parse.User.current().id}>Settings</a></li>
					<li><a href="#" onClick={this.onLogout}>Logout</a></li>
				</ul>
			</div>
		)}
	},
	onLogout: function() {
		Parse.User.logOut()
	},
	onProfileClick: function() {
		document.location.reload(true);
	},
})
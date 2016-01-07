var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
			<div className="navBar">
				<img src="http://www.mma-hk.cz/image/data/mma-logo-lev.png" />
				<span id="title"><a href="#">The Lion's Den</a></span>
				<ul id="navBarListRight">
					<li><a href="#register">Register</a></li>
					<li><a href="#">Login</a></li>
				</ul>
			</div>
		)
	}
})
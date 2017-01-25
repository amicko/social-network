var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		return { 
			error: null 
		};
	},
	render: function() {
		var errorElement = null;
		if(this.state.error) {
			errorElement = (
				<div id="loginErrorMessage">{this.state.error}</div>
			);
		}
		return (
			<div className="login">
				<div id="welcomeBox">
					<h2>Welcome back to the Lion's Den!</h2>
					<p>To rejoin the pride, simply fill out the following questions.</p>
				</div>
				<hr />
				<form id="loginForm" onSubmit={this.onLogin}>
					<label className="loginLabel">Your Email</label>
					<input className="loginInput" id="loginEmail" ref="email" type="email"/>
					<label className="loginLabel">Your Password</label>
					<input className="loginInput" id="loginPassword1" ref="password" type="password"/>
					{errorElement}
					<button id="loginBtn">Login</button>
				</form>
			</div>
		)
	},
	onLogin: function(e) {
		e.preventDefault();
		var that = this;
		if(this.refs.email.value == false) {
			this.setState({
				error: 'You must enter an Email'
			});
		}
		else if(this.refs.password.value == false) {
			this.setState({
				error: 'You must enter a Password'
			});
		}
		else {
			this.setState({
				error: null
			});
			var user = new Parse.User();
			Parse.User.logIn(
				this.refs.email.value, 
				this.refs.password.value, {
				  success: function(user) {
				    console.log(Parse.User.current().id)
				    that.props.router.navigate('profile/' + Parse.User.current().get('userLegalName').toLowerCase().split(' ').join('.'), {trigger: true});
				  },
				  error: function(user, error) {
				    this.setState({
						error: error.message
					});
				  }
			});
		}
	}
})
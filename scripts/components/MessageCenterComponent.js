var React = require('react');
var Parse = require('parse');

module.exports = React.createClass({
	getInitialState: function() {
		return { 
			friendRequests: []
		};
	},
	componentWillMount: function() {
		var MessageModel = Parse.Object.extend('MessageModel');
		var MessageQuery = new Parse.Query(MessageModel);
		var ProfileOwner = this.props.profile.split('.').join(' ');

		MessageQuery.equalTo('messageType', 'friendRequest')
		.equalTo('receiver', Parse.User.current().get('userLegalName'))
		.equalTo('accepted', false)
		.find().then((requests) => {
			this.setState({
				friendRequests: requests
			})
			// console.log(requests)
		})
	},
	render: function() {
		var friendRequests = this.state.friendRequests.map((request, index) => {
			return (
				<div className="friendRequestBox" key={index}>
					<div className="friendRequestSender">{request.get('sender').split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}
					</div>
					<button onClick={this.onFriendRequestAccept.bind(this, request)} key={index}>Accept</button>
					<button>Decline</button>
				</div>
			)
		})
		return (
			<div className="messageCenter">
				Message Center
				{friendRequests}
			</div>
		)
	},
	onFriendRequestAccept: function(request) {
		// console.log(request.get('sender'));
		var UserModel = Parse.Object.extend('_User');
		var UserQuery = new Parse.Query(UserModel);

		request.set('accepted', true);
		request.set('pending', false)
		request.save(null, {
			success: function() {
				console.log('New Friend Added to Sender On Server')
			}
		});

		UserQuery.equalTo('userLegalName', request.get('sender'))
		.find().then((sender) => {
			var newFriends = sender[0].get('friends').concat(request.get('receiver'))
			sender[0].set('friends', newFriends)
			sender[0].save(null, {
				success: function() {
					console.log('New Friend Added to Sender On Server')
				}
			});
			Parse.User.current().set('friends', Parse.User.current().get('friends').concat(request.get('sender')))
			Parse.User.current().save(null, {
				success: function(CharacterModel) {
					console.log('New Friend Added to Receiver On Server')
				}
			});
			// console.log(sender[0].get('friends').concat(request.get('receiver')));
			// console.log(Parse.User.current().get('friends').concat(request.get('sender')));
		})
	}
})
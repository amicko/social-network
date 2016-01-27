var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		return { 
			user: [],
			friends: [],
			posts: [],
			newPost: 'newPostHide',
			newPostText: 'newPostTextHide',
			newPostImageUpload: 'newPostImageUploadHide',
			newPostImageURL: 'newPostImageURLHide',
			isFriend: false
		};
	},
	componentWillMount: function() {
		var UserModel = Parse.Object.extend('_User');
		var PostsModel = Parse.Object.extend('PostsClass');
		var UserQuery = new Parse.Query(UserModel);
		var PostsQuery = new Parse.Query(PostsModel);
		var ProfileOwner = this.props.profile.split('.').join(' ');
		var UserName = this.props.profile.split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
		var that = this;

		UserQuery.equalTo('userLegalName', ProfileOwner)
		.find().then((user) => {
			user[0].get('friends').map((friend) => {
				UserQuery.equalTo('userLegalName', friend)
				.find().then((eachFriend) => {
					this.setState({
						user: user,
						friends: that.state.friends.concat(eachFriend)
					})
				})
			})
		})

		PostsQuery.equalTo('postUserName', ProfileOwner)
		.descending('createdAt').find().then((posts) => {
			this.setState({
				posts: posts
			})
		})
		var userFriends = Parse.User.current().get('friends').map((friend) => {
			if(friend === ProfileOwner) {
				this.setState({
					isFriend: true
				})
			}
		})

	},
	render: function() {
		// console.log(this.state.friends);
		var UserPosts = this.state.posts.map((post, index) => {
			if(post.get('postType') == 'text') {
				return (
					<div className="post" key={index}>
						<img className="postThumb" src={post.get('postUserImage')}/>
						<h3 className="postPoster">{post.get('postUserName').split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}</h3>
						<p className="postCaption">{post.get('textContent')}
						</p>
					</div>
				)
			}
			else if(post.get('postType') == 'imageURL') {
				return (
					<div className="post"  key={index}>
						<img className="postThumb" src={post.get('postUserImage')}/>
						<h3 className="postPoster">{post.get('postUserName').split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}</h3>
						<img className="postImage" src={post.get('imageURLContent')}/>
					</div>
				)
			}
		})
		var UserProfilePicture = this.state.user.map((user) => {
			return user.get('profilePicture')
		})
		var UserName = this.state.user.map((user) => {
			var newUserName = user.get('userLegalName').split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
			return newUserName
		})
		var UserAboutMe = this.state.user.map((user) => {
			return user.get('aboutMe')
		})
		var Friends = this.state.friends.map((friend, index) => {
			return <a href={'#profile/' +friend.get('userLegalName').split(' ').join('.')} key={index}><img className="friendPic" key={index} onClick={this.onFriendClick.bind(this, friend)} src={friend.get('profilePicture')}/></a>
		})

		var FriendCount = this.state.friends.length;

		var addPostButton = null

		if(Parse.User.current().get('userLegalName') !== this.props.profile.split('.').join(' ')) {
			addPostButton = null
		}
		else {
			addPostButton = <button className="newPostButton" onClick={this.onNewPost}>Add New Post</button>
		}

		var addFriendButton = null;
		if(!this.state.isFriend) {
			addFriendButton = <button id="addFriend" onClick={this.onAddFriend}>Add Friend</button>
		}
		else {
			addFriendButton = <button id="addFriend" disabled>Already Friends</button>
		}
		return (
			<div className="profile">
				<section id="header">
					<img className="profilePic" src={UserProfilePicture}/>
					<div id="userName">{UserName}</div>
				</section>
				{addFriendButton}
				<section id="leftProfile">
					<div id="aboutMe"><span className="aboutMeSpan">About me: </span><br/>{UserAboutMe}</div>
					<div id="friends"><span className="friendsSpan">Friends({FriendCount}): </span><br/>{Friends}</div>
				</section>
				<section id="rightProfile">
					{addPostButton}
					<div className={this.state.newPost}>
						<button id="newPostText" onClick={this.onNewPostText}>Text</button>
						<button id="imageURL" onClick={this.onNewPostImageURL}>Link an Image</button>
						<button onClick={this.onCancel}>Cancel</button>
					</div>
					<div className={this.state.newPostText}> 
						<textarea  ref="newPostTextArea" placeholder="Add text here!" className="newPostTextArea"></textarea>
						<button onClick={this.onSubmitNewPostText}>Add Post</button>
						<button onClick={this.onCancel}>Cancel</button>
					</div>
					<div className={this.state.newPostImageUpload}>
						<input type="file" id="imageUpload"/>
						<button id="fakeImageUpload" >Choose Image</button>
						<button className="underImageBtn" ref="ImageUploadValue" onClick={this.onSubmitNewPostImageUpload}>Add Image</button>
						<button className="underImageBtn" onClick={this.onCancel}>Cancel</button>
						<img  id="uploadExample" src="" />
					</div>
					<div className={this.state.newPostImageURL}>
						<input id="imageURL" ref="imageURL" type="text" placeholder="Add a URL here!" />
						<button className="underImageBtn" onClick={this.onSubmitImageURL}>Add Image</button>
						<button className="underImageBtn" onClick={this.onCancel}>Cancel</button>
					</div>
					{UserPosts}
				</section>
			</div>
		)
	},
	onAddFriend: function() {
		// console.log(Parse.User.current().get('userLegalName'));
		var ProfileOwner = this.props.profile.split('.').join(' ');
		var MessageModel = Parse.Object.extend('MessageModel');
		var AddFriend = new MessageModel({
			messageType: 'friendRequest',
			sender: Parse.User.current().get('userLegalName'),
			receiver: ProfileOwner,
			accepted: false,
			pending: true
		}).save(null, {
		  success: function(post) {
		    // Execute any logic that should take place after the object is saved.
		    console.log('Friend Request Sent')
		  },
		  error: function(post, error) {
		    // Execute any logic that should take place if the save fails.
		    // error is a Parse.Error with an error code and message.
		  }
		})
	},
	onFriendClick: function() {
		document.location.reload(true);
	},
	onNewPost: function() {
		this.setState({
			newPost: 'newPostShow',
			newPostText: 'newPostTextHide',
			newPostImageUpload: 'newPostImageUploadHide',
			newPostImageURL: 'newPostImageURLHide'
		})
	},
	onNewPostText: function() {
		this.setState({
			newPost: 'newPostHide',
			newPostText: 'newPostTextShow'
		})
		
	},
	onSubmitNewPostText: function() {
		var PostsModel = Parse.Object.extend('PostsClass');
		var PostsQuery = new Parse.Query(PostsModel);
		var ProfileOwner = this.props.profile.split('.').join(' ');
		var UserProfilePicture = this.state.user.map((user) => {
			return user.get('profilePicture')
		})
		var that = this
		var UserName = this.props.profile.split('.').join(' ');
		var PostsClass = Parse.Object.extend('PostsClass');
		var NewPost = new PostsClass({
			postType: 'text',
			textContent: this.refs.newPostTextArea.value,
			postUserImage: UserProfilePicture[0],
			postUserName: UserName,
			postUser: Parse.User.current()
		}).save(null, {
		  success: function(post) {
		    // Execute any logic that should take place after the object is saved.
		    that.setState({
				newPost: 'newPostHide',
				newPostText: 'newPostTextHide'
			})
			PostsQuery.equalTo('postUserName', ProfileOwner)
			.descending('createdAt').find().then((posts) => {
				that.setState({
					posts: posts
				})
			})
			that.refs.newPostTextArea.value = null
		  },
		  error: function(post, error) {
		    // Execute any logic that should take place if the save fails.
		    // error is a Parse.Error with an error code and message.
		  }
		})
	},
	onNewPostImageUpload: function() {
		this.setState({
			newPost: 'newPostHide',
			newPostImageUpload: 'newPostImageUploadShow'
		})
		
	},
	onSubmitNewPostImageUpload: function() {
		var UserProfilePicture = this.state.user.map((user) => {
			return user.get('profilePicture')
		})
		var UserName = this.state.user.map((user) => {
			var newUserName = user.get('userLegalName').split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
			return newUserName
		})
		// var PostsClass = Parse.Object.extend('PostsClass');
		// var NewPost = new PostsClass({
		// 	postType: 'imageFile',
		// 	imageFileContent: this.refs.ImageUploadValue.value,
		// 	postUserImage: UserProfilePicture[0],
		// 	postUserName: UserName[0]
		// }).save()
	},
	onNewPostImageURL: function() {
		this.setState({
			newPost: 'newPostHide',
			newPostImageURL: 'newPostImageURLShow'
		})
		
	},
	onSubmitImageURL: function() {
		var PostsModel = Parse.Object.extend('PostsClass');
		var PostsQuery = new Parse.Query(PostsModel);
		var ProfileOwner = this.props.profile.split('.').join(' ');
		var that = this
		var UserProfilePicture = this.state.user.map((user) => {
			return user.get('profilePicture')
		})
		var UserName = this.props.profile.split('.').join(' ');
		var PostsClass = Parse.Object.extend('PostsClass');
		var NewPost = new PostsClass({
			postType: 'imageURL',
			imageURLContent: this.refs.imageURL.value,
			postUserImage: UserProfilePicture[0],
			postUserName: UserName
		}).save(null, {
		  success: function(post) {
		    // Execute any logic that should take place after the object is saved.
		    that.setState({
				newPost: 'newPostHide',
				newPostImageURL: 'newPostImageURLHide'
			})
			PostsQuery.equalTo('postUserName', ProfileOwner)
			.descending('createdAt').find().then((posts) => {
				that.setState({
					posts: posts
				})
			})
			that.refs.imageURL.value = null
		  },
		  error: function(post, error) {
		    // Execute any logic that should take place if the save fails.
		    // error is a Parse.Error with an error code and message.
		  }
		})
	},
	onCancel: function() {
		this.setState({
			newPost: 'newPostHide',
			newPostText: 'newPostTextHide',
			newPostImageUpload: 'newPostImageUploadHide',
			newPostImageURL: 'newPostImageURLHide'
		})
	}
})
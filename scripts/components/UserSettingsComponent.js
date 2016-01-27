var React = require('react');

module.exports = React.createClass({
		

	render: function() {
		return (
			<div className="userSettings">
				<h2>User Settings</h2>
				<div id="userSettingsForm">
					<label className="userSettingsLabel">Email</label>
					<input ref="Email" id="settingEmail" type="email" placeholder={Parse.User.current().get('email')}/>
					<button className="userSettingsButton" onClick={this.onChangeEmail}>Change Email</button>
					<label className="userSettingsLabel">Profile Picture</label>
					<input ref="ProfilePic" id="settingProfilePic" type="text" placeholder={Parse.User.current().get('profilePicture')}/>
					<button className="userSettingsButton"  onClick={this.onChangeProfilePic}>Change Profile Picture</button>
					<label className="userSettingsLabel">About Me</label>
					<textarea ref="AboutMe" id="settingAboutMe" placeholder={Parse.User.current().get('aboutMe')}></textarea>
					<button className="userSettingsButton" onClick={this.onChangeAboutMe}>Change About Me</button>
				</div>
			</div>
		)
	},
	onChangeName: function() {
		console.log('Name Changed');
		Parse.User.current().set('userLegalName', this.refs.UserName.value.toLowerCase())
		Parse.User.current().save(null, {
			success: function(CharacterModel) {
				console.log('User Name Changed On Server')
			}
		});
	},
	onChangeEmail: function() {
		console.log('Email Changed');
		Parse.User.current().set('username', this.refs.Email.value)
		Parse.User.current().save(null, {
			success: function(CharacterModel) {
				console.log('User Name Changed On Server')
			}
		});
		Parse.User.current().set('email', this.refs.Email.value)
		Parse.User.current().save(null, {
			success: function(CharacterModel) {
				console.log('User Name Changed On Server')
			}
		});
	},
	onChangeProfilePic: function() {
		console.log('Profile Picture Changed');
		Parse.User.current().set('profilePicture', this.refs.ProfilePic.value)
		Parse.User.current().save(null, {
			success: function(CharacterModel) {
				console.log('Profile Picture Changed On Server')
			}
		});
	},
	onChangeAboutMe: function() {
		console.log('About Me Changed');
		Parse.User.current().set('aboutMe', this.refs.AboutMe.value)
		Parse.User.current().save(null, {
			success: function(CharacterModel) {
				console.log('About Me Changed On Server')
			}
		});
	}
})

// <label className="userSettingsLabel">User Name</label>
// <input ref="UserName" id="settingUserName" type="text" placeholder={Parse.User.current().get('userLegalName').split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}/>
// <button className="userSettingsButton" onClick={this.onChangeName}>Change User Name</button>
// 					
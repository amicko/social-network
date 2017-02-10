var React = require('react');
var Parse = require('parse');

module.exports = React.createClass({
	render: function() {
		return (
			<div className="homepage">
				<div id="heroBanner"></div>
				<div id="intro">
					<h2>The Lion's Den is a place to get together with like-minded people</h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et volutpat ante. Nam eu leo eget orci sodales sagittis. In fermentum elementum ligula, eu sagittis orci dictum sed. Nunc fermentum cursus diam, in congue mi scelerisque sit amet.
					</p>
				</div>
				<hr/>
				<div id="features">
					<div className="featureBox">
						<img src="https://s-media-cache-ak0.pinimg.com/736x/24/29/ab/2429abf2594ff4c2fb3cca9164db722f.jpg"/>
						<h3>Create a Profile</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et volutpat ante. Nam eu leo eget orci sodales sagittis.
						</p>
					</div>
					<div className="featureBox">
						<img src="http://www.zastavki.com/pictures/1920x1200/2010/Animals_Beasts_Playing_the_Lions_025247_.jpg"/>
						<h3>Add Friends</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et volutpat ante. Nam eu leo eget orci sodales sagittis.
						</p>
					</div>
					<div className="featureBox">
						<img src="https://www.dukascopy.com/imageserver/img/60161ee8620d6e9baa27e70cb38d1e5b/500_2/image13.jpg"/>
						<h3>Post Updates</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et volutpat ante. Nam eu leo eget orci sodales sagittis.
						</p>
					</div>
				</div>
				<hr/>
				<footer>
					<ul id="footerList">
						<li><a href="#">About Us</a></li>
						<li><a href="#">Contact Us</a></li>
					</ul>
				</footer>
			</div>
		)
	}
})
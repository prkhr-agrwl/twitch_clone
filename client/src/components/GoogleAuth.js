import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
	componentDidMount() {
		window.gapi.load("client:auth2", () => {
			window.gapi.client
				.init({
					clientId:
						"347023250495-fnrfv00c67jm80fk3c1jd0ve3vpo990m.apps.googleusercontent.com",
					scope: "email"
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();

					this.onAuthChange(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	onAuthChange = isSignedIn => {
		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	renderAuthBtn() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<button
					onClick={this.auth.signOut}
					className="ui red google button"
				>
					<i className="google icon" />
					Sign out
				</button>
			);
		} else {
			return (
				<button
					onClick={this.auth.signIn}
					className="ui red google button"
				>
					<i className="google icon" />
					Sign in with Google
				</button>
			);
		}
	}

	render() {
		return <div className="ui item">{this.renderAuthBtn()}</div>;
	}
}

const mapStateToProps = state => {
	return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
	mapStateToProps,
	{ signIn, signOut }
)(GoogleAuth);

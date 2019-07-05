import React from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../../actions";
import { Link } from "react-router-dom";

class StreamList extends React.Component {
	componentDidMount() {
		this.props.fetchStreams();
	}

	renderAdmin(stream) {
		if (
			this.props.currentUserId &&
			this.props.currentUserId === stream.userId
		) {
			return (
				<div className="right floated content">
					<Link
						to={`/streams/edit/${stream.id}`}
						className="ui tiny teal button"
					>
						Edit
					</Link>
					<Link
						to={`/streams/delete/${stream.id}`}
						className="ui tiny red button"
					>
						Delete
					</Link>
				</div>
			);
		}
	}

	renderList() {
		return this.props.streams.map(stream => {
			return (
				<div className="item" key={stream.id}>
					{this.renderAdmin(stream)}
					<i className="large middle aligned icon video" />
					<div className="content">
						<Link to={`/streams/${stream.id}`} className="header">
							{stream.title}
						</Link>
						<div className="description">{stream.description}</div>
					</div>
				</div>
			);
		});
	}

	renderCreateBtn() {
		if (this.props.isSignedIn) {
			return (
				<div>
					<Link
						to="/streams/new"
						className="ui right floated button small primary"
					>
						Create New Stream
					</Link>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				{this.renderCreateBtn()}
				<h2>Available Streams</h2>
				<div className="ui segment">
					<div className="ui relaxed divided list">
						{this.renderList()}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		currentUserId: state.auth.userId,
		streams: Object.values(state.streams),
		isSignedIn: state.auth.isSignedIn
	};
};

export default connect(
	mapStateToProps,
	{ fetchStreams }
)(StreamList);

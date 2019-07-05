import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	renderActions() {
		const id = this.props.match.params.id;
		return (
			<React.Fragment>
				<button
					className="ui negative button"
					onClick={() => this.props.deleteStream(id)}
				>
					Delete
				</button>
				<Link to="/" className="ui button">
					Cancel
				</Link>
			</React.Fragment>
		);
	}

	renderModalContent() {
		if (!this.props.stream) {
			return "Are you sure you want to delete this stream?";
		}

		return `Are you sure you want to delete stream "${this.props.stream.title}"?`;
	}

	render() {
		//console.log(this.props);
		return (
			<Modal
				title="Delete Stream"
				content={this.renderModalContent()}
				modalActions={this.renderActions()}
				onDismiss={() => history.push("/")}
			/>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
	mapStateToProps,
	{ fetchStream, deleteStream }
)(StreamDelete);

import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
	onSubmit = formValues => {
		this.props.createStream(formValues);
		// console.log();
	};

	render() {
		return (
			<div>
				<div className="ui header">Create a Stream</div>
				<StreamForm onSubmit={this.onSubmit} />
			</div>
		);
	}
}

export default connect(
	null,
	{ createStream }
)(StreamCreate);

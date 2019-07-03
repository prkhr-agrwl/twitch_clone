import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div className="ui tiny error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	}

	renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? "error" : ""}`;
		//console.log(meta);
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				<div>{this.renderError(meta)}</div>
			</div>
		);
	};

	onSubmit = formValues => {
		this.props.onSubmit(formValues);
		// console.log();
	};

	render() {
		return (
			<form
				onSubmit={this.props.handleSubmit(this.onSubmit)}
				className="ui form error"
			>
				<Field
					name="title"
					component={this.renderInput}
					label="Enter Title"
				/>
				<Field
					name="description"
					component={this.renderInput}
					label="Enter description"
				/>
				<button className="ui primary button">Submit</button>
			</form>
		);
	}
}

const validate = formValues => {
	const errors = {};

	if (!formValues.title) {
		errors.title = "Title cannot be empty";
	}
	if (!formValues.description) {
		errors.description = "Description cannot be empty";
	}

	return errors;
};

export default reduxForm({
	form: "streamForm",
	validate
})(StreamForm);


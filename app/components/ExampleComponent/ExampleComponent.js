import React, { Component } from 'react';

export default class ExampleComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			status: false
		};
	}

	componentDidMount() {
		const { url } = this.props;

		fetch(url).then((res) => res.json()).then((json) => {
			this.setState({
				status: json.success
			});
		});
	}

	render() {
		const { status } = this.state;

		return (
			<span className="ExampleComponent">
				Database connection:
				{status ? <span className="success">Successful</span> : <span className="error">failed</span>}
			</span>
		);
	}
}

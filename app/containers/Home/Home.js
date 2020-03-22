'use strict';

import React, { Component } from 'react';

import { ExampleComponent } from './../../components/';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div>
				<ExampleComponent url="/template/api/test" />
			</div>
		);
	}
}

export default Home;

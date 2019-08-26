import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from './routes';
import 'antd/dist/antd.css';

import * as actions from './store/actions/auth';
import Layout from './containers/layout/Layout';

class App extends Component {
	  
	componentDidMount() {
	
		this.props.onTryAutoSignup();
  	}

  	render() {
    	return (
			<Router>
				<Layout {...this.props}>
					<BaseRouter />
				</Layout>
			</Router>
		);
	}
}

const mapStateToProps = state => {
  	return {
    	isAuthenticated: state.auth.token !== null
  	};
};

const mapDispatchToProps = dispatch => {
  	return {
    	onTryAutoSignup: () => dispatch(actions.authCheckState())
  	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
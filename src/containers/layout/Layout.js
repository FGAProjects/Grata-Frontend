import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AutoComplete from './AutoComplete';
import Navbar from '../navbar/Navbar';
import './layout.css';

const { Content, Footer } = Layout;

class CustomLayout extends Component {
  
	render() {
		return (
			<Layout className = 'layout' >
				<Navbar />
				<Content 
					style = {{ 
						margin: '25px 42px 0', 
						overflow: 'initial' 
					}} 
				>
					{
						this.props.token !== null ? (
							<AutoComplete />
						) : null
					}
					{ this.props.children }	
        		</Content>
				<Footer className = 'footer'>
					Grata - Gerenciamento de Reuniões e Atas ©2019 
					Criado por Victor Hugo Lopes Mota.
				</Footer>
			</Layout>
		);
	}
}

const mapStateToProps = state => {
  	return {
		userId: state.auth.userId,
		token: state.auth.token,
		is_administrator: state.auth.is_administrator
	};
};

export default withRouter(connect(mapStateToProps)(CustomLayout));
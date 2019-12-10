import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AutoComplete from './AutoComplete';
import Navbar from '../navbar/Navbar';
import '../css/layout.css';
import '../css/buttons.css';
import '../css/user.css';
import '../css/navbar.css';
import '../css/icon.css';
import '../css/img.css';
import '../css/formatText.css';
import '../css/tabs.css';

const { Footer } = Layout;

class CustomLayout extends Component {
  
	render() {
		return (
			<Layout className = 'layout' >
				<Navbar />
				<div>
					{
						this.props.token !== null ? (
							<AutoComplete />
						) : null
					}
					{ this.props.children }
				</div>

				{
					this.props.token === null ? (
						<Footer className = 'footerOFF'>
							Grata - Gerenciamento de Reuniões e Atas ©2019 
							Criado por Victor Hugo Lopes Mota.
						</Footer>
					) : (
						<Footer className = 'footerON'>
							Grata - Gerenciamento de Reuniões e Atas ©2019 
							Criado por Victor Hugo Lopes Mota.
						</Footer>
					)
				}
			</Layout>
		);
	}
}

const mapStateToProps = state => {

  	return {
		token: state.auth.token
	};
};

export default withRouter(connect(mapStateToProps)(CustomLayout));
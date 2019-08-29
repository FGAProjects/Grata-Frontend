import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import BreadcrumbLayout from './BreadcrumLayout';
import Navbar from '../navbar/Navbar';

const { Content, Footer } = Layout;

class CustomLayout extends React.Component {
  
	render() {
		return (
			<Layout className="layout" >
				<Navbar/>
				<Content style={{ margin: '24px 42px 0', overflow: 'initial' }}>
					<Breadcrumb style={{ margin: "16px 0" }}>
						{
							this.props.token !== null ? (
								<BreadcrumbLayout />
							) : null
						}
					</Breadcrumb>	
					<div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
						{this.props.children}
					</div>	
        		</Content>
				<Footer style={{ textAlign: 'center' }}>
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
import React from "react";
import { Layout, Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../store/actions/auth";
import './layout.css';
import LayoutSider from './LayoutSider';
import LayoutOff from './LayoutOff';

const { Header, Footer } = Layout;

class CustomLayout extends React.Component {

	componentDidMount() {
	
		this.props.onTryAutoSignup();
  	}

    render () {
        return (
            <Layout>
                <Header className = 'header'>
                    <Menu   
                        className = 'menu'                        
                        mode="horizontal"
                        style={{ lineHeight: '63px'}}
                    >
						{
							this.props.isAuthenticated ? (
								<Menu.Item key="2" onClick={this.props.logout}>
									Logout
								</Menu.Item>
								) : (
								<Menu.Item key="2">
									<Link to="/login">Login</Link>
								</Menu.Item>
							)
						}                 
                    </Menu>
                </Header>
				{
					this.props.token !== null ? (
						<LayoutSider />
					): <LayoutOff {...this.props} />
				} 				
            	<Footer style={{ textAlign: 'center' }}>Grata - Gerenciamento de Reuniões e Atas ©2019 Criado por Victor Mota</Footer>
            </Layout>
        ); 
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        token: state.auth.token,
        is_teacher: state.auth.is_teacher
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
		logout: () => dispatch(actions.logout()),
		onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
};
  
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CustomLayout));
import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './navbar.css';
import DropdownNav from './DropdownNav';
import * as actions from '../../store/actions/auth';

const { Header } = Layout;

class Navbar extends React.Component {

    render () {
        return (
            <Header className = 'header'>
                <Menu   
                    className = 'menu'                        
                    mode="horizontal"
                    defaultSelectedKeys={["4"]}
                    style={{ lineHeight: '63px'}}
                >
                    {
                        this.props.token !== null ? (
                            <Menu.Item>
                                <DropdownNav/> 
                            </Menu.Item>
                        ) : null
                    }
                                       
                    {
                        this.props.token !== null ? (
                            <Menu.Item key ='4' onClick = {this.props.logout}>
                                <Icon type='logout' className = 'icon' />
                                Logout
                            </Menu.Item>
                            ) : (
                            <Menu.Item key = '4'>
                                <Link to='/login'>Login</Link>
                            </Menu.Item>
                        )
                    }                 
                </Menu>
            </Header>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import DropdownNav from './DropdownNav';
import { logout } from '../../store/actions/auth';

const { Header } = Layout;

class Navbar extends React.Component {

    render () {

        return (

            <Header className = 'header'>
                <Menu className = 'menu' mode = 'horizontal'>
                    {
                        this.props.token !== null ? (
                            <Menu.Item>
                                <DropdownNav/> 
                            </Menu.Item>
                        ) : null
                    }
                    {
                        this.props.token !== null ? (
                            <Menu.Item className = 'text_logout' onClick = { this.props.logout }>
                                <Icon type = 'logout'  />
                                    Logout
                            </Menu.Item>
                            ) : (
                            <Menu.Item>
                                <Link to = '/login' > <p className = 'text'> Login </p></Link>
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

const mapDispatchToProps = (dispatch )=> {
    
    return {
        logout: () => dispatch(logout())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
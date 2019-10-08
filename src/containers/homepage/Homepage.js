import React, { Component } from 'react';
import { Layout, Icon } from '../user/node_modules/antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ProjectList from '../projects/ProjectList';

const { Content } = Layout;

class Homepage extends Component {

    render () {
        return (
            <Content style = {{ 
                        padding: '0 50px' 
                    }}>
                {
                    this.props.token !== null ? (
                        <ProjectList />
                    ) : <div>
                            Ta OFF <Icon type='frown' />
                        </div>
                }               
                <div style = {{ 
                        alignItems: 'center'
                    }}>
                    {this.props.children}
                </div>
            </Content>          
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    };
};

export default withRouter(connect(mapStateToProps)(Homepage));
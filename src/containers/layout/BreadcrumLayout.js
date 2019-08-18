import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class BreakcrumLayout extends React.Component {

    render() {
        return (
            <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>
                    <Link to="/">Home</Link>
                </Breadcrumb.Item>
            
                <Breadcrumb.Item>
                    <Link to={`/profile/${this.props.userId}`}>Profile</Link>
                </Breadcrumb.Item>        
            </Breadcrumb>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId
    };
};

export default withRouter(connect(mapStateToProps)(BreakcrumLayout));
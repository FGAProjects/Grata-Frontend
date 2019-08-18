import React from "react";
import { Layout, Icon } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const { Content } = Layout;

class Homepage extends React.Component {

    render () {
        return (
            <Content style={{ padding: "0 50px" }}>
                {
                    this.props.token !== null ? (
                        <div>
                            Ta ON <Icon type="smile" />
                        </div>
                    ) : <div>
                            Ta OFF <Icon type="frown" />
                        </div>
                }               
                <div style={{alignItems: 'center'}}>
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
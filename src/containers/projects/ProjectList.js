import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Skeleton } from 'antd';
import { getProjects } from '../../store/actions/project';
import Hoc from '../../hoc/hoc';

class ProjectsList extends Component {

    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.getProjects(this.props.token);
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.props.getProjects(newProps.token);
            }
        }
    }

    renderItem(project) {
        return (
            <Link to = {`/informacoes_projeto/${project.id}`} >
                <List.Item>
                    {project.title}
                </List.Item>
            </Link>
        );
    }

    render() {
        return (
            <Hoc>
                {
                    this.props.loading ? (
                        <Skeleton active />
                    ) : (
                        <div>
                            <h2 
                                align = 'center' 
                                style = {{ 
                                    margin: '16px 0' 
                                }} >
                                    Lista de Projetos
                            </h2>
                            <List
                                size="large"
                                bordered
                                dataSource={this.props.projects}
                                renderItem={project => this.renderItem(project)}
                            />
                        </div>
                    )
                }
            </Hoc>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        projects: state.project.projects,
        loading: state.project.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProjects: token => dispatch(getProjects(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
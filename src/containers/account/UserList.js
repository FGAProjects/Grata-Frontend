import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Skeleton, Table, Divider, Tag } from 'antd';

import { getUsers } from '../../store/actions/auth';
import Hoc from '../../hoc/hoc';

class UserList extends Component {

    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.getUsers(this.props.token);
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.props.getUsers(newProps.token);
            }
        }
    }

    renderItem(project) {
        return (
            <Link to = {`/informacoes_projeto/${project.id}`} >
                <List.Item>
                    {project.name}
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
                            <Table columns = {
                                [{
                                    title: 'Nome',
                                    dataIndex: 'name',
                                    key: 'name',
                                    render: text => <a>{text}</a>,
                                },
                                {
                                    title: 'Ramal',
                                    dataIndex: 'ramal',
                                    key: 'ramal',
                                },
                                {
                                    title: 'Setor',
                                    dataIndex: 'setor',
                                    key: 'setor',
                                },
                                {
                                    title: 'Email',
                                    dataIndex: 'address',
                                    key: 'address',
                                },
                                {
                                    title: 'Tipo de Permissão',
                                    key: 'tags',
                                    dataIndex: 'tags',
                                    render: tags => (
                                        <span>
                                        {
                                            tags.map(tag => {
                                                let color = tag.length > 5 ? 'geekblue' : 'green';
                                                if (tag === 'loser') {
                                                color = 'volcano';
                                                }
                                                return (
                                                <Tag color={color} key={tag}>
                                                    {tag.toUpperCase()}
                                                </Tag>
                                                );
                                            })
                                        }
                                        </span>
                                    ),
                                },
                            ]
                        } 
                        dataSource = {[
                            {
                                key: '1',
                                name: 'John Brown',
                                ramal: 32,
                                address: 'New York No. 1 Lake Park',
                                tags: ['nice', 'developer'],
                            },
                            {
                                key: '2',
                                name: 'Jim Green',
                                ramal: 42,
                                address: 'London No. 1 Lake Park',
                                tags: ['loser'],
                            },
                            {
                                key: '3',
                                name: 'Joe Black',
                                ramal: 32,
                                address: 'Sidney No. 1 Lake Park',
                                tags: ['cool', 'teacher'],
                            },
                            ]
                        } />
                    )
                }
            </Hoc>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        users: state.auth.users,
        loading: state.auth.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUsers: token => dispatch(getUsers(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
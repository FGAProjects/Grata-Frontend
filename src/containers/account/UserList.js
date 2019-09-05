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

    dataSourceUsers() {
        const users = JSON.parse(localStorage.getItem('users'));
        var userList = []

        for(let aux = 0; aux < users.length; aux ++) {
            userList['key'] = users[aux].id
            userList['name'] = users[aux].name
            userList['ramal'] = users[aux].ramal
            userList['address'] = users[aux].email
            userList['tags'] = users[aux].name
        }
        for(let aux = 0; aux < userList.length; aux ++) {
            console.log(userList[aux].name)
        }
        return userList
    }

    render() {
        const users = JSON.parse(localStorage.getItem('users'));
        let permission = '';
        let dataSource = {
            innerArray: [
                
            ]
        }
        
        for(let aux = 0; aux < users.length; aux ++) {
            if(users[aux].is_administrator === true) {
                permission = 'Administrador';
            } else {
                permission = 'Participante da Reunião';
            }
            dataSource.innerArray.push(
                {
                    key: users[aux].id ,
                    name: users[aux].name,
                    username: users[aux].username,
                    ramal: users[aux].ramal,
                    setor: '-',
                    email: users[aux].email,
                    tags: [permission],
                }
            ) 
        }

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
                                    title: 'Usuário',
                                    dataIndex: 'username',
                                    key: 'username',
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
                                    dataIndex: 'email',
                                    key: 'email',
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
                        dataSource = {dataSource.innerArray} 
                        />
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
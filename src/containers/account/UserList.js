import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Skeleton, Table, Tag } from 'antd';

import { getUsers } from '../../store/actions/auth';
import { dynamicSort } from '../utils';
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

    render() {
		const users = this.props.users;
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
                    key: users[aux].id,
                    name: users[aux].name,
                    username: users[aux].username,
                    ramal: users[aux].ramal,
                    setor: users[aux].sector,
                    email: users[aux].email,
					tags: [permission],
                }
			); 
		}

		dataSource.innerArray.sort(dynamicSort('name'))

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
                                                if (tag === 'Participante da Reunião') {
                                                	color = 'volcano';
                                                }
                                                return (
                                                <Tag color = { color } key = { tag }>
                                                    { tag.toUpperCase() }
                                                </Tag>
                                                );
                                            })
                                        }
                                        </span>
                                    ),
                                },
                            ]}
                            dataSource = {
								dataSource.innerArray
							} 
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Skeleton, Table, Tag } from 'antd';

import { getUsers } from '../../store/actions/auth';
import { getMeeting, updateMeeting } from '../../store/actions/meeting';
import { dynamicSort } from '../utils';
import Hoc from '../../hoc/hoc';

class UserListMeeting extends Component {

    componentDidMount() {

        try {
            if (this.props.token !== undefined && this.props.token !== null) {
                
                const meeting_id = this.props.match.params.meeting_id;
                this.props.getMeeting(this.props.token, meeting_id);
                this.props.getUsers(this.props.token);
            }
        } catch(error) {
            console.log(error)
        }
    }

    componentWillReceiveProps(newProps) {

        try {

            if (newProps.token !== this.props.token) {
        
                if (newProps.token !== undefined && newProps.token !== null) {
            
                    const meeting_id = newProps.match.params.meeting_id;
				    this.props.getMeeting(newProps.token, meeting_id);
                    this.props.getUsers(newProps.token);
                    this.forceUpdate();
                }
            }
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        
		const users = this.props.users;
        let permission = '';
        let dataSource = {
            innerArray: [
                
            ]
        };

        for(let aux = 0; aux < users.length; aux ++) {

            if(users[aux].sector !== null || users[aux].sector !== undefined) {

                if(users[aux].is_administrator === true) {
                    permission = 'Administrador';
                } else {
                    permission = 'Participante da Reunião';
                }

                dataSource.innerArray.push({
                    key: users[aux].id,
                    name: users[aux].name,
                    username: users[aux].username,
                    ramal: users[aux].ramal,
                    setor: users[aux].sector,
                    email: users[aux].email,
                    tags: [permission]
                });
            }
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
                                    render: (text) => (
                                        <b>{text}</b>
                                    )
								},
                                {
                                    title: 'Usuário',
                                    dataIndex: 'username',
                                    key: 'username',
                                    render: (text) => (
                                        <b>{text}</b>
                                    )
                                },
                                {
                                    title: 'Ramal',
                                    dataIndex: 'ramal',
                                    key: 'ramal',
                                    render: (text) => (
                                        <b>{text}</b>
                                    )
                                },
                                {
                                    title: 'Setor',
                                    dataIndex: 'setor',
                                    key: 'setor',
                                    render: (text) => (
                                        <b>{text}</b>
                                    )
                                },
                                {
                                    title: 'Email',
                                    dataIndex: 'email',
                                    key: 'email',
                                    render: (text) => (
                                        <b>{text}</b>
                                    )
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
                                                    <b> { tag.toUpperCase() } </b>
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
        loading: state.auth.loading,
        currentMeeting: state.meeting.currentMeeting
    };
};

const mapDispatchToProps = dispatch => {
    return {

        getUsers: token => dispatch(getUsers(token)),
        getMeeting: (token, meeting_id) => dispatch(getMeeting(token, meeting_id)),
        updateMeeting: (token, meeting) => dispatch(updateMeeting(token, meeting))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListMeeting);
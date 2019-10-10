import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Skeleton, Table, Tag, Button } from 'antd';

import { getUsers } from '../../store/actions/auth';
import { getMeeting, updateMeeting } from '../../store/actions/meeting';
import { dynamicSort } from '../utils';
import Hoc from '../../hoc/hoc';

class UserListMeeting extends Component {

    state = {
        toggle:true
    }

    constructor(props) {
        
        super(props);
        this._onStateChange = this._onStateChange.bind(this);
    }

    _onStateChange(newState){
        
        const value = newState ? 'Adicionar':'Remover'
        this.setState({
            toogleText:value
        });
    }

    _onPress(textValue) {

        if(textValue === 'Adicionar') {
            
            const newState = !this.state.toggle;
            this.setState({toggle:newState});
            this.props.onStateChange && this.props.onStateChange(newState);
        } else {
            
            const newState = !this.state.toggle;
            this.setState({toggle:newState});
            this.props.onStateChange && this.props.onStateChange(newState);
        }
    }

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
        const { toggle } = this.state;
        const typeButton = toggle ? 'primary':'danger';
        const textValue = toggle ? 'Adicionar':'Remover';
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
                    ramal: users[aux].ramal,
                    setor: users[aux].sector,
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
                                {
                                    title: 'Adicionar/Remover',
                                    key: 'action',
                                    dataIndex: 'action',
                                    render: action => (
                                        <Button 
											type = { typeButton } 
											htmlType = 'submit' 
                                            style = {{ marginRight: '20px' }}
                                            onClick ={()=>this._onPress(textValue)}
										>
                                            { textValue }
										</Button>
                                    ),
                                }
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
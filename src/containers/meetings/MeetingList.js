import React, { Component } from 'react';
import { List, Skeleton, Table, Tag, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getProjects } from '../../store/actions/project';
import { getMeetings } from '../../store/actions/meeting';
import { getUsers } from '../../store/actions/auth';
import { getSectors } from '../../store/actions/sector';
import { getSectorName, dynamicSort } from '../utils';
import Hoc from '../../hoc/hoc';

class MeetingList extends Component {

	componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.getSectors(this.props.token);
			this.props.getUsers(this.props.token);
			this.props.getMeetings(this.props.token);
			this.props.getProjects(this.props.getProjects);
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
				this.props.getSectors(newProps.token);
				this.props.getUsers(newProps.token);
				this.props.getMeetings(newProps.token);
				this.props.getProjects(newProps.token);
            }
        }
    }

    render() {
		const projectId = this.props.match.params.id;
		const meetings = this.props.meetings;
		const users = this.props.users;
		const sectors = this.props.sectors;
		const projects = this.props.projects;
		let user_sector = '';
		let name_user = '';
		let dataSource = {
            innerArray: [
                
            ]
		}
		
		for(let aux = 0; aux < meetings.length; aux ++) {
			
			for(let auxUsers = 0; auxUsers < users.length; auxUsers ++) {
				if(users[auxUsers].sector === meetings[aux].place) {
					name_user = users[auxUsers].name;
					console.log(name_user)
					break;
				} 
			}

            dataSource.innerArray.push(
                {
                    key: meetings[aux].id,
					title: meetings[aux].title,
					initial_date: meetings[aux].initial_date,
					final_date: meetings[aux].final_date,
					initial_hour: meetings[aux].initial_hour,
					final_hour: meetings[aux].final_hour,
					meeting_leader: name_user,
                    tags: [meetings[aux].status]
                }
			);

        }
        
        dataSource.innerArray.sort(dynamicSort('title'));
		
		// for(let aux = 0; aux < meetings.length; aux ++) {
		// 	user_sector = users.find(user => user.sector === meetings[aux].place);
		// 	name_user = user_sector.name
		// }

		// console.log(name_user)
		
		return (
			<div align = 'right'>
				<Button 
					type = 'primary' 
					htmlType = 'submit' 
					style = {{
						marginRight: '10px'
					}}
					size = 'large'
				>
					<Link to = { `/criar_reuniao/projeto/${ projectId } `} >
						Nova Reunião
					</Link>
				</Button>
				<div align = 'center'>
					<Hoc> 
						{
							this.props.loading ? (
								<Skeleton active />
							) : (
								<Table columns = {
									[{
										title: 'Título',
										dataIndex: 'title',
										key: 'title',
										render: (text, record) => (
											<Link to = {`/lista_de_reunioes/${record.key}`}>
												<List.Item>
													<b>{text}</b>
												</List.Item>
											</Link>
										)   
									},
									{
										title: 'Líder da Reunião',
										dataIndex: 'meeting_leader',
										key: 'meeting_leader',
									},
									{
										title: 'Setor Responsável',
										dataIndex: 'sector',
										key: 'sector',
									},
									{
										title: 'Data de Inicio',
										dataIndex: 'initial_date',
										key: 'initial_date',
									},
									{
										title: 'Data de Encerramento',
										dataIndex: 'final_date',
										key: 'final_date',
									},
									{
										title: 'Hora de Inicio',
										dataIndex: 'initial_hour',
										key: 'initial_hour',
									},
									{
										title: 'Hora de Encerramento',
										dataIndex: 'final_hour',
										key: 'final_hour',
									},
									{
										title: 'Status',
										key: 'tags',
										dataIndex: 'tags',
										render: tags => (
											<span>
											{
												tags.map(tag => {
													let color = tag.length > 5 ? 'geekblue' : 'green';
													if (tag === 'Pendente') {
														color = 'orange';
													} else {
														color = 'green';
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
										title: 'Ação',
										key: 'action',
										render: (record) => (
										  <span>
											<Button 
												type = 'primary' 
												htmlType = 'submit' 
												style = {{ 
													marginRight: '20px' 
												}}
										>
												<Link to = {`/editar_projeto/${record.key}`} >
													<Icon 
														type = 'edit' 
														style = {{ marginRight: '10px' }} />
														<b> Editar Setor </b>
												</Link>
											</Button>
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
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        users: state.auth.users,
        loading: state.meeting.loading,
		sectors: state.sector.sectors,
		meetings: state.meeting.meetings,
		projects: state.project.projects
    };
};

const mapDispatchToProps = dispatch => {
    return {
		getSectors: token => dispatch(getSectors(token)),
		getUsers: token => dispatch(getUsers(token)),
		getMeetings: token => dispatch(getMeetings(token)),
		getProjects: token => dispatch(getProjects(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingList);
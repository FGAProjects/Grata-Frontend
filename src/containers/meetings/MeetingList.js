import React, { Component } from 'react';
import { List, Skeleton, Table, Tag, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getProject } from '../../store/actions/project';
import { getMeetings } from '../../store/actions/meeting';
import { getUsers } from '../../store/actions/auth';
import { getSectors } from '../../store/actions/sector';
import { dynamicSort } from '../utils';
import Hoc from '../../hoc/hoc';

class MeetingList extends Component {

	componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
			const project_id = this.props.match.params.id;
            this.props.getSectors(this.props.token);
			this.props.getUsers(this.props.token);
			this.props.getMeetings(this.props.token);
			this.props.getProject(this.props.token, project_id);
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
				const project_id = newProps.match.params.id;
				this.props.getSectors(newProps.token);
				this.props.getUsers(newProps.token);
				this.props.getMeetings(newProps.token);
				this.props.getProject(newProps.token, project_id);
            }
        }
    }

    render() {
		const projectId = this.props.match.params.id;
		const meetings = this.props.meetings;
		const users = this.props.users;
		const sectors = this.props.sectors;
		const { currentProject } = this.props;
		console.log(currentProject)
		let name_user = '';
		let dataSource = {
            innerArray: [
                
            ]
		}
		
		for(let aux = 0; aux < meetings.length; aux ++) {
			for(let auxUsers = 0; auxUsers < users.length; auxUsers ++) {
				if(users[auxUsers].sector === meetings[aux].place &&
					users[auxUsers].sector === currentProject.id) {
					
					name_user = users[auxUsers].name;
					dataSource.innerArray.push(
						{
							key: meetings[aux].id,
							title: meetings[aux].title,
							initial_date: meetings[aux].initial_date,
							final_date: meetings[aux].final_date,
							initial_hour: meetings[aux].initial_hour,
							final_hour: meetings[aux].final_hour,
							sector: sectors[meetings[aux].place - 1].name,
							meeting_leader: name_user,
							tags: [meetings[aux].status]
						}
					);
					break;
				} else {

				}
			}
		}
        
        dataSource.innerArray.sort(dynamicSort('title'));
		
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
		currentProject: state.project.currentProject
    };
};

const mapDispatchToProps = dispatch => {
    return {
		getSectors: token => dispatch(getSectors(token)),
		getUsers: token => dispatch(getUsers(token)),
		getMeetings: token => dispatch(getMeetings(token)),
		getProject: (token, project_id) => dispatch(getProject(token, project_id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingList);
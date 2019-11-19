import React, { Component } from 'react';
import { List, Skeleton, Table, Tag, Button } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Hoc from '../../hoc/hoc';
import Homepage from '../homepage/Homepage';

import { getUser } from '../../store/actions/auth';
import { getProject } from '../../store/actions/project';
import { getMeetings } from '../../store/actions/meeting';
import { dynamicSort } from '../utils';

class MeetingList extends Component {

	componentDidMount() {

		if (this.props.token !== undefined && this.props.token !== null) {
			
			this.forceUpdate();
			const project_id = this.props.match.params.project_id;
			this.props.getMeetings(this.props.token, project_id);
			this.props.getProject(this.props.token, project_id);
			this.props.getUser(this.props.token, this.props.currentUser.userId);
		}
	}

    UNSAFE_componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {
				
				this.forceUpdate();
				const project_id = newProps.match.params.project_id;
				this.props.getMeetings(newProps.token, project_id);
				this.props.getProject(newProps.token, project_id);
				this.props.getUser(newProps.token, newProps.currentUser.userId);
            }
        }
    }

    render() {
		
		const { currentUser } = this.props;
		const project_id = this.props.match.params.project_id;
		const meetings = this.props.meetings;
		let dataSource = {
            innerArray: [
                
            ]
		}

		let valid = false;

		for (let aux = 0; aux < meetings.length; aux ++) {

			if(currentUser.sector === meetings[aux].sector) {

				dataSource.innerArray.push(
					{
						key: meetings[aux].id,
						title: meetings[aux].title,
						initial_date: meetings[aux].initial_date,
						final_date: meetings[aux].final_date,
						initial_hour: meetings[aux].initial_hour,
						final_hour: meetings[aux].final_hour,
						sector: meetings[aux].sector,
						tags: [meetings[aux].status]
					}
				);
				valid = true;
			} else {
				valid = false;
			}
		}

        dataSource.innerArray.sort(dynamicSort('title'));
		
		return (

			<Hoc>
				{
					this.props.token === null ? (
						<Homepage/>
					) : (
						<div align = 'right'>
							<Button 
								type = 'ghost' 
								htmlType = 'submit' 
								className = 'buttonNew'
								size = 'large'
							>
								<Link to = { `/criar_reuniao/projeto/${ project_id }/`} >
									Nova Reunião
								</Link>
							</Button>
						</div>
					)
				}
				{
					this.props.token === null ? (
						<Homepage/>
					) : (
						this.props.loading ? (
							<Skeleton active />
						) : (
							<Hoc>
								<div className = 'contentList'>
									{
										valid === true ? (
											<Table columns = {
												[{
													title: 'Título',
													dataIndex: 'title',
													key: 'title',
													render: (text, record) => (
														<Link to = {`/detalhes_reuniao/${ record.key }/${ project_id }`}>
															<List.Item>
																<b> { text } </b>
															</List.Item>
														</Link>
													)   
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
																let color = '';
																if (tag === 'Pendente') {
																	color = 'orange';
																} else if(tag === 'Agendada') {
																	color = 'geekblue';
																} else if(tag === 'Cancelada') {
																	color = 'red';
																}														
																else {
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
											]}
											dataSource = {
												dataSource.innerArray
											}/>
										) : (
											<h1 className = 'texth1'> Você Não Está Atrelado a Reuniões Neste Setor </h1>
										)
									}
								</div>
							</Hoc>
						)
					)
				}
			</Hoc>
		);
	}
}

const mapStateToProps = state => {
	
	return {
	
		token: state.auth.token,
        loading: state.meeting.loading,
		meetings: state.meeting.meetings,
		currentProject: state.project.currentProject,
		currentUser: state.auth.currentUser
    };
};

const mapDispatchToProps = dispatch => {
	
	return {
	
		getUser: (token, userId) => dispatch(getUser(token, userId)),
		getMeetings: (token, project_id) => dispatch(getMeetings(token, project_id)),
		getProject: (token, project_id) => dispatch(getProject(token, project_id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingList);
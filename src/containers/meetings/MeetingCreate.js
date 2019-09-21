import React, { Component } from 'react';
import { DatePicker, TimePicker, Button, Form, Input, Icon, message, Select } from 'antd';
import { connect } from 'react-redux'
import { fail } from 'assert';
import { NavLink } from 'react-router-dom';

import { createMeeting } from '../../store/actions/meeting';
import { getProject } from '../../store/actions/project';
import { getUsers } from '../../store/actions/auth';
import { getSectors } from '../../store/actions/sector';
import { dynamicSort, getSectorInProject, getUsersInSector } from '../utils';

const Option = Select.Option;
const { RangePicker } = DatePicker;

class MeetingCreate extends Component {
    state = {
		confirmDirty: false,
	};

	componentDidMount() {
		if (this.props.token !== undefined && this.props.token !== null) {
			this.forceUpdate();
			this.props.getSectors(this.props.token);
			this.props.getUsers(this.props.getUsers);
			this.props.getProject(this.props.token, this.props.match.params.id);
			this.forceUpdate();
		}
	}

	UNSAFE_componentWillReceiveProps(newProps) {
		if (newProps.token !== this.props.token) {
			if (newProps.token !== undefined && newProps.token !== null) {
				this.forceUpdate();
				this.props.getSectors(newProps.token);
				this.props.getUsers(newProps.token);
				this.props.getProject(newProps.token, newProps.match.params.id);
				this.forceUpdate();
			}
		}
	}

    handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {

				const users = this.props.users;
				const sectors = this.props.sectors;
				const token = this.props.token;
				const { currentProject } = this.props;
                const project_id = this.props.match.params.id;
                const date_value = values['range-picker'];
                let user_id = 0;
				let sector_id = 0;
				let sector_name = '';

				sector_name = getSectorInProject(sectors, currentProject);

				for(let aux = 0; aux < users.length; aux ++) {
                    if(users[aux].username === values.administrator) {
                        user_id = users[aux].id;
                    }
				}

				for(let aux = 0; aux < sectors.length; aux ++) {
                    if(sectors[aux].name === sector_name) {
                        sector_id = sectors[aux].id;
                    }
				}
				const meeting = {
					title: values.title,
					subject_matter: values.subject_matter,
					status: 'Pendente',
					initial_date: date_value[0].format('DD/MM/YYYY'),
					final_date: date_value[1].format('DD/MM/YYYY'),
					initial_hour: values['time-picker-initial'].format('HH:mm:ss'),
					final_hour: values['time-picker-final'].format('HH:mm:ss'),
					meeting_leader: user_id,
					place: sector_id,
					project: project_id
				};
				if((this.props.createMeeting(token, meeting)) !== fail) {
					message.success('Reunião Criada Com Sucesso!');
				} else {
					message.error('Não Foi Possível Criar a Reunião. ' + 
								  'Entre em Contato Com o Desenvolvedor!');
				} 
				this.props.history.push(`/lista_de_reunioes/${project_id}`);
			} else {

			}
		});
	};

	render() {
		const { currentProject } = this.props;
		const sectors = this.props.sectors;
		const users = this.props.users;
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: {
			  xs: { span: 24 },
			  sm: { span: 6 },
			},
			wrapperCol: {
			  xs: { span: 24 },
			  sm: { span: 16 },
			},
		  };
		const rangeConfig = {
			rules: [{ 
				type: 'array', 
				required: true, 
				message: 'Por Favor, Selecione a Hora!' 
			}],
		};
		const config = {
			rules: [{ 
				type: 'object', 
				required: true, 
				message: 'Por Favor, Selecione a Hora!' 
			}],
		};
		let sector_name = '';
		let dataSourceUsers = {
			innerArrayUsers: [

			]
		}

		sector_name = getSectorInProject(sectors, currentProject);
		dataSourceUsers.innerArrayUsers = getUsersInSector(users, sectors, currentProject);
		dataSourceUsers.innerArrayUsers.sort(dynamicSort('name'));

		return (
			<Form { ...formItemLayout } onSubmit = { this.handleSubmit } >
				<Form.Item label = 'Título' hasFeedback >
					{
						getFieldDecorator('title', {
							rules: [{ 
								required: true, 
								message: 'Por favor, Insira o Título da Reunião!'
							},{
								max: 30,
								message: 'O Título Pode Ter no Máximo 30 Caracteres!',
							}],
						})(
							<Input
								prefix = {
									<Icon 
										type = 'form' 
										style = {{ 
											color: 'rgba(0,0,0,.25)' 
										}} 
									/>
								}
								placeholder = 'Ex: O Título Dessa Reunião é ...'
							/>,
						)
					}
				</Form.Item>

				<Form.Item label = 'Assunto' hasFeedback >
					{
						getFieldDecorator('subject_matter', {
							rules: [{ 
								required: true, 
								message: 'Por favor, Insira o Assunto da Reunião!'
							},{
								max: 40,
								message: 'O Título Pode Ter no Máximo 40 Caracteres!',
							}],
						})(
							<Input
								prefix = {
									<Icon 
										type = 'form' 
										style = {{ 
											color: 'rgba(0,0,0,.25)' 
										}} 
									/>
								}
								placeholder = 'Ex: O Assunto Dessa Reunião é ...'
							/>,
						)
					}
				</Form.Item>

				<Form.Item label = 'Status' >
					{
						getFieldDecorator('status', {
							rules: [{ 
								required: false 
							}],
						})(
							<Input
								prefix = {
									<Icon 
										type = 'form' 
										style = {{ 
											color: 'rgba(0,0,0,.25)' 
										}} 
									/>
								}
								placeholder = 'Pendente'
								disabled = { true }
							/>,
						)
					}
				</Form.Item>

                <Form.Item label = 'Administrador Responsável' hasFeedback >
					{
						getFieldDecorator('administrator', {
						rules: [
							{
								required: true,
								message: 'Por favor, Escolha o Administrador Responsável!',
							}
							],
						})(
							<Select placeholder = 'Escolha o Responsável Pela Reunião' >
								{ dataSourceUsers.innerArrayUsers.map(user => 
									<Option 
										key = { user.key } 
										value = { user.username }>
										{ user.name }
									</Option>)
								}
							</Select>  
						)
					}
				</Form.Item>

				<Form.Item label = 'Local' hasFeedback >
					{
						getFieldDecorator('local', {
						rules: [
							{
								required: false,
								message: 'Por favor, Escolha o Local a Ser Realizada a Reunião!',
							}
							],
						})(							
							<Input
								prefix = {
									<Icon 
										type = 'form' 
										style = {{ 
											color: 'rgba(0,0,0,.25)' 
										}} 
									/>
								}
							placeholder = { sector_name }
							disabled = { true }
						/>
						)
					}
				</Form.Item>

				<Form.Item label = 'Data Inicio - Data Fim' hasFeedback >
					{
						getFieldDecorator('range-picker', rangeConfig) (
							<RangePicker showTime format = 'DD/MM/YYYY' />
						)
					}
				</Form.Item>

				<Form.Item label = 'Hora de Inicio' >
					{
						getFieldDecorator('time-picker-initial', config) (
							<TimePicker />
						)
					}
				</Form.Item>

				<Form.Item label = 'Hora de Encerramento' hasFeedback >
					{
						getFieldDecorator('time-picker-final', config) (
							<TimePicker />
						)
					}
				</Form.Item>

				<Form.Item>
					<Button 
						type = 'primary' 
						htmlType = 'submit' 
						style = {{
							marginRight: '10px'
						}} >
						Cadastrar
					</Button>
					Ou
					<NavLink 
						style = {{
							marginRight: '10px'
						}} 
						to = '/login/'> 
						Entrar
					</NavLink>
				</Form.Item>
			</Form>
		);
	}
}

const MeetingCreateForm = Form.create()(MeetingCreate);

const mapStateToProps = (state) => {
	return {
		loading: state.meeting.loading,
		error: state.meeting.error,
		token: state.auth.token,
		sectors: state.sector.sectors,
		users: state.auth.users,
		currentProject: state.project.currentProject
	}
}

const mapDispatchToProps = dispatch => {
	return {
        createMeeting: (token, meeting) => dispatch(createMeeting(token, meeting)),
		getSectors: token => dispatch(getSectors(token)),
		getUsers: token => dispatch(getUsers(token)),
		getProject: (token, project_id) => dispatch(getProject(token, project_id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingCreateForm);
import React, { Component } from 'react';
import { DatePicker, TimePicker, Button, Form, Input, Icon, message, Select } from 'antd';
import { connect } from 'react-redux'
import { fail } from 'assert';
import { NavLink } from 'react-router-dom';

import { createMeeting } from '../../store/actions/meeting';
import { getUsers } from '../../store/actions/auth';
import { getSectors } from '../../store/actions/sector';
import { dynamicSort } from '../utils';

const Option = Select.Option;
const { RangePicker } = DatePicker;

class MeetingCreate extends Component {
    state = {
		confirmDirty: false,
	};

	componentDidMount() {
		if (this.props.token !== undefined && this.props.token !== null) {
			this.props.getSectors(this.props.token);
			this.props.getUsers(this.props.getUsers);
		}
	}

	UNSAFE_componentWillReceiveProps(newProps) {
		if (newProps.token !== this.props.token) {
			if (newProps.token !== undefined && newProps.token !== null) {
				this.props.getSectors(newProps.token);
				this.props.getUsers(newProps.token);
			}
		}
	}

    handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, fieldsValue) => {
			if (!err) {

                const users = this.props.users;
                const sectors = this.props.sectors;
                const token = this.props.token;
                const project_id = this.props.match.params.id;
                const date_value = fieldsValue['range-picker'];
                let user_id = 0;
                let sector_id = 0;

                for(let aux = 0; aux < users.length; aux ++) {
                    if(users[aux].username === fieldsValue.administrator) {
                        user_id = users[aux].id;
                    }
                }

                for(let aux = 0; aux < sectors.length; aux ++) {
                    if(sectors[aux].initials === fieldsValue.local) {
                        sector_id = sectors[aux].id;
                    }
                }

                const meeting = {
                    title: fieldsValue.title,
                    subject_matter: fieldsValue.subject_matter,
                    status: 'Pendente',
                    initial_date: date_value[0].format('DD/MM/YYYY'),
                    final_date: date_value[1].format('DD/MM/YYYY'),
                    initial_hour: fieldsValue['time-picker-initial'].format('HH:mm:ss'),
                    final_hour: fieldsValue['time-picker-final'].format('HH:mm:ss'),
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
		let dataSourceSectors = {
            innerArray: [
                
            ]
		}
		let dataSourceUsers = {
			innerArrayUsers: [

			]
		}
        
        for(let aux = 0; aux < sectors.length; aux ++) {
            dataSourceSectors.innerArray.push(
                {
                    key: sectors[aux].id,
                    initials: sectors[aux].initials,
                    name: sectors[aux].name,
                }
			); 
		}

		for(let aux = 0; aux < users.length; aux ++) {
			if(users[aux].is_administrator === true) {
				dataSourceUsers.innerArrayUsers.push(
					{
						key: users[aux].id,
						name: users[aux].name,
						username: users[aux].username
					}
				);
			}
		}

		dataSourceSectors.innerArray.sort(dynamicSort('name'));
		dataSourceUsers.innerArrayUsers.sort(dynamicSort('name'));

		return (
			<Form { ...formItemLayout } onSubmit = { this.handleSubmit } >
				<Form.Item label = 'Título' >
					{
						getFieldDecorator('title', {
							rules: [{ 
								required: true, 
								message: 'Por favor, Insira o Título da Reunião!'
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

				<Form.Item label = 'Assunto' >
					{
						getFieldDecorator('subject_matter', {
							rules: [{ 
								required: true, 
								message: 'Por favor, Insira o Assunto da Reunião!'
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
								required: true,
								message: 'Por favor, Escolha o Local a Ser Realizada a Reunião!',
							}
							],
						})(
							<Select placeholder = 'Escolha o Setor' >
								{ dataSourceSectors.innerArray.map(sector => 
									<Option 
										key = { sector.key } 
										value = { sector.initials }>
										{ sector.name }
									</Option>)
								}
							</Select>   
						)
					}
				</Form.Item>

				<Form.Item label = 'Data Inicio - Data Fim' >
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

				<Form.Item label = 'Hora de Encerramento' >
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
		users: state.auth.users
	}
}

const mapDispatchToProps = dispatch => {
	return {
        createMeeting: (token, meeting) => dispatch(createMeeting(token, meeting)),
		getSectors: token => dispatch(getSectors(token)),
		getUsers: token => dispatch(getUsers(token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingCreateForm);
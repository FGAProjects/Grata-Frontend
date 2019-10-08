import React, { Component } from 'react';
import { DatePicker, TimePicker, Button, Form, Input, Icon, message } from '../user/node_modules/antd';
import { connect } from 'react-redux'
import { fail } from 'assert';
import { Link } from 'react-router-dom';

import { createMeeting } from '../../store/actions/meeting';
import { getProject } from '../../store/actions/project';

const { RangePicker } = DatePicker;

class MeetingCreate extends Component {

    state = {
		confirmDirty: false,
	};

	componentDidMount() {
		
		if (this.props.token !== undefined && this.props.token !== null) {
		
			this.props.getProject(this.props.token, this.props.match.params.project_id);
			this.forceUpdate();
		}
	}

	UNSAFE_componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {
		
				this.props.getProject(newProps.token, newProps.match.params.project_id);
				this.forceUpdate();
			}
		}
	}

    handleSubmit = e => {
		
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {

				const sector_id = this.props.match.params.sector_id;
				console.log(sector_id)
				const token = this.props.token;
				const project_id = this.props.match.params.project_id;
				console.log(project_id)				
                const date_value = values['range-picker'];

				const meeting = {
					title: values.title,
					subject_matter: values.subject_matter,
					status: 'Pendente',
					initial_date: date_value[0].format('DD/MM/YYYY'),
					final_date: date_value[1].format('DD/MM/YYYY'),
					initial_hour: values['time-picker-initial'].format('HH:mm:ss'),
					final_hour: values['time-picker-final'].format('HH:mm:ss'),
					sector: sector_id,
					project: project_id
				};

				if((this.props.createMeeting(token, meeting)) !== fail) {
					message.success('Reunião Criada Com Sucesso!');
				} else {
					message.error('Não Foi Possível Criar a Reunião. ' + 
								  'Entre em Contato Com o Desenvolvedor!');
				} 
				this.props.history.push(`/lista_de_reunioes/${ project_id }/${ sector_id }`);
			} else {

			}
		});
	};

	render() {

		const { currentProject } = this.props;
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

				<Form.Item label = 'Local' hasFeedback >
					{
						getFieldDecorator('local', {
						rules: [
							{
								required: false,
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
								placeholder = { currentProject.sector }
								disabled = { true }
							/>
						)
					}
				</Form.Item>

				<Form.Item label = 'Data Inicio - Data Fim' hasFeedback >
					{
						getFieldDecorator('range-picker', {
							rules: [
								{
									required: true,
									message: 'Por Favor, Selecione as Datas de Inicio e Fim!'
								}
							],	
						}, rangeConfig) (
							<RangePicker showTime format = 'DD/MM/YYYY' />
						)
					}
				</Form.Item>

				<Form.Item label = 'Hora de Inicio' >
					{
						getFieldDecorator('time-picker-initial', {
							rules: [
								{
									required: true,
									message: 'Por Favor, Selecione a Hora de Inicio!'
								}
							],
						}) (
							<TimePicker />
						)
					}
				</Form.Item>

				<Form.Item label = 'Hora de Encerramento' hasFeedback >
					{
						getFieldDecorator('time-picker-final', {
							rules: [
								{
									required: true,
									message: 'Por Favor, Selecione a Hora de Encerramento!'
								}
							],
						}) (
							<TimePicker />
						)
					}
				</Form.Item>

				<div align = 'center' >
					<Form.Item>
						<Button 
							type = 'primary' 
							htmlType = 'submit' 
							style = {{
								marginRight: '10px'
							}} >
							<Icon 
								style = {{
									marginRight: '10px'
								}}
								type = 'save' />
								Cadastrar Reunião
						</Button>
						<Button type = 'primary' 
							style = {{
								marginLeft: '50px'								
							}}
							>
							<Link to = { `/lista_de_reunioes/${ currentProject.id }` } >
								<Icon 
									style = {{
									marginRight: '10px'
									}}
									type = 'stop' />
									Cancelar
								</Link>
						</Button>
					</Form.Item>
				</div>
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
		currentProject: state.project.currentProject,
	}
}

const mapDispatchToProps = dispatch => {
	
	return {
	
		createMeeting: (token, meeting) => dispatch(createMeeting(token, meeting)),
		getProject: (token, project_id) => dispatch(getProject(token, project_id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingCreateForm);
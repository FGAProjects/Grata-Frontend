import React, { Component } from 'react';
import { DatePicker, TimePicker, Button, Form, Input, Icon, message } from 'antd';
import { connect } from 'react-redux'
import { fail } from 'assert';
import { Link } from 'react-router-dom';

import Hoc from '../../hoc/hoc';
import Homepage from '../homepage/Homepage';

import { createMeeting } from '../../store/actions/meeting';
import { getProject } from '../../store/actions/project';
import { getSectors } from '../../store/actions/sector';

const { RangePicker } = DatePicker;

class MeetingCreate extends Component {

	componentDidMount() {
		
		if (this.props.token !== undefined && this.props.token !== null) {
		
			this.props.getProject(this.props.token, this.props.match.params.project_id);
			this.props.getSectors(this.props.token);
			this.forceUpdate();
		}
	}

	componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {
		
				this.props.getProject(newProps.token, newProps.match.params.project_id);
				this.props.getSectors(newProps.token);
				this.forceUpdate();
			}
		}
	}

    handleSubmit = e => {
		
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {

				const { currentProject } = this.props;
				const sectors = this.props.sectors;
				const user = JSON.parse(localStorage.getItem('user'));
				const userId = user.userId;
				const token = this.props.token;
				const project_id = this.props.match.params.project_id;
				const date_value = values['range-picker'];
				
				let sector_id = '';

				for(let aux = 0; aux < sectors.length; aux ++) {
		
					if(sectors[aux].name === currentProject.sector) {
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
					project: project_id,
					sector: sector_id,
					meeting_leader: userId,
					topics: [

					],
					rules: [
						
					],
					users: [

					],
					questionnaires: [

					]
				};

				if((this.props.createMeeting(token, meeting)) !== fail) {
					message.success('Reunião Criada Com Sucesso!');
				} else {
					message.error('Não Foi Possível Criar a Reunião. ' + 
								  'Entre em Contato Com o Desenvolvedor!');
				} 
				this.props.history.push(`/lista_de_reunioes/${ project_id }/`);
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

			<Hoc>
				{
					this.props.token === null ? (
						<Homepage/>
					) : (
						<div className = 'content'>
							<h1 className = 'texth1'> Criação de Reunião </h1>
							<Form onSubmit = { this.handleSubmit }>
								<Form.Item label = 'Título' hasFeedback { ...formItemLayout }>
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
											<Input prefix = { <Icon type = 'form' className = 'icons'/> }
												placeholder = 'Ex: O Título Dessa Reunião é ...'
											/>
										)
									}
								</Form.Item>

								<Form.Item label = 'Assunto' hasFeedback { ...formItemLayout }>
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
											<Input prefix = { <Icon type = 'form' className = 'icons'/> }
												placeholder = 'Ex: O Assunto Dessa Reunião é ...'
											/>
										)
									}
								</Form.Item>

								<Form.Item label = 'Status' { ...formItemLayout }>
									{
										getFieldDecorator('status', {
											rules: [{ 
												required: false 
											}],
										})(
											<Input prefix = { <Icon type = 'form' className = 'icons'/> }
												placeholder = 'Pendente'
												disabled = { true }
											/>
										)
									}
								</Form.Item>

								<Form.Item label = 'Local' hasFeedback { ...formItemLayout }>
									{
										getFieldDecorator('local', {
										rules: [
											{
												required: false,
											}
											],
										})(							
											<Input prefix = { <Icon type = 'form' className = 'icons'/> }
												placeholder = { currentProject.sector }
												disabled = { true }
											/>
										)
									}
								</Form.Item>

								<Form.Item label = 'Data Inicio - Data Fim' hasFeedback { ...formItemLayout }>
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

								<Form.Item label = 'Hora de Inicio' { ...formItemLayout }>
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

								<Form.Item label = 'Hora de Encerramento' hasFeedback { ...formItemLayout }>
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

								<Form.Item>
									<div align = 'center'>
										<Button type = 'ghost' htmlType = 'submit' className = 'buttonSave'>
											<Icon className = 'icons' type = 'save'/>
												Cadastrar Reunião
										</Button>
										<Button type = 'ghost' className = 'buttonCancel'>
											<Link to = { `/lista_de_reunioes/${ currentProject.id }` } >
												<Icon className = 'icons' type = 'stop' />
													Cancelar
											</Link>
										</Button>
									</div>
								</Form.Item>
							</Form>
						</div>
					)
				}
			</Hoc>
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
		sectors: state.sector.sectors
	}
}

const mapDispatchToProps = dispatch => {
	
	return {
	
		createMeeting: (token, meeting) => dispatch(createMeeting(token, meeting)),
		getProject: (token, project_id) => dispatch(getProject(token, project_id)),
		getSectors: token => dispatch(getSectors(token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MeetingCreateForm);
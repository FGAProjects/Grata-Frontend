import React, { Component } from 'react';
import { Skeleton, Form, Input, Button, message, Icon, DatePicker, Modal ,TimePicker } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fail } from 'assert';

import Hoc from '../../hoc/hoc';
import { getProjects } from '../../store/actions/project';
import { getSectors } from '../../store/actions/sector';
import { getMeeting, updateMeeting, deleteMeeting } from '../../store/actions/meeting';

const { RangePicker } = DatePicker;
const { confirm } = Modal;

class MeetingEdit extends Component {

    constructor() {
		super();
		this.state = {
			formLayout: 'vertical',
		};
    }

    async componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {
		
				const meeting_id = newProps.match.params.id;
				this.props.getProjects(newProps.token);
				this.props.getSectors(newProps.token);
				this.props.getMeeting(newProps.token, meeting_id);
				this.forceUpdate();
            }
        }
	}
	
	showDeleteConfirm = (token, meetingId, project_id) => {
		
		const propsForms = this.props;
		
		confirm ({
			title: 'Exclusão de Reunião',
			content: 'Tem Certeza Que Deseja Excluir Esta Reunião ?',
			okText: 'Sim',
			okType: 'danger',
			cancelText: 'Não',
		
			onOk() {
				propsForms.deleteMeeting(token, meetingId);
				Modal.success({
					title: 'Ação Concluída!',
					content: 'Reunião Excluída Com Sucesso!',
				});
				propsForms.history.push(`/lista_de_reunioes/${ project_id }`)
			},
			onCancel() {
				message.success('Exclusão de Reunião Cancelada Com Sucesso!');
			},
		});
	}

    handleSubmit = e => {
		
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {

				const { currentMeeting } = this.props;
				const sectors = this.props.sectors;
				const projects = this.props.projects;
				const token = this.props.token;
                const date_value = values['range-picker'];
				let sector_id = 0;
				let project_id = 0;

				for(let aux = 0; aux < sectors.length; aux ++) {

					if(sectors[aux].name === currentMeeting.sector) {
                        sector_id = sectors[aux].id;
                    }
				}

				for(let aux = 0; aux < projects.length; aux ++) {

					if(projects[aux].title === currentMeeting.project) {
						project_id = projects[aux].id;
					}
				}

				const meeting = {
					meetingId: currentMeeting.id,
					title: values.title,
					subject_matter: values.subject_matter,
					status: 'Pendente',
					initial_date: date_value[0].format('DD/MM/YYYY'),
					final_date: date_value[1].format('DD/MM/YYYY'),
					initial_hour: values['time-picker-initial'].format('HH:mm:ss'),
					final_hour: values['time-picker-final'].format('HH:mm:ss'),
					sector: sector_id,
					project: project_id,
					topics: [

					]
				};

				if((this.props.updateMeeting(token, meeting)) !== fail) {
					message.success('As Informações da Reunião Foram Alteradas Com Sucesso!');
				} else {
					message.error('Não Foi Possível Alterar as Informações da Reunião. ' + 
								  'Entre em Contato Com o Desenvolvedor!');
				} 
				this.props.history.push(`/detalhes_reuniao/${ currentMeeting.id }`);
			} else {

			}
		});
	};

    render() {
        
        const { currentMeeting } = this.props;
		const { formLayout } = this.state;
		const projects = this.props.projects;
		let project_id = 0;
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = formLayout === 'vertical'? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
		}
        : null;
        const rangeConfig = {
			rules: [{ 
				type: 'array', 
				required: true, 
				message: 'Por Favor, Selecione a Hora!' 
			}],
		};        
        const formItemLayoutMinimum = formLayout === 'vertical'? {
            labelCol: { span: 4 },
            wrapperCol: { span: 2 },
		}
		: null;

		for(let aux = 0; aux < projects.length; aux ++) {

			if(projects[aux].title === currentMeeting.project) {
				project_id = projects[aux].id;
			}
		}

        return (
            <Hoc>
                <div>
                    <Hoc>
                        {
                            this.props.loading ? (
                                <Skeleton active />
                            ) : (
                                <Hoc>
                                    <h1> Informações Cadastradas da Reunião </h1>
                                    <Form layout = 'vertical' >
                                        <Form.Item label = 'Título' { ...formItemLayout } >
                                            <Input 
                                                value = { currentMeeting.title } 
                                                disabled = { true } 
                                            />
                                        </Form.Item>
                                    </Form>

                                    <Form layout = 'vertical'>
                                        <Form.Item label = 'Assunto' { ...formItemLayout } >
                                            <Input 
                                                value = { currentMeeting.subject_matter } 
                                                disabled = { true } 
                                            />
                                        </Form.Item>
                                    </Form>

                                    <Form layout = 'vertical'>
                                        <Form.Item label = 'Local' { ...formItemLayout } >
                                            <Input 
                                                value = { currentMeeting.sector } 
                                                disabled = { true } 
                                            />
                                        </Form.Item>
                                    </Form>

                                    <Form layout = 'vertical'>
                                        <Form.Item label = 'Status' { ...formItemLayoutMinimum } >
                                            <Input 
                                                value = { currentMeeting.status } 
                                                disabled = { true } 
                                            />
                                        </Form.Item>
                                    </Form>

                                    <Form layout = 'vertical' >
                                        <Form.Item label = 'Data de Inicio' 
                                        { ...formItemLayoutMinimum } >
                                            <Input 
                                                value = { currentMeeting.initial_date } 
                                                disabled = { true } 
                                            />
                                        </Form.Item>

                                        <Form.Item label = 'Data de Inicio' 
                                        { ...formItemLayoutMinimum } >
                                            <Input 
                                                value = { currentMeeting.final_date } 
                                                disabled = { true } 
                                            />
                                        </Form.Item>

                                        <Form.Item label = 'Hora de Inicio' { ...formItemLayoutMinimum } >
                                            <Input 
                                                value = { currentMeeting.initial_hour } 
                                                disabled = { true } 
                                            />
                                        </Form.Item>

                                        <Form.Item label = 'Hora de Encerramento' { ...formItemLayoutMinimum } >
                                            <Input 
                                                value = { currentMeeting.final_hour } 
                                                disabled = { true } 
                                            />
                                        </Form.Item>
									</Form>

									<h1> Informações a Serem Alteradas </h1>
									<Form layout = 'vertical' { ...formItemLayout } onSubmit = { this.handleSubmit } >
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
														message: 'O Título Pode Ter no Máximo 40 Caracteres!'
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
														placeholder = { currentMeeting.sector }
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

										<Form.Item>
											<div align = 'right' >
												<Button 
														type = 'primary' 
														htmlType = 'submit' 
														style = {{ 
															marginRight: '20px' 
														}}
													>
													<Link to = { `/detalhes_reuniao/${ this.props.match.params.id }` } >
														<Icon 
															type = 'arrow-left' 
															style = {{ marginRight: '10px' }} />
															Voltar
													</Link>
												</Button>
												<Button 
													type = 'primary' 
													htmlType = 'submit' 
													style = {{ 
														marginRight: '20px' 
													}}
												>
													<Icon 
														type = 'edit' 
														style = {{ marginRight: '10px' }} />
														Alterar Informações
												</Button>
												<Button 
													onClick = { () => this.showDeleteConfirm(
														this.props.token, 
														currentMeeting.id, 
														project_id
													)}

													type = 'danger' 
													htmlType = 'submit' 
													style = {{ 
														marginRight: '20px' 
													}}
												>
													<Icon 
														type = 'delete' 
														style = {{ marginRight: '10px' }} />
														Excluir Reunião
												</Button>
											</div>
										</Form.Item>
									</Form>	
                                </Hoc>
                            )
                        }
                    </Hoc>
                </div>
            </Hoc>
        )
    }
}

const MeetingDetailEditForm = Form.create()(MeetingEdit);

const mapStateToProps = state => {
	
	return {
	
		token: state.auth.token,
        loading: state.meeting.loading,
		currentMeeting: state.meeting.currentMeeting,
		sectors: state.sector.sectors,
		projects: state.project.projects
    };
};

const mapDispatchToProps = dispatch => {
	
	return {
	
		getMeeting: (token, meeting_id) => dispatch(getMeeting(token, meeting_id)),
		getSectors: token => dispatch(getSectors(token)),
		getProjects: token => dispatch(getProjects(token)),		
		updateMeeting: (token, meeting) => dispatch(updateMeeting(token, meeting)),
		deleteMeeting: (token, meeting_id) => dispatch(deleteMeeting(token, meeting_id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingDetailEditForm);
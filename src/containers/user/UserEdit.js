import React, { Component } from 'react';
import { Skeleton, Form, Input, Button, Icon, message, Select } from 'antd';
import { connect } from 'react-redux';
import { fail } from 'assert';
import { Link } from 'react-router-dom';

import { getUser, updateUser } from '../../store/actions/auth';
import { getSectors } from '../../store/actions/sector';
import { dynamicSort } from '../utils';
import Hoc from '../../hoc/hoc';

const Option = Select.Option;

class UserEdit extends Component {

    constructor() {
		
		super();
		this.state = {
			formLayout: 'vertical',
		};
	}

	state = {
		confirmDirty: false,
	};
	
	componentDidMount() {
		
		if (this.props.token !== undefined && this.props.token !== null) {
		
			this.props.getUser(this.props.token, this.props.currentUser.userId);
			this.props.getSectors(this.props.token);
		}
	}

	componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {
		
				this.props.getUser(newProps.token, newProps.currentUser.userId);
				this.props.getSectors(newProps.token);
			}
		}
	}

	handleSubmit = e => {
		
		e.preventDefault();
		
		this.props.form.validateFieldsAndScroll((err, values) => {
			
			if (!err) {
		
				const { currentUser } = this.props;
				const userGetItem = JSON.parse(localStorage.getItem('user'));
				const token = userGetItem.token;
				const sectors = this.props.sectors;
				let is_administrator = false;
				let sector_id = 0;

				if(values.sector === undefined) {
		
					message.warning('O Setor Não Pode Ser Nulo.' + 
									'Caso Não Tenha Setores Cadastrados, ' +
									'Entre em Contato Com o Administrador do Setor ' + 
									'ou Com o Desenvolvedor');
					this.props.history.push('/informacoes_usuario/');
				} else {
		
					for(let aux = 0; aux < sectors.length; aux ++) {
		
						if(sectors[aux].initials === values.sector) {
							sector_id = sectors[aux].id;
						} 
					}
	
					if(values.userType === 'administrator') {
						is_administrator = true;
					}

					const user = {
						userId: currentUser.id,
						email: currentUser.email,
						username: currentUser.username,
						ramal: values.ramal,
						name: values.name,
						is_administrator: is_administrator,
						sector: sector_id
					};

					if((this.props.updateUser(token, user)) !== fail) {
						message.success('O Usuário ' + currentUser.username + 
										' Teve Suas Informações Alteradas Com Sucesso!');
					} else {
						message.error('Não Foi Possível Alterar Informações do Usuário. ' + 
									'Entre em contato com o desenvolvedor!');
					}
					this.props.history.push('/informacoes_usuario/');
				}
			} else {

			}	
		});
	};

    render() {

		const { currentUser } = this.props;
		const sectors = this.props.sectors;
		const { getFieldDecorator } = this.props.form;
		const { formLayout } = this.state;
		const formItemLayout = formLayout === 'vertical'? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
		}
		: null;
		
		let dataSource = {
            innerArray: [
                
            ]
		}

		if(currentUser.sector === null) {
			currentUser.sector = 'Não Possui Setor no Momento';			
		}
        
        for(let aux = 0; aux < sectors.length; aux ++) {
            dataSource.innerArray.push(
                {
                    key: sectors[aux].id,
                    initials: sectors[aux].initials,
                    name: sectors[aux].name
                }
			); 
		}

		dataSource.innerArray.sort(dynamicSort('initials'));

		return (
			<Hoc>
				{
					this.props.loading ? (
						<Skeleton active />
					) : (
						<Hoc>
							<div className = 'userContent'>
								<h1 className = 'texth1'> Informações Cadastradas </h1>
								<Form layout = 'vertical' className = 'formUser'>
									<Form.Item 
										label = 'Nome' 
										{ ...formItemLayout }
										className = 'formFields'	
									>
										<Input 
											value = { currentUser.name } 
											disabled = { true } 
										/>
									</Form.Item>
									
									<Form.Item 
										label = 'Usuário' 
										{ ...formItemLayout }
										className = 'formFields'	
									>
										<Input 
											value = { currentUser.username } 
											disabled = { true } 
										/>
									</Form.Item>
									
									<Form.Item 
										label = 'Email' 
										{ ...formItemLayout } 
										className = 'formFields'	
									>
										<Input 
											value = { currentUser.email } 
											disabled = { true } 
										/>
									</Form.Item>

									<Form.Item 
										label = 'Setor' 
										{ ...formItemLayout }
										className = 'formFields'	
									>
										<Input 
											value = { currentUser.sector } 
											disabled = { true } 
										/>
									</Form.Item>
									
									<Form.Item 
										label = 'Ramal' 
										{ ...formItemLayout }
										className = 'formFields'	
									>
										<Input 
											value = { currentUser.ramal } 
											disabled = { true } />
									</Form.Item>

									{
										currentUser.is_administrator === true ? (
											<Form.Item 
												label = 'Tipo de Usuário' 
												{ ...formItemLayout }
												className = 'formFields'	
												>
												<Input 
													value = 'Administrador' 
													disabled = { true } />
											</Form.Item>
										) : null
									}

									{
										currentUser.is_participant === true ? (
											<Form.Item 
												label = 'Tipo de Usuário' 
												{ ...formItemLayout }
												className = 'formFields'													
											>
												<Input 
													value = 'Participante da Reunião'
													disabled = { true } />
											</Form.Item>
										) : null	
									}		
								</Form>
								.
							</div>
						</Hoc>
					)
				}
				<Hoc>
					{
						sectors.length === 0 ? (
							<Hoc>
								<div align = 'center' className = 'userContent'>
								<h1 
									className = 'texth1'> 
									Você Não Possui Setor Cadastrado um Antes e Volte Aqui Depois 
								</h1>
									<Button
										type = 'ghost'
										className = 'buttonSubmit' 
									>
										<Link to = { '/criar_setor/' } >
										<Icon 
											style = {{
												marginRight: '10px'
											}}
											type = 'highlight' />
											Criar Setor
										</Link>
									</Button>
									<Button 
										type = 'ghost'
										className = 'buttonCancel'
									>
										<Link to = { '/informacoes_usuario/' } >
										<Icon 
											style = {{
												marginRight: '10px'
											}}
											type = 'stop' />
											Cancelar
										</Link>
									</Button>
								</div>
							</Hoc>
						) : (
							<Hoc>
								<h1> Informações A Serem Alteradas </h1>
								<Form layout = 'vertical' onSubmit = { this.handleSubmit } >
									<Form.Item label = 'Nome Completo' >
										{
											getFieldDecorator('name', {
												rules: [{ 
													required: true, 
													message: 'Por favor, Insira Seu Nome Completo!'
												}],
											})(
												<Input
													prefix = {
														<Icon type = 'user' 
															style = {{ color: 'rgba(0,0,0,.25)' }} 
														/>
													}
													placeholder = 'Nome Completo'
												/>,
											)
										}
									</Form.Item>

									<Form.Item label='Setor' hasFeedback >
										{
											getFieldDecorator('sector', {
											rules: [
												{
													required: false,
													message: 'Por favor, Escolha o Setor do Usuário!',
												}
												],
											})(
												<Select placeholder = 'Escolha o Setor' >
													{ dataSource.innerArray.map(sector => 
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

									<Form.Item label = 'Ramal' >
										{
											getFieldDecorator('ramal', {
												rules: [{ 
													required: true, 
													message: 'Por favor, Coloque Seu Ramal!' 
												}],
											})(
												<Input
													prefix = {
														<Icon type = 'phone' 
															style={{ color: 'rgba(0,0,0,.25)' }} 
														/>
													}
													type = 'number'
													placeholder="Ramal"
												/>,
											)
										}
									</Form.Item>

									{
										currentUser.is_administrator === true ? (
											<Form.Item label = 'Tipo de Usuário' hasFeedback >
												{
													getFieldDecorator('userType', {
													rules: [
														{
															required: true,
															message: 'Por favor, Escolha o Tipo de Usuário!',
														}
														],
													})(
														<Select placeholder = 'Escolha o tipo de usuário' >
															<Option 
																value = 'administrator' > 
																	Administrador
															</Option>
															<Option 
																value = 'participant' > 
																	Participante da Reunião
															</Option>
														</Select>  
													)
												}
											</Form.Item>
										) : (
											<Form.Item label = 'Tipo de Usuário' hasFeedback >
												{
													getFieldDecorator('userType', {
													rules: [
														{
															required: false
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
															placeholder = 'Participante da Reunião'
															disabled = { true }
														/> 
													)
												}
											</Form.Item>
										)
									}

									<Form.Item>
										<div align = 'center'>
											<Button 
												type = 'primary' 
												htmlType = 'submit' 
												style = {{
													marginRight: '20px'
												}}
											>
												<Icon type = 'edit' />
													Alterar Informações	
											</Button>
											<Button type = 'primary' >
												<Link to = { '/informacoes_usuario/' } >
												<Icon 
													style = {{
														marginRight: '10px'
													}}
													type = 'stop' />
													Cancelar
												</Link>
											</Button>
										</div>
									</Form.Item>
								</Form>
							</Hoc>
						) 
					}
				</Hoc>
			</Hoc>
		);
    }
}

const UserEditForm = Form.create()(UserEdit);

const mapStateToProps = state => {
	return {
		token: state.auth.token,
		currentUser: state.auth.currentUser,
		sectors: state.sector.sectors,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getUser: (token, userId) => dispatch(getUser(token, userId)),
		updateUser: (token, user) => dispatch(updateUser(token, user)),
		getSectors: token => dispatch(getSectors(token))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditForm);
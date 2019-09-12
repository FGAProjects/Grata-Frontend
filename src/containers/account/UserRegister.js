import React, { Component } from 'react';
import { Form, Input, Icon, Button, Select, message } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { fail } from 'assert';

import { authSignup } from '../../store/actions/auth';

const Option = Select.Option;
  
class UserRegister extends Component {

	state = {
		confirmDirty: false,
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				let is_administrator = false;

				if(values.userType === 'administrator') {
					is_administrator = true;
				}
			
				const user = {
					username: values.username,
					name: values.name,
					ramal: values.ramal,
					email: values.email,
					password1: values.password1,
					password2: values.password2,
					is_administrator: is_administrator
				}

				if((this.props.onAuth(user)) !== fail) {
					message.success('O Usuário ' + values.username + 
									' Foi Cadastrado Com Sucesso!');
				} else {
					message.error('Não Foi Possível Cadastrar o Usuário.' + 
								  'Entre em Contato Com o Desenvolvedor!');
				}
				this.props.history.push('/');			
			} else {

			}	
		});
	};

	handleConfirmBlur = e => {
		const { value } = e.target;
		this.setState({ 
			confirmDirty: this.state.confirmDirty || !!value 
		});
	};

	compareToFirstPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue('password1')) {
			callback('As senhas digitadas não são iguais!');
		} else {
			callback();
		}
	};

	validateToNextPassword = (rule, value, callback) => {
		const { form } = this.props;
		if (value && this.state.confirmDirty) {
			form.validateFields(['password2'], { force: true });
		}
		callback();
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<Form onSubmit = { this.handleSubmit } >
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
									<Icon 
										type = 'user' 
										style = {{ 
											color: 'rgba(0,0,0,.25)' 
										}} 
									/>
								}
								placeholder = 'Nome Completo'
							/>,
						)
					}
				</Form.Item>

				<Form.Item label = 'Usuário'>
					{
						getFieldDecorator('username', {
							rules: [{ 
								required: true, 
								message: 'Por favor, Coloque Seu Usuário!',
							},
							{
								max: 10,
								message: 'O Usuário Pode Ter no Máximo 10 Caracteres!',
							}],
						})(
							<Input
								prefix = {
									<Icon 
										type = 'user' 
										style = {{ 
											color: 'rgba(0,0,0,.25)' 
										}} 
									/>
								}
								placeholder = 'Usuário'
							/>,
						)
					}
				</Form.Item>

				<Form.Item label = 'E-mail'>
					{
						getFieldDecorator('email', {
							rules: [
							{
								type: 'email',
								message: 'Esse tipo de E-mail Não é Válido!',
							},
							{
								required: true,
								message: 'Por Favor, Coloque Seu E-mail!',
							},
							],
						})(
							<Input 
								prefix = {
									<Icon 
										type = 'mail' 
										style = {{ 
											color: 'rgba(0,0,0,.25)' }} 
									/>
								}
								placeholder = 'Email'
							/>
						)
					}
				</Form.Item>

				<Form.Item label = 'Ramal'>
					{
						getFieldDecorator('ramal', {
							rules: [{ 
								required: true, 
								message: 'Por favor, Coloque Seu Ramal!' 
							}],
						})(
							<Input
								prefix={
									<Icon 
										type = 'phone' 
										style = {{ 
											color: 'rgba(0,0,0,.25)' 
										}} 
									/>
								}
								type = 'number'
								placeholder = 'Ramal'
							/>,
						)
					}
				</Form.Item>

				<Form.Item label='Senha' hasFeedback>
					{
						getFieldDecorator('password1', {
							rules: [
							{
								required: true,
								message: 'Por favor, Insira Sua Senha!',
							},
							{
								validator: this.validateToNextPassword,
							},
							],
						})(
							<Input 
								prefix={
									<Icon 
										type = 'lock' 
										style = {{ 
											color: 'rgba(0,0,0,.25)' 
										}} 
									/>
								}
								type = 'password'
								placeholder = 'Senha'
							/>
						)
					}
				</Form.Item>

				<Form.Item label='Repita a Senha' hasFeedback>
					{
						getFieldDecorator('password2', {
							rules: [
							{
								required: true,
								message: 'Por favor, Repita a Sua Senha!',
							},
							{
								validator: this.compareToFirstPassword,
							},
							],
						})(
							<Input 
								prefix={
									<Icon 
										type = 'lock' 
										style = {{ 
											color: 'rgba(0,0,0,.25)' 
										}} 
									/>
								}
								type = 'password'
								placeholder = 'Repita sua senha' 
								onBlur = { this.handleConfirmBlur } 
							/>
						)
					}
				</Form.Item>

				<Form.Item label='Tipo de Usuário' hasFeedback>
				{
					getFieldDecorator('userType', {
					rules: [
						{
							required: true,
							message: 'Por favor, Escolha o Tipo de Usuário!',
						}
						],
					})(
						<Select placeholder = 'Escolha o Tipo de Usuário' >
							<Option value = 'administrator'> Administrador </Option>
							<Option value = 'participant'> Participante da Reunião </Option>
						</Select>  
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

const UserRegisterForm = Form.create()(UserRegister);

const mapStateToProps = (state) => {

	return {
		loading: state.loading,
		error: state.error,
		token: state.auth.token
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (user) => dispatch(authSignup(user))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegisterForm);
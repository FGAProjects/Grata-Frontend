import React from 'react';
import { Form, Input, Icon, Button, Select, message } from 'antd';
import { NavLink } from 'react-router-dom';
import * as actions from '../../store/actions/auth';
import { connect } from 'react-redux'
import { fail } from 'assert';

const Option = Select.Option;
  
class Signup extends React.Component {

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
				if((this.props.onAuth(
						values.username,
						values.name,
						values.ramal,
						values.email, 
						values.password1,
						values.password2,
						is_administrator)) !== fail) {
							message.success('O usuário ' + values.username + 
							' foi cadastrado com sucesso');
				} else {
					message.error('Não foi possível cadastrar o usuário.' + 
									'Entre em contato com o desenvolvedor!');
				}			
			}	
			this.props.history.push('/');
		});
	};

	handleConfirmBlur = e => {
		const { value } = e.target;
		this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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
			<Form onSubmit={this.handleSubmit}>
				<Form.Item label='Nome Completo'>
					{
						getFieldDecorator('name', {
							rules: [{ 
								required: true, 
								message: 'Por favor, insira seu nome completo!'
							}],
						})(
							<Input
								prefix={
									<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
								}
								placeholder='Nome Completo'
							/>,
						)
					}
				</Form.Item>

				<Form.Item label='Usuário'>
					{
						getFieldDecorator('username', {
							rules: [{ 
								required: true, 
								message: 'Por favor, coloque seu usuário!' 
							}],
						})(
							<Input
								prefix={
									<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
								}
								placeholder="Usuário"
							/>,
						)
					}
				</Form.Item>

				<Form.Item label="E-mail">
					{
						getFieldDecorator('email', {
							rules: [
							{
								type: 'email',
								message: 'Esse tipo de E-mail não é válido!',
							},
							{
								required: true,
								message: 'Por Favor, coloque seu e-mail!',
							},
							],
						})(
							<Input 
								prefix={
									<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
								}
							placeholder="Email"/>
						)
					}
				</Form.Item>

				<Form.Item label='Ramal'>
					{
						getFieldDecorator('ramal', {
							rules: [{ 
								required: true, 
								message: 'Por favor, coloque seu ramal!' 
							}],
						})(
							<Input
								prefix={
									<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />
								}
								placeholder="Ramal"
							/>,
						)
					}
				</Form.Item>

				<Form.Item label="Senha" hasFeedback>
					{
						getFieldDecorator('password1', {
							rules: [
							{
								required: true,
								message: 'Por favor, insira sua senha!',
							},
							{
								validator: this.validateToNextPassword,
							},
							],
						})(
							<Input 
								prefix={
									<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
								}
							type="password"
							placeholder="Senha"/>
						)
					}
				</Form.Item>

				<Form.Item label="Repita a Senha" hasFeedback>
					{
						getFieldDecorator('password2', {
							rules: [
							{
								required: true,
								message: 'Por favor, repita a sua senha!',
							},
							{
								validator: this.compareToFirstPassword,
							},
							],
						})(
							<Input prefix={
								<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
							}
							type="password"
							placeholder="Repita sua senha" onBlur={this.handleConfirmBlur} />
						)
					}
				</Form.Item>

				<Form.Item label="Tipo de Usuário" hasFeedback>
				{
					getFieldDecorator('userType', {
					rules: [
						{
							required: true,
							message: 'Por favor, escolha o tipo de usuário!',
						}
						],
					})(
						<Select placeholder="Escolha o tipo de usuário">
							<Option value="administrator">Administrador</Option>
							<Option value="participant">Participante da Reunião</Option>
						</Select>  
					)
				}
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
						Signup
					</Button>
					Or
					<NavLink style={{marginRight: '10px'}} 
						to='/login/'> login
					</NavLink>
				</Form.Item>
			</Form>
		);
	}
}

const SignupForm = Form.create()(Signup);

const mapStateToProps = (state) => {
	return {
		loading: state.loading,
		error: state.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (username, name, ramal, email, password1, password2, is_administrator) => 
		dispatch(actions.authSignup(
				username, name, ramal, email, password1, password2, is_administrator
			)
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
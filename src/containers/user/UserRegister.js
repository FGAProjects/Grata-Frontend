import React, { Component } from 'react';
import { Form, Input, Icon, Button, Select, message } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fail } from 'assert';

import Homepage from '../homepage/Homepage';
import Hoc from '../../hoc/hoc';

import { authSignup } from '../../store/actions/auth';

const Option = Select.Option;
  
class UserRegister extends Component {

	constructor() {
		
		super();
		this.state = {
			formLayout: 'vertical'
		};
	}

	state = {
		confirmDirty: false
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
					message.success('O Usuário ' + values.username + ' Foi Cadastrado Com Sucesso!');
				} else {
					message.error('Não Foi Possível Cadastrar o Usuário. ' + 
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
		const { formLayout } = this.state;
		const formItemLayout = formLayout === 'vertical'? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
		}
		: null;

		return (

			<Hoc>
				{
					this.props.token === null ? (
						<Homepage/>
					) : (
						<div className = 'content'>
							<h1 className = 'texth1'> Criar Novo Usuário </h1>
							<Form onSubmit = { this.handleSubmit } >
								<Form.Item label = 'Nome Completo' className = 'formFields' { ...formItemLayout }>
									{
										getFieldDecorator('name', {
											rules: [{ 
												required: true, 
												message: 'Por favor, Insira Seu Nome Completo!'
											}],
										})(
											<Input prefix = { <Icon type = 'user' className = 'icons'/> }
												placeholder = 'Nome Completo'
											/>
										)
									}
								</Form.Item>

								<Form.Item label = 'Usuário' className = 'formFields' { ...formItemLayout }>
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
											<Input prefix = { <Icon type = 'user' className = 'icons'/> }
												placeholder = 'Usuário'
											/>
										)
									}
								</Form.Item>

								<Form.Item label = 'E-mail' className = 'formFields' { ...formItemLayout }>
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
												prefix = { <Icon type = 'mail' className = 'icons'/> }
												placeholder = 'Email'
											/>
										)
									}
								</Form.Item>

								<Form.Item label = 'Ramal' className = 'formFields' { ...formItemLayout }>
									{
										getFieldDecorator('ramal', {
											rules: [{ 
												required: true, 
												message: 'Por favor, Coloque Seu Ramal!' 
											}],
										})(
											<Input prefix = { <Icon type = 'phone' className = 'icons'/> }
												type = 'number' placeholder = 'Ramal'
											/>
										)
									}
								</Form.Item>

								<Form.Item label='Senha' hasFeedback className = 'formFields' { ...formItemLayout }>
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
											<Input prefix = { <Icon type = 'lock' className = 'icons'/> }
												type = 'password' placeholder = 'Senha'
											/>
										)
									}
								</Form.Item>

								<Form.Item label = 'Repita a Senha' hasFeedback 
										className = 'formFields' { ...formItemLayout }>
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
											<Input prefix = { <Icon type = 'lock' className = 'icons'/> }
												type = 'password' placeholder = 'Repita sua senha' 
												onBlur = { this.handleConfirmBlur } 
											/>
										)
									}
								</Form.Item>

								<Form.Item label = 'Tipo de Usuário' hasFeedback 
										className = 'formFields' { ...formItemLayout }>
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
									<div align = 'center'>
										<Button type = 'ghost' htmlType = 'submit' className = 'buttonSave'>
											<Icon className = 'icons' type = 'save'/>
												Cadastrar Usuário
										</Button>
										<Button type = 'default' className = 'buttonCancel'>
											<Link to = { '/lista_de_projetos/' }>
											<Icon className = 'icons' type = 'stop'/>
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

const UserRegisterForm = Form.create()(UserRegister);

const mapStateToProps = (state) => {

	return {
		
		loading: state.loading,
		error: state.error,
		token: state.auth.token
	};
}

const mapDispatchToProps = dispatch => {

	return {
		onAuth: (user) => dispatch(authSignup(user))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRegisterForm);
import React from 'react';
import { Skeleton, Form, Input, Button, Icon, message, Select } from 'antd';
import { connect } from 'react-redux';
import { fail } from 'assert';
import { Link } from 'react-router-dom';

import { getUser, updateUser } from '../../store/actions/auth';
import Hoc from '../../hoc/hoc';
import './user.css';

const Option = Select.Option;

class UserEdit extends React.Component {

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
			this.props.getUser(this.props.token, this.props.userId);
		}
	}

	UNSAFE_componentWillReceiveProps(newProps) {
		if (newProps.token !== this.props.token) {
			if (newProps.token !== undefined && newProps.token !== null) {
				this.props.getUser(newProps.token, newProps.userId);
			}
		}
	}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				const user = JSON.parse(localStorage.getItem('user'));
				let is_administrator = false;
				let username = this.props.username;
				let email = this.props.email;
				let userId = user.userId;
				let token = user.token;

				if(values.userType === 'administrator') {
					is_administrator = true;
				}
				if((this.props.updateUser(
					token,
					userId,
					email,
					username,
					values.ramal,
					values.name,
					is_administrator)) !== fail) {
						message.success('O Usuário ' + username + 
										' Teve Suas Informações Alteradas Com Sucesso!');
				} else {
					message.error('Não Foi Possível Alterar Informações do Usuário.' + 
									'Entre em contato com o desenvolvedor!');
				}
				this.props.history.push('/informacoes_usuario/');			
			} else {

			}	
		});
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
					this.props.loading ? (
						<Skeleton active />
					) : (
						<Hoc>
							<h1> Informações Cadastradas </h1>
							<Form layout = 'vertical' onSubmit = { this.handleSubmit } >
								<Form.Item label = 'Nome' { ...formItemLayout } >
									<Input 
										value = { this.props.name } 
										disabled = { true } 
									/>
								</Form.Item>
								
								<Form.Item label = 'Usuário' { ...formItemLayout } >
									<Input 
										value = { this.props.username } 
										disabled = { true } 
									/>
								</Form.Item>
								
								<Form.Item label = 'Email' { ...formItemLayout } >
									<Input 
										value = { this.props.email } 
										disabled = { true } 
									/>
								</Form.Item>
								
								<Form.Item label = 'Ramal' { ...formItemLayout } >
									<Input 
										value = { this.props.ramal } 
										disabled = { true } />
								</Form.Item>

								{
									this.props.is_administrator === true ? (
										<Form.Item label = 'Tipo de Usuário' 
											{ ...formItemLayout } >
											<Input 
												value = 'Administrador' 
												disabled = { true } />
										</Form.Item>
									) : null
								}

								{
									this.props.is_participant === true ? (
										<Form.Item label = 'Tipo de Usuário' 
											{ ...formItemLayout } >
											<Input 
												value = 'Participante da Reunião'
												disabled = { true } />
										</Form.Item>
									) : null	
								}		
							</Form>
						</Hoc>
					)
				}
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
										placeholder="Ramal"
									/>,
								)
							}
						</Form.Item>

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

						<Form.Item>
							<div align = 'center'>
								<Button 
										type = 'primary' 
										htmlType = 'submit' 
										style = {{marginRight: '20px'}}
								>
									Alterar Informações	
								</Button>
								<Button type='primary'>
									<Link to={`/informacoes_usuario/`}>
										Cancelar
									</Link>
								</Button>
							</div>
						</Form.Item>
					</Form>
				</Hoc>
			</Hoc>
		);
    }
}

const UserEditForm = Form.create()(UserEdit);

const mapStateToProps = state => {
	return {
		token: state.auth.token,
		username: state.auth.username,
		loading: state.auth.loading,
		userId: state.auth.userId,
		ramal: state.auth.ramal,
		name: state.auth.name,
		email: state.auth.email,
		is_participant: state.auth.is_participant,
		is_administrator: state.auth.is_administrator
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getUser: (token, userId) => dispatch(getUser(token, userId)),
		updateUser: (token, userId, email, username, ramal, name, is_administrator) => 
			dispatch(updateUser(token, userId, email, username, ramal, name, is_administrator))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditForm);
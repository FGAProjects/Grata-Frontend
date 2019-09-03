import React, { Component } from 'react';
import { Form, Input, Icon, Button, Select, message } from 'antd';
import { connect } from 'react-redux'
import { fail } from 'assert';

const Option = Select.Option;

class ProjectCreate extends Component {
    
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
											' foi cadastrado com sucesso!');
				} else {
					message.error('Não foi possível cadastrar o usuário.' + 
								  'Entre em contato com o desenvolvedor!');
				}
				this.props.history.push('/');			
			} else {

			}	
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		return (
			<Form onSubmit = { this.handleSubmit } >
				<Form.Item label = 'Usuário'>
					{
						getFieldDecorator('username', {
							rules: [{ 
								required: true, 
								message: 'Por favor, Coloque Seu Usuário!' 
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

				<Form.Item>
					<Button 
						type = 'primary' 
						htmlType = 'submit' 
						style = {{
							marginRight: '10px'
						}} >
						Cadastrar
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

const ProjectCreateForm = Form.create()(ProjectCreate);

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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreateForm);
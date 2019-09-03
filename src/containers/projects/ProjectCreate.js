import React, { Component } from 'react';
import { Form, Input, Icon, Button, message } from 'antd';
import { connect } from 'react-redux'
import { fail } from 'assert';

import { createProject } from '../../store/actions/project';

class ProjectCreate extends Component {
    
    state = {
		confirmDirty: false,
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {

				console.log(this.props.token)
				const token = this.props.token;
				const project = {
					title: values.title,
					status: 'Pendente'
				};
				console.log(project)
				if((this.props.createProject(token, project)) !== fail) {
					message.success('O projeto foi cadastrado com sucesso');
				} else {
					message.error('Não foi possível cadastrar o projeto.' + 
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
				<Form.Item label = 'Título'>
					{
						getFieldDecorator('title', {
							rules: [{ 
								required: true, 
								message: 'Por favor, Coloque o Título!' 
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
								placeholder = 'Usuário'
							/>,
						)
					}
				</Form.Item>

				<Form.Item label = 'Status'>
					{
						getFieldDecorator('status', {
							
						})(
							<Input 
								prefix = {
									<Icon 
										type = 'mail' 
										style = {{ 
											color: 'rgba(0,0,0,.25)' }} 
									/>
								}
								placeholder = 'Pendente'
								disabled = { true }
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
		error: state.error,
		token: state.auth.token
	}
}

const mapDispatchToProps = dispatch => {
	return {
		createProject: (token, project) => dispatch(createProject(token, project))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreateForm);
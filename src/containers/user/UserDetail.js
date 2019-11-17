import React, { Component } from 'react';
import { Skeleton, Form, Input, Button, Modal, message, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Homepage from '../homepage/Homepage';
import Hoc from '../../hoc/hoc';

import { getUser, deleteUser } from '../../store/actions/auth';

const { confirm } = Modal;

class UserDetail extends Component {

	constructor() {
		
		super();
		this.state = {
			formLayout: 'vertical',
		};
	}

	componentDidMount() {

		if (this.props.token !== undefined && this.props.token !== null) {
			this.props.getUser(this.props.token, this.props.currentUser.userId);
		}
	}

	UNSAFE_componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {
				this.props.getUser(newProps.token, newProps.currentUser.userId);
			}
		}
	}

	showDeleteConfirm = (token, name, userId) => {
		
		const propsForms = this.props;
		
		confirm ({
			title: 'Exclusão de Conta',
			content: 'Tem Certeza Que Deseja Excluir a Conta de ' + name + '?',
			okText: 'Sim',
			okType: 'danger',
			cancelText: 'Não',
		
			onOk() {
				propsForms.deleteUser(token, userId);
				Modal.success({
					title: 'Ação Concluída!',
					content: 'Conta Excluída Com Sucesso!',
				});
				propsForms.history.push('/')
			},
			onCancel() {
				message.success('Exclusão de Conta Cancelada Com Sucesso!');
			},
		});
	}

	render() {

		const { currentUser } = this.props;
		let token = this.props.token;
		const { formLayout } = this.state;
		const formItemLayout = formLayout === 'vertical'? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
		}
		: null;

		if(currentUser.sector === null) {
			currentUser.sector = 'Não Possui Setor no Momento';
		}

		if(token === undefined) {
			const user = JSON.parse(localStorage.getItem('user'));
			token = user.token;
		}

		return (

			<Hoc>
				{
					this.props.token === null ? (
						<Homepage/>
					) : (
						this.props.loading ? (
							<Skeleton active />
						) : (
							<Hoc>
								<div className = 'content'>
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
										
										<Form.Item>
											<div align = 'center'>
												<Button
													className = 'buttonEdit' 
													type = 'ghost' 
													htmlType = 'submit' 
												>
													<Link to = { '/alterar_informacoes/' } >
														<Icon 
															className = 'icons'
															type = 'edit' 
															/>
															Editar Perfil
													</Link>
												</Button>
												<Button 
													className = 'buttonDelete'
													onClick = { () => 
															this.showDeleteConfirm(
																token,
																currentUser.name,
																currentUser.id
															)} 
													type = 'ghost'
												>
													<Icon type = 'delete' />
													Excluir Perfil 
												</Button>
											</div>
										</Form.Item>
									</Form>
								</div>
							</Hoc>
						)
					)
				}
			</Hoc>
		);
	}
}

const UserDetailForm = Form.create()(UserDetail);

const mapStateToProps = state => {

	return {

		token: state.auth.token,
		currentUser: state.auth.currentUser
	};
};

const mapDispatchToProps = dispatch => {

	return {

		getUser: (token, userId) => dispatch(getUser(token, userId)),
		deleteUser: (token, userId) => dispatch(deleteUser(token, userId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailForm);
import React, { Component } from 'react';
import { Skeleton, Form, Input, Button, Modal, message, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getUser, deleteUser } from '../../store/actions/auth';
import Hoc from '../../hoc/hoc';

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
		const user = JSON.parse(localStorage.getItem('user'));
		const userId = user.userId;
		const token = user.token;
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
							<Form layout = 'vertical'>
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
								
								<Form.Item label = 'Ramal' { ...formItemLayout }>
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
										<Form.Item label='Tipo de Usuário' { ...formItemLayout } >
											<Input 
												value = 'Participante da Reunião'
												disabled = { true } />
										</Form.Item>
									) : null	
								}
								
								<Form.Item>
									<div align = 'center'>
										<Button 
											type = 'primary' 
											htmlType = 'submit' 
											style = {{ marginRight: '20px' }}
										>

											<Link to = { '/alterar_informacoes/' } >
												<Icon 
													type = 'edit' 
													style = {{ marginRight: '10px' }} />
												    Editar Perfil
											</Link>
										</Button>
										<Button 
											onClick = { () => 
													this.showDeleteConfirm(
														token,
														this.props.name,
														userId)} 
											type = 'danger' >
												<Icon type = 'delete' />
												Excluir Perfil 
										</Button>
									</div>
								</Form.Item>
							</Form>
						</Hoc>
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
		deleteUser: (token, userId) => dispatch(deleteUser(token, userId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailForm);
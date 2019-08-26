import React from 'react';
import { Skeleton, Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateUser } from '../../store/actions/auth';
import Hoc from '../../hoc/hoc';

class UserEdit extends React.Component {

    constructor() {
		super();
		this.state = {
			formLayout: 'horizontal',
		};
	}
	
	componentDidMount() {
		if (this.props.token !== undefined && this.props.token !== null) {
			this.props.updateUser(this.props.token, this.props.userId);
		}
	}

	UNSAFE_componentWillReceiveProps(newProps) {
		if (newProps.token !== this.props.token) {
			if (newProps.token !== undefined && newProps.token !== null) {
				this.props.updateUser(newProps.token, newProps.userId);
			}
		}
	}

    render() {
        const { formLayout } = this.state;
		const formItemLayout = formLayout === 'horizontal'? {
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
							<div align='center'>
								<Form.Item label='Nome' {...formItemLayout}>
									<Input value={this.props.name} disabled = {true} />
								</Form.Item>
								<Form.Item label='Usuário' {...formItemLayout}>
									<Input value={this.props.username} disabled = {true} />
								</Form.Item>
								<Form.Item label='Email' {...formItemLayout}>
									<Input value={this.props.email} disabled = {true} />
								</Form.Item>
								<Form.Item label='Ramal' {...formItemLayout}>
									<Input value={this.props.ramal} disabled = {true} />
								</Form.Item>

								{
									this.props.is_administrator === true ? (
										<Form.Item label='Tipo de Usuário' {...formItemLayout}>
											<Input 
												value='Administrador' 
												disabled={true} />
										</Form.Item>
									) : null
								}

								{
									this.props.is_participant === true ? (
										<Form.Item label='Tipo de Usuário' {...formItemLayout}>
											<Input 
												value='Participante da Reunião'
												disabled={true} />
										</Form.Item>
									) : null	
								}
								<Button type='primary'>
									<Link to={`/alterar_informacoes/`}>
										Editar Perfil
									</Link>
								</Button>
								<Button type='danger'>
									<Link to={`/alterar_informacoes/`}>
										Excluir Perfil
									</Link>
								</Button>
							</div>
						</Hoc>
					)
				}
			</Hoc>
		);
    }
}

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
		updateUser: (token, userId) => dispatch(updateUser(token, userId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
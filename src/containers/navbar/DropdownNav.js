import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './navbar.css';

class DropdownNav extends React.Component {

    render () {
		return (
        	<div>
				<Dropdown overlay={
					<Menu>
						<Menu.Item key="0">
							<Icon type="user"/>
								<Link to={`/informacoes_usuario/`}>
									Visualizar Perfil
								</Link>
						</Menu.Item>
						<Menu.Item key="1">
							<Icon type="edit"/>
								<Link to="#">
									Editar Perfil
								</Link>
						</Menu.Item>
						<Menu.Item key="2">
							<Icon type="delete"/>
								<Link to="#">
									Excluir Perfil
								</Link>
						</Menu.Item>
					</Menu>
				} trigger={['click']}>
					<a className='ant-dropdown-link' href={`/informacoes_usuario/${this.props.userId}`}>
						<Icon type='user' /> Usuário <Icon type='down' />
					</a>
				</Dropdown>
				<Dropdown overlay={menuParticipant} trigger={['click']}>
					<a className='ant-dropdown-link' href='/'>
						<Icon type='team' /> Participante <Icon type='down' />
					</a>
				</Dropdown>
				<Dropdown trigger={['click']}>
					<a className='ant-dropdown-link' href='/'>
						<Icon type='book' /> Manual
					</a>
				</Dropdown>
          </div>
        );
    }
}

const menuParticipant = (
	<Menu>
		<Menu.Item key="0">
			<Icon type="user-add" /><Link to="/signup/">Adicionar Usuários</Link>
		</Menu.Item>
		<Menu.Item key="1">
			<Icon type="team" /><Link to="#">Visualizar Usuários</Link>
		</Menu.Item>
		<Menu.Item key="2">
			<Icon type="edit" /><Link to="#">Alterar Permissões</Link>
		</Menu.Item>
	</Menu>
);

const mapStateToProps = state => {
    return {
        
    };
};

export default withRouter(connect(mapStateToProps)(DropdownNav));
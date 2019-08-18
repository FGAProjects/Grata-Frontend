import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './navbar.css';

class DropdownNav extends React.Component {

    render () {
		return (
        	<div>
				<Dropdown overlay={menuUser} trigger={['click']}>
					<a className='ant-dropdown-link' href='/'>
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

const menuUser = (
	<Menu>
		<Menu.Item key="0">
			<Icon type="user" /> <Link to="#">Visualizar Perfil</Link>
		</Menu.Item>
		<Menu.Item key="1">
			<Icon type="edit" /> <Link to="#">Editar Perfil</Link>
		</Menu.Item>
		<Menu.Item key="2">
			<Icon type="delete" /> <Link to="#">Excluir Perfil</Link>
		</Menu.Item>
	</Menu>
);

const menuParticipant = (
	<Menu>
		<Menu.Item key="0">
			<Icon type="user-add" /> <Link to="#">Adicionar Usuários</Link>
		</Menu.Item>
		<Menu.Item key="1">
			<Icon type="team" /> <Link to="#">Visualizar Usuários</Link>
		</Menu.Item>
		<Menu.Item key="2">
			<Icon type="edit" /> <Link to="#">Alterar Permissões</Link>
		</Menu.Item>
	</Menu>
)

export default withRouter(connect()(DropdownNav));

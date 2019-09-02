import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom';

import './navbar.css';

class DropdownNav extends React.Component {

    render () {
		return (
        	<div>
				<Dropdown overlay = { 
					<Menu>
						<Menu.Item key = '0' >
							<Icon type = 'user' />
								<Link to = { '/informacoes_usuario/' } >
									Visualizar Perfil
								</Link>
						</Menu.Item>
						<Menu.Item key = '1' >
							<Icon type = 'edit' />
								<Link to= { '/alterar_informacoes/' } >
									Editar Perfil
								</Link>
						</Menu.Item>
					</Menu>
				 } trigger = { ['click'] } >
					<a className = 'ant-dropdown-link' 
						href={ `/informacoes_usuario/` } >
						<Icon type = 'user' />  Usuário <Icon type='down' />
					</a>
				</Dropdown>

				<Dropdown overlay = { 
					<Menu>
						<Menu.Item key = '0' >
							<Icon type="user-add" />
								<Link to = '/adicionar_usuario/' >
									Adicionar Usuário
								</Link>
						</Menu.Item>
				
						<Menu.Item key = '1' >
							<Icon type = 'team' />
								<Link to = '/lista_usuarios/' >
									Visualizar Usuários
								</Link>
						</Menu.Item>
					</Menu>
				 } trigger = { ['click'] } >
					<a className = 'ant-dropdown-link' href='/'>
						<Icon type = 'team' /> Participante <Icon type='down' />
					</a>
				</Dropdown>

				<Dropdown overlay={ 
					<Menu>
						<Menu.Item key = '0' >
							<Icon type = 'project' />
								<Link to = { '/criar_projeto/' } >
									Adicionar Projeto
								</Link>
						</Menu.Item>
						<Menu.Item key = '1' >
							<Icon type = 'ordered-list' />
								<Link to= { '/lista_projetos/' } >
									Visualizar Projetos
								</Link>
						</Menu.Item>
					</Menu>
				 } trigger = { ['click'] } >
					<a className = 'ant-dropdown-link' 
						href={ `/informacoes_usuario/` } >
						<Icon type = 'unordered-list' />  Projetos <Icon type='down' />
					</a>
				</Dropdown>
				<Dropdown trigger = { ['click'] } >
					<a className = 'ant-dropdown-link' href='/' >
						<Icon type = 'book' /> Manuais
					</a>
				</Dropdown>
          </div>
        );
    }
}

export default DropdownNav;
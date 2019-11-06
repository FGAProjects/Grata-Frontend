import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom';

import './navbar.css';

class DropdownNav extends Component {

    render () {

		return (

        	<div>
				<Dropdown className = 'dropdown' overlay = { 
					<Menu>
						<Menu.Item key = '0'>
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
						<Icon type = 'user' />  Usuário <Icon type = 'down' />
					</a>
				</Dropdown>

				<Dropdown overlay = { 
					<Menu>
						<Menu.Item key = '0' >
							<Icon type = 'user-add' />
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
						<Icon type = 'team' /> Participante <Icon type = 'down' />
					</a>
				</Dropdown>

				<Dropdown overlay = { 
					<Menu>
						<Menu.Item key = '0' >
							<Icon type = 'project' />
								<Link to = { '/criar_setor/' } >
									Adicionar Setor
								</Link>
						</Menu.Item>
						<Menu.Item key = '1' >
							<Icon type = 'ordered-list' />
								<Link to= { '/lista_de_setores/' } >
									Visualizar Setores
								</Link>
						</Menu.Item>
					</Menu>
				 } trigger = { ['click'] } >
					<a className = 'ant-dropdown-link' 
						href={ `/lista_de_setores/` } >
						<Icon type = 'unordered-list' />  Setores <Icon type = 'down' />
					</a>
				</Dropdown>

				<Dropdown overlay = { 
					<Menu>
						<Menu.Item key = '0' >
							<Icon type = 'project' />
								<Link to = { '/criar_projeto/' } >
									Adicionar Projeto
								</Link>
						</Menu.Item>
						<Menu.Item key = '1' >
							<Icon type = 'ordered-list' />
								<Link to = { '/lista_de_projetos/' } >
									Visualizar Projetos
								</Link>
						</Menu.Item>
					</Menu>
				 } trigger = { ['click'] } >
					<a className = 'ant-dropdown-link' 
						href ={ `/lista_de_projetos/` } >
						<Icon type = 'unordered-list' />  Projetos <Icon type = 'down' />
					</a>
				</Dropdown>
				<Dropdown trigger = { ['click'] } >
					<a className = 'ant-dropdown-link' href ='/' >
						<Icon type = 'book' /> Manuais
					</a>
				</Dropdown>
          </div>
        );
    }
}

export default DropdownNav;
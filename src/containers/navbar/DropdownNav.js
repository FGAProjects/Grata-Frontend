import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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
					</Menu>
				 } trigger = { ['click'] } >
					<a className = 'ant-dropdown-link' 
						href={ `/informacoes_usuario/` } >
						<Icon type = 'user' />  Usuário <Icon type = 'down' />
					</a>
				</Dropdown>

				<Dropdown overlay = { 
					<Menu>
						<Menu.Item key = '1' >
							<Icon type = 'team' />
								<Link to = '/opcoes_usuario/' >
									Opções Usuário
								</Link>
						</Menu.Item>
					</Menu>
				 } trigger = { ['click'] } >
					<a className = 'ant-dropdown-link' href='/opcoes_usuario/'>
						<Icon type = 'team' /> Participante <Icon type = 'down' />
					</a>
				</Dropdown>

				<Dropdown overlay = { 
					<Menu>
						<Menu.Item key = '1' >
							<Icon type = 'ordered-list' />
								<Link to= { '/opcoes_setores/' } >
									Opções Setores
								</Link>
						</Menu.Item>
					</Menu>
				 } trigger = { ['click'] } >
					<a className = 'ant-dropdown-link' 
						href={ `/opcoes_setores/` } >
						<Icon type = 'unordered-list' />  Setores <Icon type = 'down' />
					</a>
				</Dropdown>

				<Dropdown overlay = { 
					<Menu>
						{
							this.props.is_administrator === true ? (
								<Menu.Item key = '0' >
									<Icon type = 'project' />
										<Link to = { '/criar_projeto/' } >
											Adicionar Projeto
										</Link>
								</Menu.Item>
							) : null
						}
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
				<Dropdown overlay = { 
					<Menu>
						<Menu.Item key = '1' >
							<Icon type = 'ordered-list' />
								<Link to= { '/manuais/' } >
									Visualizar Manuais
								</Link>
						</Menu.Item>
					</Menu>
				 } trigger = { ['click'] } >
					<a className = 'ant-dropdown-link' 
						href={ `/lista_de_setores/` } >
						<Icon type = 'unordered-list' />  Manuais <Icon type = 'down' />
					</a>
				</Dropdown>
          </div>
        );
    }
}

const mapStateToProps = state => {

	return {

		token: state.auth.token,
	  	is_administrator: state.auth.is_administrator
  	};
};

export default withRouter(connect(mapStateToProps)(DropdownNav));
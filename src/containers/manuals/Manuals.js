import React, { Component } from 'react';
import { Tabs } from 'antd';
import { connect } from 'react-redux';

import Homepage from '../homepage/Homepage';
import Hoc from '../../hoc/hoc';

import criar_novo_usuario_navbar from '../../images/criando_usuario_navbar.png';
import criar_novo_usuario from '../../images/criando_novo_usuario.png';
import editar_informacoes_navbar from '../../images/editar_informacoes_navbar.png';
import setores_editar_informacoes from '../../images/setores_editar_informacoes.png';
import visualizar_usuarios_navbar from '../../images/visualizar_usuarios_navbar.png';
import lista_usuarios from '../../images/lista_usuarios.png';

const { TabPane } = Tabs;

class Manuals extends Component {

    callback(key) {

    }

    render() {
        return (

            <Hoc>
                {
                    this.props.token === null ? (
                        <Homepage/>
                    ) : (
                        <div className = 'content'>
                            <Tabs defaultActiveKey = '1' onChange = { this.callback }>
                                
                                <TabPane tab = 'Usuários' key = '1'>
                                    <h2 className = 'formath2'>
                                        <b> Quais São os Tipos de Usuários Que Possuem no Sistema? </b>
                                    </h2>
                                    <p className = 'format'> 
                                        No sistema Grata existem dois tipos de usuários: <b>Administrador</b> e
                                        <b> Participante da Reunião</b>. O administrador é aquele que possui todas
                                        as permissões no sistema. 
                                    </p>
                                    <p className = 'format'>
                                        Somente o administrador é aquele que possui permissão para criar usuários, 
                                        colocar usuários em reuniões, além de poder criar projetos, setores e 
                                        reuniões. 
                                        O administrador é o que define o tipo de permissão que cada usuário possui.
                                    </p>
                                    <p className = 'format'>
                                        O participante da reunião é o usuário "comum" do sistema. O usuário da
                                        reunião pode editar suas informações, participar das reuniões, além de
                                        poder opinar e observar os resultados dos questionários das reuniões.
                                    </p>

                                    <h2 className = 'formath2'> 
                                        <b> Quais São os Primeiros Passos do Usuário no Sistema? </b>
                                    </h2>
                                    <h3 className = 'formath2'>
                                        <b> Criando o Usuário </b>
                                    </h3>
                                    <p className = 'format'>
                                        Para criar um novo usuário, basta ir a barra de navegação e clicar
                                        em "Adicionar Usuário", na opção de "Participante", como mostra a figura
                                        a seguir:
                                        <img className = 'imgs' src = { criar_novo_usuario_navbar } alt = ''/>
                                        Após clicar em "Adicionar Usuário", será mostrado a tela a seguir.
                                        Basta preencher o formulário e o usuário será adicionado ao
                                        sistema:
                                        <img className = 'imgs' src = { criar_novo_usuario } alt = ''/>
                                    </p>

                                    <h3 className = 'formath2'>
                                        <b> Adicionando o Usuário ao Setor </b>
                                    </h3>

                                    <p className = 'format'>
                                        O administrador deve inicialmente criar o setor em que trabalha. Após criar
                                        o setor, todos os usuários do setor devem editar suas informações e adicionar
                                        o setor em que trabalha. Para isso, basta seguir o exemplo a seguir:
                                        <img className = 'imgs' src = { editar_informacoes_navbar } alt = ''/>
                                        <img className = 'imgs' src = { setores_editar_informacoes } alt = '' />
                                    </p>
                                    <p className = 'format'>
                                        Após ter escolhido o setor em que trabalha, você estará pronto para
                                        utilizar cada vez mais recursos do sistema.
                                        Agora será possível visualizar a lista de todos os usuários cadastrados
                                        com suas respectivas permissões ao clicar na opção "Visualizar Usuários",
                                        na <i>navbar</i>. Como mostrado na imagem a seguir:
                                        <img className = 'imgs' src = { visualizar_usuarios_navbar } alt = ''/>
                                        <img className = 'imgListUsers' src = { lista_usuarios } alt = ''/>
                                    </p> 
                                </TabPane>
                                
                                <TabPane tab = 'Setores' key = '2'>
                                    Content of Tab Pane 2
                                </TabPane>
                                
                                <TabPane tab = 'Tab 3' key = '3'>
                                    Content of Tab Pane 3
                                </TabPane>
                            </Tabs>
                        </div>
                    )
                }
            </Hoc>
        );
    }
}

const mapStateToProps = state => {
	
	return {
	
		token: state.auth.token,
    };
};

const mapDispatchToProps = dispatch => {
	
	return {
	
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manuals);
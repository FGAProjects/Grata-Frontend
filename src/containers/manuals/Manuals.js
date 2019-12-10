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
import criando_setor_navbar from '../../images/criando_setor_navbar.png';
import criando_setor from '../../images/criando_setor.png';
import editando_setor from '../../images/editando_setor.png';
import excluindo_setor from '../../images/excluindo_setor.png';
import lista_setores_navbar from '../../images/lista_setor.png';
import lista_de_setores from '../../images/lista_de_setores.png';
import editando_projeto from '../../images/alterando_projeto.png';
import criando_projeto_navbar from '../../images/criando_projeto_navbar.png';
import criando_projeto from '../../images/criando_projeto.png';
import lista_de_projetos_navbar from '../../images/lista_de_projetos_navbar.png';
import lista_de_projetos from '../../images/lista_de_projetos.png';
import excluindo_projeto from '../../images/excluindo_projeto.png';

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
                            <Tabs 
                                defaultActiveKey = '1' 
                                onChange = { this.callback }
                                className = 'contentTab'
                            >
                                
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
                                    <h2 className = 'formath2'> 
                                        <b> O que é o Setor? </b>
                                    </h2>
                                    <p className = 'format'> 
                                        O setor é uma parte fundamental para uma institução, e assim como
                                        nas empresas, o setor é onde ficam lotados os colaboradores da instituição.
                                    </p>
                                    <h3 className = 'formath2'> 
                                        <b> Criando um Setor </b>
                                    </h3>
                                    <p className = 'format'>
                                        O setor é algo que apenas os usuários com a permissão de administradores
                                        podem criar. Para a criação de um setor no sistema Grata, basta seguir
                                        os seguintes passos:
                                        <img className = 'imgs' src = { criando_setor_navbar } alt = ''/>
                                        <img className = 'imgs' src = { criando_setor } alt = ''/>
                                    </p>
                                    <h3 className = 'formath2'>
                                        <b> Editando um Setor </b>
                                    </h3>
                                    <p className = 'format'>
                                        Para editar um setor primeiro tem que se chegar a lista dos setores,
                                        como mostrado a seguir:
                                        <img className = 'imgs' src = { lista_setores_navbar } alt = ''/>
                                        <img className = 'imgListUsers' src = { lista_de_setores } alt = ''/>
                                    </p>
                                    <p className = 'format'>
                                        Ao clicar na opção "Editar Setor", o sistema irá abrir a página de
                                        edição do setor. Em todas as páginas do sistema, antes de alterar
                                        alguma informação, será mostrado as informações pré-cadastradas e um
                                        formulário com os campos para alteração das informações. Após preenchidos
                                        os campos, basta clicar no campo "Alterar Informações", como mostrado na 
                                        imagem a seguir:
                                        <img className = 'imgs' src = { editando_setor } alt = ''/>
                                    </p>
                                    <h3 className = 'formath2'>
                                        <b> Excluindo um Setor </b>
                                    </h3>
                                    <p className = 'format'>
                                        Para excluir o usuário, a imagem será identica a imagem acima,
                                        contudo, a opção a ser escolhida é a "Excluir Setor".
                                        <img className = 'imgs' src = { excluindo_setor } alt = ''/>
                                    </p>
                                </TabPane>
                                
                                <TabPane tab = 'Projetos' key = '3'>
                                    <h2 className = 'formath2'>
                                        <b> O que é o Projeto? </b>
                                    </h2>
                                    <p className = 'format'>
                                        O projeto é uma parte fundamental dentro de uma instituição. Um projeto
                                        pode ser formado por uma ou por diversas reuniões. Um projeto necessariamente
                                        está ligado há um setor qualquer e possui suas reuniões independentes dentro do
                                        próprio projeto.
                                    </p>
                                    <h3 className = 'formath2'>
                                        <b> Criando um Projeto </b>
                                    </h3>
                                    <p className = 'format'>
                                        Um projeto pode ser criado seguinte os seguintes passos:
                                        Clicar na opção "Adicionar Projeto" na aba "Projetos":
                                        <img className = 'imgs' src = { criando_projeto_navbar } alt = ''/>
                                        Após seguir o passo da imagem acima, basta preencher o formulário e
                                        apertar o botão "Cadastrar Projeto":
                                        <img className = 'imgs' src = { criando_projeto } alt = ''/>
                                    </p>
                                    <h3 className = 'formath2'>
                                        <b> Listando os Projetos </b>
                                    </h3>
                                    <p className = 'format'>
                                        Para visualizar os projetos adicionados, basta clicar na opção
                                        "Visualizar Projetos" na aba "Projetos":
                                        <img className = 'imgs' src = { lista_de_projetos_navbar } alt = ''/>
                                        Como dito anteriormente, os projetos são divididos nos setores, logo a lista
                                        de setores só mostraram os projetos que pertencem ao setor em que o usuário logado
                                        está lotado. Além dos projetos setoriais, quando o usuário for alocado em alguma
                                        reunião, será mostrado as reuniões especificas na parte inferior da página:
                                        <img className = 'imgListUsers' src = { lista_de_projetos } alt = ''/>
                                    </p>
                                    <h3 className = 'formath2'>
                                        <b> Editando e Excluindo o Projeto </b>
                                    </h3>
                                    <p className = 'format'>
                                        Para editar as informações de um projeto, basta clicar no botão "Editar Projeto"
                                        e o sistema irá abrir a seguinte página:
                                        <img className = 'imgs' src = { editando_projeto } alt = ''/>
                                    </p>
                                    <p className = 'format'>
                                        Para alterar as informações basta preencher o formulário com as informações
                                        desejadas e clicar no botão "Alterar Informações".
                                    </p>
                                    <p className = 'format'>
                                        Para excluir o projeto, clicar no botão "Excluir Projeto".
                                        <img className = 'imgs' src = { excluindo_projeto } alt = ''/>
                                        {/* <b style = {{ color: 'red' }}> Observação: </b> */}
                                    </p>
                                </TabPane>

                                <TabPane tab = 'Reuniões' key = '4'>
                                    Reuniões
                                </TabPane>

                                <TabPane tab = 'Questionários' key = '5'>
                                    Questionários
                                </TabPane>

                                <TabPane tab = 'Resultados' key = '6'>
                                    Resultados
                                </TabPane>

                                <TabPane tab = 'Informações Importantes' key = '7'>
                                    Informações Importantes
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
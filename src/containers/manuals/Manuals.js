import React, { Component } from 'react';
import { Tabs } from 'antd';
import { connect } from 'react-redux';

import Homepage from '../homepage/Homepage';
import Hoc from '../../hoc/hoc';

import criar_novo_usuario_navbar from '../../images/users/criando_usuario_navbar.png';
import criar_novo_usuario from '../../images/users/criando_novo_usuario.png';
import editar_informacoes_navbar from '../../images/users/editar_informacoes_navbar.png';
import visualizar_usuarios_navbar from '../../images/users/visualizar_usuarios_navbar.png';
import lista_usuarios from '../../images/users/lista_usuarios.png';

import setores_editar_informacoes from '../../images/sectors/setores_editar_informacoes.png';
import criando_setor_navbar from '../../images/sectors/criando_setor_navbar.png';
import criando_setor from '../../images/sectors/criando_setor.png';
import editando_setor from '../../images/sectors/editando_setor.png';
import excluindo_setor from '../../images/sectors/excluindo_setor.png';
import lista_setores_navbar from '../../images/sectors/lista_setor.png';
import lista_de_setores from '../../images/sectors/lista_de_setores.png';

import editando_projeto from '../../images/projects/alterando_projeto.png';
import criando_projeto_navbar from '../../images/projects/criando_projeto_navbar.png';
import criando_projeto from '../../images/projects/criando_projeto.png';
import lista_de_projetos_navbar from '../../images/projects/lista_de_projetos_navbar.png';
import lista_de_projetos from '../../images/projects/lista_de_projetos.png';
import excluindo_projeto from '../../images/projects/excluindo_projeto.png';

import confirmar_reuniao from '../../images/meetings/confirmar_reuniao.png';
import detalhes_reuniao from '../../images/meetings/detalhes_reuniao.png';
import editar_reuniao from '../../images/meetings/editar_reuniao.png';
import excluir_reuniao from '../../images/meetings/excluir_reuniao.png';
import formulario_reuniao from '../../images/meetings/formulario_reuniao.png';
import lista_de_usuarios_reuniao from '../../images/meetings/lista_de_usuarios_reuniao.png';
import lista_reunioes from '../../images/meetings/lista_reunioes.png';
import nova_reuniao from '../../images/meetings/nova_reuniao.png';
import reuniao_confirmada from '../../images/meetings/reuniao_confirmada.png';
import ata from '../../images/meetings/ata.png';

import questtionaire from '../../images/questtionaire/questtionaire.png';

import comments from '../../images/results/comments.png';

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
                                        <b style = {{ color: 'red' }}> Observação: </b>
                                        Ao excluir um projeto, todas as informações relacionadas as reuniões
                                        ligadas a este projeto serão <b style = {{ color: 'red' }}> PERDIDAS </b>.
                                    </p>
                                </TabPane>

                                <TabPane tab = 'Reuniões' key = '4'>
                                    <h2 className = 'formath2'>
                                        <b> O Que São as Reuniões? </b>
                                    </h2>
                                    <p className = 'format'>
                                        Reuniões são encontros institucionais que possuem objetivo de tratar
                                        de projetos. Uma reunião bem sucedida é que aquela que consegue cumprir
                                        seus objetivos de maneira rápida, não se prologando desnecessariamente.
                                    </p>
                                    <h3 className = 'formath2'>
                                        <b> Criando Uma Reunião </b>
                                    </h3>
                                    <p className = 'format'>
                                        Para criar uma reunião, o administrador deve clicar no projeto em que deseja
                                        criar a reunião, como mostrado abaixo:
                                        <img className = 'imgListUsers' src = { lista_de_projetos } alt = ''/>
                                        Após selecionar o projeto específico, basta clicar no botão "Nova Reunião".
                                        <img className = 'imgListUsers' src = { nova_reuniao } alt = ''/>
                                        Preenchendo o formulário, será possível visualizar que o local da reunião será
                                        o setor em que a reunião será localizada. Todas as reuniões possuem um "líder da
                                        reunião", e esta pessoa é o administrador que cria a reunião.
                                        <img className = 'imgs' src = { formulario_reuniao } alt = ''/>
                                    </p>
                                    <h3 className = 'formath2'>
                                        <b> Lista de Reuniões </b>
                                    </h3>
                                    <p className = 'format'> 
                                        As reuniões do projeto são mostradas na lista de reuniões do projeto,
                                        sendo apresentadas todas as informações das mesmas e seus "status". O status 
                                        definem a situação atual do projeto.
                                        <img className = 'imgListUsers' src = { lista_reunioes } alt = ''/>
                                    </p>
                                    <h3 className = 'formath2'>
                                        <b> Status </b>
                                    </h3>
                                    <p className = 'format'>
                                        Todas as reuniões possuem um status. Esses atributos se remetem a situação
                                        atual da reunião e são divididos em quatro status: 
                                        <b style = {{ color: 'orange' }}> Pendente </b>,
                                        <b style = {{ color: 'blue' }}> Agendada </b>,
                                        <b style = {{ color: 'green' }}> Confirmada </b>,
                                        <b style = {{ color: 'red' }}> Cancelada </b>.
                                        Uma reunião com o status de 
                                        <b style = {{ color: 'orange' }}> "Pendente" </b>,
                                        , significa que ainda possuem passos
                                        a serem realizados, como usuários a serem adicionados a reunião, tópicos e regras
                                        de conduta faltando a reunião. Após esses elementos serem adicionados, bastará clicar no
                                        botão "Confirmar Reunião", como mostrado a seguir:
                                        <img className = 'imgListUsers' src = { confirmar_reuniao } alt = ''/>
                                        Após serem preenchidos todos os detalhes que completam a ata da reunião, a 
                                        reunião passa automaticamente para o status de 
                                        <b style = {{ color: 'blue' }}> Agendada </b>. Neste status, ainda é possível
                                        editar a reunião. Após apertar o botão "Confirmar Reunião", a reunião não poderá
                                        ser mais editada, por tanto cuidado. Agora a reunião passa a ter o status de
                                        <b style = {{ color: 'green' }}> Confirmada </b>, passando assim a possuir
                                        o direito ao lider da reunião a criar questionários e observar o resultado destes
                                        questionários. 
                                        <img className = 'imgListUsers' src = { reuniao_confirmada } alt = ''/>
                                        A reunião passa a possuir o status de
                                        <b style = {{ color: 'red' }}> Cancelada </b>, quando o lider da reunião resolve cancelar
                                        a reunião, e assim todos os dados referentes a esta reunião serão perdidos.
                                        <img className = 'imgs' src = { excluir_reuniao } alt = ''/>                     
                                    </p>
                                    <h3 className = 'formath2'>
                                        <b> Detalhes da Reunião </b>
                                    </h3>
                                    <p className = 'format'>
                                        Todos os usuários que estão envolvidos nesta reunião poderão visualizar
                                        os detalhes da reunião. Neste pequeno relatório mostra a maior parte dos
                                        dados referidos a ela:
                                        <img className = 'imgs' src = { detalhes_reuniao } alt = ''/>                     
                                    </p>
                                    <h3 className = 'formath2'>
                                        <b> Editar a Reunião </b>
                                    </h3>
                                    <p className = 'format'>
                                        A reunião pode ser editada apenas pelo lider da reunião. Todos os campos,
                                        exceto mudar o lider da reunião e o local da reunião podem ser alterados.
                                        <img className = 'imgs' src = { editar_reuniao } alt = ''/>                     
                                    </p>
                                    <h3 className = 'formath2'>
                                        <b> Lista de Usuários da Reunião </b>
                                    </h3>
                                    <p className = 'format'>
                                        Apenas o lider da reunião pode adicionar os usuários a reunião, contudo 
                                        todos os usuários que já estiverem escolhidos os seus setores, aparecem 
                                        disponíveis para serem adicionados a reunião. 
                                        <img className = 'imgs' src = { lista_de_usuarios_reuniao } alt = ''/>                     
                                    </p>
                                    <h3 className = 'formath2'>
                                        <b> Ata </b>
                                    </h3>
                                    <p className = 'format'>
                                        A Ata poderá ser vista quando o líder da reunião confirmar a reunião. Todos
                                        os usuários envolvidos na reunião poderão visualizar a ata.
                                        <img className = 'imgs' src = { ata } alt = ''/>                     
                                    </p>
                                </TabPane>

                                <TabPane tab = 'Questionários' key = '5'>
                                    <h2 className = 'formath2'>
                                        O Que é o Questionário?
                                    </h2>
                                    <p className = 'format'>
                                        O questionário para o Grata é um instrumento importante de 
                                        <i>feedbacks</i> para o lider da reunião. Apenas o líder da reunião
                                        pode criar um questionário e a partir dos resultados do questionário que
                                        o líder da reunião pode trabalhar a seu gosto.
                                        <img className = 'imgs' src = { questtionaire } alt = ''/>                     
                                    </p>
                                </TabPane>

                                <TabPane tab = 'Resultados' key = '6'>
                                    <h2 className = 'formath2'>
                                        <b> Resultados </b>
                                    </h2>
                                    <p className = 'format'>
                                        Um dos instrumentos para auxiliar o líder da reunião e os participantes
                                        da reunião, são os comentários. Os comentários podem ser adicionados por 
                                        todos os envolvidos na reunião ao fim do questionário.
                                        <img className = 'imgs' src = { comments } alt = ''/>                     
                                    </p>
                                </TabPane>

                                <TabPane tab = 'Informações Importantes' key = '7'>
                                    <p className = 'format'>
                                        <b>
                                            Por motivos desconhecidos, todos os instrumentos de cadastro e
                                            de amostras de informações podem não aparecer quando solicitados. Para
                                            resolver este problema, basta "Atualizar" a página, com um F5 do seu teclado.
                                        </b>
                                    </p>
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

export default connect(mapStateToProps)(Manuals);
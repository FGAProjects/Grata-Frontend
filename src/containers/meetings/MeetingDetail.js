import React, { Component } from 'react';
import { Form, Input, Button, Modal, Icon, message } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Hoc from '../../hoc/hoc';
import Homepage from '../homepage/Homepage';
import NotPermission from '../notPermission/NotPermission';

import { getUser } from '../../store/actions/auth';
import { getMeeting, updateMeeting } from '../../store/actions/meeting';

const { confirm } = Modal;

class MeetingDetail extends Component {

    constructor() {
		
		super();
		this.state = {
			formLayout: 'vertical'
		};
	}

    componentDidMount() {
        
        if (this.props.token !== undefined && this.props.token !== null) {
        
            this.forceUpdate();
            const user = JSON.parse(localStorage.getItem('user'));
		    const token = user.token;
            const meeting_id = this.props.match.params.meeting_id;
            this.props.getMeeting(token, meeting_id);
			this.props.getUser(token, this.props.currentUser.userId);
            this.forceUpdate();
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {
                
				this.forceUpdate();
				const meeting_id = newProps.match.params.meeting_id;
                this.props.getMeeting(newProps.token, meeting_id);
                this.props.getUser(newProps.token, newProps.currentUser.userId);
				this.forceUpdate();
            }
        }
    }

    cancelMeeting = (token, project_id, sector_id) => {
		
        const propsForms = this.props;
        const { currentMeeting } = this.props; 
		
		confirm ({
			title: 'Cancelar Reunião',
			content: 'Tem Certeza Que Deseja Cancelar Esta Reunião ? Esta Ação Não Poderá Ser Desfeita!',
			okText: 'Sim',
			okType: 'danger',
			cancelText: 'Não',
		
			onOk() {

                const meeting = {

                    meeting: currentMeeting.id,
                    status: 'Cancelada',
                    title: currentMeeting.title,
                    subject_matter: currentMeeting.subject_matter,
                    initial_date: currentMeeting.initial_date,
                    final_date: currentMeeting.final_date,
                    initial_hour: currentMeeting.initial_hour,
                    final_hour: currentMeeting.final_hour,
                    sector: sector_id,
                    project: project_id,
                };

				propsForms.updateMeeting(token, meeting);
				Modal.success({
					title: 'Ação Concluída!',
					content: 'Reunião Cancelada Com Sucesso!',
				});
                propsForms.history.push(`/lista_de_reunioes/${ project_id }/`);
			},
			onCancel() {
				message.success('Exclusão de Reunião Cancelada Com Sucesso!');
			},
		});
	}

    info () {
        
        Modal.info({
            title: 'Ata Incompleta',
            content: (
                <div>
                    <p> A Ata ainda não possui elementos a serem mostrados. </p>
                    <p> Cadastre os elementos informacionais da Ata clicando 
                        no botão ao lado 'Marcar Reunião'. </p>
                </div>
            ),
            onOk() {

            },
        });
    }

    confirmMeeting(currentMeeting, project_id) {

        const propsForms = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;

        confirm({
            title: ' Confirmação de Reunião',
            content: 'Ao Confirmar a Reunião, Não Será Possível Editar Mais a Reunião',
            onOk() {
                const meeting = {

                    id: currentMeeting.id,
					meeting: currentMeeting.id,
					title: currentMeeting.title,
					subject_matter: currentMeeting.subject_matter,
					status: 'Confirmada',
					initial_date: currentMeeting.initial_date,
					final_date: currentMeeting.final_date,
					initial_hour: currentMeeting.initial_hour,
					final_hour: currentMeeting.final_hour,
				};
                propsForms.updateMeeting(token, meeting);
                Modal.success({
					title: 'Ação Concluída!',
					content: 'Reunião Confirmada Com Sucesso!',
                });
                propsForms.history.push(`/reuniao_confirmada/${ currentMeeting.id }/${ project_id }/`)
            },
            onCancel() {
                message.success('Ação Cancelada Com Sucesso!');
            },
        });
    }
    
    render() {

		const { currentUser } = this.props;
        const project_id = this.props.match.params.project_id;
        const { currentMeeting } = this.props;
		const { formLayout } = this.state;
		const formItemLayout = formLayout === 'vertical'? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
		}
		: null;
        
        const formItemLayoutMinimum = formLayout === 'vertical'? {
            labelCol: { span: 4 },
            wrapperCol: { span: 3 },
		}
        : null;
        let permission = false;
        
        if(currentUser.name === currentMeeting.meeting_leader) {
            permission = true;
        } else {
            permission = false;
        }

        return (

            <Hoc>
                {
                    this.props.token === null ? (
                        <Homepage/>
                    ) : (
                        <div align = 'right'>
                            {
                                currentMeeting.status === 'Cancelada' ? (
                                    <p>  </p>
                                ) : (
                                    <Hoc>
                                        {
                                            permission === true ? (
                                               <Hoc>
                                                   {
                                                       currentMeeting.status === 'Agendada' ? (
                                                            <div>
                                                                <Button 
                                                                    type = 'ghost'
                                                                    className = 'buttonEdit' 
                                                                    htmlType = 'submit' 
                                                                    onClick = { () => this.confirmMeeting(
                                                                        currentMeeting,
                                                                        project_id
                                                                    )}
                                                                    style = {{
                                                                        marginTop: '40px',
                                                                        marginRight: '30px'
                                                                    }}
                                                                >
                                                                    Confirmar Reunião
                                                                </Button>
                                                            </div> 
                                                       ) : null
                                                   }
                                                </Hoc>  
                                            ) : <NotPermission/>
                                        }
                                        {
                                            permission === true ? (
                                                <Hoc>
                                                    {
                                                        currentMeeting.status === 'Confirmada' ? (
                                                            <Button 
                                                                type = 'ghost' 
                                                                className = 'buttonSave' 
                                                                style = {{
                                                                    marginTop: '40px', 
                                                                    marginLeft: '-10px',
                                                                    marginRight: '30px',
                                                                    marginBottom: '-20px'
                                                                }}
                                                            >
                                                                <Link to = { `/visualizar_ata/${ currentMeeting.id }/${ project_id }/ `} >
                                                                    Visualizar Ata
                                                                </Link>
                                                            </Button>
                                                        ) : null
                                                    }
                                                    
                                                </Hoc>
                                            ) : null
                                        }
                                        {
                                            permission === true ? (
                                                <Hoc>
                                                    {
                                                        currentMeeting.status === 'Pendente' ? (
                                                            <div align = 'right'>
                                                                <Button 
                                                                    type = 'ghost' 
                                                                    className = 'buttonAtaIncomplete'          
                                                                    onClick = { this.info }
                                                                >
                                                                    Visualizar Ata
                                                                </Button>
                                                                <Button type = 'ghost' className = 'buttonNew'>
                                                                    <Link to = { `/criar_topicos/${ currentMeeting.id }/`} >
                                                                        Marcar Reunião
                                                                    </Link>
                                                                </Button>
                                                            </div>
                                                        ) : null
                                                    }
                                                </Hoc>
                                            ) : <NotPermission/>
                                        }
                                        {
                                            currentMeeting.status === 'Cancelada' ? (
                                                <h1 className = 'texth1'> Esta Reunião Foi Cancelada </h1>
                                            ) : (
                                                <Hoc>
                                                    <div className = 'content'>
                                                        <h1 className = 'texth1'> Informações Cadastradas </h1>
                                                        <Form layout = 'vertical' className = 'formUser'>
                                                            <Form.Item 
                                                                label = 'Nome' 
                                                                { ...formItemLayout }
                                                                className = 'formFields'	
                                                        >
                                                            <Input 
                                                                value = { currentMeeting.title } 
                                                                disabled = { true } 
                                                            />
                                                            </Form.Item>

                                                            <Form.Item 
                                                                label = 'Assunto' 
                                                                { ...formItemLayout } 
                                                                className = 'formFields'
                                                            >
                                                                <Input 
                                                                    value = { currentMeeting.subject_matter } 
                                                                    disabled = { true } 
                                                                />
                                                            </Form.Item>

                                                            <Form.Item
                                                                label = 'Status'
                                                                { ...formItemLayoutMinimum }
                                                                className = 'formFields'    
                                                            >
                                                                <Input 
                                                                    value = { currentMeeting.status } 
                                                                    disabled = { true } 
                                                                />
                                                            </Form.Item>

                                                            <Form.Item 
                                                                label = 'Líder da Reunião' 
                                                                { ...formItemLayout }
                                                                className = 'formFields'
                                                            >
                                                                <Input 
                                                                    value = { currentMeeting.meeting_leader } 
                                                                    disabled = { true } 
                                                                />
                                                            </Form.Item>

                                                            <Form.Item 
                                                                label = 'Local' 
                                                                { ...formItemLayout }
                                                                className = 'formFields'
                                                            >
                                                                <Input 
                                                                    value = { currentMeeting.sector } 
                                                                    disabled = { true } 
                                                                />
                                                            </Form.Item>
                                                            <Form.Item 
                                                                label = 'Data de Inicio' 
                                                                { ...formItemLayoutMinimum }
                                                                className = 'formFields'    
                                                            >
                                                                <Input 
                                                                    value = { currentMeeting.initial_date } 
                                                                    disabled = { true } 
                                                                />
                                                            </Form.Item>
                                                            <Form.Item 
                                                                label = 'Hora de Inicio' 
                                                                { ...formItemLayoutMinimum }
                                                                className = 'formFields' 
                                                            >
                                                                <Input 
                                                                    value = { currentMeeting.initial_hour } 
                                                                    disabled = { true } 
                                                                />
                                                            </Form.Item>

                                                            <Form.Item 
                                                                label = 'Hora de Encerramento' 
                                                                { ...formItemLayoutMinimum }
                                                                className = 'formFields'
                                                            >
                                                                <Input 
                                                                    value = { currentMeeting.final_hour } 
                                                                    disabled = { true } 
                                                                />
                                                            </Form.Item>
                                                        </Form>
                                                        {
                                                            permission === true ? (
                                                                <div>
                                                                    {
                                                                        currentMeeting.status === 'Pendente' ? (
                                                                            <div align = 'center'>
                                                                                <Button 
                                                                                    type = 'ghost' 
                                                                                    className = 'buttonEdit' 
                                                                                    style = {{ marginBottom: '30px' }}
                                                                                >
                                                                                    <Link to = { `/editar_reuniao/${ currentMeeting.id }/${ project_id }` } >
                                                                                        <Icon type = 'edit' className = 'icons'/>
                                                                                        Editar Reunião
                                                                                    </Link>
                                                                                </Button>
                                                                                <Button className = 'buttonBack'>
                                                                                    <Link to = { `/lista_de_reunioes/${ project_id }/` } >
                                                                                        <Icon type = 'arrow-left' className = 'icons'/>
                                                                                            Voltar
                                                                                    </Link>
                                                                                </Button>
                                                                            </div>
                                                                        ) : null
                                                                    }
                                                                </div>
                                                            ) : (
                                                                <div align = 'center'>
                                                                    <Button className = 'buttonBack' style = {{ marginBottom: '30px' }}>
                                                                        <Link to = { `/lista_de_reunioes/${ project_id }/` } >
                                                                            <Icon type = 'arrow-left' className = 'icons'/>
                                                                                Voltar
                                                                        </Link>
                                                                    </Button>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            permission === true ? (
                                                                <div>
                                                                    {
                                                                        currentMeeting.status === 'Agendada' ? (
                                                                            <div align = 'center'>
                                                                                <Button className = 'buttonBack'>
                                                                                    <Link to = { `/lista_de_reunioes/${ project_id }/` } >
                                                                                       <Icon type = 'arrow-left' className = 'icons'/>
                                                                                        Visualizar Reuniões
                                                                                    </Link>
                                                                                </Button>
                                                                                <Button 
                                                                                    className = 'buttonSave' 
                                                                                    style = {{ 
                                                                                        marginBottom: '30px',
                                                                                        marginLeft: '20px'
                                                                                    }}>
                                                                                    <Link to = { `/adicionar_usuarios_a_reuniao/${ currentMeeting.id }/` } >
                                                                                        <Icon type = 'save' className = 'icons'/>
                                                                                            Adicionar Mais Usuários
                                                                                    </Link>
                                                                                </Button>
                                                                                
                                                                                <Button 
                                                                                    onClick = { () => this.cancelMeeting(
                                                                                        this.props.token, 
                                                                                        project_id
                                                                                    )}
                                                                                    type = 'ghost' 
                                                                                    htmlType = 'submit'
                                                                                    className = 'buttonDelete' 
                                                                                >
                                                                                    <Icon 
                                                                                        type = 'delete' 
                                                                                        style = {{ marginRight: '10px' }} />
                                                                                        Cancelar Reunião
                                                                                </Button>
                                                                            </div>
                                                                        ) : null
                                                                    }
                                                                </div>
                                                            ) : <NotPermission/>
                                                        }
                                                    </div>
                                                </Hoc>
                                            )
                                        }
                                    </Hoc>
                                )
                            }
                        </div>
                    )
                }
            </Hoc>
        );
    }
}

const MeetingDetailForm = Form.create()(MeetingDetail);

const mapStateToProps = state => {
	
	return {
	
		token: state.auth.token,
        loading: state.meeting.loading,
        currentMeeting: state.meeting.currentMeeting,
        currentUser: state.auth.currentUser
    };
};

const mapDispatchToProps = dispatch => {
	
	return {
    
        getUser: (token, userId) => dispatch(getUser(token, userId)),
        getMeeting: (token, meeting_id) => dispatch(getMeeting(token, meeting_id)),
        updateMeeting: (token, meeting) => dispatch(updateMeeting(token, meeting))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingDetailForm);
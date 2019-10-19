import React, { Component } from 'react';
import { Form, Input, Button, Modal, Icon, message } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getMeeting, updateMeeting } from '../../store/actions/meeting';
import Hoc from '../../hoc/hoc';

const { confirm } = Modal;

class MeetingDetail extends Component {

    constructor() {
        
        super();
		this.state = {
			formLayout: 'vertical',
		};
    }

    componentDidMount() {
        
        if (this.props.token !== undefined && this.props.token !== null) {
        
            this.forceUpdate();
            const meeting_id = this.props.match.params.meeting_id;
            this.props.getMeeting(this.props.token, meeting_id);
            this.forceUpdate();
        }
    }

    componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {
                
				this.forceUpdate();
				const meeting_id = newProps.match.params.meeting_id;
				this.props.getMeeting(newProps.token, meeting_id);
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
                propsForms.history.push(`/lista_de_reunioes/${ project_id }/${ sector_id }`);
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

    confirmMeeting(token, currentMeeting, project_id, sector_id) {

        const propsForms = this.props;

        confirm({
            title: ' Confirmação de Reunião',
            content: 'Ao Confirmar a Reunião, Não Será Possível Editar Mais a Reunião',
            onOk() {
                currentMeeting.status = 'Confirmada';
                propsForms.updateMeeting(token, currentMeeting);
                Modal.success({
					title: 'Ação Concluída!',
					content: 'Reunião Confirmada Com Sucesso!',
                });
                propsForms.history.push(`/detalhes_reuniao/${ currentMeeting.id }/${ project_id }/${ sector_id }`)
            },
            onCancel() {
                message.success('Ação Cancelada Com Sucesso!');
            },
        });
    }
    
    render() {

        const sector_id = this.props.match.params.sector_id;
        const project_id = this.props.match.params.project_id;
        const token = this.props.token;
        const { currentMeeting } = this.props;
		const { formLayout } = this.state;
		const formItemLayout = formLayout === 'vertical'? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
		}
        : null;
        
        const formItemLayoutMinimum = formLayout === 'vertical'? {
            labelCol: { span: 4 },
            wrapperCol: { span: 2 },
		}
		: null;

        return (
            <div align = 'right'>
                {
                    currentMeeting.status === 'Cancelada' ? (
                        <p></p>
                    ) : (
                        <Hoc>
                            {
                                currentMeeting.status === 'Agendada' ? (
                                    <Button 
                                        type = 'primary' 
                                        htmlType = 'submit' 
                                        style = {{
                                            marginRight: '10px'
                                        }}
                                        onClick = { () => this.confirmMeeting(
                                            token, 
                                            currentMeeting,
                                            project_id,
                                            sector_id
                                        )}
                                    >
                                        Confirmar Reunião
                                    </Button>
                                ) : null
                            }
                            {
                                currentMeeting.status === 'Agendada' ? (
                                    <Button
                                        type = 'primary' 
                                        htmlType = 'submit' 
                                        style = {{
                                            marginRight: '10px'
                                        }}
                                    >
                                        <Link to = { `/criar_questionario/${ currentMeeting.id }/`} >
                                            Adicionar Questionário
                                        </Link>
                                    </Button>
                                ) : null
                            }
                            {
                                currentMeeting.status === 'Pendente' ? (
                                    <Button 
                                        type = 'default' 
                                        style = {{
                                            marginRight: '10px'
                                        }}
                                        onClick = { this.info }
                                    >
                                        Visualizar Ata
                                    </Button>
                                ) : (
                                    <Button 
                                        type = 'primary' 
                                        style = {{
                                            marginRight: '10px'
                                        }}
                                    >
                                        <Link to = { `/visualizar_ata/${ currentMeeting.id }/${ project_id }/${ sector_id } `} >
                                            Visualizar Ata
                                        </Link>
                                    </Button>
                                )
                            }
                            {
                                currentMeeting.status === 'Pendente' ? (
                                    <Button 
                                        type = 'primary' 
                                        htmlType = 'submit' 
                                        style = {{
                                            marginRight: '10px'
                                        }}
                                    >
                                        <Link to = { `/criar_topicos/${ currentMeeting.id }/${ project_id }/${ sector_id } `} >
                                            Marcar Reunião
                                        </Link>
                                    </Button>
                                ) : null
                            }
                        </Hoc>
                    )
                }
				
				<div align = 'center'>
					<Hoc> 
                        {
                            currentMeeting.status === 'Cancelada' ? (
                                <h1> Esta Reunião Foi Cancelada </h1>
                            ) : (
                                    <Hoc>
                                        <h1> Informações Pŕe-Cadastradas da Reunião </h1>
                                        <Form layout = 'vertical' >
                                            <Form.Item label = 'Nome' { ...formItemLayout } >
                                                <Input 
                                                    value = { currentMeeting.title } 
                                                    disabled = { true } 
                                                />
                                            </Form.Item>
                                        </Form>

                                        <Form layout = 'vertical'>
                                            <Form.Item label = 'Assunto' { ...formItemLayout } >
                                                <Input 
                                                    value = { currentMeeting.subject_matter } 
                                                    disabled = { true } 
                                                />
                                            </Form.Item>
                                        </Form>

                                        <Form layout = 'vertical'>
                                            <Form.Item label = 'Local' { ...formItemLayout } >
                                                <Input 
                                                    value = { currentMeeting.sector } 
                                                    disabled = { true } 
                                                />
                                            </Form.Item>
                                        </Form>

                                        <Form layout = 'vertical'>
                                            <Form.Item label = 'Status' { ...formItemLayoutMinimum } >
                                                <Input 
                                                    value = { currentMeeting.status } 
                                                    disabled = { true } 
                                                />
                                            </Form.Item>
                                        </Form>

                                        <Form layout = 'vertical' >
                                            <Form.Item label = 'Data de Inicio' 
                                            { ...formItemLayoutMinimum } >
                                                <Input 
                                                    value = { currentMeeting.initial_date } 
                                                    disabled = { true } 
                                                />
                                            </Form.Item>

                                            <Form.Item label = 'Data de Inicio' 
                                            { ...formItemLayoutMinimum } >
                                                <Input 
                                                    value = { currentMeeting.final_date } 
                                                    disabled = { true } 
                                                />
                                            </Form.Item>

                                            <Form.Item label = 'Hora de Inicio' { ...formItemLayoutMinimum } >
                                                <Input 
                                                    value = { currentMeeting.initial_hour } 
                                                    disabled = { true } 
                                                />
                                            </Form.Item>

                                            <Form.Item label = 'Hora de Encerramento' { ...formItemLayoutMinimum } >
                                                <Input 
                                                    value = { currentMeeting.final_hour } 
                                                    disabled = { true } 
                                                />
                                            </Form.Item>

                                            {
                                                currentMeeting.status === 'Pendente' ? (
                                                    <Form.Item>
                                                        <div align = 'center'>
                                                            <Button 
                                                                type = 'primary' 
                                                                htmlType = 'submit' 
                                                                style = {{ 
                                                                    marginRight: '20px' 
                                                                }}
                                                            >
                                                                <Link to = { `/editar_reuniao/${ currentMeeting.id }/${ project_id }/${ sector_id }` } >
                                                                    <Icon 
                                                                        type = 'edit' 
                                                                        style = {{ marginRight: '10px' }} />
                                                                        Editar Reunião
                                                                </Link>
                                                            </Button>
                                                            <Button 
                                                                type = 'primary' 
                                                                htmlType = 'submit' 
                                                                style = {{ 
                                                                    marginRight: '20px' 
                                                                }}
                                                            >
                                                                <Link to = { `/lista_de_reunioes/${ project_id }/${ sector_id }` } >
                                                                    <Icon 
                                                                        type = 'arrow-left' 
                                                                        style = {{ marginRight: '10px' }} />
                                                                        Voltar
                                                                </Link>
                                                            </Button>
                                                        </div>
                                                    </Form.Item>
                                                ) : (
                                                    <div align = 'center' >
                                                        <Button 
                                                            onClick = { () => this.cancelMeeting(
                                                                this.props.token, 
                                                                project_id,
                                                                sector_id
                                                            )}

                                                            type = 'danger' 
                                                            htmlType = 'submit' 
                                                            style = {{ 
                                                                marginRight: '20px' 
                                                            }}
                                                        >
                                                            <Icon 
                                                                type = 'delete' 
                                                                style = {{ marginRight: '10px' }} />
                                                                Cancelar Reunião
                                                        </Button>
                                                    </div>
                                                )
                                            }{
                                                currentMeeting.status === 'Pendente' ? (
                                                    <div align = 'center' >
                                                        <Button 
                                                            type = 'primary' 
                                                            htmlType = 'submit' 
                                                            style = {{ 
                                                                marginRight: '20px' 
                                                            }}
                                                        >
                                                            <Link to = { `/lista_de_reunioes/${ project_id }/${ sector_id }` } >
                                                                <Icon 
                                                                    type = 'arrow-left' 
                                                                    style = {{ marginRight: '10px' }} />
                                                                    Voltar
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                ) : null
                                            }
                                        </Form>
                                    </Hoc>
                                )
                            }
                            <Button 
                                type = 'primary' 
                                htmlType = 'submit' 
                                style = {{ 
                                    marginRight: '20px' 
                                }}
                            >
                                <Link to = { `/lista_de_reunioes/${ project_id }/${ sector_id }` } >
                                    <Icon 
                                        type = 'arrow-left' 
                                        style = {{ marginRight: '10px' }} />
                                        Voltar
                                </Link>
                            </Button>                                
                    </Hoc>
                </div>
            </div>
        )
    }
}

const MetailDetailForm = Form.create()(MeetingDetail);

const mapStateToProps = state => {
	
	return {
	
		token: state.auth.token,
        loading: state.meeting.loading,
		currentMeeting: state.meeting.currentMeeting
    };
};

const mapDispatchToProps = dispatch => {
	
	return {
	
        getMeeting: (token, meeting_id) => dispatch(getMeeting(token, meeting_id)),
        updateMeeting: (token, meeting) => dispatch(updateMeeting(token, meeting))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MetailDetailForm);
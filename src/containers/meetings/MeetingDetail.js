import React, { Component } from 'react';
import { Skeleton, Form, Input, Button, Modal, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getMeeting } from '../../store/actions/meeting';
import Hoc from '../../hoc/hoc';

class MeetingDetail extends Component {

    constructor() {
		super();
		this.state = {
			formLayout: 'vertical',
		};
    }
    
    componentDidMount() {

		const meeting_id = this.props.match.params.id;
        this.props.getMeeting(this.props.token, meeting_id);
        this.forceUpdate();
	}

    UNSAFE_componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {
		
				const meeting_id = newProps.match.params.id;
				this.props.getMeeting(newProps.token, meeting_id);
				this.forceUpdate();
            }
        }
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
    
    render() {

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
                            <Link to = { `/criar_reuniao/projeto/${ currentMeeting.id } `} >
                                Visualizar Ata
                            </Link>
                        </Button>
                    )
                }
				
                <Button 
					type = 'primary' 
					htmlType = 'submit' 
					style = {{
						marginRight: '10px'
					}}
				>
					<Link to = { `/criar_topicos/${ currentMeeting.id } `} >
						Marcar Reunião
					</Link>
				</Button>
				<div align = 'center'>
					<Hoc> 
						{
							this.props.loading ? (
								<Skeleton active />
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
                                                            <Link to = { `/editar_reuniao/${ currentMeeting.id }` } >
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
                                                            <Link to = { `/lista_de_reunioes/${ this.props.match.params.id }` } >
                                                                <Icon 
                                                                    type = 'arrow-left' 
                                                                    style = {{ marginRight: '10px' }} />
                                                                    Voltar
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </Form.Item>
                                            ) : (
                                                <Button 
                                                    type = 'primary' 
                                                    htmlType = 'submit' 
                                                    style = {{ 
                                                        marginRight: '20px' 
                                                    }}
                                                >
                                                    <Link to = { `/lista_de_reunioes/${ this.props.match.params.id }` } >
                                                        <Icon 
                                                            type = 'arrow-left' 
                                                            style = {{ marginRight: '10px' }} />
                                                            Voltar
                                                    </Link>
                                                </Button>
                                            )
                                        }
                                    </Form>
                                </Hoc>
                            )
                        }
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MetailDetailForm);
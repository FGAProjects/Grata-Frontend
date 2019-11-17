import React, { Component } from 'react';
import { Form, Input, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Hoc from '../../hoc/hoc';
import Homepage from '../homepage/Homepage';
import NotPermission from '../notPermission/NotPermission';

import { getMeeting } from '../../store/actions/meeting';
import { getUser } from '../../store/actions/auth';

class MeetingConfirm extends Component {

    constructor() {
		
		super();
		this.state = {
			formLayout: 'vertical'
		};
	}

    componentDidMount() {
        
        if (this.props.token !== undefined && this.props.token !== null) {
        
            this.forceUpdate();
            const meeting_id = this.props.match.params.meeting_id;
            this.props.getMeeting(this.props.token, meeting_id);
            this.props.getUser(this.props.token, this.props.currentUser.userId);
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

    render() {
        
        const { currentMeeting } = this.props;
		const { currentUser } = this.props;
        const project_id = this.props.match.params.project_id;
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
                        <Hoc>
                            {
                                permission === true ? (
                                    <div>
                                        <Button 
                                            type = 'ghost' 
                                            className = 'buttonSave' 
                                            style = {{
                                                marginRight: '20px',
                                                marginLeft: '920px'
                                            }}
                                        >
                                            <Link to = { `/visualizar_ata/${ currentMeeting.id }/${ project_id }/ `} >
                                                Visualizar Ata
                                            </Link>
                                        </Button>

                                        <Button type = 'ghost' 
                                            htmlType = 'submit' 
                                            className = 'buttonNew'
                                            style = {{
                                                marginRight: '0px'
                                            }} 
                                        >
                                            <Link to = { `/criar_questionario/${ currentMeeting.id }/${ project_id }/ `}>
                                                Criar Questionário
                                            </Link>
                                        </Button>

                                        <Button 
                                            type = 'ghost'
                                            className = 'buttonBack' 
                                            htmlType = 'submit'
                                            style = {{
                                                marginTop: '40px',
                                                marginRight: '30px'
                                            }} 
                                        >
                                            <Link to = { `/detalhes_reuniao/${ currentMeeting.id }/${ project_id }/ `}>
                                                <Icon type = 'arrow-left' className = 'icons'/>
                                                Voltar
                                            </Link>
                                        </Button>

                                        <div className = 'contentConfirmMeeting'>
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
                                        </div>
                                    </div>
                                ) : (
                                    <NotPermission/>
                                )
                            }
                            
                            {/*  */}
                        </Hoc>
                    )
                }
            </Hoc>
        );
    }
}

const MetailConfirmForm = Form.create()(MeetingConfirm);

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
	
        getMeeting: (token, meeting_id) => dispatch(getMeeting(token, meeting_id)),
        getUser: (token, userId) => dispatch(getUser(token, userId))
        // updateMeeting: (token, meeting) => dispatch(updateMeeting(token, meeting))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MetailConfirmForm);
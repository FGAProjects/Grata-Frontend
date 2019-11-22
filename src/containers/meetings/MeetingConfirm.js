import React, { Component } from 'react';
import { Form, Input, Button, Icon, Drawer, List, Avatar } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Hoc from '../../hoc/hoc';
import Homepage from '../homepage/Homepage';
import NotPermission from '../notPermission/NotPermission';

import { getQuesttionaire } from '../../store/actions/quiz';
import { getMeeting } from '../../store/actions/meeting';
import { getUser } from '../../store/actions/auth';

class MeetingConfirm extends Component {

    constructor() {
		
		super();
		this.state = {
			formLayout: 'vertical'
		};
    }
    
    state = { 
        visible: false 
    };

    showDrawer = () => {
    
        this.setState({
            visible: true,
        });
    };
    
    onClose = () => {
    
        this.setState({
            visible: false,
        });
    };

    componentDidMount() {
        
        if (this.props.token !== undefined && this.props.token !== null) {
        
            this.forceUpdate();
            const meeting_id = this.props.match.params.meeting_id;
            this.props.getMeeting(this.props.token, meeting_id);
            this.props.getUser(this.props.token, this.props.currentUser.userId);
            this.props.getQuesttionaire(this.props.token, meeting_id);
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
                this.props.getQuesttionaire(newProps.token, meeting_id);
				this.forceUpdate();
            }
        }
    }

    render() {
        
        const { currentMeeting } = this.props;
        const { currentUser } = this.props;
        const { questtionaire } = this.props;
        const project_id = this.props.match.params.project_id;
        const { formLayout } = this.state;
		const formItemLayout = formLayout === 'vertical'? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
		}
		: null;
        
        const formItemLayoutMinimum = formLayout === 'vertical'? {
            labelCol: { span: 4 },
            wrapperCol: { span: 5 },
		}
        : null;
        let permission = false;

        if(currentUser.name === currentMeeting.meeting_leader) {
            permission = true;
        } else {
            permission = false;
        }

        let dataSource = {
            innerArray: [
                
            ]
        }

        for(let aux = 0; aux < questtionaire.length; aux ++) {

            dataSource.innerArray.push({

                key: questtionaire[aux].id,
                title: questtionaire[aux].title,
                users: questtionaire[aux].users[aux]
            }); 
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
                                                marginLeft: '830px'
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

                                        <Button className = 'buttonBack'>
                                            <Link to = { `/lista_de_reunioes/${ project_id }/` } >
                                                <Icon type = 'arrow-left' className = 'icons'/>
                                                Visualizar Reuniões
                                            </Link>
                                        </Button>
                                    </div>
                                ) : (
                                    <NotPermission/>
                                )
                            }
                            {
                                permission === true ? (
                                    <div className = 'container'>
                                        <div className = 'op1'>
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
                                            <div className = 'op2'>
                                                <h1 className = 'texth1'> Questionário(s) Cadastrado(s) </h1>
                                                <List
                                                    dataSource = {
                                                        dataSource.innerArray
                                                    }
                                                    bordered
                                                    renderItem = { quiz => (
                                                        <List.Item
                                                            key = { quiz.key }
                                                            actions = {[
                                                                <Link to = { `/resultado_questionario/${ currentMeeting.id }/${ project_id }/${ quiz.key }`} >
                                                                    Visualizar Resultados
                                                                </Link>
                                                            ]}
                                                        >
                                                        <List.Item.Meta
                                                            avatar = {
                                                                <Avatar 
                                                                    src = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'/>
                                                            }
                                                            title = { 
                                                                <a href = 'https://ant.design/index-cn'> 
                                                                    <b> { quiz.title } </b>
                                                                </a>
                                                            }
                                                        />
                                                        </List.Item>
                                                    )}
                                                />
                                                <Drawer
                                                    width = { 640 }
                                                    placement = 'right'
                                                    closable = { false }
                                                    onClose = { this.onClose }
                                                    visible = { this.state.visible }
                                                    dataSource = {
                                                        dataSource.innerArray
                                                    }
                                                    bordered
                                                >
                                            </Drawer>
                                        </div>
                                    </div>
                                ) : (
                                    <NotPermission/>
                                )
                            }
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
        currentUser: state.auth.currentUser,
        questtionaire: state.quiz.questtionaire
    };
};

const mapDispatchToProps = dispatch => {
	
	return {
	
        getMeeting: (token, meeting_id) => dispatch(getMeeting(token, meeting_id)),
        getUser: (token, userId) => dispatch(getUser(token, userId)),
        getQuesttionaire: (token, meeting_id) => dispatch(getQuesttionaire(token, meeting_id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MetailConfirmForm);
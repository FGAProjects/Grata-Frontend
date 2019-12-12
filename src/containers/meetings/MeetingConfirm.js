import React, { Component } from 'react';
import { Tabs, Form, Input, Button, Icon, List } from 'antd';
import { Avatar, Skeleton, Descriptions, Badge, message, Divider } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Hoc from '../../hoc/hoc';
import Homepage from '../homepage/Homepage';
import QuestionForm from '../quiz/QuestionForm';
import NotPermission from '../notPermission/NotPermission';

import { createQuesttionaireQuiz, getQuesttionaireMeeting, getAllGraded } from '../../store/actions/quiz';
import { getMeeting, updateMeeting } from '../../store/actions/meeting';
import { getUser } from '../../store/actions/auth';
import { size } from '../utils';

const { TabPane } = Tabs;
const FormItem = Form.Item;

class MeetingConfirm extends Component {

    state = { 

        visible: false,
        loading: true,
        iconLoading: false, 
        formCount: 1,
        formLayout: 'vertical'
    };

    componentDidMount() {
        
        if (this.props.token !== undefined && this.props.token !== null) {
        
            this.forceUpdate();
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;
            const meeting_id = this.props.match.params.meeting_id;
            this.props.getMeeting(token, meeting_id);
            this.props.getUser(token, this.props.currentUser.userId);
            this.props.getQuesttionaireMeeting(token, meeting_id);
            this.props.getAllGraded(token);
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
                this.props.getQuesttionaireMeeting(newProps.token, meeting_id);
                this.props.getAllGraded(newProps.token);
				this.forceUpdate();
            }
        }
    }

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

    enterLoading = () => {
		this.setState({ loading: true });
	};
	
	enterIconLoading = () => {
		this.setState({ iconLoading: true });
    };
    
    add = () => {
    
        const { formCount } = this.state;
        this.setState({
            formCount: formCount + 1
        });
    };
    
    remove = () => {
        
        const { formCount } = this.state;
        this.setState({
            formCount: formCount - 1
        });
    };

    handleSubmit = e => {
    
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
    
            if (!err) {

                const { currentMeeting } = this.props;
				const meeting_id = this.props.match.params.meeting_id;
                const user = JSON.parse(localStorage.getItem('user'));
                const token = user.token;
                const questions = [

                ];

                for (let aux = 0; aux < values.questions.length; aux ++) {
                    questions.push({

                        title: values.question[aux],
                        choices: values.questions[aux].choices.filter(el => el !== null)
                    });
                }

                const questtionaire = {
                    
                    title: values.title,
                    questions
                }

                const meeting = {

                    id: currentMeeting.id,
                    meeting: currentMeeting.id,
                    title: currentMeeting.title,
                    status: currentMeeting.status,
                    subject_matter: currentMeeting.subject_matter,
                    initial_date: currentMeeting.initial_date,
                    final_date: currentMeeting.final_date,
                    initial_hour: currentMeeting.initial_hour,
                    final_hour: currentMeeting.final_hour,
                    sector: currentMeeting.sector,
                    project: currentMeeting.project,
                    questtionaire: questtionaire
                }

                this.props.updateMeeting(token, meeting);
                message.success('Questionário Criado Com Sucesso!');
                this.props.history.push(`/reuniao_confirmada/${ meeting_id }/`);
            }
        });
    };

    render() {
        
        const { currentMeeting } = this.props;
        const { currentUser } = this.props;
        const { questtionaires } = this.props;
        const { formLayout } = this.state;
        const { getFieldDecorator } = this.props.form;
        const questions = [];
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
        const users = size(currentMeeting.users);
		const topics = size(currentMeeting.topics);
		const rules = size(currentMeeting.rules);
        let permission = false;
        let usersMeeting = {
            innerArray: [
                
            ]
		};
		let topicsMeeting = {
			innerArray: [

			]
		};
		let rulesMeeting = {
			innerArray: [

			]
        };
        let dataSource = {
            innerArray: [
                
            ]
        }

        if(currentUser.name === currentMeeting.meeting_leader) {
            permission = true;
        } else {
            permission = false;
        }

        for(let aux = 0; aux < questtionaires.length; aux ++) {

            dataSource.innerArray.push({

                key: questtionaires[aux].id,
                title: questtionaires[aux].title,
            }); 
        }

        for(let aux = 0; aux < users; aux ++) {
			
			usersMeeting.innerArray.push(
                {
					key: aux,
                    users: currentMeeting.users[aux]
                }
			); 
		}

		for(let aux = 0; aux < topics; aux ++) {
			
			topicsMeeting.innerArray.push(
				{
					key: aux,
					topics: currentMeeting.topics[aux]
				}
			);
		}

		for(let aux = 0; aux < rules; aux ++) {
			
			rulesMeeting.innerArray.push(
				{
					key: aux,
					rules: currentMeeting.rules[aux]
				}
			);
        }
        
        for (let aux = 0; aux < this.state.formCount; aux ++) {
            questions.push(
                <Hoc key = { aux }>
                    { questions.length > 0 ? (
                        <Icon
                            className = 'dynamic-delete-button'
                            type = 'minus-circle-o'
                            disabled = { questions.length === 0 }
                            onClick={() => this.remove()}
                        />
                    ) : null}
                    <QuestionForm id = { aux } { ...this.props } />
                    <Divider />
                </Hoc>
            );
        }

        return (

            <Hoc>
                {
                    this.props.token === null ? (
                        <Homepage/>
                    ) : (
                        this.props.loading === true ? (
                            <Skeleton active/>
                        ) : (
                            <Hoc>
                                <div className = 'content'>
                                    <Tabs 
                                        onChange = { this.callback }>
                                        <TabPane tab = 'Informações da Reunião' key = '1'>
                                            <div className = 'contentTab'>
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
                                        </TabPane>

                                        <TabPane tab = 'Visualizar Ata' key = '2'>
                                            <div className = 'contentTab'>
                                                {
                                                    this.props.loading === true ? (
                                                        <Skeleton active/>
                                                    ) : (
                                                        <Descriptions 
                                                            title = {` ${currentMeeting.title} `} 
                                                            layout = 'vertical' 
                                                            bordered
                                                            className = 'texth1'	
                                                        >
                                                            <Descriptions.Item label = 'Título da Reunião'> 
                                                                { currentMeeting.title } 
                                                            </Descriptions.Item>
                                                            
                                                            <Descriptions.Item label = 'Assunto da Reunião'>
                                                                { currentMeeting.subject_matter }
                                                            </Descriptions.Item>
                                                            
                                                            <Descriptions.Item label = 'Setor Responsável'>
                                                                { currentMeeting.sector }
                                                            </Descriptions.Item>
                                                            
                                                            <Descriptions.Item label = 'Data de Abertura'>
                                                                { currentMeeting.initial_date }
                                                            </Descriptions.Item>
                                                            
                                                            <Descriptions.Item label = 'Data de Encerramento'>
                                                                { currentMeeting.final_date }
                                                            </Descriptions.Item>
                                                            
                                                            <Descriptions.Item label = 'Hora de Inicio'>
                                                                { currentMeeting.initial_hour }
                                                            </Descriptions.Item>
                                                            
                                                            <Descriptions.Item label = 'Hora de Encerramento'>
                                                                { currentMeeting.final_hour }
                                                            </Descriptions.Item>
                                                            
                                                            <Descriptions.Item label = 'Status da Reunião' span = { 3 }>
                                                                <Badge status = 'processing' text = { `${ currentMeeting.status }` } />
                                                            </Descriptions.Item>
                                                            
                                                            <Descriptions.Item label = 'Usuários Confirmados na Reunião'> 
                                                                { usersMeeting.innerArray.map(user =>
                                                                    <li key = { user.key }> { user.users } </li>	
                                                                )}
                                                            </Descriptions.Item>
                                                                                        
                                                            <Descriptions.Item label = 'Tópicos'> 
                                                                { topicsMeeting.innerArray.map(topic =>
                                                                    <li key = { topic.key }> { topic.topics } </li>	
                                                                )}
                                                            </Descriptions.Item>

                                                            <Descriptions.Item label = 'Regras da Reunião' span={3}>
                                                                { rulesMeeting.innerArray.map(rule =>
                                                                    <li key = { rule.key }> { rule.rules } </li>	
                                                                )}
                                                            </Descriptions.Item>
                                                        </Descriptions>
                                                    )
                                                }
                                            </div>
                                        </TabPane>

                                        <TabPane tab = 'Criar Questionário' key = '3'>
                                            {
                                                permission === true ? (
                                                    <div className = 'contentTab'>
                                                        <Form onSubmit = { this.handleSubmit }>
                                                            <h1 className = 'texth1'> Crie um Questionário </h1>
                                                            <FormItem label = { 'Título do Questionário: '}>
                                                                {
                                                                    getFieldDecorator(`title`, {
                                                                        validateTrigger: ['onChange', 'onBlur'],
                                                                        rules: [{
                                                                            required: true,
                                                                            message: 'Por Favor, Coloque o Título ao Questionário'
                                                                        }]
                                                                    })(
                                                                        <Input placeholder = 'Adicione um Títúlo ao Questionário'/>
                                                                    )
                                                                }
                                                            </FormItem>
                                                            { questions }
                                                            
                                                            <FormItem>
                                                                <div align = 'center'>
                                                                    <Button type = 'secondary' onClick = { this.add }>
                                                                        <Icon type = 'plus'/> Adicione Outra Questão
                                                                    </Button>
                                                                </div>
                                                            </FormItem>

                                                            <FormItem>
                                                                <div align = 'center'>
                                                                    <Button type = 'ghost' htmlType = 'submit' className = 'buttonSave'>
                                                                        Salvar Questionário
                                                                    </Button>
                                                                </div>
                                                            </FormItem>
                                                        </Form>
                                                    </div>
                                                ) : (
                                                    <NotPermission/>
                                                )
                                            }
                                        </TabPane>

                                        <TabPane tab = 'Questionários Cadastrados' key = '4'>
                                            {
                                                permission === true ? (
                                                    <div className = 'contentTab'>
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
                                                                        <Link to = { `/resultado_questionario/${ currentMeeting.id }/${ quiz.key }/`} >
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
                                                                        <b> { quiz.title } </b>
                                                                    }
                                                                />
                                                                </List.Item>
                                                            )}
                                                        />
                                                    </div>
                                                ) : null
                                            }
                                        </TabPane>
                                    </Tabs>
                                </div>
                            </Hoc>
                        )
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
        questtionaires: state.quiz.questtionaires,
        loadingQuesttionaire: state.quiz.loading,
        graded: state.quiz.graded
    };
};

const mapDispatchToProps = dispatch => {
	
	return {
	
        getMeeting: (token, meeting_id) => dispatch(getMeeting(token, meeting_id)),
        getUser: (token, userId) => dispatch(getUser(token, userId)),
        getQuesttionaireMeeting: (token, meeting_id) => dispatch(getQuesttionaireMeeting(token, meeting_id)),
        createQuesttionaireQuiz: (token, questtionaire) => dispatch(createQuesttionaireQuiz(token, questtionaire)),
        updateMeeting: (token, meeting) => dispatch(updateMeeting(token, meeting)),
        getAllGraded: (token) => dispatch(getAllGraded(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MetailConfirmForm);
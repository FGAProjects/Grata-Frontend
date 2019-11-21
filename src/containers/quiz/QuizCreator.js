import React, { Component } from 'react';
import { Form, Input, Button, Icon, Divider } from 'antd';
import { connect } from 'react-redux';

import QuestionForm from './QuestionForm';
import { createQuiz } from '../../store/actions/quiz';
import { getMeeting } from '../../store/actions/meeting';
import Hoc from '../../hoc/hoc';

const FormItem = Form.Item;

class QuizCreator extends Component {

    state = {
        formCount: 1,
        formLayout: 'vertical'
    };

    componentDidMount() {
        
        if (this.props.token !== undefined && this.props.token !== null) {
        
            this.forceUpdate();
            const meeting_id = this.props.match.params.meeting_id;
            this.props.getMeeting(this.props.token, meeting_id);
            this.forceUpdate();
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {
                
				this.forceUpdate();
				const meeting_id = newProps.match.params.meeting_id;
				this.props.getMeeting(newProps.token, meeting_id);
				this.forceUpdate();
            }
        }
    }

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

                const quiz = {
                    
                    meeting: currentMeeting.id,
                    questions,
                    choices: [

                    ]
                }

                this.props.createQuiz(token, quiz);
            }
        });
    };
    
    render() {
    
        const { getFieldDecorator } = this.props.form;
        const questions = [];

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

            <div className = 'content'>
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
        );
    }
}

const QuizCreatorForm = Form.create()(QuizCreator);

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
        createQuiz: (token, quiz) => dispatch(createQuiz(token, quiz))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreatorForm);
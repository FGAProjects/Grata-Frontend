import React, { Component } from 'react';
// import { Form, Input, Button, Modal, Icon, message, Divider } from 'antd';
import { Form, Input, Button, Icon, Divider } from 'antd';
import { connect } from 'react-redux';

import QuestionForm from './QuestionForm';
import { getMeeting, updateMeeting } from '../../store/actions/meeting';
import Hoc from '../../hoc/hoc';

// let id = 0;
const FormItem = Form.Item;

class QuizCreator extends Component {

    state = {
        formCount: 1
    };

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
                const token = this.props.token;
                console.log("Received values of form: ", values);
                const questions = [];
                for (let aux = 0; aux < values.questions.length; aux ++) {
                    questions.push({
                        title: values.question[aux],
                        choices: values.questions[aux].choices.filter(el => el !== null),
                        answer: values.answers[aux]
                    });
                }
                const meeting = {

                    meeting: currentMeeting.id,
                    status: 'Agendada',
                    title: currentMeeting.title,
                    subject_matter: currentMeeting.subject_matter,
                    initial_date: currentMeeting.initial_date,
                    final_date: currentMeeting.final_date,
                    initial_hour: currentMeeting.initial_hour,
                    final_hour: currentMeeting.final_hour,
                    sector: currentMeeting.sector,
                    project: currentMeeting.project,
                    questions
                };
                /*
                    Isso vai ficar pra depois, mas não se esquecer de quando for fazer no backend
                    fazer a verificação se é o meeting_leader, se for, ele não poderá responder o 
                    questionário, caso não, ele vai poder responder
                */
                console.log(meeting.meeting)
                this.props.updateMeeting(token, meeting);
            }
        });
    };
    
    render() {
    
        const { getFieldDecorator } = this.props.form;
        const questions = [];
        for (let i = 0; i < this.state.formCount; i += 1) {
            questions.push(
            <Hoc key={i}>
                {questions.length > 0 ? (
                <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    disabled={questions.length === 0}
                    onClick={() => this.remove()}
                />
                ) : null}
                <QuestionForm id={i} {...this.props} />
                <Divider />
            </Hoc>
            );
        }
        return (
            <Form onSubmit={this.handleSubmit}>
            <h1>Create an assignment</h1>
            <FormItem label={"Title: "}>
                {getFieldDecorator(`title`, {
                validateTrigger: ["onChange", "onBlur"],
                rules: [
                    {
                    required: true,
                    message: "Please input a title"
                    }
                ]
                })(<Input placeholder="Add a title" />)}
            </FormItem>
            {questions}
            <FormItem>
                <Button type="secondary" onClick={this.add}>
                <Icon type="plus" /> Add question
                </Button>
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </FormItem>
            </Form>
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
        updateMeeting: (token, meeting) => dispatch(updateMeeting(token, meeting))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreatorForm);
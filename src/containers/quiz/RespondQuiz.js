import React, { Component } from 'react';
import { Card, Skeleton, message } from 'antd';
import { connect } from 'react-redux';

import Hoc from '../../hoc/hoc';
import Questions from '../../components/Questions';
import Choices from '../../components/Choices';
import Homepage from '../homepage/Homepage';

import { getQuesttionaire, getQuestionsMeeting } from '../../store/actions/quiz';

class RespondQuiz extends Component {

    state = {
        usersAnswers: {}
    };

    componentDidMount() {
        
        if (this.props.token !== undefined && this.props.token !== null) {
        
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;
            const quiz_id = this.props.match.params.quiz_id;
            const meeting_id = this.props.match.params.meeting_id;
            this.props.getQuesttionaire(token, quiz_id);
            this.props.getQuestionsMeeting(token, meeting_id);
            this.forceUpdate();
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {
                
                const quiz_id = newProps.match.params.quiz_id;
                const meeting_id = newProps.match.params.meeting_id;
                this.props.getQuesttionaire(newProps.token, quiz_id);
                this.props.getQuestionsMeeting(newProps.token, meeting_id);
				this.forceUpdate();
            }
        }
    }

    onChange = (e, qId) => {
        
        const { usersAnswers } = this.state;
        usersAnswers[qId] = e.target.value;
        this.setState({ usersAnswers });
    };
    
    handleSubmit() {
        message.success("Submitting your assignment!");
        const { usersAnswers } = this.state;
    // const asnt = {
    //   username: this.props.username,
    //   asntId: this.props.currentAssignment.id,
    //   answers: usersAnswers
    // };
    // this.props.createGradedASNT(this.props.token, asnt);
    }

    render() {
        
        const { currentQuesttionaire } = this.props;
        const questionsQuesttionaires = this.props.questions;
        const { usersAnswers } = this.state;

        return (

            <Hoc>
                {
                    this.props.token === null ? (
                        <Homepage/>
                    ) : (
                        this.props.loading ? (
                            <Skeleton active />
                        ) : (
                            <Hoc>
                                <div className = 'content'>
                                    <h1 className = 'texth1'> 
                                        Título do Questionário: { currentQuesttionaire.title } 
                                    </h1>
                                    <Card>
                                        <Questions
                                        submit={() => this.handleSubmit()}
                                        questions = {questionsQuesttionaires.map(question => {
                                            return (
                                                <Card
                                                    style = { cardStyle }
                                                    type = 'inner'
                                                    key = { question.id }
                                                    title = {`${ question.order }. ${ question.title }`}
                                                >
                                                    <Choices
                                                        questionId = { question.order }
                                                        choices = {question.choices}
                                                        change = { this.onChange }
                                                        usersAnswers = { usersAnswers }
                                                    />
                                                </Card>
                                            );
                                        })}
                                        />
                                    </Card>                                                                                                
                                </div>
                            </Hoc>
                        )
                    )
                }
            </Hoc>
        );
    }
}

const cardStyle = {
    
    marginTop: '20px',
    marginBottom: '20px'
};

const mapStateToProps = state => {
	
	return {
    
        token: state.auth.token,
        loading: state.quiz.loading,
        currentQuesttionaire: state.quiz.currentQuesttionaire,
        questions: state.quiz.questions
    };
};

const mapDispatchToProps = dispatch => {
	
	return {

        getQuesttionaire: (token, quiz_id) => dispatch(getQuesttionaire(token, quiz_id)),
        getQuestionsMeeting: (token, meeting_id) => dispatch(getQuestionsMeeting(token, meeting_id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RespondQuiz);
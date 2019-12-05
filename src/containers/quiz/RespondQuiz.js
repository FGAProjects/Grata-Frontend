import React, { Component } from 'react';
import { Card, Skeleton, message } from 'antd';
import { connect } from 'react-redux';

import Hoc from '../../hoc/hoc';
import Questions from '../../components/Questions';
import Choices from '../../components/Choices';
import Homepage from '../homepage/Homepage';

import { getUser } from '../../store/actions/auth';
import { getMeeting } from '../../store/actions/meeting';
import { getQuestionsMeeting, createRespondQuiz } from '../../store/actions/quiz';

class RespondQuiz extends Component {

    state = {
        usersAnswers: {}
    };

    componentDidMount() {
        
        if (this.props.token !== undefined && this.props.token !== null) {
        
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;
            const questtionaire_id = this.props.match.params.questtionaire_id;
            const meeting_id = this.props.match.params.meeting_id;
            this.props.getUser(this.props.token, this.props.currentUser.userId);
            this.props.getQuestionsMeeting(token, questtionaire_id);
            this.props.getMeeting(token, meeting_id);
            this.forceUpdate();
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {
                
                const questtionaire_id = newProps.match.params.questtionaire_id;
                const meeting_id = newProps.match.params.meeting_id;
                this.props.getMeeting(newProps.token, meeting_id);
                this.props.getQuestionsMeeting(newProps.token, questtionaire_id);
				this.props.getUser(newProps.token, newProps.currentUser.userId);
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

        const { currentMeeting } = this.props;
        const questionsQuesttionaires = this.props.questions;
		const { currentUser } = this.props;
        const user = JSON.parse(localStorage.getItem('user'));
        const questtionaire_id = this.props.match.params.questtionaire_id;
        const token = user.token;
        const { usersAnswers } = this.state;

        console.log(usersAnswers)

        let dataSource = {
            innerArray: [
                
            ]
		}

        for(let aux = 0; aux < questionsQuesttionaires.length; aux ++) {

            dataSource.innerArray.push(
                questionsQuesttionaires[aux].id
            );
        }


        const quiz = {

            answers: usersAnswers,
            user: currentUser.id,
            quiz: dataSource.innerArray,
            questtionaire: questtionaire_id
        };

        // this.props.createRespondQuiz(token, quiz);
        message.success('Questionário Respondido');
        // this.props.history.push(`/reuniao_confirmada/${ currentMeeting.id }/`);
    }

    render() {
        
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
                                    <Card>
                                        <Questions
                                            submit ={() => this.handleSubmit()}
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
                                                            choices = { question.choices }
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
        questions: state.quiz.questions,
        currentMeeting: state.meeting.currentMeeting,
		currentUser: state.auth.currentUser
    };
};

const mapDispatchToProps = dispatch => {
	
	return {

        getQuestionsMeeting: (token, questtionaire_id) => dispatch(getQuestionsMeeting(token, questtionaire_id)),
        createRespondQuiz: (token, respondQuiz) => dispatch(createRespondQuiz(token, respondQuiz)),
        getMeeting: (token, meeting_id) => dispatch(getMeeting(token, meeting_id)),
		getUser: (token, userId) => dispatch(getUser(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RespondQuiz);
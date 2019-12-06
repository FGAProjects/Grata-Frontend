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
import { getChoices } from '../../store/actions/choices';
import { size } from '../utils';

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
            this.props.getChoices(token);
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
                this.props.getChoices(newProps.token);
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
        const { currentUser } = this.props;
        const { usersAnswers } = this.state;
        const questionsQuesttionaires = this.props.questions;
        const choices = this.props.choices;
        const user = JSON.parse(localStorage.getItem('user'));
        const questtionaire_id = this.props.match.params.questtionaire_id;
        const token = user.token;
        const sizeUsersAnswers = size(usersAnswers) + 1;
        let dataSourceUsersAnswers = {
            innerArray: [

            ]
        }
        let dataSource = {
            innerArray: [
                
            ]
        }

        for(let aux = 0; aux < sizeUsersAnswers; aux ++) {
            dataSourceUsersAnswers.innerArray.push(usersAnswers[aux]);
        }

        // for(let aux = 0; aux < choices.length; aux ++) {
        //     if(dataSourceUsersAnswers.innerArray[aux] !== undefined) {
        //         console.log(dataSourceUsersAnswers.innerArray[aux])
        //         if(choices[aux].title === dataSourceUsersAnswers.innerArray[aux]) {
        //             console.log('AAA')
        //         }
        //     }
        // }

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
        currentUser: state.auth.currentUser,
        choices: state.choices.choices
    };
};

const mapDispatchToProps = dispatch => {
	
	return {

        getQuestionsMeeting: (token, questtionaire_id) => dispatch(getQuestionsMeeting(token, questtionaire_id)),
        createRespondQuiz: (token, respondQuiz) => dispatch(createRespondQuiz(token, respondQuiz)),
        getMeeting: (token, meeting_id) => dispatch(getMeeting(token, meeting_id)),
        getUser: (token, userId) => dispatch(getUser(token, userId)),
        getChoices: (token) => dispatch(getChoices(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RespondQuiz);
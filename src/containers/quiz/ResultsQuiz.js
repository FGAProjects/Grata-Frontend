import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getQuiz } from '../../store/actions/quiz';

class ResultsQuiz extends Component {

    componentDidMount() {
        
        if (this.props.token !== undefined && this.props.token !== null) {
        
            const meeting_id = this.props.match.params.meeting_id;
            this.props.getQuiz(this.props.token, meeting_id);
            this.forceUpdate();
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {
                
				const meeting_id = newProps.match.params.meeting_id;
                this.props.getQuiz(newProps.token, meeting_id);
				this.forceUpdate();
            }
        }
    }

    render() {
        
        const { currentQuiz } = this.props;

        return (

            <div className = 'content'>
                title : {currentQuiz.title}
            </div>
        );
    }
}

const mapStateToProps = state => {
	
	return {
	
		token: state.auth.token,
        loading: state.quiz.loading,
        questtionaire: state.quiz.questtionaire,
        currentQuiz: state.quiz.currentQuiz
    };
};

const mapDispatchToProps = dispatch => {
	
	return {
        getQuiz: (token, meeting_id) => dispatch(getQuiz(token, meeting_id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsQuiz);
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getGradedQuesttionaires } from '../../store/actions/quiz';

class ResultsQuiz extends Component {

    componentDidMount() {
        
        if (this.props.token !== undefined && this.props.token !== null) {
        
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;
            const questtionaire_id = this.props.match.params.questtionaire_id;
            this.props.getGradedQuesttionaires(token, questtionaire_id);
            this.forceUpdate();
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {
                
                const questtionaire_id = newProps.match.params.questtionaire_id;
                this.props.getGradedQuesttionaires(newProps.token, questtionaire_id);
				this.forceUpdate();
            }
        }
    }

    render() {
        
        const resultsGraded = this.props.resultsGraded;

        return (

            <div className = 'content'>
                { resultsGraded.length }
            </div>
        );
    }
}

const mapStateToProps = state => {
	
	return {
	
		token: state.auth.token,
        loading: state.quiz.loading,
        currentQuesttionaire: state.quiz.currentQuesttionaire,
        resultsGraded: state.quiz.resultsGraded
    };
};

const mapDispatchToProps = dispatch => {
	
	return {
        getGradedQuesttionaires: (token, questtionaire_id) => dispatch(getGradedQuesttionaires(token, questtionaire_id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsQuiz);
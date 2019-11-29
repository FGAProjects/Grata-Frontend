import React, { Component } from 'react';
import { connect } from 'react-redux';

// import Hoc from '../../hoc/hoc';

import { getQuesttionaire } from '../../store/actions/quiz';

class ResultsQuiz extends Component {

    componentDidMount() {
        
        if (this.props.token !== undefined && this.props.token !== null) {
        
            // const meeting_id = this.props.match.params.meeting_id;
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;
            const quiz_id = this.props.match.params.quiz_id;
            this.props.getQuesttionaire(token, quiz_id);
            this.forceUpdate();
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {
                
                // const meeting_id = newProps.match.params.meeting_id;
                const quiz_id = newProps.match.params.quiz_id;
                this.props.getQuesttionaire(newProps.token, quiz_id);
				this.forceUpdate();
            }
        }
    }

    render() {
        
        const { currentQuesttionaire } = this.props;

        console.log(currentQuesttionaire)
        return (

            <div className = 'content'>
                title : AAA
            </div>
        );
    }
}

const mapStateToProps = state => {
	
	return {
	
		token: state.auth.token,
        loading: state.quiz.loading,
        currentQuesttionaire: state.quiz.currentQuesttionaire
    };
};

const mapDispatchToProps = dispatch => {
	
	return {
        getQuesttionaire: (token, quiz_id) => dispatch(getQuesttionaire(token, quiz_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsQuiz);
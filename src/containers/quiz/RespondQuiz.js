import React, { Component } from 'react';
import { Skeleton } from 'antd';
import { connect } from 'react-redux';

import Hoc from '../../hoc/hoc';
import Homepage from '../homepage/Homepage';

import { getQuesttionaire } from '../../store/actions/quiz';

class RespondQuiz extends Component {

    componentDidMount() {
        
        if (this.props.token !== undefined && this.props.token !== null) {
        
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
                
                const quiz_id = newProps.match.params.quiz_id;
                this.props.getQuesttionaire(newProps.token, quiz_id);
				this.forceUpdate();
            }
        }
    }

    render() {
        
        const { currentQuesttionaire } = this.props;

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
                                </div>
                            </Hoc>
                        )
                    )
                }
            </Hoc>
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

export default connect(mapStateToProps, mapDispatchToProps)(RespondQuiz);
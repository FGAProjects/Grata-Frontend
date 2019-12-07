import React, { Component } from 'react';
import { Skeleton } from 'antd';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';

import Hoc from '../../hoc/hoc';
import Homepage from '../homepage/Homepage';
import NotPermission from '../notPermission/NotPermission';

import { getUser } from '../../store/actions/auth';
import { getMeeting } from '../../store/actions/meeting';
import { getChoices } from '../../store/actions/choices';
import { getGradedQuesttionaires } from '../../store/actions/quiz';

class ResultsQuiz extends Component {

    constructor(props) {

        super(props);
        this.state = {
            chartData: {
                labels: ['Boston', 'Brasil', 'Spingfield', 'NewBedford', 'Lowell', 'Cambidge'],
                datasets: [{
                    label: 'Porcentagem das Perguntas',
                    data:[
                        617594,
                        181045,
                        153060,
                        106519,
                        105162,
                        95072
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                    ]
                }]
            }
        }
    }

    componentDidMount() {
        
        if (this.props.token !== undefined && this.props.token !== null) {
        
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user.token;
            const questtionaire_id = this.props.match.params.questtionaire_id;
            const meeting_id = this.props.match.params.meeting_id;
            this.props.getMeeting(token, meeting_id);
            this.props.getUser(token, this.props.currentUser.userId);
            this.props.getGradedQuesttionaires(token, questtionaire_id);
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
                this.props.getGradedQuesttionaires(newProps.token, questtionaire_id);
                this.props.getUser(newProps.token, newProps.currentUser.userId);
                this.props.getChoices(newProps.token);
				this.forceUpdate();
            }
        }
    }

    render() {
        
        const resultsGraded = this.props.resultsGraded;
        const { currentMeeting } = this.props;
        const { currentUser } = this.props;
        const choices = this.props.choices;
        let permission = false;
        let dataSource = {
            innerArray: [
                
            ]
        };
        // let dataSourceFinal = {
        //     innerArray: [

        //     ]
        // };
        let cont = 94;

        if(currentUser.name === currentMeeting.meeting_leader) {
            permission = true;
        }

        for(let aux = 0; aux < choices.length; aux ++) {

            for(let auxResultsGraded = 0; auxResultsGraded < resultsGraded.length; auxResultsGraded ++) {

                if(choices[aux].title === resultsGraded[auxResultsGraded].choice) {
                    cont ++;
                    dataSource.innerArray.push({
                        key: auxResultsGraded,
                        question: resultsGraded[auxResultsGraded].quiz,
                        choice: choices[aux].title,
                        cont: cont,
                        porcent: 0
                    });
                } else {
                    // cont = 0;
                }
            }
        }

        // for(let aux = 0; aux < dataSource.innerArray.length; aux ++) {

            
        // }

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
                                {
                                    permission === false ? (
                                        <NotPermission/>
                                    ) : (
                                        <div className = 'content'>
                                            <h1 className = 'texth1'> Porcentagem de Respostas </h1>
                                            <Pie
                                                data = { this.state.chartData }
                                                options = { option}
                                            />
                                            {/* {
                                                dataSource.innerArray.map(result =>
                                                    <div key = { result.key }>
                                                        <h2> Pergunta: { result.question } </h2>
                                                        <h3> Resposta: { result.choice } </h3>
                                                        <Progress 
                                                            percent = { result.cont } 
                                                        />
                                                    </div>
                                                )
                                            } */}
                                        </div>
                                    )
                                }
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
        currentQuesttionaire: state.quiz.currentQuesttionaire,
        resultsGraded: state.quiz.resultsGraded,
        currentMeeting: state.meeting.currentMeeting,
        currentUser: state.auth.currentUser,
        choices: state.choices.choices
    };
};

const option = {
    tooltips: {
        callbacks: {
            label: function(tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                var total = meta.total;
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = parseFloat((currentValue/total * 100).toFixed(1));

                return currentValue + ' (' + percentage + '%)';
            },
            title: function(tooltipItem, data) {
                return data.labels[tooltipItem[0].index];
            }
        }
    }
}

const mapDispatchToProps = dispatch => {
	
	return {
        
        getUser: (token, userId) => dispatch(getUser(token, userId)),
        getGradedQuesttionaires: (token, questtionaire_id) => dispatch(getGradedQuesttionaires(token, questtionaire_id)),
        getMeeting: (token, meeting_id) => dispatch(getMeeting(token, meeting_id)),
        getChoices: (token) => dispatch(getChoices(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsQuiz);
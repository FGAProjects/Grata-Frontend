import React, { Component } from 'react';
import { Descriptions, Badge, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Hoc from '../../hoc/hoc';
import { size } from '../utils';
import Homepage from '../homepage/Homepage';

import { getMeeting } from '../../store/actions/meeting';

class Record extends Component {

	state = {
		loading: true,
		iconLoading: false,
	};
	
	enterLoading = () => {
		this.setState({ loading: true });
	};
	
	enterIconLoading = () => {
		this.setState({ iconLoading: true });
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

	render() {

		const { currentMeeting } = this.props;
		const users = size(currentMeeting.users);
		const topics = size(currentMeeting.topics);
		const rules = size(currentMeeting.rules);

		let usersMeeting = {
            innerArray: [
                
            ]
		};

		let topicsMeeting = {
			innerArray: [

			]
		};

		let rulesMeeting = {
			innerArray: [

			]
		};

		for(let aux = 0; aux < users; aux ++) {
			
			usersMeeting.innerArray.push(
                {
					key: aux,
                    users: currentMeeting.users[aux]
                }
			); 
		}

		for(let aux = 0; aux < topics; aux ++) {
			
			topicsMeeting.innerArray.push(
				{
					key: aux,
					topics: currentMeeting.topics[aux]
				}
			);
		}

		for(let aux = 0; aux < rules; aux ++) {
			
			rulesMeeting.innerArray.push(
				{
					key: aux,
					rules: currentMeeting.rules[aux]
				}
			);
		}

		return (

			<Hoc>
				{
					this.props.token === null ? (
						<Homepage/>
					) : (
						<Hoc>
							<div align = 'right'>
								<Button type = 'ghost' 
									htmlType = 'submit' 
									className = 'buttonBack'
									style = {{
										marginTop: '30px',
										marginRight: '30px'
									}} 
								>
									<Link to = { `/reuniao_confirmada/${ currentMeeting.id }/`}>
										<Icon type = 'arrow-left' className = 'icons'/>
										Voltar
									</Link>
								</Button>

								<div className = 'contentRecord'>
									<Descriptions 
										title = {` ${currentMeeting.title} `} 
										layout = 'vertical' 
										bordered
										className = 'texth1'	
									>
										<Descriptions.Item label = 'Título da Reunião'> 
											{ currentMeeting.title } 
										</Descriptions.Item>
										
										<Descriptions.Item label = 'Assunto da Reunião'>
											{ currentMeeting.subject_matter }
										</Descriptions.Item>
										
										<Descriptions.Item label = 'Setor Responsável'>
											{ currentMeeting.sector }
										</Descriptions.Item>
										
										<Descriptions.Item label = 'Data de Abertura'>
											{ currentMeeting.initial_date }
										</Descriptions.Item>
										
										<Descriptions.Item label = 'Data de Encerramento'>
											{ currentMeeting.final_date }
										</Descriptions.Item>
										
										<Descriptions.Item label = 'Hora de Inicio'>
											{ currentMeeting.initial_hour }
										</Descriptions.Item>
										
										<Descriptions.Item label = 'Hora de Encerramento'>
											{ currentMeeting.final_hour }
										</Descriptions.Item>
										
										<Descriptions.Item label = 'Status da Reunião' span = { 3 }>
											<Badge status = 'processing' text = { `${ currentMeeting.status }` } />
										</Descriptions.Item>
										
										<Descriptions.Item label = 'Usuários Confirmados na Reunião'> 
											{ usersMeeting.innerArray.map(user =>
												<li key = { user.key }> { user.users } </li>	
											)}
										</Descriptions.Item>
																	
										<Descriptions.Item label = 'Tópicos'> 
											{ topicsMeeting.innerArray.map(topic =>
												<li key = { topic.key }> { topic.topics } </li>	
											)}
										</Descriptions.Item>

										<Descriptions.Item label = 'Regras da Reunião' span={3}>
											{ rulesMeeting.innerArray.map(rule =>
												<li key = { rule.key }> { rule.rules } </li>	
											)}
										</Descriptions.Item>
									</Descriptions>
								</div>
							</div>
						</Hoc>
					)
				}
			</Hoc>
		);
	}
}

const mapStateToProps = state => {
	
	return {
	
		token: state.auth.token,
        loading: state.meeting.loading,
		currentMeeting: state.meeting.currentMeeting
    };
};

const mapDispatchToProps = dispatch => {
	
	return {
        getMeeting: (token, meeting_id) => dispatch(getMeeting(token, meeting_id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Record);
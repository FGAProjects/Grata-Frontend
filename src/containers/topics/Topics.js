import React, { Component } from 'react';
import { Form, Input, Icon, Button, message } from 'antd';
import { connect } from 'react-redux';

import { createTopic } from '../../store/actions/topic';
import { getProjects } from '../../store/actions/project';
import { getSectors } from '../../store/actions/sector';
import { updateMeeting, getMeeting } from '../../store/actions/meeting';
import { fail } from 'assert';

let id = 0;

class Topics extends Component {

    componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {
        
				const meeting_id = newProps.match.params.id;
				this.props.getProjects(newProps.token);
				this.props.getSectors(newProps.token);
				this.props.getMeeting(newProps.token, meeting_id);
				this.forceUpdate();
            }
        }
    }

    remove = k => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        if (keys.length === 1) {
            return;
        }
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };
    
    add = () => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    handleSubmit = e => {
        
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                
                const token = this.props.token;
                const topics = {
                    title: ''
                };
                const topicsMeeting = [];
                const sectors = this.props.sectors;
				const projects = this.props.projects;
                const { currentMeeting } = this.props;
                let sector_id = 0;
				let project_id = 0;

				for(let aux = 0; aux < sectors.length; aux ++) {

					if(sectors[aux].name === currentMeeting.sector) {
                        sector_id = sectors[aux].id;
                    }
				}

				for(let aux = 0; aux < projects.length; aux ++) {

					if(projects[aux].title === currentMeeting.project) {
						project_id = projects[aux].id;
					}
                }
                
                const meeting = {
					meetingId: currentMeeting.id,
					title: currentMeeting.title,
					subject_matter: currentMeeting.subject_matter,
					status: currentMeeting.status,
					initial_date: currentMeeting.initial_date,
					final_date: currentMeeting.final_date,
					initial_hour: currentMeeting.initial_hour,
					final_hour: currentMeeting.final_hour,
					sector: sector_id,
					project: project_id,
					topics: [

					]
                };


                for(let aux = 0; aux < values.topics.length; aux ++) {
                    topics.title = values.topics[aux];
                    if((this.props.createTopic(token, topics)) !== fail) {
                    
                    }
                        // if((this.props.updateMeeting(token, meeting)) !== fail) {
                        //     message.success('Tópicos Adicionados Com Sucesso!');
                        // } else {
                        //     message.error('Não Foi Possível Adicionar os Tópicos. ' + 
                        //                 'Entre em Contato Com o Desenvolvedor!');
                        // } 
                        // this.props.history.push(`/detalhes_reuniao/${ currentMeeting.id }`);
                }

                console.log(topics)
                
                    

                //       if (!err) {
//         console.log("Received values of form: ", values);
//         const questions = [];
//         for (let i = 0; i < values.questions.length; i += 1) {
//           questions.push({
//             title: values.question[i],
//             choices: values.questions[i].choices.filter(el => el !== null),
//             answer: values.answers[i]
//           });
//         }
//         const asnt = {
//           teacher: this.props.username,
//           title: values.title,
//           questions
//         };

                    // if((this.props.createTopic(token, topic)) !== fail) {
                    //     // if((this.props.updateMeeting(token, meeting)) !== fail) {
                    //     //     message.success('Tópicos Adicionados Com Sucesso!');
                    //     // } else {
                    //     //     message.error('Não Foi Possível Adicionar os Tópicos. ' + 
                    //     //                 'Entre em Contato Com o Desenvolvedor!');
                    //     // } 
                    //     // this.props.history.push(`/detalhes_reuniao/${ currentMeeting.id }`);
                    // }   

               

                // if((this.props.createTopic(token, topics)) !== fail) {
                //     if((this.props.updateMeeting(token, meeting)) !== fail) {
                //         message.success('Tópicos Adicionados Com Sucesso!');
                //     } else {
                //         message.error('Não Foi Possível Adicionar os Tópicos. ' + 
                //                       'Entre em Contato Com o Desenvolvedor!');
                //     } 
                //     // this.props.history.push(`/detalhes_reuniao/${ currentMeeting.id }`);
                // }
            }
        });
    };

    render() {

        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
        },
        };
        const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
        },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item
                { ...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel) }
                label = { index === 0 ? 'Tópicos' : '' }
                required = { false }
                key = { k }
            >
                {
                    getFieldDecorator(`topics[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [
                        {
                            required: true,
                            whitespace: true,
                            message: 'Por Favor, Adicione um Tópico ou Excluia Este Campo.',
                        },
                    ],
                    })(
                        <Input 
                            placeholder = 'Título do Tópico' 
                            style = {{ 
                                width: '60%', 
                                marginRight: 8 
                            }} 
                        />
                    )
                }
                { 
                    keys.length > 1 ? (
                        <Icon
                            className = 'dynamic-delete-button'
                            type = 'minus-circle-o'
                            onClick={() => this.remove(k) }
                        />
                    ) : null 
                }
            </Form.Item>
        ));

        return(

            <div align = 'center' >
                <Form onSubmit = { this.handleSubmit }>
                    { formItems }
                    <Form.Item {...formItemLayoutWithOutLabel }>
                        <Button 
                            type = 'dashed' 
                            onClick = { this.add } 
                            style = {{ 
                                width: '60%' 
                            }}
                        >
                            <Icon type="plus" /> Adicionar Tópico
                        </Button>
                    </Form.Item>

                    <Form.Item { ...formItemLayoutWithOutLabel }>
                        <Button 
                            type = 'primary' 
                            htmlType = 'submit'
                        >
                            Cadastrar e Próximo
                            <Icon type="right" />
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const TopicsDynamicFieldSet = Form.create()(Topics);

const mapStateToProps = state => {
	
	return {
	
		token: state.auth.token,
        loading: state.topic.loading,
        sectors: state.sector.sectors,
		projects: state.project.projects,
		currentMeeting: state.meeting.currentMeeting
    };
};

const mapDispatchToProps = dispatch => {
	
	return {
        
        getSectors: token => dispatch(getSectors(token)),
		getProjects: token => dispatch(getProjects(token)),
        getMeeting: (token, meeting_id) => dispatch(getMeeting(token, meeting_id)),
        updateMeeting: (token, meeting_id) => dispatch(updateMeeting(token, meeting_id)),
        createTopic: (token, topic) => dispatch(createTopic(token, topic))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicsDynamicFieldSet);
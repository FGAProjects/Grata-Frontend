import React, { Component } from 'react';
import { Form, Input, Icon, Button, message } from 'antd';
import { connect } from 'react-redux';

import Hoc from '../../hoc/hoc';
import NotPermission from '../notPermission/NotPermission';
import Homepage from '../homepage/Homepage';

import { getMeeting, updateMeeting } from '../../store/actions/meeting';

let id = 0;

class Topics extends Component {

    componentDidMount() {
        
        if (this.props.token !== undefined && this.props.token !== null) {
        
            const meeting_id = this.props.match.params.meeting_id;
            this.props.getMeeting(this.props.token, meeting_id);
            this.forceUpdate();
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {
		
				const meeting_id = newProps.match.params.meeting_id;
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

                const { currentMeeting } = this.props;                
                const token = this.props.token;
                const topics = [

                ];

                for(let aux = 0; aux < values.topics.length; aux ++) {

                    topics.push({
                        title: values.topics[aux]
                    });
                }
    
                const meeting = {

                    meeting: currentMeeting.id,
                    title: currentMeeting.title,
                    subject_matter: currentMeeting.subject_matter,
                    status: currentMeeting.status,
                    initial_date: currentMeeting.initial_date,
                    final_date: currentMeeting.final_date,
                    initial_hour: currentMeeting.initial_hour,
                    final_hour: currentMeeting.final_hour,
                    sector: currentMeeting.sector,
                    project: currentMeeting.project,
                    topics
                };
    
                this.props.updateMeeting(token, meeting);
                message.success('Tópicos Adicionados Com Sucesso!');
                this.props.history.push(`/criar_regras/${ currentMeeting.id }/`);
            }
        });
    };

    render() {

		const user = JSON.parse(localStorage.getItem('user'));
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 0 },
            }
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
            <Form.Item className = 'formFields'
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

            <Hoc>
                {
                    this.props.token === null ? (
                        <Homepage/>
                    ) : (
                        <Hoc>
                            {
                                user.is_administrator === true ? (
                                    <div className = 'content' >
                                        <h1 className = 'texth1'> Tópicos da Reunião </h1>
                                        <Form onSubmit = { this.handleSubmit }>
                                            { formItems }
                                            <Form.Item {...formItemLayoutWithOutLabel } className = 'formFields'>
                                                <Button type = 'dashed' onClick = { this.add } className = 'buttonAdd'>
                                                    <Icon type="plus" /> Adicionar Tópico
                                                </Button>
                                            </Form.Item>

                                            <div align = 'center'>
                                                <Form.Item { ...formItemLayoutWithOutLabel }>
                                                    <Button type = 'ghost' htmlType = 'submit' className = 'buttonSave'>
                                                        Cadastrar e Próximo
                                                        <Icon type = 'right' className = 'icons'/>
                                                    </Button>
                                                </Form.Item>
                                            </div>
                                        </Form>
                                    </div>
                                ) : (
                                    <NotPermission/>
                                )
                            }
                            
                        </Hoc>
                    )
                }
            </Hoc>
        );
    }
}

const TopicsDynamicFieldSet = Form.create()(Topics);

const mapStateToProps = state => {
	
	return {
	
		token: state.auth.token,
        loading: state.meeting.loading,
        currentMeeting: state.meeting.currentMeeting
    };
};

const mapDispatchToProps = dispatch => {
	
	return {
        
        getMeeting: (token, meeting_id) => dispatch(getMeeting(token, meeting_id)),
        updateMeeting: (token, meeting) => dispatch(updateMeeting(token, meeting))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicsDynamicFieldSet);
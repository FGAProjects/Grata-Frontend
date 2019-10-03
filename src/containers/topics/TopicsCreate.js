import React, { Component } from 'react';
import { Form, Input, Icon, Button, message } from 'antd';
import { connect } from 'react-redux';

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

    componentWillReceiveProps(newProps) {
		
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
                
                const token = this.props.token;
                const topics = [];
                const { currentMeeting } = this.props;
                const sector_id = this.props.match.params.sector_id;
                const project_id = this.props.match.params.project_id;

                if(values.topics.length > 0) {

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
                        sector: sector_id,
                        project: project_id,
                        topics
                    };
    
                    this.props.updateMeeting(token, meeting);
                    message.success('Tópicos Adicionados Com Sucesso!');
                    this.props.history.push(`/criar_regras/${ currentMeeting.id }/${ project_id }/${ sector_id }`);
                } else {

                    message.warning('Nenhum Tópico Adicionado a Reunião.');
                    this.props.history.push(`/criar_regras/${ currentMeeting.id }/${ project_id }/${ sector_id }`);
                }
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
                <h1> Tópicos da Reunião </h1>
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
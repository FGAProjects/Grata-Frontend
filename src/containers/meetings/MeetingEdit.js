import React, { Component } from 'react';
import { Skeleton, Form, Input, Button, Modal, message, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Hoc from '../../hoc/hoc';
import { getMeeting } from '../../store/actions/meeting';

class MeetingEdit extends Component {

    constructor() {
		super();
		this.state = {
			formLayout: 'vertical',
		};
    }

    componentDidMount() {

		const meeting_id = this.props.match.params.id;
        this.props.getMeeting(this.props.token, meeting_id);
        this.forceUpdate();
	}

    UNSAFE_componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {
		
				const meeting_id = newProps.match.params.id;
				this.props.getMeeting(newProps.token, meeting_id);
				this.forceUpdate();
            }
        }
    }

    render() {
        
        const { currentMeeting } = this.props;
		const { formLayout } = this.state;
		const formItemLayout = formLayout === 'vertical'? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
		}
        : null;
        
        const formItemLayoutMinimum = formLayout === 'vertical'? {
            labelCol: { span: 4 },
            wrapperCol: { span: 2 },
		}
		: null;

        return (
            <Hoc>
                <div align = 'center'>
                    <Hoc>
                        {
                            this.props.loading ? (
                                <Skeleton active />
                            ) : (
                                <Hoc>
                                    <h1> Informações Cadastradas da Reunião </h1>
                                    <Form layout = 'vertical' >
                                        <Form.Item label = 'Nome' { ...formItemLayout } >
                                            <Input 
                                                value = { currentMeeting.title } 
                                                disabled = { true } 
                                            />
                                        </Form.Item>
                                    </Form>

                                    <Form layout = 'vertical'>
                                        <Form.Item label = 'Assunto' { ...formItemLayout } >
                                            <Input 
                                                value = { currentMeeting.subject_matter } 
                                                disabled = { true } 
                                            />
                                        </Form.Item>
                                    </Form>

                                    <Form layout = 'vertical'>
                                        <Form.Item label = 'Local' { ...formItemLayout } >
                                            <Input 
                                                value = { currentMeeting.sector } 
                                                disabled = { true } 
                                            />
                                        </Form.Item>
                                    </Form>

                                    <Form layout = 'vertical'>
                                        <Form.Item label = 'Status' { ...formItemLayoutMinimum } >
                                            <Input 
                                                value = { currentMeeting.status } 
                                                disabled = { true } 
                                            />
                                        </Form.Item>
                                    </Form>

                                    <Form layout = 'vertical' >
                                        <Form.Item label = 'Data de Inicio' 
                                        { ...formItemLayoutMinimum } >
                                            <Input 
                                                value = { currentMeeting.initial_date } 
                                                disabled = { true } 
                                            />
                                        </Form.Item>

                                        <Form.Item label = 'Data de Inicio' 
                                        { ...formItemLayoutMinimum } >
                                            <Input 
                                                value = { currentMeeting.final_date } 
                                                disabled = { true } 
                                            />
                                        </Form.Item>

                                        <Form.Item label = 'Hora de Inicio' { ...formItemLayoutMinimum } >
                                            <Input 
                                                value = { currentMeeting.initial_hour } 
                                                disabled = { true } 
                                            />
                                        </Form.Item>

                                        <Form.Item label = 'Hora de Encerramento' { ...formItemLayoutMinimum } >
                                            <Input 
                                                value = { currentMeeting.final_hour } 
                                                disabled = { true } 
                                            />
                                        </Form.Item>

                                        <Form.Item>
                                            <div align = 'center'>
                                                <Button 
                                                    type = 'primary' 
                                                    htmlType = 'submit' 
                                                    style = {{ 
                                                        marginRight: '20px' 
                                                    }}
                                                >
                                                    <Link to = { `/editar_reuniao/${ currentMeeting.id }` } >
                                                        <Icon 
                                                            type = 'edit' 
                                                            style = {{ marginRight: '10px' }} />
                                                            Editar Reunião
                                                    </Link>
                                                </Button>
                                                <Button 
                                                    type = 'primary' 
                                                    htmlType = 'submit' 
                                                    style = {{ 
                                                        marginRight: '20px' 
                                                    }}
                                                >
                                                    <Link to = { `/detalhes_reuniao/${ this.props.match.params.id }` } >
                                                        <Icon 
                                                            type = 'arrow-left' 
                                                            style = {{ marginRight: '10px' }} />
                                                            Voltar
                                                    </Link>
                                                </Button>
                                            </div>
                                        </Form.Item>
                                    </Form>
                                </Hoc>
                            )
                        }
                    </Hoc>
                </div>
            </Hoc>
        )
    }
}

const MetailEditForm = Form.create()(MeetingEdit);

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

export default connect(mapStateToProps, mapDispatchToProps)(MetailEditForm);
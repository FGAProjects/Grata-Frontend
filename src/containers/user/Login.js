import React from 'react';
import { Form, Icon, Input, Button, Spin, Layout, message } from 'antd';
import { connect } from 'react-redux';

import { authLogin } from '../../store/actions/auth';

const { Content } = Layout;

class Login extends React.Component {

    handleSubmit = e => {
        
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                
                const username = values.username;
                const password = values.password;
                this.props.onAuth(username, password);
                this.props.history.push('/');
            } else {

            }
        });
    };

    render() {

        const { getFieldDecorator } = this.props.form;
        const antIcon = <Icon type = 'loading' style = {{ fontSize: 24 }} spin />;

        if(this.props.error) {
            message.error('Usuário ou Senha Incorretos. Tente Novamente!');
        }

        return (

            <div>
                {
                    this.props.loading ? (

                        <Spin indicator = { antIcon } />

                    ): (
                        <Content className = 'contentLogin'>
                            <Form onSubmit = { this.handleSubmit } className = 'login-form' >

                                <Form.Item className = 'inputFormLoginUser'>
                                    {
                                        getFieldDecorator('username', {
                                        rules: [{ 
                                            required: true, 
                                            message: 'Por favor, Coloque o Seu Usuário!' 
                                        }],
                                    })(
                                        <Input
                                            
                                            prefix = { 
                                                <Icon 
                                                    type = 'user' 
                                                    style = {{ 
                                                        color: 'rgba(0,0,0,.25)' 
                                                    }} 
                                                />
                                            }
                                            placeholder = 'Usuário'
                                        />,
                                    )}
                                </Form.Item>

                                <Form.Item className = 'inputFormLoginPassword'>
                                    {
                                        getFieldDecorator('password', {
                                        rules: [{ 
                                            required: true, 
                                            message: 'Por favor, Coloque Sua Senha!' }],
                                    })(
                                        <Input
                                            prefix = {
                                                <Icon 
                                                    type = 'lock' 
                                                    style = {{ 
                                                        color: 'rgba(0,0,0,.25)' 
                                                    }} 
                                                />
                                            }
                                            type = 'password'
                                            placeholder = 'Senha'
                                        />,
                                    )}
                                </Form.Item>

                                <Button 
                                    type = 'primary' 
                                    htmlType = 'submit' 
                                    className = 'buttonSubmitLogin'>
                                    Login
                                </Button>
                            </Form>
                        </Content>
                    )
                }
            </div>
        );
    }
}

const LoginForm = Form.create()(Login);

const mapStateToProps = (state) => {
    return {
        
        loading: state.auth.loading,
        error: state.auth.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(authLogin(username, password))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
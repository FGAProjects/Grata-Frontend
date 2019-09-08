import React from 'react';
import { Form, Icon, Input, Button, Spin } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { authLogin } from '../../store/actions/auth';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Login extends React.Component {
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onAuth(values.username, values.password);
            }
        });
        this.props.history.push('/');
    };

    render() {

    let errorMessage = null;
    if(this.props.error) {
        errorMessage = (
            <p> { this.props.error.message } </p>
        );
    }

    const { getFieldDecorator } = this.props.form;
    return (
        <div>
            {errorMessage}
            {
                this.props.loading ? (

                    <Spin indicator = { antIcon } />

                ): (
                    <Form onSubmit = { this.handleSubmit } className = 'login-form' >

                        <Form.Item>
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

                        <Form.Item>
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

                        <Form.Item>
                            <Button 
                                type = 'primary' 
                                htmlType = 'submit' 
                                style = {{
                                    marginRight: '10px'
                                }} 
                            >
                                Login
                            </Button>
                            Ou
                            <NavLink 
                                style = {{
                                    marginRight: '10px'
                                }} 
                                to = '/adicionar_usuario/' > 
                                Cadastrar
                            </NavLink>
                        </Form.Item>
                    </Form>
                )
            }
        </div>
        );
    }
}

const LoginForm = Form.create()(Login);

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        user_username: state.username
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
import React, { Component } from 'react';
import { Tabs, Skeleton, Form, Input, Button, message, Icon, Select, Table, Tag } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fail } from 'assert';

import Hoc from '../../hoc/hoc';
import Homepage from '../homepage/Homepage';
import NotPermission from '../notPermission/NotPermission';
import { dynamicSort } from '../utils';

import { getUser, authSignup, getUsers } from '../../store/actions/auth';

const { TabPane } = Tabs;
const Option = Select.Option;

class UserOptions extends Component {

    constructor() {
		
		super();
		this.state = {
			formLayout: 'vertical'
		};
	}

	state = {
		confirmDirty: false
	};

    componentDidMount() {

		if (this.props.token !== undefined && this.props.token !== null) {

            this.forceUpdate();
            this.props.getUsers(this.props.token);
            this.props.getUser(this.props.token, this.props.currentUser.userId);
		}
	}

	UNSAFE_componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {

                this.forceUpdate();
                this.props.getUsers(newProps.token);
                this.props.getUser(newProps.token, newProps.currentUser.userId);
			}
		}
    }

    callback(key) {

    }

    handleSubmit = e => {
		
		e.preventDefault();
		
		this.props.form.validateFieldsAndScroll((err, values) => {
		
			if (!err) {
				let is_administrator = false;

				if(values.userType === 'administrator') {
					is_administrator = true;
				}
			
				const user = {

					username: values.username,
					name: values.name,
					ramal: values.ramal,
					email: values.email,
					password1: values.password1,
					password2: values.password2,
					is_administrator: is_administrator
				}

				if((this.props.onAuth(user)) !== fail) {
					message.success('O Usuário ' + values.username + ' Foi Cadastrado Com Sucesso!');
				} else {
					message.error('Não Foi Possível Cadastrar o Usuário. ' + 
								  'Entre em Contato Com o Desenvolvedor!');
				}
				this.props.history.push('/');			
			} else {

			}	
		});
	};

	handleConfirmBlur = e => {
		
		const { value } = e.target;
		this.setState({ 
			confirmDirty: this.state.confirmDirty || !!value 
		});
	};

	compareToFirstPassword = (rule, value, callback) => {
		
		const { form } = this.props;
		if (value && value !== form.getFieldValue('password1')) {
			callback('As senhas digitadas não são iguais!');
		} else {
			callback();
		}
	};

	validateToNextPassword = (rule, value, callback) => {
		
		const { form } = this.props;
		if (value && this.state.confirmDirty) {
			form.validateFields(['password2'], { force: true });
		}
		callback();
	};

    render() {

        const { currentUser } = this.props;
        const { getFieldDecorator } = this.props.form;
		const { formLayout } = this.state;
		const formItemLayout = formLayout === 'vertical'? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
		}
        : null;
        const users = this.props.users;
        let permission = '';
        let dataSource = {
            innerArray: [
                
            ]
        };

        for(let aux = 0; aux < users.length; aux ++) {

            if(users[aux].is_administrator === true) {
                permission = 'Administrador';
            } else {
                permission = 'Participante da Reunião';
            }
            
            if(users[aux].sector === null || users[aux].sector === undefined) {
                users[aux].sector = 'Não Possui Setor no Momento';
            }

            dataSource.innerArray.push({

                key: users[aux].id,
                name: users[aux].name,
                username: users[aux].username,
                ramal: users[aux].ramal,
                setor: users[aux].sector,
                email: users[aux].email,
                tags: [permission]
            }); 
		}

		dataSource.innerArray.sort(dynamicSort('name'));

        return (
        
            <Hoc>
                {
                    this.props.token === null ? (
                        <Homepage />
                    ) : (
                        <Hoc>
                            <div className = 'content'>
                                <Tabs 
                                    onChange = { this.callback }>
                                    <TabPane tab = 'Novo Usuário' key = '1'>
                                        {
                                            currentUser.is_administrator !== true ? (
                                                <NotPermission/>
                                            ) : (
                                                <div>
                                                    <h1 className = 'texth1'> Criar Novo Usuário </h1>
                                                    <Form onSubmit = { this.handleSubmit }>
                                                        <Form.Item label = 'Nome Completo' className = 'formFields' { ...formItemLayout }>
                                                            {
                                                                getFieldDecorator('name', {
                                                                    rules: [{ 
                                                                        required: true, 
                                                                        message: 'Por favor, Insira Seu Nome Completo!'
                                                                    }],
                                                                })(
                                                                    <Input prefix = { <Icon type = 'user' className = 'icons'/> }
                                                                        placeholder = 'Nome Completo'
                                                                    />
                                                                )
                                                            }
                                                        </Form.Item>

                                                        <Form.Item label = 'Usuário' className = 'formFields' { ...formItemLayout }>
                                                            {
                                                                getFieldDecorator('username', {
                                                                    rules: [{ 
                                                                        required: true, 
                                                                        message: 'Por favor, Coloque Seu Usuário!',
                                                                    },
                                                                    {
                                                                        max: 10,
                                                                        message: 'O Usuário Pode Ter no Máximo 10 Caracteres!',
                                                                    }],
                                                                })(
                                                                    <Input prefix = { <Icon type = 'user' className = 'icons'/> }
                                                                        placeholder = 'Usuário'
                                                                    />
                                                                )
                                                            }
                                                        </Form.Item>

                                                        <Form.Item label = 'E-mail' className = 'formFields' { ...formItemLayout }>
                                                            {
                                                                getFieldDecorator('email', {
                                                                    rules: [
                                                                    {
                                                                        type: 'email',
                                                                        message: 'Esse tipo de E-mail Não é Válido!',
                                                                    },
                                                                    {
                                                                        required: true,
                                                                        message: 'Por Favor, Coloque Seu E-mail!',
                                                                    },
                                                                    ],
                                                                })(
                                                                    <Input 
                                                                        prefix = { <Icon type = 'mail' className = 'icons'/> }
                                                                        placeholder = 'Email'
                                                                    />
                                                                )
                                                            }
                                                        </Form.Item>

                                                        <Form.Item label = 'Ramal' className = 'formFields' { ...formItemLayout }>
                                                            {
                                                                getFieldDecorator('ramal', {
                                                                    rules: [{ 
                                                                        required: true, 
                                                                        message: 'Por favor, Coloque Seu Ramal!' 
                                                                    }],
                                                                })(
                                                                    <Input prefix = { <Icon type = 'phone' className = 'icons'/> }
                                                                        type = 'number' placeholder = 'Ramal'
                                                                    />
                                                                )
                                                            }
                                                        </Form.Item>

                                                        <Form.Item label='Senha' hasFeedback className = 'formFields' { ...formItemLayout }>
                                                            {
                                                                getFieldDecorator('password1', {
                                                                    rules: [
                                                                    {
                                                                        required: true,
                                                                        message: 'Por favor, Insira Sua Senha!',
                                                                    },
                                                                    {
                                                                        validator: this.validateToNextPassword,
                                                                    },
                                                                    ],
                                                                })(
                                                                    <Input prefix = { <Icon type = 'lock' className = 'icons'/> }
                                                                        type = 'password' placeholder = 'Senha'
                                                                    />
                                                                )
                                                            }
                                                        </Form.Item>

                                                        <Form.Item label = 'Repita a Senha' hasFeedback 
                                                                className = 'formFields' { ...formItemLayout }>
                                                            {
                                                                getFieldDecorator('password2', {
                                                                    rules: [
                                                                    {
                                                                        required: true,
                                                                        message: 'Por favor, Repita a Sua Senha!',
                                                                    },
                                                                    {
                                                                        validator: this.compareToFirstPassword,
                                                                    },
                                                                    ],
                                                                })(
                                                                    <Input prefix = { <Icon type = 'lock' className = 'icons'/> }
                                                                        type = 'password' placeholder = 'Repita sua senha' 
                                                                        onBlur = { this.handleConfirmBlur } 
                                                                    />
                                                                )
                                                            }
                                                        </Form.Item>

                                                        <Form.Item label = 'Tipo de Usuário' hasFeedback 
                                                                className = 'formFields' { ...formItemLayout }>
                                                            {
                                                                getFieldDecorator('userType', {
                                                                rules: [
                                                                    {
                                                                        required: true,
                                                                        message: 'Por favor, Escolha o Tipo de Usuário!',
                                                                    }
                                                                    ],
                                                                })(
                                                                    <Select placeholder = 'Escolha o Tipo de Usuário' >
                                                                        <Option value = 'administrator'> Administrador </Option>
                                                                        <Option value = 'participant'> Participante da Reunião </Option>
                                                                    </Select>  
                                                                )
                                                            }
                                                        </Form.Item>

                                                        <Form.Item>
                                                            <div align = 'center'>
                                                                <Button type = 'ghost' htmlType = 'submit' className = 'buttonSave'>
                                                                    <Icon className = 'icons' type = 'save'/>
                                                                        Cadastrar Usuário
                                                                </Button>
                                                                <Button type = 'default' className = 'buttonCancel'>
                                                                    <Link to = { '/lista_de_projetos/' }>
                                                                    <Icon className = 'icons' type = 'stop'/>
                                                                        Cancelar
                                                                    </Link>
                                                                </Button>
                                                            </div>
                                                        </Form.Item>
                                                    </Form>
                                                </div>
                                            )
                                        }
                                    </TabPane>
                                    <TabPane tab = 'Lista de Usuário Cadastrados' key = '2'>
                                        {
                                            this.props.loading ? (
                                                <Skeleton active/>
                                            ) : (
                                                <div className = 'contentList'>
                                                    <Table columns = {
                                                    [{
                                                        title: 'Nome',
                                                        dataIndex: 'name',
                                                        key: 'name',
                                                        render: (text) => (
                                                            <b>{text}</b>
                                                        )
                                                    },
                                                    {
                                                        title: 'Usuário',
                                                        dataIndex: 'username',
                                                        key: 'username',
                                                        render: (text) => (
                                                            <b>{text}</b>
                                                        )
                                                    },
                                                    {
                                                        title: 'Ramal',
                                                        dataIndex: 'ramal',
                                                        key: 'ramal',
                                                        render: (text) => (
                                                            <b>{text}</b>
                                                        )
                                                    },
                                                    {
                                                        title: 'Setor',
                                                        dataIndex: 'setor',
                                                        key: 'setor',
                                                        render: (text) => (
                                                            <b>{text}</b>
                                                        )
                                                    },
                                                    {
                                                        title: 'Email',
                                                        dataIndex: 'email',
                                                        key: 'email',
                                                        render: (text) => (
                                                            <b>{text}</b>
                                                        )
                                                    },
                                                    {
                                                        title: 'Tipo de Permissão',
                                                        key: 'tags',
                                                        dataIndex: 'tags',
                                                        render: tags => (
                                                            <span>
                                                            {
                                                                tags.map(tag => {
                                                                    let color = tag.length > 5 ? 'geekblue' : 'green';
                                                                    if (tag === 'Participante da Reunião') {
                                                                        color = 'volcano';
                                                                    }
                                                                    return (
                                                                    <Tag color = { color } key = { tag }>
                                                                        <b> { tag.toUpperCase() } </b>
                                                                    </Tag>
                                                                    );
                                                                })
                                                            }
                                                            </span>
                                                        ),
                                                    },
                                                    ]}
                                                    dataSource = {
                                                        dataSource.innerArray
                                                    } 
                                                />
                                            </div>
                                            )
                                        }
                                    </TabPane>                
                                </Tabs>
                            </div>
                            }
                        </Hoc>
                    )
                }
            </Hoc>
        );
    }
}

const UserOptionsForm = Form.create()(UserOptions);

const mapStateToProps = state => {

	return {

        token: state.auth.token,
        error: state.error,
        currentUser: state.auth.currentUser,
        users: state.auth.users,
        loading: state.auth.loading
	};
};

const mapDispatchToProps = dispatch => {

	return {

        getUser: (token, userId) => dispatch(getUser(token, userId)),
        onAuth: (user) => dispatch(authSignup(user)),
        getUsers: token => dispatch(getUsers(token))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOptionsForm);
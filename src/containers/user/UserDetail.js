import React, { Component } from 'react';
import { Tabs, Skeleton, Form, Input, Button, Modal, message, Icon, Select } from 'antd';
import { connect } from 'react-redux';
import { fail } from 'assert';

import Hoc from '../../hoc/hoc';
import Homepage from '../homepage/Homepage';
import { dynamicSort } from '../utils';

import { getUser, deleteUser, updateUser } from '../../store/actions/auth';
import { getSectors } from '../../store/actions/sector';

const { TabPane } = Tabs;
const { confirm } = Modal;
const Option = Select.Option;

class UserDetail extends Component {

    constructor() {
		
		super();
		this.state = {
			formLayout: 'vertical'
		};
    }
    
    componentDidMount() {

		if (this.props.token !== undefined && this.props.token !== null) {
            this.props.getUser(this.props.token, this.props.currentUser.userId);
			this.props.getSectors(this.props.token);
		}
	}

	UNSAFE_componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {
                this.props.getUser(newProps.token, newProps.currentUser.userId);
				this.props.getSectors(newProps.token);
			}
		}
    }

    handleSubmit = e => {
		
		e.preventDefault();
		
		this.props.form.validateFieldsAndScroll((err, values) => {
			
			if (!err) {
		
				const { currentUser } = this.props;
				const userGetItem = JSON.parse(localStorage.getItem('user'));
				const token = userGetItem.token;
				const sectors = this.props.sectors;
				let sector_id = 0;

				if(values.sector === undefined) {
		
					message.warning('O Setor Não Pode Ser Nulo.' + 
									'Caso Não Tenha Setores Cadastrados, ' +
									'Entre em Contato Com o Administrador do Setor ' + 
									'ou Com o Desenvolvedor');
					this.props.history.push('/informacoes_usuario/');
				} else {
		
					for(let aux = 0; aux < sectors.length; aux ++) {
		
						if(sectors[aux].initials === values.sector) {
							sector_id = sectors[aux].id;
						} 
					}
	
					const user = {

						userId: currentUser.id,
						email: currentUser.email,
						username: currentUser.username,
						ramal: values.ramal,
						name: values.name,
						is_administrator: currentUser.is_administrator,
						is_participant: !currentUser.is_administrator,
						sector: sector_id
					};

					if((this.props.updateUser(token, user)) !== fail) {
						message.success('O Usuário ' + currentUser.username + 
										' Teve Suas Informações Alteradas Com Sucesso!');
					} else {
						message.error('Não Foi Possível Alterar Informações do Usuário. ' + 
									'Entre em contato com o desenvolvedor!');
					}
					this.props.history.push('/informacoes_usuario/');
				}
			} else {

			}	
		});
	};
    
    showDeleteConfirm = (token, name, userId) => {
		
		const propsForms = this.props;
		
		confirm ({
			title: 'Exclusão de Conta',
			content: 'Tem Certeza Que Deseja Excluir a Conta de ' + name + '?',
			okText: 'Sim',
			okType: 'danger',
			cancelText: 'Não',
		
			onOk() {
				propsForms.deleteUser(token, userId);
				Modal.success({
					title: 'Ação Concluída!',
					content: 'Conta Excluída Com Sucesso!',
				});
				propsForms.history.push('/')
			},
			onCancel() {
				message.success('Exclusão de Conta Cancelada Com Sucesso!');
			},
		});
	}

    callback(key) {

    }

    render() {

        const { currentUser } = this.props;
		const sectors = this.props.sectors;
        const { formLayout } = this.state;
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = formLayout === 'vertical'? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
		}
        : null;
        let token = this.props.token;
        let dataSource = {
            innerArray: [
                
            ]
        }
        
        if(token === undefined) {

			const user = JSON.parse(localStorage.getItem('user'));
			token = user.token;
		}

		if(currentUser.sector === null) {
			currentUser.sector = 'Não Possui Setor no Momento';
        }
        
        for(let aux = 0; aux < sectors.length; aux ++) {

            dataSource.innerArray.push(
                {
                    key: sectors[aux].id,
                    initials: sectors[aux].initials,
                    name: sectors[aux].name
                }
			); 
        }
        
        console.log(dataSource.innerArray)

		dataSource.innerArray.sort(dynamicSort('initials'));

        return (
        
            <Hoc>
                {
                    this.props.token === null ? (
                        <Homepage/>
                    ) : (
                        this.props.loadingUser ? (
                            <Skeleton active/>
                        ) : (
                            <div className = 'content'>
                                <Tabs 
                                    onChange = { this.callback }
                                >
                                    <TabPane tab = 'Informações do Usuário' key = '1'>
                                        <Hoc>
                                            <div className = 'contentUser'>
                                                <h1 className = 'texth1'> Informações Cadastradas </h1>
                                                <Form layout = 'vertical' className = 'formUser'>
                                                    <Form.Item 
                                                        label = 'Nome' 
                                                        { ...formItemLayout }
                                                        className = 'formFields'	
                                                    >
                                                        <Input 
                                                            value = { currentUser.name } 
                                                            disabled = { true } 
                                                        />
                                                    </Form.Item>

                                                    <Form.Item 
                                                        label = 'Usuário' 
                                                        { ...formItemLayout }
                                                        className = 'formFields'	
                                                    >
                                                        <Input 
                                                            value = { currentUser.username } 
                                                            disabled = { true } 
                                                        />
                                                    </Form.Item>
                                                    
                                                    <Form.Item 
                                                        label = 'Email' 
                                                        { ...formItemLayout }
                                                        className = 'formFields'	
                                                    >
                                                        <Input 
                                                            value = { currentUser.email } 
                                                            disabled = { true } 
                                                        />
                                                    </Form.Item>

                                                    <Form.Item 
                                                        label = 'Setor' 
                                                        { ...formItemLayout }
                                                        className = 'formFields'											
                                                    >
                                                        <Input 
                                                            value = { currentUser.sector } 
                                                            disabled = { true } 
                                                        />
                                                    </Form.Item>
                                                    
                                                    <Form.Item 
                                                        label = 'Ramal' 
                                                        { ...formItemLayout }
                                                        className = 'formFields'
                                                    >
                                                        <Input 
                                                            value = { currentUser.ramal } 
                                                            disabled = { true } />
                                                    </Form.Item>

                                                    {
                                                        currentUser.is_administrator === true ? (
                                                            <Form.Item 
                                                                label = 'Tipo de Usuário' 
                                                                { ...formItemLayout }
                                                                className = 'formFields'	
                                                            >
                                                                <Input 
                                                                    value = 'Administrador' 
                                                                    disabled = { true } />
                                                            </Form.Item>
                                                        ) : null
                                                    }
                
                                                    {
                                                        currentUser.is_participant === true ? (
                                                            <Form.Item 
                                                                label = 'Tipo de Usuário' 
                                                                { ...formItemLayout }
                                                                className = 'formFields'	
                                                            >
                                                                <Input 
                                                                    value = 'Participante da Reunião'
                                                                    disabled = { true } />
                                                            </Form.Item>
                                                        ) : null	
                                                    }
                                                </Form>
                                            </div>
                                        </Hoc>
                                    </TabPane>

                                    <TabPane tab = 'Edição/Exclusão do Usuário' key = '2'>
                                        <Hoc>
                                            <div className = 'contentUserEdit'>
                                                <h1 className = 'texth1'> Informações A Serem Alteradas </h1>
                                                <Form layout = 'vertical' onSubmit = { this.handleSubmit } >
                                                    <Form.Item 
                                                        label = 'Nome Completo'
                                                        { ...formItemLayout }
                                                        className = 'formFields'
                                                    >
                                                        {
                                                            getFieldDecorator('name', {
                                                                rules: [{ 
                                                                    required: true, 
                                                                    message: 'Por favor, Insira Seu Nome Completo!'
                                                                }],
                                                            })(
                                                                <Input 
                                                                    prefix = { <Icon type = 'user'/> }
                                                                    placeholder = 'Nome Completo'
                                                                />
                                                            )
                                                        }
                                                    </Form.Item>

                                                    <Form.Item 
                                                        label = 'Setor' 
                                                        hasFeedback 
                                                        { ...formItemLayout }
                                                        className = 'formFields'
                                                    >
                                                        {
                                                            getFieldDecorator('sector', {
                                                            rules: [
                                                                {
                                                                    required: true,
                                                                    message: 'Por favor, Escolha o Setor do Usuário!',
                                                                }
                                                                ],
                                                            })(
                                                                <Select placeholder = 'Escolha o Setor' >
                                                                    { dataSource.innerArray.map(sector => 
                                                                        <Option 
                                                                            key = { sector.key } 
                                                                            value = { sector.initials }>
                                                                            { sector.name }
                                                                        </Option>)
                                                                    }
                                                                </Select>  
                                                            )
                                                        }
                                                    </Form.Item>

                                                    <Form.Item 
                                                        label = 'Ramal'
                                                        { ...formItemLayout }
                                                        className = 'formFields'	
                                                    >
                                                        {
                                                            getFieldDecorator('ramal', {
                                                                rules: [{ 
                                                                    required: true, 
                                                                    message: 'Por favor, Coloque Seu Ramal!' 
                                                                }],
                                                            })(
                                                                <Input 
                                                                    prefix = { <Icon type = 'phone'/> }
                                                                    type = 'number'
                                                                    placeholder = 'Ramal'
                                                                />
                                                            )
                                                        }
                                                    </Form.Item>

                                                    <Form.Item>
                                                        <div align = 'center'>
                                                            <Button 
                                                                type = 'ghost' 
                                                                htmlType = 'submit' 
                                                                className = 'buttonEdit' 
                                                            >
                                                                <Icon type = 'edit'/>
                                                                    Alterar Informações	
                                                            </Button>
                                                            <Button 
                                                                className = 'buttonDelete'
                                                                onClick = { () => 
                                                                        this.showDeleteConfirm(
                                                                            token,
                                                                            currentUser.name,
                                                                            currentUser.id
                                                                        )} 
                                                                type = 'ghost'
                                                            >
                                                                <Icon type = 'delete' />
                                                                Excluir Perfil 
                                                            </Button>
                                                        </div>
                                                    </Form.Item>
                                                </Form>
                                            </div>
                                        </Hoc>
                                    </TabPane>
                                </Tabs>
                            </div>
                        )
                    )
                }
            </Hoc>
        );
    }
}

const UserDetailForm = Form.create()(UserDetail);

const mapStateToProps = state => {

	return {

        token: state.auth.token,
		currentUser: state.auth.currentUser,
		loadingUser: state.auth.loading,
		sectors: state.sector.sectors,
		loadingSector: state.sector.loading
	};
};

const mapDispatchToProps = dispatch => {

	return {

		getUser: (token, userId) => dispatch(getUser(token, userId)),
        deleteUser: (token, userId) => dispatch(deleteUser(token, userId)),
        updateUser: (token, user) => dispatch(updateUser(token, user)),
		getSectors: token => dispatch(getSectors(token))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailForm);
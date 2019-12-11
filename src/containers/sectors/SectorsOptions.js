import React, { Component } from 'react';
import { Tabs, Skeleton, Form, Input, Button, message, Icon, Table } from 'antd';
import { fail } from 'assert';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Hoc from '../../hoc/hoc';
import Homepage from '../homepage/Homepage';
import NotPermission from '../notPermission/NotPermission';

import { createSector, getSectors } from '../../store/actions/sector';
import { getUser } from '../../store/actions/auth';
import { dynamicSort } from '../utils';

const { TabPane } = Tabs;

class SectorsOption extends Component {

    constructor() {
		
		super();
		this.state = {
			formLayout: 'vertical',
		};
    }
    
    componentDidMount() {
        
        if (this.props.token !== undefined && this.props.token !== null) {
        
            this.forceUpdate();
            this.props.getSectors(this.props.token);
            this.props.getUser(this.props.token, this.props.currentUser.userId);
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        
        if (newProps.token !== this.props.token) {
         
            if (newProps.token !== undefined && newProps.token !== null) {
         
                this.forceUpdate();
                this.props.getSectors(newProps.token);   
                this.props.getUser(newProps.token, newProps.currentUser.userId);
            }
        }
    }

	handleSubmit = e => {
		
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {

				const user = JSON.parse(localStorage.getItem('user'));
				const token = user.token;
				const sector = {

					initials: values.initials,
					name: values.name
                };
                
				if((this.props.createSector(token, sector)) !== fail) {
					message.success('O Setor ' + sector.initials + ' Foi Cadastrado Com Sucesso');
				} else {
					message.error('Não Foi Possível Cadastrar o Setor.' + 
								  'Entre em Contato Com o Desenvolvedor!');
                }
                this.props.history.push('/opcoes_setores/');			
			} else {
                message.error('Formúlario Com Problemas.' + 
                              'Entre em Contato Com o Desenvolvedor!');
			}	
		});
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
        const sectors = this.props.sectors;
        let dataSource = {
            innerArray: [
                
            ]
        }
        
        for(let aux = 0; aux < sectors.length; aux ++) {
            
            dataSource.innerArray.push({
                key: sectors[aux].id,
                initials: sectors[aux].initials,
                name: sectors[aux].name
            }); 
		}

		dataSource.innerArray.sort(dynamicSort('initials'));

        return(
            
            <Hoc>
                {
                    this.props.token === null ? (
                        <Homepage />
                    ) : (
                        <Hoc>
                            <div className = 'content'>
                                <Tabs 
                                    onChange = { this.callback }>
                                    <TabPane tab = 'Novo Setor' key = '1'>
                                        {
                                            currentUser.is_administrator !== true ? (
                                                <NotPermission/>
                                            ) : (
                                                <div className = 'contentTab'>
                                                    <h1 className = 'texth1'> Criação de Setor </h1>
                                                    <Form onSubmit = { this.handleSubmit } >
                                                        <Form.Item label = 'Sigla' className = 'formFields' { ...formItemLayout }>
                                                            {
                                                                getFieldDecorator('initials', {
                                                                    rules: [{ 
                                                                        required: true, 
                                                                        message: 'Por favor, Coloque a Sigla!' 
                                                                    }],
                                                                })(
                                                                    <Input prefix = { <Icon type = 'form'/> } placeholder = 'Sigla'/>
                                                                )
                                                            }
                                                        </Form.Item>

                                                        <Form.Item label = 'Nome do Setor' className = 'formFields' { ...formItemLayout }>
                                                            {
                                                                getFieldDecorator('name', {
                                                                    rules: [{ 
                                                                        required: true, 
                                                                        message: 'Por favor, Coloque o Nome do Setor!' 
                                                                    }],
                                                                })(
                                                                    <Input prefix = { <Icon type = 'form'/> } placeholder = 'Nome do Setor'/>
                                                                )
                                                            }
                                                        </Form.Item>

                                                        <Form.Item>
                                                            <div align = 'center'>
                                                                <Button className = 'buttonSave' type = 'ghost' htmlType = 'submit'>
                                                                    <Icon type = 'save'/>
                                                                    Cadastrar Setor
                                                                </Button>
                                                                <Button type = 'default' className = 'buttonCancel'>
                                                                    <Link to = { '/lista_de_setores/' }>
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

                                    <TabPane tab = 'Lista de Setores Cadastrados' key = '2'>
                                        {
                                            this.props.loading ? (
                                                <Skeleton active/>
                                            ) : (
                                                <div className = 'contentList'>
                                                    <Table columns = {[
                                                        {
                                                            title: 'Sigla',
                                                            dataIndex: 'initials',
                                                            key: 'initials',
                                                            render: (text) => (
                                                                <b> { text } </b>
                                                            )
                                                        },
                                                        {
                                                            title: 'Nome',
                                                            dataIndex: 'name',
                                                            key: 'name',
                                                            render: (text) => (
                                                                <b> { text } </b>
                                                            )
                                                        },
                                                        {
                                                            title: 'Ação',
                                                            key: 'action',
                                                            render: (record) => (
                                                            <span>
                                                                <Button 
                                                                    type = 'ghost' 
                                                                    className = 'buttonEdit' 
                                                                    htmlType = 'submit' 
                                                                >
                                                                    <Link to = { `/editar_setor/${ record.key }` } >
                                                                        <Icon type = 'edit' className = 'icons'/>
                                                                            Editar Setor
                                                                    </Link>
                                                                </Button>
                                                            </span>
                                                            ),
                                                        },
                                                    ]
                                                    }
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
                        </Hoc>
                    )
                }
            </Hoc>
        );
    }
}

const SectorOptionsForm = Form.create()(SectorsOption);

const mapStateToProps = state => {

	return {

        token: state.auth.token,
        error: state.auth.error,
        currentUser: state.auth.currentUser,
        sectors: state.sector.sectors,
        loading: state.sector.loading
	};
};

const mapDispatchToProps = dispatch => {

	return {

        getUser: (token, userId) => dispatch(getUser(token, userId)),
        createSector: (token, sector) => dispatch(createSector(token, sector)),
        getSectors: token => dispatch(getSectors(token))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SectorOptionsForm);
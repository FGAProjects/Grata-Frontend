import React, { Component } from 'react';
import { connect } from "react-redux";
import { Form, Input, Icon, Button, message, Skeleton, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { fail } from 'assert';

import Hoc from '../../hoc/hoc';
import NotPermission from '../notPermission/NotPermission';
import Homepage from '../homepage/Homepage';

import { getProject, updateProject, deleteProject } from '../../store/actions/project';

const { confirm } = Modal;

class ProjectEdit extends Component {

    constructor() {
		super();
		this.state = {
			formLayout: 'vertical',
		};
	}

    UNSAFE_componentWillReceiveProps(newProps) {
        
        if (newProps.token !== this.props.token) {
        
            if (newProps.token !== undefined && newProps.token !== null) {
        
                const project_id = this.props.match.params.project_id;
                this.props.getProject(newProps.token, project_id);
            }
        }
    }

    handleSubmit = e => {
        
        e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
        
            if (!err) {
                
                const { currentProject } = this.props;
				const token = this.props.token;
				
				const project = {
                    projectId: currentProject.id,
					title: values.title,
					status: currentProject.status
                };
                
				if((this.props.updateProject(token, project)) !== fail) {
                    message.success('As Informações do Projeto ' +
                                    'Foram Alteradas Com Sucesso');
				} else {
					message.error('Não foi possível cadastrar o projeto.' + 
								  'Entre em contato com o desenvolvedor!');
				}
				this.props.history.push('/lista_de_projetos/');			
			} else {

			}	
		});
    };
    
    showDeleteConfirm = (token, project_id) => {
        
        const propsForms = this.props;
        
        confirm ({
            
            title: 'Exclusão de Projeto',
			content: 'Tem Certeza Que Deseja Excluir Este Projeto ?',
			okText: 'Sim',
			okType: 'danger',
			cancelText: 'Não',
            
            onOk() {
            
                propsForms.deleteProject(token, project_id);
				Modal.success({
					title: 'Ação Concluída!',
					content: 'Projeto Excluído Com Sucesso!',
                });
                propsForms.history.push(`/lista_de_projetos/${ project_id }`);
			},
			onCancel() {
                message.success('Exclusão de Projeto Cancelada Com Sucesso!');
			},
		});
	}

    render() {
        
		const user = JSON.parse(localStorage.getItem('user'));
        const { currentProject } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { formLayout } = this.state;
        const formItemLayout = formLayout === 'vertical'? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
		}
		: null;

        return(

            <Hoc>
                {
                    this.props.token === null ? (
                        <Homepage/>
                    ) : (
                        this.props.loading ? (
                            <Skeleton active />
                        ) : (
                            <Hoc>
                                {
                                    user.is_administrator === true ? (
                                        <div className = 'content'>
                                            <h1 className = 'texth1'> Informações Cadastradas </h1>
                                            <Form layout = 'vertical' >
                                                <Form.Item 
                                                    label = 'Nome' 
                                                    { ...formItemLayout }
                                                    className = 'formFields'
                                                >
                                                    <Input 
                                                        value = { currentProject.title } 
                                                        disabled = { true } 
                                                    />
                                                </Form.Item>
                                            </Form>
                                            <Form layout = 'vertical' >
                                                <Form.Item 
                                                    label = 'Status' 
                                                    { ...formItemLayout }
                                                    className = 'formFields'
                                                >
                                                    <Input 
                                                        value = { currentProject.status } 
                                                        disabled = { true } 
                                                    />
                                                </Form.Item>
                                            </Form>
                                            <Form layout = 'vertical' >
                                                <Form.Item 
                                                    label = 'Setor' 
                                                    { ...formItemLayout }
                                                    className = 'formFields'
                                                >
                                                    <Input 
                                                        value = { currentProject.sector } 
                                                        disabled = { true } 
                                                    />
                                                </Form.Item>
                                            </Form>
                                            <h1 className = 'texth1'> Informações A Serem Alteradas </h1>
                                            <Form onSubmit = { this.handleSubmit } >
                                                <Form.Item label = 'Título' { ...formItemLayout } className = 'formFields'>
                                                    {
                                                        getFieldDecorator('title', {
                                                            rules: [{ 
                                                                required: true, 
                                                                message: 'Por favor, Coloque o Título!' 
                                                            }],
                                                        })(
                                                            <Input prefix = { <Icon type = 'form' className = 'icons'/> }
                                                                placeholder = 'Usuário'
                                                            />
                                                        )
                                                    }
                                                </Form.Item>

                                                <Form.Item label = 'Setor' { ...formItemLayout } className = 'formFields'>
                                                    {
                                                        getFieldDecorator('sector', {
                                                        rules: [
                                                            {
                                                                required: false,
                                                            }
                                                            ],
                                                        })(
                                                            <Input prefix = { <Icon type = 'form' className = 'icons'/> }
                                                                placeholder = { currentProject.sector }
                                                                disabled = { true }
                                                            />  
                                                        )
                                                    }
                                                </Form.Item>

                                                <Form.Item label = 'Status' { ...formItemLayout } className = 'formFields'>
                                                    {
                                                        getFieldDecorator('status', {
                                                        
                                                        })(
                                                            <Input prefix = { <Icon type = 'mail' className = 'icons'/> }
                                                                placeholder = 'Pendente'
                                                                disabled = { true }
                                                            />
                                                        )
                                                    }
                                                </Form.Item>

                                                <Form.Item>
                                                    <div align = 'center'>
                                                        <Button className = 'buttonEdit' type = 'ghost' htmlType = 'submit'>
                                                            <Icon className = 'icons' type = 'edit'/>
                                                            Alterar Informações	
                                                        </Button>
                                                        <Button type = 'ghost' className = 'buttonCancel'>
                                                            <Link to = { '/lista_de_projetos/' }>
                                                                <Icon type = 'stop' className = 'icons'/>
                                                                Cancelar
                                                            </Link>
                                                        </Button>
                                                        <Button className = 'buttonDelete' type = 'ghost' 
                                                            onClick = { () => 
                                                                this.showDeleteConfirm(
                                                                    this.props.token,
                                                                    currentProject.id
                                                                )
                                                            } 
                                                        >
                                                            <Icon type = 'delete' />
                                                            Excluir Projeto 
                                                        </Button>
                                                    </div>
                                                </Form.Item>
                                            </Form>
                                        </div>
                                    ) : (
                                        <NotPermission/>
                                    )
                                }
                            </Hoc>
                        )
                    )
                }
            </Hoc>
        );
    }
}

const ProjectEditForm = Form.create()(ProjectEdit);

const mapStateToProps = state => {
    
    return {
    
        token: state.auth.token,
        currentProject: state.project.currentProject,
        loading: state.project.loading
    };
};

const mapDispatchToProps = dispatch => {
    
    return {
    
        getProject: (token, id) => dispatch(getProject(token, id)),
        updateProject: (token, project) => dispatch(updateProject(token, project)),
        deleteProject: (token, projectId) => dispatch(deleteProject(token, projectId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEditForm);
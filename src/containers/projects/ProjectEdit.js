import React, { Component } from 'react';
import { connect } from "react-redux";
import { Form, Input, Icon, Button, message, Select, Skeleton, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { fail } from 'assert';

import Hoc from '../../hoc/hoc';
import { getProject, updateProject, deleteProject } from '../../store/actions/project';
import { getSectors } from '../../store/actions/sector';
import { dynamicSort, getSectorName } from '../utils';

const Option = Select.Option;
const { confirm } = Modal;

class ProjectEdit extends Component {

    constructor() {
		super();
		this.state = {
			formLayout: 'vertical',
		};
	}

    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            const projectId = this.props.match.params.id;
			this.props.getSectors(this.props.token);
            this.props.getProject(this.props.token, projectId);
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                const projectId = this.props.match.params.id;
                this.props.getSectors(newProps.token);
                this.props.getProject(newProps.token, projectId);
            }
        }
    }

    handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
                const { currentProject } = this.props;
				const sectors = this.props.sectors;
				const token = this.props.token;
				let sector_id = '';

				for(let aux = 0; aux < sectors.length; aux ++) {
					if(sectors[aux].initials === values.sector) {
						sector_id = sectors[aux].id;
					} 
				}

				const project = {
                    projectId: currentProject.id,
					title: values.title,
					status: 'Pendente',
					sector: sector_id
                };
                
				if((this.props.updateProject(token, project)) !== fail) {
                    message.success('As Informações do Projeto ' +
                                    'Foram Alteradas Com Sucesso');
				} else {
					message.error('Não foi possível cadastrar o projeto.' + 
								  'Entre em contato com o desenvolvedor!');
				}
				this.props.history.push('/lista_projetos/');			
			} else {

			}	
		});
    };
    
    showDeleteConfirm = (token, sectorId) => {
        const propsForms = this.props;
		confirm ({
			title: 'Exclusão de Projeto',
			content: 'Tem Certeza Que Deseja Excluir Este Projeto ?',
			okText: 'Sim',
			okType: 'danger',
			cancelText: 'Não',
			onOk() {
				propsForms.deleteProject(token, sectorId);
				Modal.success({
					title: 'Ação Concluída!',
					content: 'Projeto Excluído Com Sucesso!',
                });
                propsForms.history.push('/lista_projetos/');
			},
			onCancel() {
                message.success('Exclusão de Projeto Cancelada Com Sucesso!');
			},
		});
	}

    render() {
        const { currentProject } = this.props;
        const { getFieldDecorator } = this.props.form;
        const { formLayout } = this.state;
        const formItemLayout = formLayout === 'vertical'? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
		}
		: null;
        const sectors = this.props.sectors;
        const sector_name = getSectorName(sectors, currentProject.id);

		let dataSource = {
            innerArray: [
                
            ]
        }
        
        for(let aux = 0; aux < sectors.length; aux ++) {
            dataSource.innerArray.push(
                {
                    key: sectors[aux].id,
                    initials: sectors[aux].initials,
                    name: sectors[aux].name,
                }
			); 
		}

		dataSource.innerArray.sort(dynamicSort('initials'));

        return(
            <Hoc>
                {
                    this.props.loading ? (
                        <Skeleton active />
                    ) : (
                        <Hoc>
                            <h1> Informações Cadastradas </h1>
                            <Form layout = 'vertical' >
                                <Form.Item label = 'Nome' { ...formItemLayout } >
                                    <Input 
                                        value = { currentProject.title } 
                                        disabled = { true } 
                                    />
                                </Form.Item>
                            </Form>
                            <Form layout = 'vertical' >
                                <Form.Item label = 'Status' { ...formItemLayout } >
                                    <Input 
                                        value = { currentProject.status } 
                                        disabled = { true } 
                                    />
                                </Form.Item>
                            </Form>
                            <Form layout = 'vertical' >
                                <Form.Item label = 'Setor' { ...formItemLayout } >
                                    <Input 
                                        value = { sector_name } 
                                        disabled = { true } 
                                    />
                                </Form.Item>
                            </Form>
                        </Hoc>
                        
                    )
                }
                <Hoc>
                    <h1> Informações A Serem Alteradas </h1>
                    <Form onSubmit = { this.handleSubmit } >
                        <Form.Item label = 'Título'>
                            {
                                getFieldDecorator('title', {
                                    rules: [{ 
                                        required: true, 
                                        message: 'Por favor, Coloque o Título!' 
                                    }],
                                })(
                                    <Input
                                        prefix = {
                                            <Icon 
                                                type = 'form' 
                                                style = {{ 
                                                    color: 'rgba(0,0,0,.25)' 
                                                }} 
                                            />
                                        }
                                        placeholder = 'Usuário'
                                    />,
                                )
                            }
                        </Form.Item>

                        <Form.Item label='Setor' hasFeedback >
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

                        <Form.Item label = 'Status' >
                            {
                                getFieldDecorator('status', {
                                
                                })(
                                    <Input 
                                        prefix = {
                                            <Icon 
                                                type = 'mail' 
                                                style = {{ 
                                                    color: 'rgba(0,0,0,.25)' }} 
                                            />
                                        }
                                        placeholder = 'Pendente'
                                        disabled = { true }
                                    />
                                )
                            }
                        </Form.Item>

                        <Form.Item>
							<div align = 'center'>
								<Button 
                                    type = 'primary' 
                                    htmlType = 'submit' 
								>
									Alterar Informações	
								</Button>
                                <Button 
                                    type = 'primary'
                                    style = {{
                                        marginLeft: '20px'
                                    }} 
                                >
									<Link to = { '/lista_projetos/' }>
                                    <Icon 
                                        style = {{
                                            marginRight: '10px'
                                        }}
                                        type = 'stop' />
										Cancelar
									</Link>
								</Button>
                                <Button 
                                    style = {{
                                        marginLeft: '20px'
                                    }}
                                    onClick = { () => 
                                        this.showDeleteConfirm(
                                            this.props.token,
                                            currentProject.id
                                        )
                                    } 
                                    type = 'danger' >
                                        <Icon type = 'delete' />
                                        Excluir Projeto 
                                </Button>
							</div>
						</Form.Item>
                    </Form>
                </Hoc>
            </Hoc>
        );
    }
}

const ProjectEditForm = Form.create()(ProjectEdit);

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        currentProject: state.project.currentProject,
        loading: state.project.loading,
		sectors: state.sector.sectors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProject: (token, id) => dispatch(getProject(token, id)),
        getSectors: token => dispatch(getSectors(token)),
        updateProject: (token, project) => dispatch(updateProject(token, project)),
        deleteProject: (token, projectId) => dispatch(deleteProject(token, projectId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEditForm);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Skeleton, Form, Input, Button, Icon, message, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { fail } from 'assert';

import { getSector, updateSector, deleteSector } from '../../store/actions/sector';
import Hoc from '../../hoc/hoc';

const { confirm } = Modal;

class SetorEdit extends Component {

    constructor() {
        
        super();
		this.state = {
			formLayout: 'vertical',
		};
	}

	state = {
		confirmDirty: false,
    };

	componentWillReceiveProps(newProps) {
        
        if (newProps.token !== this.props.token) {
        
            if (newProps.token !== undefined && newProps.token !== null) {
        
                const sector_id = newProps.match.params.sector_id;
				this.props.getSector(newProps.token, sector_id);
			}
		}
    }
    
    handleSubmit = e => {
        
        e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
        
            if (!err) {
        
                const token = this.props.token;
                const sector = {
                    id: this.props.match.params.id,
                    initials: values.initials,
                    name: values.name
                };
        
                if((this.props.updateSector(
                    token, sector
                )) !== fail) {
                    message.success('As Informações do Setor Foram Alteradas Com Sucesso!');
                } else {
                    message.error('Ocorreu um Erro ao Alterar as Informações do Setor. ' +
                                  'Entre em Contato Com o Desenvolvedor!');
                } this.props.history.push('/lista_de_setores/');			
			} else {

			}	
		});
    };
    
    showDeleteConfirm = (token, sectorId) => {
        
        const propsForms = this.props;
        
        confirm ({
			title: 'Exclusão de Setor',
			content: 'Tem Certeza Que Deseja Excluir Este Setor ?',
			okText: 'Sim',
			okType: 'danger',
			cancelText: 'Não',
        
            onOk() {
				propsForms.deleteSector(token, sectorId);
				Modal.success({
					title: 'Ação Concluída!',
					content: 'Setor Excluído Com Sucesso!',
                });
                propsForms.history.push('/lista_de_setores/');
			},
        
            onCancel() {
                message.success('Exclusão de Setor Cancelada Com Sucesso!');
			},
		});
	}

    render() {
        
        const { currentSector } = this.props;
        const { getFieldDecorator } = this.props.form;
		const { formLayout } = this.state;
		const formItemLayout = formLayout === 'vertical'? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
		}
        : null;
        
        return (
        
            <Hoc>
                {
                    this.props.loading ? (
                        <Skeleton active />
                    ) : (
                        <Hoc>
                            <h1> Informações Cadastradas </h1>

                            <Form layout = 'vertical' onSubmit = { this.handleSubmit } >
								<Form.Item label = 'Sigla' { ...formItemLayout } >
									<Input 
										value = { currentSector.initials } 
										disabled = { true } 
									/>
								</Form.Item>
								
								<Form.Item label = 'Nome' { ...formItemLayout } >
									<Input 
										value = { currentSector.name } 
										disabled = { true } 
									/>
								</Form.Item>
                            </Form>
                        </Hoc>
                    )
                }
                <Hoc>
                    <h1> Informações A Serem Alteradas </h1>
                    <Form layout = 'vertical' onSubmit = { this.handleSubmit } >
                        <Form.Item label = 'Sigla'>
                            {
                                getFieldDecorator('initials', {
                                    rules: [{ 
                                        required: true, 
                                        message: 'Por favor, Coloque a Sigla!' 
                                    },
                                    {
                                        max: 6,
                                        message: 'O usuário pode ter no máximo 6 caracteres!',
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
                                        placeholder = 'Sigla'
                                    />,
                                )
                            }
                        </Form.Item>

                        <Form.Item label = 'Nome do Setor'>
                            {
                                getFieldDecorator('name', {
                                    rules: [{ 
                                        required: true, 
                                        message: 'Por favor, Coloque o Nome do Setor!' 
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
                                        placeholder = 'Nome do Setor'
                                    />,
                                )
                            }
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
                                    <Icon type = 'edit' />
									Alterar Informações	
								</Button>
                                <Button 
                                    type = 'primary' 
                                >
									<Link to = { '/lista_de_setores/' }>
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
                                            currentSector.id
                                        )
                                    } 
                                    type = 'danger' >
                                        <Icon type = 'delete' />
                                        Excluir Setor
                                </Button>
							</div>
						</Form.Item>
                    </Form> 
                </Hoc>
            </Hoc>
        )
    }
}

const SectorEditForm = Form.create()(SetorEdit);

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        currentSector: state.sector.currentSector,
        loading: state.sector.loading
    };
};

const mapDispatchToProps = dispatch => {
	return {
        getSector: (token, sectorId) => dispatch(getSector(token, sectorId)),
        updateSector: (token, sector) => dispatch(updateSector(token, sector)),
        deleteSector: (token, sectorId) => dispatch(deleteSector(token, sectorId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SectorEditForm);
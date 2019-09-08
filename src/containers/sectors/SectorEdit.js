import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Skeleton, Form, Input, Button, Icon, message } from 'antd';
import { Link } from 'react-router-dom';
import { fail } from 'assert';

import { getSector, updateSector } from '../../store/actions/sector';
import Hoc from '../../hoc/hoc';

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
    
    componentDidMount() {
		if (this.props.token !== undefined && this.props.token !== null) {
            const sectorId = this.props.match.params.id;
			this.props.getSector(this.props.token, sectorId);
		}
	}

	UNSAFE_componentWillReceiveProps(newProps) {
		if (newProps.token !== this.props.token) {
			if (newProps.token !== undefined && newProps.token !== null) {
                const sectorId = this.props.match.params.id;
				this.props.getSector(newProps.token, sectorId);
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

    render() {
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
										value = { this.props.initials } 
										disabled = { true } 
									/>
								</Form.Item>
								
								<Form.Item label = 'Nome' { ...formItemLayout } >
									<Input 
										value = { this.props.name } 
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
									Alterar Informações	
								</Button>
								<Button type='primary'>
									<Link to = { '/lista_de_setores/' }>
										Cancelar
									</Link>
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
        initials: state.sector.initials,
        name: state.sector.name,
        loading: state.sector.loading
    };
};

const mapDispatchToProps = dispatch => {
	return {
        getSector: (token, sectorId) => dispatch(getSector(token, sectorId)),
        updateSector: (token, sector) => dispatch(updateSector(token, sector))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SectorEditForm);
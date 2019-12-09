import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Skeleton, Form, Input, Button, Icon, message, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { fail } from 'assert';

import Hoc from '../../hoc/hoc';
import NotPermission from '../notPermission/NotPermission';
import Homepage from '../homepage/Homepage';

import { getSector, updateSector, deleteSector } from '../../store/actions/sector';

const { confirm } = Modal;

class SetorEdit extends Component {

    constructor() {
        
        super();
		this.state = {
			formLayout: 'vertical',
		};
    }
    
    componentDidMount() {

		if (this.props.token !== undefined && this.props.token !== null) {
        
            const sectorId = this.props.match.params.sector_id;
			this.props.getSector(this.props.token, sectorId);
		}
	}

	UNSAFE_componentWillReceiveProps(newProps) {
        
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
        
                const user = JSON.parse(localStorage.getItem('user'));
                const token = user.token;
                const { currentSector } = this.props;

                const sector = {

                    id: currentSector.id,
                    initials: values.initials,
                    name: values.name
                };
        
                if((this.props.updateSector(token, sector)) !== fail) {
                    message.success('As Informações do Setor Foram Alteradas Com Sucesso!');
                } else {
                    message.error('Ocorreu um Erro ao Alterar as Informações do Setor. ' +
                                  'Entre em Contato Com o Desenvolvedor!');
                } this.props.history.push('/lista_de_setores/');			
			} else {

			}	
		});
    };
    
    showDeleteConfirm = (sectorId) => {
        
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;
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
        
        const user = JSON.parse(localStorage.getItem('user'));
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
                    this.props.token === null ? (
                        <Homepage/>
                    ) : (
                        this.props.loading ? (
                            <Skeleton active/>
                        ) : (
                            user.is_administrator === true ? (
                                <div className = 'content'>
                                    <h1 className = 'texth1'> Informações Cadastradas </h1>
                                    <Form layout = 'vertical' onSubmit = { this.handleSubmit }>
                                        <Form.Item label = 'Sigla' 
                                            { ...formItemLayout } 
                                            className = 'formFields'
                                        >
                                            <Input 
                                                value = { currentSector.initials } 
                                                disabled = { true } 
                                            />
                                        </Form.Item>

                                        <Form.Item 
                                            label = 'Nome' 
                                            { ...formItemLayout }
                                            className = 'formFields'
                                        >
                                            <Input 
                                                value = { currentSector.name } 
                                                disabled = { true } 
                                            />
                                        </Form.Item>
                                    </Form>

                                    <h1 className = 'texth1'> Informações A Serem Alteradas </h1>
                                    <Form layout = 'vertical' onSubmit = { this.handleSubmit }>
                                        <Form.Item 
                                                label = 'Sigla' 
                                                { ...formItemLayout } 
                                                className = 'formFields'>
                                            {
                                                getFieldDecorator('initials', {
                                                    rules: [{ 
                                                        required: true, 
                                                        message: 'Por favor, Coloque a Sigla!' 
                                                    },
                                                    {
                                                        max: 6,
                                                        message: 'O Usuário Pode Ter no Máximo 6 Caracteres!',
                                                    }],
                                                })(
                                                    <Input prefix = { <Icon type = 'form'/> } placeholder = 'Sigla'/>
                                                )
                                            }
                                        </Form.Item>

                                        <Form.Item 
                                            label = 'Nome do Setor' 
                                            { ...formItemLayout } 
                                                className = 'formFields'>
                                            {
                                                getFieldDecorator('name', {
                                                    rules: [{ 
                                                        required: true, 
                                                        message: 'Por favor, Coloque o Nome do Setor!' 
                                                    }],
                                                })(
                                                    <Input prefix = { <Icon type = 'form'/> } 
                                                    placeholder = 'Nome do Setor'/>
                                                )
                                            }
                                        </Form.Item>

                                        <Form.Item>
                                            <div align = 'center'>
                                                <Button type = 'ghost' htmlType = 'submit' className = 'buttonEdit'>
                                                    <Icon type = 'edit'/>
                                                    Alterar Informações	
                                                </Button>
                                                <Button type = 'ghost' className = 'buttonCancel'>
                                                    <Link to = { '/lista_de_setores/' }>
                                                    <Icon className = 'icons' type = 'stop'/>
                                                        Cancelar
                                                    </Link>
                                                </Button>
                                                <Button
                                                    className = 'buttonDelete'
                                                    onClick = { () => 
                                                        this.showDeleteConfirm(
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
                                </div>
                            ) : (
                                <NotPermission/>
                            )
                        )
                    )
                }
            </Hoc>
        );
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
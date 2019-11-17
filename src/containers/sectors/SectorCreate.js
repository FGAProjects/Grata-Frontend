import React, { Component } from 'react';
import { Form, Input, Icon, Button, message } from 'antd';
import { connect } from 'react-redux'
import { fail } from 'assert';
import { Link } from 'react-router-dom';

import Homepage from '../homepage/Homepage';
import NotPermission from '../notPermission/NotPermission';
import Hoc from '../../hoc/hoc';

import { createSector } from '../../store/actions/sector';

class SectorCreate extends Component {

	constructor() {
		
		super();
		this.state = {
			formLayout: 'vertical',
		};
	}

	handleSubmit = e => {
		
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {

				const token = this.props.token;
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
				this.props.history.push('/lista_de_setores/');			
			} else {
                message.error('Formúlario Com Problemas.' + 
                              'Entre em Contato Com o Desenvolvedor!');
			}	
		});
	};

	render() {
		
		const user = JSON.parse(localStorage.getItem('user'));
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
						<Hoc>
							{
								user.is_administrator === true ? (
									<div className = 'content'>
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
								) : (
									<NotPermission/>
								)
							} 
						</Hoc>
					)
				}
			</Hoc>
		);
	}
}

const SectorCreateForm = Form.create()(SectorCreate);

const mapStateToProps = (state) => {

	return {

		loading: state.loading,
		error: state.error,
		token: state.auth.token
	}
}

const mapDispatchToProps = dispatch => {

	return {
		createSector: (token, project) => dispatch(createSector(token, project))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SectorCreateForm);
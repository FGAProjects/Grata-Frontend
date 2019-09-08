import React, { Component } from 'react';
import { Form, Input, Icon, Button, message } from 'antd';
import { connect } from 'react-redux'
import { fail } from 'assert';

import { createSector } from '../../store/actions/sector';

class SectorCreate extends Component {

    state = {
		confirmDirty: false,
	};

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
		const { getFieldDecorator } = this.props.form;

		return (
			<Form onSubmit = { this.handleSubmit } >
				<Form.Item label = 'Sigla'>
					{
						getFieldDecorator('initials', {
							rules: [{ 
								required: true, 
								message: 'Por favor, Coloque a Sigla!' 
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
					<Button 
						type = 'primary' 
						htmlType = 'submit' 
						style = {{
							marginRight: '10px'
						}} >
						Cadastrar Setor
					</Button>
				</Form.Item>
			</Form>
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
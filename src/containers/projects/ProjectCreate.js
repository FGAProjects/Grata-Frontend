import React, { Component } from 'react';
import { Form, Input, Icon, Button, message, Select } from 'antd';
import { connect } from 'react-redux'
import { fail } from 'assert';
import { Link } from 'react-router-dom';

import { createProject } from '../../store/actions/project';
import { getSectors } from '../../store/actions/sector';
import { dynamicSort } from '../utils';

const Option = Select.Option;

class ProjectCreate extends Component {

	constructor() {
		
		super();
		this.state = {
			formLayout: 'vertical',
			confirmDirty: false
		};
	}

	componentDidMount() {
		
		if (this.props.token !== undefined && this.props.token !== null) {
			this.props.getSectors(this.props.token);
		}
	}

	componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {
				this.props.getSectors(newProps.token);
			}
		}
	}

	handleSubmit = e => {
		
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
		
				const sectors = this.props.sectors;
				const token = this.props.token;
				let sector_id = '';

				for(let aux = 0; aux < sectors.length; aux ++) {
		
					if(sectors[aux].initials === values.sector) {
						sector_id = sectors[aux].id;
					} 
				}

				const project = {
					title: values.title,
					status: 'Pendente',
					sector: sector_id
				};

				if((this.props.createProject(token, project)) !== fail) {
					message.success('O Projeto Foi Cadastrado Com Sucesso!');
				} else {
					message.error('Não Foi Possível Cadastrar o Projeto.' + 
								  'Entre em Contato Com o Desenvolvedor!');
				}
				this.props.history.push('/');			
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
		const sectors = this.props.sectors;

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

		return (

			<div className = 'content'>
				<h1 className = 'texth1'> Criar Projeto </h1>
				<Form onSubmit = { this.handleSubmit } { ...formItemLayout }>
					<Form.Item label = 'Título'className = 'formFields' >
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

					<Form.Item label ='Setor' hasFeedback className = 'formFields'>
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

					<Form.Item label = 'Status' className = 'formFields'>
						{
							getFieldDecorator('status', {
								
							})(
								<Input 
									prefix = { <Icon type = 'mail' /> } placeholder = 'Pendente'
									disabled = { true }
								/>
							)
						}
					</Form.Item>

					<Form.Item>
						<div align = 'center'>
							<Button type = 'ghost' htmlType = 'submit' className = 'buttonSave'>
									Cadastrar Projeto
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
		);
	}
}

const ProjectCreateForm = Form.create()(ProjectCreate);

const mapStateToProps = (state) => {

	return {

		token: state.auth.token,
		sectors: state.sector.sectors
	}
}

const mapDispatchToProps = dispatch => {
	
	return {

		createProject: (token, project) => dispatch(createProject(token, project)),
		getSectors: token => dispatch(getSectors(token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreateForm);
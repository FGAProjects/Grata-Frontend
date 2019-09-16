import React, { Component } from 'react';
import { Form, Input, Icon, Button, message, Select } from 'antd';
import { connect } from 'react-redux'
import { fail } from 'assert';

import { createProject } from '../../store/actions/project';
import { getSectors } from '../../store/actions/sector';
import { dynamicSort } from '../utils';

const Option = Select.Option;

class ProjectCreate extends Component {
    
    state = {
		confirmDirty: false,
	};

	componentDidMount() {
		if (this.props.token !== undefined && this.props.token !== null) {
			this.props.getSectors(this.props.token);
		}
	}

	UNSAFE_componentWillReceiveProps(newProps) {
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
					<Button 
						type = 'primary' 
						htmlType = 'submit' 
						style = {{
							marginRight: '10px'
						}} >
						Cadastrar
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

const ProjectCreateForm = Form.create()(ProjectCreate);

const mapStateToProps = (state) => {

	return {
		loading: state.project.loading,
		error: state.project.error,
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
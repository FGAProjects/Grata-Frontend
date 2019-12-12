import React, { Component } from 'react';
import { Tabs, Skeleton, Form, Input, Button, message, Icon, Select, Table, Tag, List } from 'antd';
import { connect } from 'react-redux'
import { fail } from 'assert';
import { Link } from 'react-router-dom';

import Hoc from '../../hoc/hoc';
import Homepage from '../homepage/Homepage';
import NotPermission from '../notPermission/NotPermission';

import { createProject, getProjects } from '../../store/actions/project';
import { getUser } from '../../store/actions/auth';
import { getSectors } from '../../store/actions/sector';
import { getAllMeeting } from '../../store/actions/meeting';
import { dynamicSort } from '../utils';

const { TabPane } = Tabs;
const Option = Select.Option;

class ProjectsOptions extends Component {

    constructor() {
		
		super();
		this.state = {
			formLayout: 'vertical',
		};
	}

    componentDidMount() {
		
		if (this.props.token !== undefined && this.props.token !== null) {

            this.forceUpdate();
            const user = JSON.parse(localStorage.getItem('user'));
            this.props.getUser(this.props.token, this.props.currentUser.userId);
            this.props.getProjects(user.token);
            this.props.getAllMeeting(user.token);
            this.props.getSectors(this.props.token);
            this.forceUpdate();
		}
	}

	UNSAFE_componentWillReceiveProps(newProps) {
		
		if (newProps.token !== this.props.token) {
		
			if (newProps.token !== undefined && newProps.token !== null) {

                this.forceUpdate();
                this.props.getUser(newProps.token, newProps.currentUser.userId);
                this.props.getProjects(newProps.token);
                this.props.getAllMeeting(newProps.token);
                this.props.getSectors(newProps.token);
                this.forceUpdate();
			}
		}
    }
    
    handleSubmit = e => {
		
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
		
				const sectors = this.props.sectors;
				const user = JSON.parse(localStorage.getItem('user'));
				const token = user.token;
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
				this.props.history.push('/opcoes_projetos/');			
			} else {

			}	
		});
    };
    
    callback(key) {

    }

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
		const projects = this.props.projects;
        const allMeetings = this.props.allMeetings;
        let project_id = 0;
        let dataSource = {
            innerArray: [
                
            ]
        }
        let confirm = false;

        let dataSourceMeetings = {
            innerArray: [

            ]
        }
        let dataSourceSectors = {
            innerArray: [

            ]
        }

        for(let aux = 0; aux < sectors.length; aux ++) {
			
			dataSourceSectors.innerArray.push(
                {
                    key: sectors[aux].id,
                    initials: sectors[aux].initials,
                    name: sectors[aux].name,
                }
			); 
		}

        for(let aux = 0; aux < allMeetings.length; aux ++) {

            if(allMeetings[aux].status === 'Confirmada') {
                confirm = true;
            } else {
                confirm = false;
            }

            if(currentUser.name === allMeetings[aux].meeting_leader) {

                dataSourceMeetings.innerArray.push({
                        
                    key: allMeetings[aux].id,
                    title: allMeetings[aux].title,
                    subject_matter: allMeetings[aux].subject_matter,
                    sector: allMeetings[aux].sector
                });
            } else {

                for(let usersMeeting = 0; usersMeeting < allMeetings[aux].users.length; usersMeeting ++) {

                    if(currentUser.name === allMeetings[aux].users[usersMeeting]) {
                    
                        dataSourceMeetings.innerArray.push({
                            
                            key: allMeetings[aux].id,
                            title: allMeetings[aux].title,
                            subject_matter: allMeetings[aux].subject_matter,
                            sector: allMeetings[aux].sector
                        });
                        confirm = true;
                    } else {
                        confirm = false;
                    }
                }
            }
        }

        for(let aux = 0; aux < projects.length; aux ++) {

            if(currentUser.sector === projects[aux].sector) {

                project_id = projects[aux].id;
                dataSource.innerArray.push({
                
                    key: projects[aux].id,
                    title: projects[aux].title,
                    sector: projects[aux].sector,
                    tags: [ projects[aux].status ]
                });
            } else {
                
            }
        }

        dataSource.innerArray.sort(dynamicSort('title'));
        dataSourceMeetings.innerArray.sort(dynamicSort('title'));

        return (
        
            <Hoc>
                {
                    this.props.token === null ? (
                        <Homepage />
                    ) : (
                        <Hoc>
                            <div className = 'content'>
                                <Tabs 
                                    onChange = { this.callback }>
                                    <TabPane tab = 'Novo Projeto' key = '1'>
                                        {
                                            currentUser.is_administrator !== true ? (
                                                <NotPermission/>
                                            ) : (
                                                <div className = 'contentTab'>
                                                    <h1 className = 'texth1'> Criar Projeto </h1>
                                                    <Form onSubmit = { this.handleSubmit }>
                                                        <Form.Item label = 'Título'className = 'formFields' { ...formItemLayout }>
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

                                                        {
                                                            this.props.loading ? (
                                                                <Skeleton active/>
                                                            ) : (
                                                                <Form.Item label ='Setor' hasFeedback className = 'formFields' { ...formItemLayout }>
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
                                                                                { dataSourceSectors.innerArray.map(sector => 
                                                                                    <Option 
                                                                                        key = { sector.key } 
                                                                                        value = { sector.initials }>
                                                                                        { sector.name }
                                                                                    </Option>
                                                                                    )
                                                                                }
                                                                            </Select>  
                                                                        )
                                                                    }
                                                                </Form.Item>
                                                            )
                                                        }

                                                        <Form.Item label = 'Status' className = 'formFields' { ...formItemLayout }>
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
                                                                    <Icon className = 'icons' type = 'save'/>
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
                                            )
                                        }
                                    </TabPane>

                                    <TabPane tab = 'Lista de Projetos Setoriais' key = '2'>
                                        <div className = 'contentList'>
                                            <h1 className = 'texth1'> Projetos Setoriais </h1>
                                            <Table columns = {
                                            [{
                                                title: 'Título',
                                                dataIndex: 'title',
                                                key: 'title',
                                                render: (text, record) => (
                                                    <Link to = { `/lista_de_reunioes/${ record.key }/`} >
                                                        <List.Item>
                                                            <b>{ text }</b>
                                                        </List.Item>
                                                    </Link>
                                                )   
                                            },
                                            {
                                                title: 'Setor Responsável',
                                                dataIndex: 'sector',
                                                key: 'sector',
                                                render: (text) => (
                                                    <b>{text}</b>
                                                )
                                            },
                                            {
                                                title: 'Status',
                                                key: 'tags',
                                                dataIndex: 'tags',
                                                render: tags => (
                                                    <span>
                                                    {
                                                        tags.map(tag => {
                                                            let color = tag.length > 5 ? 'geekblue' : 'green';
                                                            if (tag === 'Pendente') {
                                                                color = 'orange';
                                                            } else {
                                                                color = 'green';
                                                            }
                                                            return (
                                                            <Tag color = { color } key = { tag }>
                                                                <b> { tag.toUpperCase() } </b> 
                                                            </Tag>
                                                            );
                                                        })
                                                    }
                                                    </span>
                                                ),
                                            },
                                            {
                                                title: 'Ação',
                                                key: 'action',
                                                render: (record) => (
                                                    <span>
                                                        <Button 
                                                            type = 'ghost' 
                                                            htmlType = 'submit' 
                                                            className = 'buttonEdit'
                                                        >
                                                            <Link to = { `/editar_projeto/${ record.key }/`} >
                                                                <Icon type = 'edit' className = 'icons'/>
                                                                    <b> Editar Projeto </b>
                                                            </Link>
                                                        </Button>
                                                    </span>
                                                ),
                                            },
                                            ]}
                                                dataSource = {
                                                    dataSource.innerArray
                                                } 
                                            />
                                        </div>
                                    </TabPane>

                                    <TabPane tab = 'Lista de Projetos Que Participo' key = '3'>
                                        <div className = 'contentList'>
                                            <h1 className = 'texth1'> Reuniões Que Participo </h1>
                                            {
                                                this.props.loadingAllMeetings ? (
                                                    <Skeleton active/>
                                                ) : (
                                                    <Table columns = {
                                                        [{
                                                            title: 'Título',
                                                            dataIndex: 'title',
                                                            key: 'title',
                                                            render: (text) => (
                                                                <b> { text } </b>
                                                            )
                                                        },
                                                        {
                                                            title: 'Assunto',
                                                            dataIndex: 'subject_matter',
                                                            key: 'subject_matter',
                                                            render: (text) => (
                                                                <b>{text}</b>
                                                            )
                                                        },
                                                        {
                                                            title: 'Setor Responsável',
                                                            dataIndex: 'sector',
                                                            key: 'sector',
                                                            render: (text) => (
                                                                <b>{text}</b>
                                                            )
                                                        },
                                                        {
                                                            title: 'Ação',
                                                            key: 'action',
                                                            render: (record) => (
                                                                <span>
                                                                    {
                                                                        confirm === true ? (
                                                                            <Button 
                                                                                type = 'ghost' 
                                                                                htmlType = 'submit' 
                                                                                className = 'buttonSave'
                                                                            >
                                                                                <Link to = { `/reuniao_confirmada/${ record.key }/`} >
                                                                                    <Icon type = 'eye' className = 'icons'/>
                                                                                        <b> Ver Reunião </b>
                                                                                </Link>
                                                                            </Button>
                                                                        ) : (
                                                                            <Button 
                                                                                type = 'ghost' 
                                                                                htmlType = 'submit' 
                                                                                className = 'buttonSave'
                                                                            >
                                                                                <Link to = { `/detalhes_reuniao/${ record.key }/${ project_id }/`} >
                                                                                    <Icon type = 'eye' className = 'icons'/>
                                                                                        <b> Ver Reunião </b>
                                                                                </Link>
                                                                            </Button>
                                                                        )
                                                                    }
                                                                
                                                                </span>
                                                            ),
                                                        },
                                                        ]}
                                                        dataSource = {
                                                            dataSourceMeetings.innerArray
                                                        } 
                                                    />
                                                )
                                            }
                                        </div>
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

const ProjectOptionsForm = Form.create()(ProjectsOptions);

const mapStateToProps = (state) => {

	return {

		token: state.auth.token,
        projects: state.project.projects,
        loading: state.sector.loading,
        currentUser: state.auth.currentUser,
        allMeetings: state.meeting.allMeetings,
        sectors: state.sector.sectors,
        loadingAllMeetings: state.meeting.loading
	}
}

const mapDispatchToProps = dispatch => {
	
	return {

        getUser: (token, userId) => dispatch(getUser(token, userId)),
		createProject: (token, project) => dispatch(createProject(token, project)),
        getProjects: token => dispatch(getProjects(token)),
        getAllMeeting: token => dispatch(getAllMeeting(token)),
        getSectors: token => dispatch(getSectors(token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectOptionsForm);
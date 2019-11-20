import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Skeleton, Table, Tag, Button, Icon } from 'antd';

import { getProjects } from '../../store/actions/project';
import { getUser } from '../../store/actions/auth';
import { getAllMeeting } from '../../store/actions/meeting';
import { dynamicSort } from '../utils';
import Hoc from '../../hoc/hoc';
import Homepage from '../homepage/Homepage';

class ProjectsList extends Component {

    componentDidMount() {
        
        if (this.props.token !== undefined && this.props.token !== null) {

            this.props.getProjects(this.props.token);
            this.props.getAllMeeting(this.props.token);
			this.props.getUser(this.props.token, this.props.currentUser.userId);
            this.forceUpdate();
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        
        if (newProps.token !== this.props.token) {
        
            if (newProps.token !== undefined && newProps.token !== null) {

                this.props.getProjects(newProps.token);
                this.props.getAllMeeting(newProps.token);
                this.props.getUser(newProps.token, newProps.currentUser.userId);
                this.forceUpdate();
            }
        }
    }

    render() {
        
		const { currentUser } = this.props;
        const projects = this.props.projects;
        const allMeetings = this.props.allMeetings;
        let project_id = 0;
        let dataSource = {
            innerArray: [
                
            ]
        }

        let dataSourceMeetings = {
            innerArray: [

            ]
        }

        for(let aux = 0; aux < allMeetings.length; aux ++) {

            for(let usersMeeting = 0; usersMeeting < allMeetings[aux].users.length; usersMeeting ++) {
                if(currentUser.name === allMeetings[aux].users[usersMeeting]) {
                    dataSourceMeetings.innerArray.push({
                        key: allMeetings[aux].id,
                        title: allMeetings[aux].title,
                        subject_matter: allMeetings[aux].subject_matter,
                        sector: allMeetings[aux].sector
                    });
                } else {

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
                        
                            this.props.loading ? (
                                <Skeleton active />
                            ) : (
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
                                <h1 className = 'texth1'> Reuniões Que Participo </h1>
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
                                        <Button 
                                            type = 'ghost' 
                                            htmlType = 'submit' 
                                            className = 'buttonSave'
                                        >
                                            <Link to = { `/detalhes_reuniao/${ record.key }/${ project_id }`} >
                                                <Icon type = 'eye' className = 'icons'/>
                                                    <b> Ver Reunião </b>
                                            </Link>
                                        </Button>
                                        </span>
                                    ),
                                },
                                    ]}
                                    dataSource = {
                                        dataSourceMeetings.innerArray
                                    } 
                                />
                            </div>
                        )
                    )
                }
            </Hoc>
        );
    }
}

const mapStateToProps = state => {
    
    return {
        
        token: state.auth.token,
        projects: state.project.projects,
        loading: state.project.loading,
        currentUser: state.auth.currentUser,
        allMeetings: state.meeting.allMeetings
    };
};

const mapDispatchToProps = dispatch => {
    
    return {
        
		getUser: (token, userId) => dispatch(getUser(token, userId)),
        getProjects: token => dispatch(getProjects(token)),
        getAllMeeting: token => dispatch(getAllMeeting(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
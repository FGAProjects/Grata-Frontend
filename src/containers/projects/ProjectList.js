import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Skeleton, Table, Tag, Button, Icon } from 'antd';

import { getProjects } from '../../store/actions/project';
import { getSectors } from '../../store/actions/sector';
import { dynamicSort } from '../utils';
import Hoc from '../../hoc/hoc';

class ProjectsList extends Component {

    componentDidMount() {
        
        if (this.props.token !== undefined && this.props.token !== null) {
        
            this.props.getProjects(this.props.token);
            this.props.getSectors(this.props.token);
            this.forceUpdate();
        }
    }

    componentWillReceiveProps(newProps) {
        
        if (newProps.token !== this.props.token) {
        
            if (newProps.token !== undefined && newProps.token !== null) {

                this.props.getSectors(newProps.token);
                this.props.getProjects(newProps.token);
                this.forceUpdate();
            }
        }
    }

    render() {
        
        const projects = this.props.projects;
        const sectors = this.props.sectors;
        let sector_id = 0;
        let dataSource = {
            innerArray: [
                
            ]
        }
        
        for(let aux = 0; aux < projects.length; aux ++) {

            for(let auxSectors = 0; auxSectors < sectors.length; auxSectors ++) {
                
                if(sectors[auxSectors].name === projects[aux].sector) {
                    sector_id = sectors[auxSectors].id;
                }
            }
            
            dataSource.innerArray.push({
                key: projects[aux].id,
                title: projects[aux].title,
                sector: projects[aux].sector,
                tags: [ projects[aux].status ]
            }); 
        }
        
        dataSource.innerArray.sort(dynamicSort('title'));

        return (
            
            <Hoc>
                {
                    this.props.loading ? (
                        <Skeleton active />
                    ) : (
                            <div className = 'contentList'>
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
                                            type = 'primary' 
                                            htmlType = 'submit' 
                                            style = {{ 
                                                marginRight: '20px' 
                                            }}
                                    >
                                            <Link to = { `/editar_projeto/${ record.key }/${ sector_id }`} >
                                                <Icon 
                                                    type = 'edit' 
                                                    style = {{ marginRight: '10px' }} />
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
        sectors: state.sector.sectors
    };
};

const mapDispatchToProps = dispatch => {
    
    return {
        
        getProjects: token => dispatch(getProjects(token)),
        getSectors: token => dispatch(getSectors(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
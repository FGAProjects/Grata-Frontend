import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Skeleton, Table, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';

import { getSectors } from '../../store/actions/sector';
import { dynamicSort } from '../utils';
import Hoc from '../../hoc/hoc';

class SectorList extends Component {

    componentDidMount() {
        
        if (this.props.token !== undefined && this.props.token !== null) {
        
            this.forceUpdate();
            this.props.getSectors(this.props.token);
        }
    }

    componentWillReceiveProps(newProps) {
        
        if (newProps.token !== this.props.token) {
         
            if (newProps.token !== undefined && newProps.token !== null) {
         
                this.forceUpdate();
                this.props.getSectors(newProps.token);   
            }
        }
    }

    render() {
        
        const sectors = this.props.sectors;
        let dataSource = {
            innerArray: [
                
            ]
        }
        
        for(let aux = 0; aux < sectors.length; aux ++) {
            
            dataSource.innerArray.push({
                key: sectors[aux].id,
                initials: sectors[aux].initials,
                name: sectors[aux].name
            }); 
		}

		dataSource.innerArray.sort(dynamicSort('initials'));

        return (
            <Hoc>
                {
                    this.props.loading ? (
                        <Skeleton active />
                    ) : (
                            <div className = 'contentList'>
                                <Table columns = {[
                                    {
                                        title: 'Sigla',
                                        dataIndex: 'initials',
                                        key: 'initials',
                                        render: (text) => (
                                            <b> { text } </b>
                                        )
                                    },
                                    {
                                        title: 'Nome',
                                        dataIndex: 'name',
                                        key: 'name',
                                        render: (text) => (
                                            <b> { text } </b>
                                        )
                                    },
                                    {
                                        title: 'Ação',
                                        key: 'action',
                                        render: (record) => (
                                        <span>
                                            <Button 
                                                type = 'ghost'
                                                className = 'buttonEdit' 
                                                htmlType = 'submit' 
                                                style = {{ marginTop: '15px' }}
                                            >
                                                <Link to = { `/editar_setor/${ record.key }` } >
                                                    <Icon type = 'edit' className = 'icons'/>
                                                        Editar Setor
                                                </Link>
                                            </Button>
                                        </span>
                                        ),
                                    },
                                ]
                                }
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
        sectors: state.sector.sectors,
        loading: state.auth.loading
    };
};

const mapDispatchToProps = dispatch => {
    
    return {
        getSectors: token => dispatch(getSectors(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SectorList);
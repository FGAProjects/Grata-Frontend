import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Skeleton, Table, Divider, Icon, Button, Modal, message } from 'antd';
import { Link } from 'react-router-dom';

import { getSectors, deleteSector } from '../../store/actions/sector';
import { dynamicSort } from '../utils';
import Hoc from '../../hoc/hoc';

const { confirm } = Modal;

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

    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.forceUpdate();
                this.props.getSectors(newProps.token);   
            }
        }
    }

    showDeleteConfirm = (token, sectorId) => {
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
                window.location.reload(); 
			},
			onCancel() {
				message.success('Exclusão de Setor Cancelada Com Sucesso!');
			},
		});
	}

    render() {
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

		dataSource.innerArray.sort(dynamicSort('initials'))

        return (
            <Hoc>
                {
                    this.props.loading ? (
                        <Skeleton active />
                    ) : (
                            <Table columns = {
                                [
                                    {
                                        title: 'Sigla',
                                        dataIndex: 'initials',
                                        key: 'initials',
                                    },
                                    {
                                        title: 'Nome',
                                        dataIndex: 'name',
                                        key: 'name',
                                    },
                                    {
                                        title: 'Ações',
                                        key: 'action',
                                        render: (record) => (
                                        <span>
                                            <Button 
                                                type = 'primary' 
                                                htmlType = 'submit' 
                                                style = {{ marginRight: '20px' }}
                                            >
                                                <Link to = { `/editar_setor/${ record.key }` } >
                                                    <Icon 
                                                        type = 'edit' 
                                                        style = {{ marginRight: '10px' }} />
                                                        Editar Setor
                                                </Link>
                                            </Button>
                                            <Divider type = 'vertical' />
                                            <Button 
                                                onClick = { () => 
                                                            this.showDeleteConfirm(
                                                                this.props.token,
                                                                record.key
                                                            )
                                                        } 
                                                type = 'danger' >
                                                    <Icon type = 'delete' />
                                                    Excluir Perfil {record.key}
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
        getSectors: token => dispatch(getSectors(token)),
        deleteSector: (token, sectorId) => dispatch(deleteSector(token, sectorId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SectorList);
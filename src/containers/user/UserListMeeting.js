import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Skeleton, Transfer, Switch, Table, Tag, Button, Icon, message } from 'antd';
import difference from 'lodash/difference';

import Hoc from '../../hoc/hoc';
import Homepage from '../homepage/Homepage';
import NotPermission from '../notPermission/NotPermission';

import { getUsers } from '../../store/actions/auth';
import { getProjects } from '../../store/actions/project';
import { getMeeting, updateMeeting } from '../../store/actions/meeting';
import { dynamicSort } from '../utils';

class UserListMeeting extends Component {

    state = {
        
		showSearch: false,
		cont: 0
    };

    componentDidMount() {

		try {

			if (this.props.token !== undefined && this.props.token !== null) {
				
				const meeting_id = this.props.match.params.meeting_id;
				this.props.getMeeting(this.props.token, meeting_id);
				this.props.getUsers(this.props.token);
				this.props.getProjects(this.props.token);
			}
		} catch(error) {
			console.log(error)
		}
	}

    UNSAFE_componentWillReceiveProps(newProps) {

        try {

            if (newProps.token !== this.props.token) {
        
                if (newProps.token !== undefined && newProps.token !== null) {
            
                    const meeting_id = newProps.match.params.meeting_id;
                    this.props.getMeeting(newProps.token, meeting_id);
					this.props.getUsers(newProps.token);
					this.props.getProjects(newProps.token);
                    this.forceUpdate();
                }
            }
        } catch(error) {
            console.log(error);
        }
	}

	handleSubmit = () => {
		
		if(this.state.targetKeys === undefined) {
			message.warning('Por Favor, Adicione Pelo Menos Uma Pessoa a Reunião');
		} else {

			const { currentMeeting } = this.props;
			const projects = this.props.projects;
			const user = JSON.parse(localStorage.getItem('user'));
			const token = user.token;
			const users = [

			];
			const targetKeys = this.state.targetKeys;
			let project_id = 0;
		
			for(let aux = 0; aux < projects.length; aux ++) {

				if(projects[aux].title === currentMeeting.project) {
					project_id = projects[aux].id;
				}
			}

			for(let aux = 0; aux < targetKeys.length; aux ++) {
				
				users.push({
					id: targetKeys[aux]
				});
			}

			const meeting = {

				meeting: currentMeeting.id,
				status: 'Agendada',
				title: currentMeeting.title,
				subject_matter: currentMeeting.subject_matter,
				initial_date: currentMeeting.initial_date,
				final_date: currentMeeting.final_date,
				initial_hour: currentMeeting.initial_hour,
				final_hour: currentMeeting.final_hour,
				sector: currentMeeting.sector,
				project: currentMeeting.project,
				users
			};

			this.props.updateMeeting(token, meeting);
			message.success('Usuários Foram Adicionados a Reunião Com Sucesso');
			this.props.history.push(`/detalhes_reuniao/${ currentMeeting.id }/${ project_id }`);
		}
	}

    onChange = nextTargetKeys => {

		this.setState({ 
			targetKeys: nextTargetKeys
		});
    };

    triggerShowSearch = showSearch => {
		
		this.setState({ 
            showSearch 
        });
    };
    
    render() {
		
		const user = JSON.parse(localStorage.getItem('user'));
        const { targetKeys, showSearch } = this.state;
        const users = this.props.users;
        let dataSource = {
            innerArray: [
                
            ]
		};

        for(let aux = 0; aux < users.length; aux ++) {

            if(users[aux].sector === null || users[aux].sector === undefined) {

            } else {

				dataSource.innerArray.push({
                    key: users[aux].id,
                    title: users[aux].name,
                    ramal: users[aux].ramal,
                    tag: [users[aux].sector],
                });
			}
		}

		dataSource.innerArray.sort(dynamicSort('title'));
		
        return (

			<Hoc>
				{
					this.props.token === null ? (
						<Homepage/>
					) : (
						this.props.loading ? (
							<Skeleton active />
						) : (
							<Hoc>
								{
									user.is_administrator === true ? (
										<div className = 'contentSearch'>
											<Switch
												unCheckedChildren = "Pesquisar Por Nome"
												checkedChildren = "Esconder Pesquisa"
												checked = { showSearch }
												onChange = { this.triggerShowSearch }
												className = 'buttonSwitch'
											/>
											<Button 
												type = 'ghost' 
												htmlType = 'submit' 
												className = 'buttonSearch'
												onClick = { this.handleSubmit }
											>
												<Icon type = 'save' className = 'icons'/>
												Salvar e Agendar Reunião
											</Button>
											<div className = 'contentTableUserSearch'>
												<TableTransfer
													dataSource = { dataSource.innerArray } 
													targetKeys = { targetKeys }
													showSearch = { showSearch }
													onChange = { this.onChange }
													operations = {[
														'Adicionar',
														'Remover'
													]}
													filterOption = {(inputValue, item) =>
														item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
													}
													leftColumns = {[
														{
															dataIndex: 'title',
															title: 'Nome',
															render: title =><Tag color = 'blue'><b> { title } </b></Tag>
														},
														{
															dataIndex: 'ramal',
															title: 'Ramal',
															render: ramal =><Tag color = 'red'><b> { ramal } </b></Tag>
														},
														{
															dataIndex: 'tag',
															title: 'Setor',
															render: tag =><Tag color = 'green'><b> { tag } </b></Tag>
														}
													]}
													rightColumns = {[
														{
															dataIndex: 'title',
															title: 'Nome',
															render: title =><Tag color = 'blue'><b> { title } </b></Tag>
														},
														{
															dataIndex: 'ramal',
															title: 'Ramal',
															render: ramal =><Tag color = 'red'><b> { ramal } </b></Tag>
														},
														{
															dataIndex: 'tag',
															title: 'Setor',
															render: tag =><Tag color = 'green'><b> { tag } </b></Tag>
														}
													]}
												/>
											</div>
										</div>
									) : (
										<NotPermission/>
									)
								}
							</Hoc>
								// <div className = 'contentSearch'>
								// 	<Switch
								// 		unCheckedChildren = "Pesquisar Por Nome"
								// 		checkedChildren = "Esconder Pesquisa"
								// 		checked = { showSearch }
								// 		onChange = { this.triggerShowSearch }
								// 		className = 'buttonSwitch'
								// 	/>
								// 	<Button 
								// 		type = 'ghost' 
								// 		htmlType = 'submit' 
								// 		className = 'buttonSearch'
								// 		onClick = { this.handleSubmit }
								// 	>
								// 		<Icon type = 'save' className = 'icons'/>
								// 		Salvar e Agendar Reunião
								// 	</Button>
								// </div>

								// <div className = 'contentTableUserSearch'>
								// 	<TableTransfer
								// 		dataSource = { dataSource.innerArray } 
								// 		targetKeys = { targetKeys }
								// 		showSearch = { showSearch }
								// 		onChange = { this.onChange }
								// 		operations = {[
								// 			'Adicionar',
								// 			'Remover'
								// 		]}
								// 		filterOption = {(inputValue, item) =>
								// 			item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
								// 		}
								// 		leftColumns = {[
								// 			{
								// 				dataIndex: 'title',
								// 				title: 'Nome',
								// 				render: title =><Tag color = 'blue'><b> { title } </b></Tag>
								// 			},
								// 			{
								// 				dataIndex: 'ramal',
								// 				title: 'Ramal',
								// 				render: ramal =><Tag color = 'red'><b> { ramal } </b></Tag>
								// 			},
								// 			{
								// 				dataIndex: 'tag',
								// 				title: 'Setor',
								// 				render: tag =><Tag color = 'green'><b> { tag } </b></Tag>
								// 			}
								// 		]}
								// 		rightColumns = {[
								// 			{
								// 				dataIndex: 'title',
								// 				title: 'Nome',
								// 				render: title =><Tag color = 'blue'><b> { title } </b></Tag>
								// 			},
								// 			{
								// 				dataIndex: 'ramal',
								// 				title: 'Ramal',
								// 				render: ramal =><Tag color = 'red'><b> { ramal } </b></Tag>
								// 			},
								// 			{
								// 				dataIndex: 'tag',
								// 				title: 'Setor',
								// 				render: tag =><Tag color = 'green'><b> { tag } </b></Tag>
								// 			}
								// 		]}
								// 	/>
								// </div>
							// </Hoc>
						)
					)
				}
			</Hoc>
        );
    }
}

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer {...restProps} showSelectAll = { false } >
      	{({
			direction,
			filteredItems,
			onItemSelectAll,
			onItemSelect,
			selectedKeys: listSelectedKeys,
			disabled: listDisabled,
		}) => {
        	const columns = direction === 'left' ? leftColumns : rightColumns;
  
        	const rowSelection = {
				getCheckboxProps: item => ({ 
					disabled: listDisabled || item.disabled 
				}),
				onSelectAll(selected, selectedRows) {
					const treeSelectedKeys = selectedRows
					.filter(item => !item.disabled)
					.map(({ key }) => key);
					const diffKeys = selected
					? difference(treeSelectedKeys, listSelectedKeys)
					: difference(listSelectedKeys, treeSelectedKeys);
					onItemSelectAll(diffKeys, selected);
				},
				onSelect({ key }, selected) {
					onItemSelect(key, selected);
				},
				selectedRowKeys: listSelectedKeys
        	};
  
        	return (
				
				<Table
					rowSelection = { rowSelection }
					columns = { columns }
					dataSource = { filteredItems }
					size = 'small'
					style = {{ 
						pointerEvents: listDisabled ? 'none' : null 
					}}
					onRow = {({ 
						key, disabled: itemDisabled 
					}) => ({
						onClick: () => {
							if (itemDisabled || listDisabled) return;
							onItemSelect(key, !listSelectedKeys.includes(key));
						},
					})}
				/>
        	);
		}}
    </Transfer>
);
  
const mapStateToProps = state => {
    
    return {
    
        token: state.auth.token,
        users: state.auth.users,
		loading: state.auth.loading,
		projects: state.project.projects,
        currentMeeting: state.meeting.currentMeeting
    };
};

const mapDispatchToProps = dispatch => {
    
    return {

        getUsers: token => dispatch(getUsers(token)),
        getMeeting: (token, meeting_id) => dispatch(getMeeting(token, meeting_id)),
		updateMeeting: (token, meeting) => dispatch(updateMeeting(token, meeting)),
		getProjects: token => dispatch(getProjects(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListMeeting);
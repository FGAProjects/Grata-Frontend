import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Skeleton, Transfer, Switch, Table, Tag } from 'antd';
import difference from 'lodash/difference';

import { getUsers } from '../../store/actions/auth';
import { getMeeting, updateMeeting } from '../../store/actions/meeting';
import { dynamicSort } from '../utils';

class UserListMeeting extends Component {

    state = {
        
        showSearch: false,
    };

    componentDidMount() {

		try {

			if (this.props.token !== undefined && this.props.token !== null) {
				
				const meeting_id = this.props.match.params.meeting_id;
				this.props.getMeeting(this.props.token, meeting_id);
				this.props.getUsers(this.props.token);
			}
		} catch(error) {
			console.log(error)
		}
	}

    componentWillReceiveProps(newProps) {

        try {

            if (newProps.token !== this.props.token) {
        
                if (newProps.token !== undefined && newProps.token !== null) {
            
                    const meeting_id = newProps.match.params.meeting_id;
                    this.props.getMeeting(newProps.token, meeting_id);
                    this.props.getUsers(newProps.token);
                    this.forceUpdate();
                }
            }
        } catch(error) {
            console.log(error);
        }
	}

    onChange = nextTargetKeys => {
        this.setState({ 
            targetKeys: nextTargetKeys 
        });
    };
    
    triggerDisable = disabled => {
        this.setState({ 
            disabled 
        });
    };

    triggerShowSearch = showSearch => {
        this.setState({ 
            showSearch 
        });
    };
    
    render() {

        const { targetKeys, showSearch } = this.state;
        const users = this.props.users;
        let dataSource = {
            innerArray: [
                
            ]
        };

        for(let aux = 0; aux < users.length; aux ++) {

            if(users[aux].sector !== null || users[aux].sector !== undefined) {

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
            <div>
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
                <Switch
                    unCheckedChildren = "Pesquisar Por Nome"
                    checkedChildren = "showSearch"
                    checked = { showSearch }
                    onChange = { this.triggerShowSearch }
                    style = {{ 
                        marginTop: 16 
                    }}
                />
          </div>
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
        currentMeeting: state.meeting.currentMeeting
    };
};

const mapDispatchToProps = dispatch => {
    
    return {

        getUsers: token => dispatch(getUsers(token)),
        getMeeting: (token, meeting_id) => dispatch(getMeeting(token, meeting_id)),
        updateMeeting: (token, meeting) => dispatch(updateMeeting(token, meeting))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserListMeeting);
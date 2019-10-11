import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Skeleton, Transfer, Switch, Table, Tag } from 'antd';
import difference from 'lodash/difference';

import { getUsers } from '../../store/actions/auth';
import { getMeeting, updateMeeting } from '../../store/actions/meeting';
import { dynamicSort } from '../utils';
import Hoc from '../../hoc/hoc';

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer {...restProps} showSelectAll={false}>
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
          getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
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
          selectedRowKeys: listSelectedKeys,
        };
  
        return (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            size="small"
            style={{ pointerEvents: listDisabled ? 'none' : null }}
            onRow={({ key, disabled: itemDisabled }) => ({
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
  
  const mockTags = ['cat', 'dog', 'bird'];
  
  const mockData = [];
  for (let i = 0; i < 20; i++) {
    mockData.push({
      key: i.toString(),
      title: `content${i + 1}`,
      description: `description of content${i + 1}`,
      tag: mockTags[i % 3],
    });
  }
  
  const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);
  
  const leftTableColumns = [
    {
      dataIndex: 'title',
      title: 'Name',
    },
    {
      dataIndex: 'tag',
      title: 'Tag',
      render: tag => <Tag>{tag}</Tag>,
    },
    {
      dataIndex: 'description',
      title: 'Description',
    },
  ];
  const rightTableColumns = [
    {
      dataIndex: 'title',
      title: 'Name',
    },
  ];

class UserListMeeting extends Component {

    state = {
        
        targetKeys: originTargetKeys,
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

        const { targetKeys, disabled, showSearch } = this.state;
        const users = this.props.users;
        let dataSource = {
            innerArray: [
                
            ]
        };

        for(let aux = 0; aux < users.length; aux ++) {

            if(users[aux].sector !== null || users[aux].sector !== undefined) {

                dataSource.innerArray.push({
                    key: users[aux].id,
                    name: users[aux].name,
                    ramal: users[aux].ramal,
                    setor: users[aux].sector,
                });
            }
		}
        
        return (
            <div>
                <TableTransfer
                    dataSource = { mockData }
                    targetKeys = { targetKeys }
                    disabled = { disabled }
                    showSearch = { showSearch }
                    onChange = { this.onChange }
                    filterOption = {(inputValue, item) =>
                        item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
                    }
                    leftColumns = { leftTableColumns }
                    rightColumns = { rightTableColumns }
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

    

    // state = {
    //     button:true,
    //     type_button: true
    // }

    // constructor(props) {
        
    //     super(props);
    //     this.state = {
            
    //         button: true,
    //         list_persons: [

    //         ],
    //     };

    //     this._onStateChange = this._onStateChange.bind(this);
    //     this.add_person = this.add_person.bind(this);
    //     this.remove_person = this.remove_person.bind(this);
    // }

    // add_person(key) {

    //     // let person_id = this.state.list_persons;
    //     // person_id.push(key);

    //     // this.setState({
    //     //     list_persons: person_id
    //     // });
    //     // console.log(this.state.list_persons)
    // }
    
    // remove_person(key) {

    //     // let remove_person = this.state.list_persons;
    //     // console.log(remove_person)

    //     // for(let aux = 0; remove_person.length; aux ++) {
            
    //     //     if(remove_person[aux] === key) {
    //     //         // remove_person.splice(aux, 1);
    //     //     }
    //     // }

    //     // console.log(this.state.list_persons);
    // }

    // _onStateChange(newState){
        
    //     const value = newState ? 'Adicionar':'Remover';
    //     const button_value = newState ? 'primary':'danger';
    //     this.setState({
    //         buttonText: value,
    //         type_button: button_value
    //     });
    // }

    // _onPress(textValue, key) {

    //     if(textValue === 'Adicionar') {
            
    //         const newState = !this.state.button;
    //         const typeButton = !this.state.type_button;
    //         this.setState({
    //             button: newState,
    //             type_button: typeButton
    //         });
    //         this.props.onStateChange && this.props.onStateChange(newState);
    //         this.add_person(key);
    //     } else {
            
    //         const newState = !this.state.button;
    //         const typeButton = !this.state.type_button;
    //         this.setState({
    //             button:newState,
    //             type_button: typeButton
    //         });
    //         this.props.onStateChange && this.props.onStateChange(newState);
    //         this.remove_person(key);
    //     }
    // }

    // componentDidMount() {

    //     try {
    //         if (this.props.token !== undefined && this.props.token !== null) {
                
    //             const meeting_id = this.props.match.params.meeting_id;
    //             this.props.getMeeting(this.props.token, meeting_id);
    //             this.props.getUsers(this.props.token);
    //         }
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }

    // componentWillReceiveProps(newProps) {

    //     try {

    //         if (newProps.token !== this.props.token) {
        
    //             if (newProps.token !== undefined && newProps.token !== null) {
            
    //                 const meeting_id = newProps.match.params.meeting_id;
	// 			    this.props.getMeeting(newProps.token, meeting_id);
    //                 this.props.getUsers(newProps.token);
    //                 this.forceUpdate();
    //             }
    //         }
    //     } catch(error) {
    //         console.log(error);
    //     }
    // }

    // render() {
        
    //     const users = this.props.users;
    //     const { button } = this.state;
    //     let dataSource = {
    //         innerArray: [
                
    //         ]
    //     };

    //     for(let aux = 0; aux < users.length; aux ++) {

    //         if(users[aux].sector !== null || users[aux].sector !== undefined) {

    //             dataSource.innerArray.push({
    //                 key: users[aux].id,
    //                 name: users[aux].name,
    //                 ramal: users[aux].ramal,
    //                 setor: users[aux].sector,
    //                 tags: [
    //                     users[aux].id
    //                 ]
    //             });
    //         }
	// 	}

	// 	dataSource.innerArray.sort(dynamicSort('name'))

    //     return (
    //         <Hoc>
    //             {
    //                 this.props.loading ? (
    //                     <Skeleton active />
    //                 ) : (
    //                         <Table columns = {
    //                             [{
    //                                 title: 'Nome',
    //                                 dataIndex: 'name',
    //                                 key: 'name',
    //                                 render: (text) => (
    //                                     <b>{text}</b>
    //                                 )
	// 							},
    //                             {
    //                                 title: 'Ramal',
    //                                 dataIndex: 'ramal',
    //                                 key: 'ramal',
    //                                 render: (text) => (
    //                                     <b>{text}</b>
    //                                 )
    //                             },
    //                             {
    //                                 title: 'Setor',
    //                                 dataIndex: 'setor',
    //                                 key: 'setor',
    //                                 render: (text) => (
    //                                     <b>{text}</b>
    //                                 )
    //                             },
    //                             {
    //                                 title: 'Adicionar/Remover',
    //                                 key: 'tags',
    //                                 dataIndex: 'tags',
    //                                 render: users => (
    //                                     <span>
    //                                         {
    //                                             users.map(tag => {
                                                    
    //                                                 const typeButton = button ? 'primary':'danger';
    //                                                 const textValue = button ? 'Adicionar':'Remover';

    //                                                 return (
    //                                                     <Button 
    //                                                         type = { typeButton } 
    //                                                         htmlType = 'submit'
    //                                                         key = { tag } 
    //                                                         style = {{ 
    //                                                             marginRight: '20px' 
    //                                                         }}
    //                                                         onClick ={()=>this._onPress(textValue, tag)}
    //                                                     >
    //                                                         { textValue }
    //                                                     </Button>
    //                                                 );
    //                                             })
    //                                         }
    //                                     </span>
    //                                 ),
    //                             }
    //                         ]}
    //                         dataSource = {
	// 							dataSource.innerArray
	// 						} 
    //                     />
    //                 )
    //             }
    //         </Hoc>
    //     );
    // }


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
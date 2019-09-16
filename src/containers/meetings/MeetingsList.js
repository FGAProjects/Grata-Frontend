import React, { Component } from 'react';
import { Form, Input, Icon, Button, message, Select } from 'antd';
import { connect } from 'react-redux'
import { fail } from 'assert';

import { getUsers } from '../../store/actions/auth';
import { getSectors } from '../../store/actions/sector';
import { dynamicSort } from '../utils';

const Option = Select.Option;

class MeetingsList extends Component {

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

    render() {
        return (
            <div align = 'right'>
                asdsa
                <div align = 'center'>
                nothing really matters
                </div>
                
            </div>
        )
    }
}

// const mapStateToProps = (state) => {

// 	return {
// 		loading: state.loading,
// 		error: state.error,
// 		token: state.auth.token,
// 		sectors: state.sector.sectors
// 	}
// }

// const mapDispatchToProps = dispatch => {
// 	return {
// 		createProject: (token, project) => dispatch(createProject(token, project)),
// 		getSectors: token => dispatch(getSectors(token))
// 	}
// }

export default MeetingsList;
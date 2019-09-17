import React, { Component } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

class MeetingList extends Component {



    render() {
		const projectId = this.props.match.params.id; 
		return (
			<div align = 'right'>
				<Button 
					type = 'primary' 
					htmlType = 'submit' 
					style = {{
						marginRight: '10px'
					}}
					size = 'large'
				>
					<Link to = { `/criar_reuniao/projeto${ projectId } `} >
						Nova Reunião
					</Link>
				</Button>
				<div align = 'center'>
					adads
				</div>
			</div>
		);
	}
}

export default MeetingList;
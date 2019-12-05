import React from 'react';
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

class Choices extends React.Component {
	  
	render() {

		const { questionId } = this.props;
		const { usersAnswers } = this.props;
		
		return (
		
			<RadioGroup
				onChange = {(e, qId) => this.props.change(e, questionId)}
				value = {
					usersAnswers[questionId] !== undefined &&
					usersAnswers[questionId] !== null
						? usersAnswers[questionId]
						: null
				}
			>
				{ this.props.choices.map((c, index) => {
					return (
						<Radio style = { radioStyle } value = { c } key = { index }>
						{ c }
						</Radio>
					);
				})}
			</RadioGroup>
		);
  	}
}

const radioStyle = {
	
	display: 'block',
	height: '30px',
	lineHeight: '30px'
};

export default Choices;